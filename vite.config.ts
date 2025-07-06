import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const port = 3000

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react()],
    server: {
        port: port,
        open: true, // Automatically open the browser
    },
    base: mode === "production" ? "/Board-Game-Turn-Timer/" : "/",
}))
