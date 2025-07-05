import "./App.css"
import { PlayerTimeManager } from "./systems/PlayerTimeManager"
import TurnTimer from "./ui/components/TurnTimer"

function App() {
    return (
        <>
            <h1>Turn Timer</h1>
            {PlayerTimeManager.getInstance()
                .getPlayers()
                .map((player) => (
                    <TurnTimer key={player.id} {...player} />
                ))}
            <div className="card">
                <p>Developed by: Alexey Dmitriev</p>
            </div>
        </>
    )
}
export default App
