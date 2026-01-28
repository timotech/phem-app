// lib/config.js
const getApiUrl = () => {
  // Fallback to NODE_ENV
  return process.env.NODE_ENV === "production"
    ? "https://preview.timotech.com.ng/api"
    : "http://localhost:3000/api";
  //return "/api";
};

export const API_URL = getApiUrl();
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
