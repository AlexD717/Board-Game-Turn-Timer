import "./App.css"
import { useGameLoop } from "./systems/GameLoop"
import { Routes, Route } from "react-router-dom"
import TimerPage from "./pages/timerPage"
import PlayerCustomizationPage from "./pages/playerCustomizationPage"

function App() {
    useGameLoop()

    return (
        <div className="app-container">
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<TimerPage />} />
                    <Route
                        path="/Board-Game-Turn-Timer"
                        element={<TimerPage />}
                    />
                    <Route path="/timerPage" element={<TimerPage />} />
                    <Route
                        path="/playerCustomizationPage"
                        element={<PlayerCustomizationPage />}
                    />
                </Routes>
            </div>
            <footer
                className="main-info"
                style={{
                    textAlign: "right",
                    padding: "1rem",
                    bottom: "20px",
                    right: "15vw",
                }}
            >
                <button
                    onClick={() => {
                        window.open(
                            "https://github.com/AlexD717/Board-Game-Turn-Timer",
                            "_blank"
                        )
                    }}
                    style={{ maxWidth: "15vw" }}
                >
                    View on GitHub
                </button>
                <p>Developed by: Alexey Dmitriev</p>
            </footer>
        </div>
    )
}
export default App
