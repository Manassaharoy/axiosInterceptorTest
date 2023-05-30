// const CryptoJS = require("crypto-js");
import { AES, enc, pad, mode } from "crypto-js"
// Define the encryption key and IV
const keyString = "thisIsAverySpecialSecretKey00000";
const IV = "1583288699248111";

// Convert the key and IV to CryptoJS format
const key = enc.Utf8.parse(keyString);
const iv = enc.Utf8.parse(IV);

// Decryption function
function decryptData(encryptedBase64) {
  // Convert the encrypted data from a Base64-encoded string to CryptoJS format
  const encryptedData = enc.Base64.parse(encryptedBase64);

  // Decrypt the request body using AES decryption
  const decrypted = AES.decrypt({ ciphertext: encryptedData }, key, {
    iv: iv,
    padding: pad.Pkcs7,
    mode: mode.CBC,
  });

  // Convert the decrypted data to a string and parse it as JSON
  const decryptedBody = decrypted.toString(enc.Utf8);

  return decryptedBody;
}

export default decryptData;