import { createDecipheriv } from "node:crypto";
import { useRuntimeConfig } from "#imports"; // Use Nuxt's auto-import for runtimeConfig

async function decryptAES(encryptedBase64: string): Promise<string> {
  const config = useRuntimeConfig();
  const secretKey = Buffer.from(config.secretKey, "utf-8");
  const encryptedData = Buffer.from(encryptedBase64, "base64");

  const iv = secretKey.subarray(0, 16);
  const data = encryptedData.subarray(16);
  const decipher = createDecipheriv("aes-256-cbc", secretKey, iv);

  let decrypted = decipher.update(data);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString("utf-8");
}

export default defineEventHandler(async (event) => {
  const { encryptedData } = await readBody(event);
  const decrypted = await decryptAES(encryptedData);
  return { decrypted };
});
