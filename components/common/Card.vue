<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 v-if="title" class="text-2xl font-bold mb-6 text-center">
      {{ title }}
    </h2>
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
}
defineProps<Props>();
</script>
