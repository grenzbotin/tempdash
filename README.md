# TempDash <img src="frontend/misc/logo.png" height="40px" />

TempDash is a dashboard application to monitor your (indoor) climate.

---

## Repository content

This repository consists of two main components:

- sensors: flash sensors to read from DHT22 sensors and push data to firebase
- frontend: to consume sensor data from firebase

---

## Project tech stack

Hardware:

- Wemos D1 mini
- DHT22 temperature & humidity sensor
- 10 KOhm resistor
- Wires

Software:

- Firebase realtime database
- Arduino .ino scripts see `/sensors`
- Frontend: ReactJS / TypeScript

---

## Frontend screenshots

First view:
![overview](./misc/screenshot-1.PNG)
Toggle off the left info bar:
![toggle off climate](./misc/screenshot-2.PNG)
Toggle on the large graph view:
![toggle large graph view](./misc/screenshot-3.PNG)
Toggle on the table view for one graph:
![toggle table view](./misc/screenshot-4.PNG)
Download graph image:
![download image menu](./misc/screenshot-5.PNG)
