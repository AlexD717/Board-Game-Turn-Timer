import React from "react"
import Button from "./Button"
import "./TurnTimer.css"
import { PlayerTimeManager } from "../../systems/PlayerTimeManager"
import type { PlayerTime } from "../../systems/PlayerTimeManager"

const TurnTimer: React.FC<PlayerTime> = ({
    id,
    name,
    timeLeft,
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

    const style: React.CSSProperties = {
        backgroundColor,
        borderColor,
        transform: selected ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.3s ease",
        marginBottom: selected ? "36px" : "16px",
    }

    return (
        <div className="turn-timer" style={style}>
            <h2>{name}'s Turn</h2>
            <p>Time Left: {formatTime(timeLeft)}</p>
            {selected && (
                <Button
                    onClick={() =>
                        console.log(
                            PlayerTimeManager.getInstance().getPlayerById(id)
                        )
                    }
                    value="End Turn"
                />
            )}
        </div>
    )
}

export default TurnTimer
