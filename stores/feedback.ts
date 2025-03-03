import { defineStore } from "pinia";
import { ref } from "vue";
export type MessageType = "info" | "error" | "warning";

interface Message {
  id: number;
  title: string;
  message: string;
  type: MessageType;
  duration?: number;
}

export const useFeedbackStore = defineStore("feedback", () => {
  const messages = ref<Message[]>([]);
  const nextId = ref(1);

  const addMessage = (
    title: string,
    message: string,
    type: MessageType,
    duration?: number
  ) => {
    const newMessage: Message = {
      id: nextId.value++,
      title,
      message,
      type,
      duration,
    };
    messages.value.push(newMessage);

    if (duration) {
      setTimeout(() => {
        removeMessage(newMessage.id);
      }, duration);
    }
  };

  const removeMessage = (id: number) => {
    messages.value = messages.value.filter((msg) => msg.id !== id);
  };

  return {
    messages,
    addMessage,
    removeMessage,
  };
});
