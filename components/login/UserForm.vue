<template>
  <CommonCard title="Login">
    <CommonInput
      v-model="email"
      label="Email"
      type="email"
      id="email"
      placeholder="Enter your email"
    />
    <CommonInput
      v-model="otp"
      label="One Time Password"
      type="text"
      id="otp"
      placeholder="Enter your OTP"
    />
    <CommonButton @click="validate" title="Login" :is-loading />
    <p v-if="error" class="text-red-900 mt-2 w-100 text-center">{{ error }}</p>
    <p class="mt-4 text-center text-sm text-gray-600">
      Don't have a one time password?
      <a href="/register" class="text-blue-500 hover:text-blue-700">Register</a>
    </p>
  </CommonCard>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const feedback = useFeedbackStore();
const otpStore = useOtpStore();

const email = ref("");
const otp = ref("");
const isLoading = ref(false);
const error = ref("");

const validate = async () => {
  if (!email.value || !otp.value) {
    error.value = "All fields are required";
    return;
  }

  error.value = "";
  isLoading.value = true;
  const response = await otpStore.validateOtp(otp.value, email.value);
  if (response?.isValid) {
    feedback.addMessage("One Time Password", "Validated", "info", 2000);
  }
  isLoading.value = false;
};
</script>
