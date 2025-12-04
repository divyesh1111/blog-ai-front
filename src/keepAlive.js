// Replace with your backend URL
const BACKEND_URL = "https://blog-ai-backend.onrender.com/api";

export function startKeepAlive() {
    // Ping immediately once so server wakes
    fetch(BACKEND_URL + "/ping").catch(() => { });

    // Ping every 10 minutes
    setInterval(() => {
        fetch(BACKEND_URL + "/ping").catch(() => { });
    }, 870000); // 600000 ms = 10 minutes
}
