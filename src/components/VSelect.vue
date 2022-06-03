<template>
  <div>
    <label :for="id" v-if="label">{{ label }}</label>
    <div class="relative w-64">
      <select
        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :id="id"
      >
        <slot></slot>
        <!-- <option v-for="variable of variables" :key="variable" :value="variable">{{variable}}</option> -->
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
defineEmits(["update:modelValue"]);

const id = ref(null);

defineProps({
  modelValue: String,
  label: String,
});

onMounted(() => {
  id.value = getCurrentInstance().uid;
});
</script>

<style></style>
