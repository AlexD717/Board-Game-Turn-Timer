import "./App.css"
import { useGameLoop } from "./systems/GameLoop"
import { Routes, Route } from "react-router-dom"
import TimerPage from "./pages/timerPage"
import PlayerCustomizationPage from "./pages/playerCustomizationPage"

function App() {
    useGameLoop()

    return (
        <div>
            <Routes>
                <Route path="/" element={<TimerPage />} />
                <Route path="/timerPage" element={<TimerPage />} />
                <Route
                    path="/playerCustomizationPage"
                    element={<PlayerCustomizationPage />}
                />
            </Routes>
        </div>
    )
}
export default App
