<script setup>
import { ref, toRef } from "vue";

const props = defineProps({
  seriesData: {
    type: Array,
    required: true,
  },
});

const chartOptions = ref({
  chart: {
    id: "basic-bar",
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8c9cc",
      }
    }
  },
  xaxis: {
    labels: {
      rotate: -45,
      style: {
        colors: "#c8c9cc",
      },
    },
    categories: ["Today"],
    tickPlacement: "on",
    axisTicks: {
      color: "#fff",
    },
    title: {
      style: {
        color: "#fff",
      },
    },
  },
  tooltip: {
    followCursor: true,
    fillSeriesColor: true,
  },
  legend: {
    labels: {
      colors: "#c8c9cc",
    },
  },
  noData: {
    text: "No data found.",
    align: "center",
    style: {
      color: "#c8c9cc",
      fontSize: "14px",
    },
  },
});
const series = toRef(props, "seriesData");
</script>

<script>
export default {
  name: "WeatherForecastChart",
};
</script>

<template>
  <div id="chart">
    <apexchart
      width="500"
      height="350"
      type="bar"
      :options="chartOptions"
      :series="series"
      class="chart"
    ></apexchart>
  </div>
</template>
