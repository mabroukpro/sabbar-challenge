# Weather Charts App

This is a React application that allows the user to select cities and start/end date for each and then fetches weather data from a weather API service and displays it on a chart.

### Installation
1. Clone the repo
2. Navigate to the project directory
3. Install dependencies using `npm install`
4. Create a .env file and add this variable to it `REACT_APP_WEATHER_URL=https://api.open-meteo.com/v1/forecast` (for testing Purposes only)

### Usage
1. Run the development server using `npm start`
2. It will open http://localhost:3000 to view it in the browser.

### Testing
To run the tests, use this command `npm test`

### Dependencies
* React
* Redux
* React-Redux
* React Router
* Axios
* Ant Design Icons
* Ant Design
* Recharts
* Jest
* React Testing Library
* Typescript
* UUID
* Web Vitals
* Dotenv
* Node Sass

### API

This application uses the [Open-Meteo](https://open-meteo.com/en/docs "Open-Meteo") API to fetch weather data.

### Known issues

* Not all tests cases implemented (was short on time)
* DateRange input in home screen has ui responsiveness issue and sometimes flashing issue (library related), to be fixed later.

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


