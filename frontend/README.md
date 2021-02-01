# TempDash <img src="misc/logo.png" height="40px" />

This folder contains the frontend for the tempdash dashboard.

_Features_

- Show historical data of integrated sensors in a selected time window
- Show ideal threshold ranges for integrated rooms in the rendered graph
- Toggle full-width view for graphs (reasonable only on bigger screen sizes)
- Generate png based on visible graph and download in 3 different sizes (see example: `/misc/large-1-day-example.png`)
- Toggle between graph and table view per sensor
- Generate pdf based on selected time window and download (see example output for 1 day: `/misc/pdf-1-day-example.pdf`)
- Show last sensor data of integrated sensors with threshold evaluation
- Show weather information from open weather api of selected city ids

Currently supported sensor data: temperature, humidity

---

## Running the frontend application

### Requirements

1. npm/yarn installed on your computer
2. Ensure you have data on your realtime firebase database according to the following structure:
   ![firebase structure](misc/firebase-instruction.PNG)<br />
   `dht/room_name/data-entry`
3. Create an `.env` file according to `.env-example`. You will need to add

- firebase credentials
- room names (same names that are used in your firebase)
- open weather api credentials (if you'd like to show weather data on the dashboard)
- city ids of the cities you want to have in the dashboard (see open weather)

4. Optional: Give your integrated rooms a name in `src/setup/rooms.js` (Attention: The keys need to match the names you added in the .env via `REACT_APP_ROOMS`):

```
const ROOM_NAMES = {
  living_room: 'Living room',
  core: 'Core',
};
```

5. Optional: Define min and max thresholds of the supported sensor values per room in `src/setup/settings.js`:

```
const THRESHOLDS = {
  living_room: {
    temperature: {
      max: 23,
      min: 20,
    },
    humidity: {
      max: 60,
      min: 40,
    },
  },
  core: {
    temperature: {
      max: 21,
      min: 18,
    },
    humidity: {
      max: 60,
      min: 40,
    },
  },
};
```

### Run

1. Run `yarn` and `yarn start`
2. The dashboard should be available via `http://localhost:3000`

---

## Credits

- UI library: antd design
- Graphs: nivo
- Diagram icon (used as favicon) made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
