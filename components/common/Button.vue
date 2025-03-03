<template>
  <button
    class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
    :disabled="isLoading"
    @click="emit('click')"
  >
    <CommonSpinner v-if="isLoading" />
    <template v-else> {{ title }} </template>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  isLoading?: boolean;
}

defineProps<Props>();
const emit = defineEmits(["click"]);
</script>
