/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";

const SECRET_KEY = "aa7e1788d53554bf7fdb289ea8d01627bd44bc9bc1b8a4320d7bb2daf5bed2b5";

export const encryptData = (data: any): string => {
    try {
        const jsonString = JSON.stringify(data);
        return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    } catch (error) {
        console.error("Encryption error:", error);
        throw new Error("Failed to encrypt payload");
    }
};
