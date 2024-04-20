import CryptoJS from 'crypto-js';

const decrypt = (
  encryptedString: string,
  secretKey: string,
  active = true,
): string => {
  if (!active) return encryptedString;
  return CryptoJS.AES.decrypt(encryptedString, secretKey).toString(
    CryptoJS.enc.Utf8,
  );
};

export { decrypt };
