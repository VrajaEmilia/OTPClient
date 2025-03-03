<template>
  <CommonCard title="Register">
    <CommonInput
      v-model="email"
      type="email"
      id="email"
      placeholder="Enter your email"
      for="email"
      label="Email"
    />
    <CommonButton title="Register" :is-loading="isLoading" @click="generate" />
    <p v-if="error" class="text-red-900 mt-2 w-100 text-center">{{ error }}</p>
    <p class="mt-4 text-center text-sm text-gray-600">
      Already registered?
      <a href="/login" class="text-blue-500 hover:text-blue-700">Login</a>
    </p>
  </CommonCard>
</template>

<script lang="ts" setup>
import { decrypt } from "~/server/api/decrypt";

const otpStore = useOtpStore();
const feedbackStore = useFeedbackStore();
const email = ref("");
const error = ref("");
const isLoading = ref(false);

const generate = async () => {
  if (!email.value) {
    error.value = "Email is required.";
    return;
  }
  error.value = "";

  try {
    isLoading.value = true;
    const otp = await otpStore.generateOtp(email.value);
    await addToastMessage(otp);
  } catch (e) {
    console.error(e);
    feedbackStore.addMessage(
      "Error",
      "Something went wrong. Please try again!",
      "error",
      5000
    );
  } finally {
    isLoading.value = false;
  }
};

const addToastMessage = async (otp: Otp) => {
  var eventStartTime = new Date();
  var eventEndTime = new Date(otp.expiresAt);
  var duration = eventEndTime.valueOf() - eventStartTime.valueOf();

  const decryptedCode = await otpStore.decryptOtp(otp.encryptedCode);
  console.log(decryptedCode);
  feedbackStore.addMessage(
    "One Time Password",
    decryptedCode,
    "info",
    duration
  );
};
</script>
