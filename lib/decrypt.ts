/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";

const SECRET_KEY = "aa7e1788d53554bf7fdb289ea8d01627bd44bc9bc1b8a4320d7bb2daf5bed2b5";

export const decryptData = (cipherText: string): any => {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedText) {
            throw new Error("Invalid or corrupted cipher text");
        }

        return JSON.parse(decryptedText);
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
};