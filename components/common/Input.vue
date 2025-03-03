<template>
  <div class="mb-6">
    <label :for class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <input
      v-model="text"
      :type
      :id
      :placeholder
      class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  label: string;
  for?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  placeholder?: string;
}

defineProps<Props>();
const text = defineModel();
</script>
