import { useNavigate } from "react-router-dom"
import Button from "../ui/components/Button"
import { useMemo, useState } from "react"
import { PlayerTimeManager } from "../systems/PlayerTimeManager"
import "./playerCustomizationPage.css"

function customizePlayer(playerId: number) {
    console.log(`Customize player ${playerId}`)
}

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
        console.log(`Name changed to: ${event.target.value}`)
    }

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value)
        console.log(`Color changed to: ${event.target.value}`)
    }

    return (
        <Button
            value={
                <div className="player-customization-card">
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
            }
            onClick={() => customizePlayer(id)}
            style={{
                border: "1px solid",
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                minWidth: "60vw",
            }}
        />
    )
}

const PlayerCustomizationPage = () => {
    const navigate = useNavigate()

    const playerConfigurationElements = useMemo(() => {
        const players = PlayerTimeManager.getInstance().getPlayers()

        return players.map((player) => (
            <div
                style={{ marginBottom: "20px", marginTop: "20px" }}
                key={player.id}
            >
                <PlayerCustomizationCard
                    id={player.id}
                    initialName={player.name}
                    backgroundColor={player.backgroundColor}
                    borderColor={player.borderColor}
                />
            </div>
        ))
    }, [])

    return (
        <div>
            <h1>Player Customization</h1>
            {/* Add your customization options here */}
            <Button
                onClick={() => navigate("/timerPage")}
                value="Back to Timer"
                style={{}}
            />
            {playerConfigurationElements}
        </div>
    )
}

export default PlayerCustomizationPage
