import { defineStore } from "pinia";
import { useApi, useServerApi } from "~/composables/useApi";
import { useFeedbackStore } from "./feedback";
import { type AxiosError } from "axios";
import type { Otp, ValidateOtpResponse } from "~/types/Otp.type";

export const useOtpStore = defineStore("otp", () => {
  const { post } = useApi();
  const serverApi = useServerApi();
  const feedbackStore = useFeedbackStore();

  const generateOtp = async (email: string) => {
    try {
      return await post<Otp>("/otp/generate", { email });
    } catch (err: any | AxiosError) {
      feedbackStore.addMessage(
        "Error",
        err.response?.data?.message ??
          "Something went wrong while generating the otp! Please try again",
        "error",
        4000
      );
    }
  };

  const validateOtp = async (code: string, email: string) => {
    try {
      return await post<ValidateOtpResponse>("/otp/validate", { code, email });
    } catch (err: any | AxiosError) {
      feedbackStore.addMessage(
        "Error",
        err.response?.data?.message ??
          "Something went wrong while validating the otp! Please try again",
        "error",
        4000
      );
    }
  };

  const decryptOtp = async (encryptedData: string) => {
    try {
      const response = await serverApi.post("/api/decrypt", {
        encryptedData,
      });
      return response.data.decrypted;
    } catch (err: any | AxiosError) {
      feedbackStore.addMessage(
        "Error",
        err.response?.data?.message ??
          "Something went wrong while decrypting the otp! Please try again",
        "error",
        4000
      );
    }
  };

  return {
    decryptOtp,
    validateOtp,
    generateOtp,
  };
});
