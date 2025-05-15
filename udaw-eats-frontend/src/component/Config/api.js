import axios from "axios";

// In Docker environment, we use the relative path because nginx handles the proxy
export const API_BASE_URL = "/";

// For local development without Docker, uncomment this line:
// export const API_BASE_URL = "http://localhost:8080/";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});