import WeatherApiService from "../axios/index";

export default {
    obtainObtainWeatherDataByLocationName(latitude, longitude) {
        return WeatherApiService.get(`/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=74e3925b74e333fcb19e414892b70eef`);
    },
}