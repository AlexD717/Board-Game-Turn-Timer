import "./App.css"
import { useGameLoop } from "./systems/GameLoop"
import { Routes, Route } from "react-router-dom"
import TimerPage from "./pages/timerPage"
import PlayerCustomizationPage from "./pages/playerCustomizationPage"

function App() {
    useGameLoop()

    return (
        <>
            <div>
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
            <div
                className="main-info"
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    padding: "10px 20px",
                    marginTop: "50px",
                    marginLeft: "50px",
                }}
            >
                <button
                    onClick={() => {
                        window.open(
                            "https://github.com/AlexD717/Board-Game-Turn-Timer",
                            "_blank"
                        )
                    }}
                    style={{}}
                >
                    View in GitHub
                </button>
                <p>Developed by: Alexey Dmitriev</p>
            </div>
        </>
    )
}
export default App
