import { PREDEFINED_COLORS } from "../constants"
import { PlayerTimeManager } from "../systems/PlayerTimeManager"

// Get a random color, preferring unused ones
export function getNextAvailableColor(): string {
    const manager = PlayerTimeManager.getInstance()
    const usedColors = manager
        .getPlayers()
        .map((p) => p.backgroundColor.toLowerCase())

    const unusedColors = PREDEFINED_COLORS.filter(
        (color) => !usedColors.includes(color.toLowerCase())
    )

    const colorPool = unusedColors.length > 0 ? unusedColors : PREDEFINED_COLORS
    const randomIndex = Math.floor(Math.random() * colorPool.length)

    return colorPool[randomIndex]
}
