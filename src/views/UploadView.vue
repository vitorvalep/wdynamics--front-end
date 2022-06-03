<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const checkReqStatusSocket = new WebSocket(
  //"ws://8.tcp.ngrok.io:18616/ws/check-request-status"
  "ws://localhost:1880/ws/check-request-status"
);

const dragOn = ref(false);
const file = ref(null);
const processing = ref(false);

function handleUploadFile(event) {
  file.value = event.target.files[0];
}

async function submitFile() {
  processing.value = true;
  let formData = new FormData();
  formData.append("file", file.value);
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(
      //"http://8.tcp.ngrok.io:18616/files",
      "http://localhost:1880/files",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    checkReqStatusSocket.send(response.data.requestId);
  } catch (error) {
    console.error(error);
  }
}

checkReqStatusSocket.onmessage = (event) => {
  router.push({
    name: "graphs",
    params: { resultData: event.data },
  });
};
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div
      v-if="!file"
      :class="[
        'mb-3 h-20 w-4/6 flex justify-center flex-col border-dashed border-2 border-indigo-600 relative',
        dragOn ? 'bg-indigo-600' : '',
      ]"
    >
      <label
        for="formFileLg"
        class="form-label inline-block mb-2 text-gray-700 flex justify-center"
      >
        Insira seu arquivo aqui
      </label>
      <input
        class="absolute inset-0 opacity-0 h-full w-full"
        id="formFileLg"
        type="file"
        ref="fileUploader"
        @dragover="dragOn = true"
        @dragleave="dragOn = false"
        @drop="dragOn = false"
        @change="handleUploadFile"
      />
    </div>
    <div
      v-else
      class="mb-3 w-4/6 flex justify-center items-center flex-col border-dashed border-2 border-indigo-600 relative p-2"
    >
      <div v-if="!processing">
        <div class="mb-2 flex justify-center items-center">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>{{ file.name }}</span>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          @click.prevent="submitFile"
        >
          Enviar arquivo
        </button>
      </div>
      <div v-else class="flex flex-col items-center gap-2">
        <svg
          role="status"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span>Processando arquivo...</span>
      </div>
    </div>
  </div>
</template>
