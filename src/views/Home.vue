<script setup>
import { ref, watch, onMounted } from "vue";
import { City } from "country-state-city";
import { showToast } from "vant";

import WeatherForecastChart from "../components/WeatherForecastChart.vue";
import WeatherForecastCard from "../components/WeatherForecastCard.vue";

import WeatherServices from "../services/modules/WeatherServices.js";

const searchValue = ref("");
const selectedLocation = ref({});
const isLoading = ref(false);
const isListVisible = ref(false);
const citiesList = ref([]);
const activeTab = ref("select");

const weatherData = ref(null);
const chartSeries = ref([]);

/**
 * @function modifyPropsSeriesIntoValidForm
 *
 * @return {Object[]} - modified series
 */
const modifyPropsSeriesIntoValidForm = () => {
  if (Object.keys(weatherData.value).length) {
    return [
      {
        name: "Temperature",
        data: [weatherData.value.main.temp],
      },
      {
        name: "Feels Like",
        data: [weatherData.value.main.feels_like],
      },
      {
        name: "Humidity",
        data: [weatherData.value.main.humidity],
      },
    ];
  } else {
    return [];
  }
};
/**
 * @function onSearch
 * @param {String} text - The text to search
 */
const onSearch = (text) => {
  if (text.length < 3) {
    return false;
  }

  isListVisible.value = true;
};
/**
 * @function onLoadWeatherData
 */
const onLoadWeatherData = () => {
  return new Promise((resolve, reject) => {
    WeatherServices.obtainObtainWeatherDataByLocationName(
      selectedLocation.value.latitude,
      selectedLocation.value.longitude
    )
      .then((response) => {
        resolve(response);

        weatherData.value = response.data;
      })
      .then(() => {
        chartSeries.value = modifyPropsSeriesIntoValidForm();
      })
      .catch((error) => {
        reject(error);

        showToast(error.response.message);
      })
      .finally(() => {
        setTimeout(() => {
          isLoading.value = false;
        }, 1500);
      });
  });
};
/**
 * @function obtainCitiesList
 * @return {Object[]} - Cities list
 */
const obtainCitiesList = () => {
  return City.getAllCities();
};
/**
 * @function returnFilteredCitiesList
 * @return {Object[]} - Cities list
 */
const returnFilteredCitiesList = () => {
  if (searchValue.value < 3 && isListVisible.value) {
    return [];
  }

  return citiesList.value.filter((p) =>
    p.name.toLowerCase().includes(searchValue.value.toLowerCase())
  );
};
/**
 * @function selectALocation
 * @param {Object} location
 *
 * @return {Object[]} - Cities list
 */
const selectALocation = (location) => {
  selectedLocation.value = location;
  isListVisible.value = false;

  isLoading.value = true;

  onLoadWeatherData();
};

watch(searchValue, () => {
  if (!searchValue.value.length) {
    isListVisible.value = false;
  }
});

onMounted(() => {
  citiesList.value = obtainCitiesList();
});
</script>

<script>
export default {
  name: "Home",
};
</script>

<template>
  <van-row justify="center" align="center" class="home__row">
    <van-col span="12">
      <!-- SEARCH INPUT -->
      <van-search
        v-model="searchValue"
        shape="round"
        show-action
        :clearable="false"
        background="#242424"
        placeholder="Enter a location (min 3 symbols)..."
        @search="onSearch"
      >
        <template #action>
          <div class="d-flex">
            <van-button
              @click="onSearch"
              :loading="isLoading"
              type="success"
              size="small"
              round
              >Search</van-button
            >
          </div>
        </template>
      </van-search>
      <!-- SEARCHING LIST -->
      <van-list v-if="isListVisible" class="list">
        <van-cell
          v-for="location in returnFilteredCitiesList()"
          :key="JSON.stringify(location + Math.random())"
          :title="location.name"
          @click="selectALocation(location)"
        />
        <van-cell
          v-if="!returnFilteredCitiesList().length"
          :key="JSON.stringify('nodataavailable' + Math.random())"
          title="No location found."
        />
      </van-list>
      <!-- TABS -->
      <van-tabs v-model:active="activeTab" background="#242424">
        <van-tab title="List" name="list" color="white">
          <WeatherForecastCard :data="weatherData" />
        </van-tab>
        <van-tab title="Chart" name="chart">
          <WeatherForecastChart :seriesData="chartSeries"
        /></van-tab>
      </van-tabs>
    </van-col>
  </van-row>
</template>
