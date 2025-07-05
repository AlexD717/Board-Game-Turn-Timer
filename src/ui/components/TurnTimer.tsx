import React from "react"
import Button from "./Button"
import "./TurnTimer.css"
import { PlayerTimeManager } from "../../systems/PlayerTimeManager"

export interface TurnTimerProps {
    name: string
    timeLeft: number
    backgroundColor: string
    borderColor: string
    selected: boolean
}

const TurnTimer: React.FC<TurnTimerProps> = ({
    name,
    timeLeft,
    backgroundColor,
    borderColor,
    selected,
}) => {
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
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
                    onClick={() => PlayerTimeManager.getInstance().endTurn()}
                    value="End Turn"
                />
            )}
        </div>
    )
}

export default TurnTimer
