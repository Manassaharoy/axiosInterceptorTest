import { AES, enc, pad, mode } from "crypto-js"
// Define the encryption key and IV
const keyString = "thisIsAverySpecialSecretKey00000";
const IV = "1583288699248111";

// Convert the key and IV to CryptoJS format
const key = enc.Utf8.parse(keyString);
const iv = enc.Utf8.parse(IV);

// Encryption function
const encryptData = (data) => {
  //   console.log("data ----- ", data);
  const response = JSON.stringify(data);

  // Encrypt the request body using AES encryption
  const encrypted = AES.encrypt(response, key, {
    iv: iv,
    padding: pad.Pkcs7,
    mode: mode.CBC,
  });

  // Convert the encrypted data to a Base64-encoded string
  const encryptedBase64 = encrypted.ciphertext.toString(enc.Base64);
  //   console.log("encryptedBase64 ----- ", encryptedBase64);
  return encryptedBase64;
};

// export default encryptData;
export default encryptData;