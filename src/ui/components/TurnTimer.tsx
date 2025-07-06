import React from "react"
import "./TurnTimer.css"
import { PlayerTimeManager } from "../../systems/PlayerTimeManager"
import type { PlayerTime } from "../../systems/PlayerTimeManager"

const TurnTimer: React.FC<PlayerTime> = ({
    id,
    name,
    timeSpent,
    backgroundColor,
    borderColor,
    selected,
}) => {
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        let secs = seconds % 60
        let displaySecs
        if (minutes <= 0) {
            displaySecs = secs.toFixed(2)
            return displaySecs
        }
        displaySecs =
            Math.round(secs) < 10 ? `0${secs.toFixed(0)}` : secs.toFixed(0)
        return `${minutes}:${displaySecs}`
    }

    function NextPlayer() {
        const manager = PlayerTimeManager.getInstance()
        if (!manager.getPlayerById(id)?.selected) {
            console.log(`Player with id ${id} is not selected`)
            return
        }
        manager.nextPlayer(id)
    }

    const style: React.CSSProperties = {
        backgroundColor,
        borderColor,
        transform: selected ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.3s ease",
        marginBottom: selected ? "36px" : "16px",
    }

    return (
        <button
            className="turn-timer"
            style={style}
            onClick={() => {
                NextPlayer()
            }}
            disabled={
                !PlayerTimeManager.getInstance().getPlayerById(id)?.selected
            }
        >
            <h2>{name}'s Turn</h2>
            <p>Time Spent: {formatTime(timeSpent)}</p>
        </button>
    )
}

export default TurnTimer
