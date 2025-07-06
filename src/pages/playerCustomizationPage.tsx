import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "../ui/components/Button"

const PlayerCustomizationPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Player Customization</h1>
            {/* Add your customization options here */}
            <Button
                onClick={() => navigate("/timerPage")}
                value="Back to Timer"
                style={{}}
            />
        </div>
    )
}

export default PlayerCustomizationPage
