import { useEffect, useRef } from "react"
import { PlayerTimeManager } from "./PlayerTimeManager"

export const useGameLoop = () => {
    const lastTimeRef = useRef(performance.now())
    const manager = PlayerTimeManager.getInstance()

    useEffect(() => {
        const loop = (currentTime: number) => {
            const lastTime = lastTimeRef.current
            const deltaTime = (currentTime - lastTime) / 1000 // Convert to seconds
            lastTimeRef.current = currentTime

            manager.update(deltaTime)

            requestAnimationFrame(loop)
        }

        requestAnimationFrame(loop)
    }, [])
}
