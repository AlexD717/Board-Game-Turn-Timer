import "./App.css"
import { PlayerTimeManager } from "./systems/PlayerTimeManager"
import TurnTimer from "./ui/components/TurnTimer"
import { useGameLoop } from "./systems/GameLoop"
import type { PlayerTime } from "./systems/PlayerTimeManager"
import { useEffect, useState } from "react"
import Button from "./ui/components/Button"

function App() {
    useGameLoop()
    const started = useGameStarted()

    return (
        <>
            <h1>Turn Timer</h1>
            <div className="player-list" style={{}}>
                {usePlayerTimes().map((player) => (
                    <TurnTimer key={player.id} {...player} />
                ))}
            </div>
            <div className="controls">
                {started ? (
                    <Button
                        onClick={() =>
                            PlayerTimeManager.getInstance().setStarted(false)
                        }
                        value="Stop Timer"
                        style={{ marginTop: "50px", marginRight: "25px" }}
                    />
                ) : (
                    <Button
                        onClick={() =>
                            PlayerTimeManager.getInstance().setStarted(true)
                        }
                        value="Start Timer"
                        style={{ marginTop: "50px", marginRight: "25px" }}
                    />
                )}

                <Button
                    onClick={() =>
                        PlayerTimeManager.getInstance().nextPlayer(0)
                    }
                    value="Customize Players"
                    style={{}}
                />
            </div>
            <div
                className="main-info"
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 10,
                    padding: "10px 20px",
                }}
            >
                <Button
                    onClick={() => {
                        window.open(
                            "https://github.com/AlexD717/Board-Game-Turn-Timer",
                            "_blank"
                        )
                    }}
                    value="View in GitHub"
                    style={{}}
                />
                <p>Developed by: Alexey Dmitriev</p>
            </div>
        </>
    )
}
export default App

function useGameStarted(): boolean {
    const manager = PlayerTimeManager.getInstance()
    const [started, setStarted] = useState<boolean>(manager.getTimeGoing())

    useEffect(() => {
        const update = () => setStarted(manager.getTimeGoing())
        manager.subscribe(update)
        return () => manager.unsubscribe(update)
    }, [manager])

    return started
}

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

    const selectedIndex = players.findIndex((p) => p.selected)

    const rotatedPlayers =
        selectedIndex === -1
            ? players
            : [
                  ...players.slice(selectedIndex),
                  ...players.slice(0, selectedIndex),
              ]

    return rotatedPlayers
}
