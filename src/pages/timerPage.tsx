import { PlayerTimeManager } from "../systems/PlayerTimeManager"
import TurnTimer from "../ui/components/TurnTimer"
import type { PlayerTime } from "../systems/PlayerTimeManager"
import Button from "../ui/components/Button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function TimerPage() {
    const navigate = useNavigate()

    const started = useGameStarted()

    return (
        <>
            <h1>Turn Timer</h1>
            <div className="controls">
                {started ? (
                    <Button
                        onClick={() =>
                            PlayerTimeManager.getInstance().setStarted(false)
                        }
                        value="Stop Timer"
                        style={{ marginTop: "10px", marginRight: "25px" }}
                    />
                ) : (
                    <Button
                        onClick={() =>
                            PlayerTimeManager.getInstance().setStarted(true)
                        }
                        value="Start Timer"
                        style={{ marginTop: "10px", marginRight: "25px" }}
                    />
                )}

                <Button
                    onClick={() => {
                        PlayerTimeManager.getInstance().setStarted(false)
                        navigate("/playerCustomizationPage")
                    }}
                    value="Customize Players"
                    style={{ marginBottom: "50px" }}
                />
            </div>
            <div className="player-list" style={{}}>
                {usePlayerTimes().map((player) => (
                    <TurnTimer key={player.id} {...player} />
                ))}
            </div>
        </>
    )
}
export default TimerPage

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
