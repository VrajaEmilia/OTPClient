<template>
  <div class="fixed bottom-4 right-4 flex flex-col gap-1">
    <div v-for="msg in messages" :key="msg.id">
      <div
        :class="[
          'p-4 rounded-lg shadow-xl border max-w-sm min-w-[300px] mb-4',
          toastStyles[msg.type].container,
        ]"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 :class="['text-lg font-semibold', toastStyles[msg.type].title]">
            {{ msg.title }}
          </h3>
          <button
            @click="removeMessage(msg.id)"
            :class="['focus:outline-none', toastStyles[msg.type].button]"
          >
            <Icon icon="mdiClose" />
          </button>
        </div>
        <p :class="['text-sm', toastStyles[msg.type].message]">
          {{ msg.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFeedbackStore } from "~/stores/feedback";

const feedbackStore = useFeedbackStore();
const messages = computed(() => feedbackStore.messages);

const removeMessage = (id: number) => {
  feedbackStore.removeMessage(id);
};

// Toast styles dictionary
const toastStyles = {
  info: {
    container: "bg-blue-100 border-blue-200",
    title: "text-blue-900",
    button: "text-blue-500 hover:text-blue-700",
    message: "text-blue-800",
  },
  error: {
    container: "bg-red-100 border-red-200",
    title: "text-red-900",
    button: "text-red-500 hover:text-red-700",
    message: "text-red-800",
  },
  warning: {
    container: "bg-yellow-100 border-yellow-200",
    title: "text-yellow-900",
    button: "text-yellow-500 hover:text-yellow-700",
    message: "text-yellow-800",
  },
};
</script>
