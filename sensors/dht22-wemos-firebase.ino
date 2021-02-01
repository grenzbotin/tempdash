// Firebase
#include "FirebaseESP8266.h"
#include "DHTesp.h"
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>

/***************************************************************
  VARIABLES & PIN
**************************************************************/

#define FIREBASE_HOST "your-app-name.firebaseio.com"
#define FIREBASE_AUTH "private-api-key"
#define FIREBASE_PATH "/dht/core" // We use dht as prefix in frontend app, just change the room name
#define TIME_PERIOD_UPSTREAM 600000 // Defines in which time period we want to push to our Firebase

// SSID: Network
char ssid[] = "Your SSID"; // SSID of your Wi-Fi router
char pass[] = "Your Wifi-password"; // Password of your Wi-Fi router

// Temperature
#define DHT_PIN 0
DHTesp dht;


/***************************************************************
  INIT
**************************************************************/

// Port to listen for UDP packets
unsigned int localPort = 2390;

// IP Address: timeServer(129, 6, 15, 28); // time.nist.gov NTP server
IPAddress timeServerIP;
const char* ntpServerName = "pool.ntp.org";
const int NTP_PACKET_SIZE = 48; // NTP time stamp is in the first 48 bytes of the message
byte packetBuffer[ NTP_PACKET_SIZE]; // buffer to hold incoming and outgoing packets

// A UDP instance to let us send and receive packets over UDP
WiFiUDP udp;

// Firebase init
FirebaseData firebaseData;
FirebaseJson json;


/***************************************************************
  SETUP
**************************************************************/
void setup() {
  Serial.begin(9600);
  while (! Serial);

  WiFi.begin(ssid, pass);
  udp.begin(localPort);

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  // Connect DHT sensor to defined DHT_PIN
  dht.setup(DHT_PIN, DHTesp::DHT22);
}
/***************************************************************
  LOOP
**************************************************************/
int CONTROL = 0;

void loop() {
  float temperature = dht.getTemperature();
  float humidity = dht.getHumidity();

  // Check for reading failures and exit to try again
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  int currentTime = getCurrentTime();
  do
  {
    delay(500);
    currentTime = getCurrentTime();
  } while (currentTime == 0);

  if (currentTime) {
    json.clear().add("temperature", temperature);
    json.add("humidity", humidity);
    json.add("time", currentTime);

    // Send a new value to defined firbase path
    if (Firebase.pushJSON(firebaseData, FIREBASE_PATH, json)) {
      Serial.println(firebaseData.dataPath());
      Serial.println(firebaseData.pushName());
      Serial.println(firebaseData.dataPath() + "/" + firebaseData.pushName());
    } else {
      Serial.print("Firebase Pushing failed:");
      Serial.println(firebaseData.errorReason());
    }
  }

  delay(TIME_PERIOD_UPSTREAM);
}

unsigned int getCurrentTime() {
  // Get random server
  WiFi.hostByName(ntpServerName, timeServerIP);
  sendNTPpacket(timeServerIP);

  int cb = udp.parsePacket();
  if (cb) {
    // Read data from received package into buffer
    udp.read(packetBuffer, NTP_PACKET_SIZE);

    // The timestamp starts at byte 40 of the received packet and is four bytes,
    // or two words, long. First, esxtract the two words:
    unsigned long highWord = word(packetBuffer[40], packetBuffer[41]);
    unsigned long lowWord = word(packetBuffer[42], packetBuffer[43]);

    // combine the four bytes into a long integer to get NTP time (seconds since Jan 1 1900):
    unsigned long secsSince1900 = highWord << 16 | lowWord;

    // Unix time starts on Jan 1 1970. In seconds: 2208988800:
    const unsigned long seventyYears = 2208988800UL;

    // subtract seventy years:
    unsigned long epoch = secsSince1900 - seventyYears;
    return int(epoch);
  }
}

// send an NTP request to the time server at the given address
unsigned long sendNTPpacket(IPAddress& address) {
  // set all bytes in the buffer to 0
  memset(packetBuffer, 0, NTP_PACKET_SIZE);

  // Initialize values needed to form NTP request
  packetBuffer[0] = 0b11100011; // LI, Version, Mode
  packetBuffer[1] = 0; // Stratum, or type of clock
  packetBuffer[2] = 6; // Polling Interval
  packetBuffer[3] = 0xEC; // Peer Clock Precision

  // 8 bytes of zero for Root Delay & Root Dispersion
  packetBuffer[12]  = 49;
  packetBuffer[13]  = 0x4E;
  packetBuffer[14]  = 49;
  packetBuffer[15]  = 52;

  // Send a packet to request a timestamp:
  udp.beginPacket(address, 123); // NTP requests are to port 123
  udp.write(packetBuffer, NTP_PACKET_SIZE);
  udp.endPacket();
}