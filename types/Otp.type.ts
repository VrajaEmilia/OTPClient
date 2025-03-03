export type Otp = {
  encryptedCode: string;
  expiresAt: string;
};

export type ValidateOtpResponse = {
  isValid: boolean;
  message: string;
};
