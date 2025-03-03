<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-500 text-white p-4">
      <h1 class="text-2xl font-bold">My Otp App</h1>
    </header>

    <main class="p-4 flex-1 bg-gray-200">
      <slot />
      <CommonToast />
    </main>
  </div>
</template>
