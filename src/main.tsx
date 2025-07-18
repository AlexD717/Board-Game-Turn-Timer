import { BrowserRouter } from "react-router-dom"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

const base =
    import.meta.env.MODE === "production" ? "/Board-Game-Turn-Timer/" : "/"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter basename={base}>
            <App />
        </BrowserRouter>
    </StrictMode>
)
