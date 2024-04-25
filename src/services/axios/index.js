import axios from "axios";

let WeatherApiService = axios.create({
    baseURL: "https://api.openweathermap.org"
});

export default WeatherApiService;