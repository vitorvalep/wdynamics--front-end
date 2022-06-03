<script setup>
import { ref, onMounted, computed } from "vue";
import VSelect from "@/components/VSelect.vue";
import exportFromJSON from "export-from-json";

const selectedX1 = ref("");
const selectedY1 = ref("");

const selectedX2 = ref("");
const selectedY2 = ref("");

const selectedX3 = ref("");
const selectedY3 = ref("");

const selectedX4 = ref("");
const selectedY4 = ref("");

const variables = ref([]);

const props = defineProps({
  resultData: String,
});

const resultDataParsed = computed(() => {
  if (props.resultData) {
    return JSON.parse(props.resultData);
  } else {
    return [];
  }
});

const serie1 = computed(() => formatSerie(selectedX1.value, selectedY1.value));
const serie2 = computed(() => formatSerie(selectedX2.value, selectedY2.value));
const serie3 = computed(() => formatSerie(selectedX3.value, selectedY3.value));
const serie4 = computed(() => formatSerie(selectedX4.value, selectedY4.value));

const chartOptions = ref({
  chart: {
    zoom: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  //   xaxis: {
  //     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  //   },
});

function getVariablesKeys() {
  variables.value = Object.keys(resultDataParsed.value[0]);
}

function donwloadCsv() {
  const fileName = "download";
  const exportType = exportFromJSON.types.csv;

  exportFromJSON({ data: resultDataParsed.value, fileName, exportType });
}

function formatSerie(xKey, yKey) {
  const formattedSerie = [];
  const formattedSerieData = [];

  resultDataParsed.value.forEach((data) => {
    let x;
    let y;

    if (typeof data[xKey] == "string") {
      x = data[xKey].replace(",", ".");
    } else {
      x = data[xKey];
    }

    if (typeof data[yKey] == "string") {
      y = data[yKey].replace(",", ".");
    } else {
      y = data[yKey];
    }
    formattedSerieData.push([x, y]);
  });

  formattedSerie.push({
    name: yKey,
    data: formattedSerieData,
  });

  return formattedSerie;
}

onMounted(() => {
  getVariablesKeys();
});

//mountSerie(name, xData, yData, xAxisCategory) {},
</script>

<template>
  <div class="bg-purple-100 p-6">
    <button
      class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded flex gap-2 mb-2"
      @click="donwloadCsv"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      <span>Baixar arquivo CSV</span>
    </button>
    <div class="grid grid-cols-2 h-full gap-6">
      <div class="p-6 bg-white rounded-lg border border-gray-200">
        <div class="flex flex-row gap-2">
          <VSelect v-model="selectedX1" label="Eixo X">
            <option
              v-for="variable of variables"
              :key="variable"
              :value="variable"
            >
              {{ variable }}
            </option>
          </VSelect>
          <VSelect v-model="selectedY1" label="Eixo Y">
            <option
              v-for="variable of variables"
              :key="variable"
              :value="variable"
            >
              {{ variable }}
            </option>
          </VSelect>
        </div>

        <apexchart
          width="100%"
          height="350"
          type="line"
          :options="chartOptions"
          :series="serie1"
        ></apexchart>
      </div>
      <div class="p-6 bg-white rounded-lg border border-gray-200">
        <div class="flex flex-row gap-2">
          <VSelect v-model="selectedX2" label="Eixo X">
            <option
              v-for="variable of variables"
              :key="variable"
              :value="variable"
            >
              {{ variable }}
            </option>
          </VSelect>
          <VSelect v-model="selectedY2" label="Eixo Y">
            <option
              v-for="variable of variables"
              :key="variable"
              :value="variable"
            >
              {{ variable }}
            </option>
          </VSelect>
        </div>

        <apexchart
          width="100%"
          height="350"
          type="line"
          :options="chartOptions"
          :series="serie2"
        ></apexchart>
      </div>
      <div class="p-6 bg-white rounded-lg border border-gray-200">
        <div class="flex flex-row gap-2">
          <VSelect v-model="selectedX3" label="Eixo X">
            <option
              v-for="variable of variables"
              :key="variable"
              :value="variable"
            >
              {{ variable }}
            </option>
          </VSelect>
          <VSelect v-model="selectedY3" label="Eixo Y">
            <option
              v-for="variable of variables"
              :key="variable"
              :value="variable"
            >
              {{ variable }}
            </option>
          </VSelect>
        </div>

        <apexchart
          width="100%"
          height="350"
          type="line"
          :options="chartOptions"
          :series="serie3"
        ></apexchart>
      </div>
      <div class="p-6 bg-white rounded-lg border border-gray-200">
        <div class="flex flex-row gap-2">
          <VSelect v-model="selectedX4" label="Eixo X">
            <option
              v-for="variable of variables"
              :key="variable"
              :value="variable"
            >
              {{ variable }}
            </option>
          </VSelect>
          <VSelect v-model="selectedY4" label="Eixo Y">
            <option
              v-for="variable of variables"
              :key="variable"
              :value="variable"
            >
              {{ variable }}
            </option>
          </VSelect>
        </div>

        <apexchart
          width="100%"
          height="350"
          type="line"
          :options="chartOptions"
          :series="serie4"
        ></apexchart>
      </div>
    </div>
  </div>
</template>
