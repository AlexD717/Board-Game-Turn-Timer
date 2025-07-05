import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const port = 3000
const base = "/Board-Game-Turn-Timer/"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: port,
        open: true, // Automatically open the browser
    },
    base: base,
})
