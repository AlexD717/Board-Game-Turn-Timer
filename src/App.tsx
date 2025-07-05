import "./App.css"
import { PlayerTimeManager } from "./systems/PlayerTimeManager"
import TurnTimer from "./ui/components/TurnTimer"
import { useGameLoop } from "./systems/GameLoop"
import type { PlayerTime } from "./systems/PlayerTimeManager"
import { useEffect, useState } from "react"

function App() {
    useGameLoop()

    return (
        <>
            <h1>Turn Timer</h1>
            {usePlayerTimes().map((player) => (
                <TurnTimer key={player.id} {...player} />
            ))}
            <div className="card">
                <p>Developed by: Alexey Dmitriev</p>
            </div>
        </>
    )
}
export default App

function usePlayerTimes(): PlayerTime[] {
    const manager = PlayerTimeManager.getInstance()
    const [players, setPlayers] = useState<PlayerTime[]>(manager.getPlayers())

    useEffect(() => {
        const update = () => {
            setPlayers([...manager.getPlayers()]) // force shallow update
        }

        manager.subscribe(update)
        return () => manager.unsubscribe(update)
    }, [manager])

    return players
}
