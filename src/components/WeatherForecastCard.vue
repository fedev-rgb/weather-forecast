<script setup>
const props = defineProps({
  data: {
    type: [Object, null],
    required: true,
  },
});

/**
 * @function isWeatherDataValid
 *
 * @return {boolean}
 */
const isWeatherDataValid = () => {
  return props.data !== null ? !!Object.keys(props.data).length : false;
};
</script>

<script>
export default {
  name: "WeatherForecastCard",
};
</script>

<template>
  <van-card v-if="isWeatherDataValid()">
    <template #title>
      <strong>{{ props.data.name }}</strong>
      <hr/>
    </template>
    <template #desc>
      <div>
        <span><strong>Weather:</strong> {{ props.data.weather[0].main }}</span>
        <hr />
        <span
          ><strong>Temperature (Celsius):</strong>
          {{ Math.round(props.data.main.temp) }}</span
        >
        <hr />
        <span
          ><strong>Feels like (Celsius):</strong>
          {{ Math.round(props.data.main.feels_like) }}</span
        >
        <hr />
        <span><strong>Humidity:</strong> {{ props.data.main.humidity }}</span>
      </div>
    </template>
  </van-card>
  <van-card
    title="No data available"
    desc="Select a location to see a weather forecast"
    currency=""
    v-else-if="!isWeatherDataValid()"
  ></van-card>
</template>
