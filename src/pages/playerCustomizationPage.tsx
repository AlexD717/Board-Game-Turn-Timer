import { useNavigate } from "react-router-dom"
import Button from "../ui/components/Button"
import { useEffect, useState } from "react"
import { PlayerTimeManager } from "../systems/PlayerTimeManager"
import tinyColor from "tinycolor2"
import "./playerCustomizationPage.css"

interface PlayerCustomizationPageProps {
    id: number
    initialName: string
    backgroundColor: string
    borderColor: string
}

const PlayerCustomizationCard: React.FC<PlayerCustomizationPageProps> = ({
    id,
    initialName: initialName,
    backgroundColor,
    borderColor,
}) => {
    const [name, setName] = useState(initialName)
    const [color, setColor] = useState(backgroundColor)

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        PlayerTimeManager.getInstance().updatePlayer(id, {
            name: event.target.value,
        })
        console.log(`Name changed to: ${event.target.value}`)
    }

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value)
        PlayerTimeManager.getInstance().updatePlayer(id, {
            backgroundColor: event.target.value,
            borderColor: tinyColor(event.target.value)
                .brighten(40)
                .toHexString(),
        })
        console.log(`Color changed to: ${event.target.value}`)
    }

    return (
        <div className="player-customization-card-container">
            <div
                className="player-customization-card"
                style={{
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                }}
            >
                <div className="form-group">
                    <label htmlFor="player-name">Name:</label>
                    <input
                        id="player-name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="player-color">Color:</label>
                    <input
                        id="player-color"
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </div>
            </div>
            <button
                onClick={() => PlayerTimeManager.getInstance().removePlayer(id)}
                className="remove-player-button"
            >
                Remove Player
            </button>
        </div>
    )
}

const PlayerCustomizationPage = () => {
    const navigate = useNavigate()

    const [players, setPlayers] = useState(
        PlayerTimeManager.getInstance().getPlayers()
    )

    useEffect(() => {
        const manager = PlayerTimeManager.getInstance()

        const updatePlayers = () => {
            setPlayers([...manager.getPlayers()])
        }

        // Subscribe to updates
        manager.subscribe(updatePlayers)
        updatePlayers() // initial load

        return () => {
            manager.unsubscribe(updatePlayers)
        }
    }, [])

    return (
        <div>
            <h1>Player Customization</h1>
            {/* Add your customization options here */}
            <Button
                onClick={() => navigate("/timerPage")}
                value="Back to Timer"
                style={{ marginBottom: "16px" }}
            />
            {players.map((player) => (
                <PlayerCustomizationCard
                    key={player.id}
                    id={player.id}
                    initialName={player.name}
                    backgroundColor={player.backgroundColor}
                    borderColor={player.borderColor}
                />
            ))}
        </div>
    )
}

export default PlayerCustomizationPage
