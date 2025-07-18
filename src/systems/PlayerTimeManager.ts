import tinycolor from "tinycolor2"
import { getNextAvailableNumber } from "../utilities/mathUtils"
import { getNextAvailableColor } from "../utilities/colorUtils"

export interface PlayerTime {
    id: number
    name: string
    timeSpent: number
    backgroundColor: string
    borderColor: string
    selected: boolean
}

export class PlayerTimeManager {
    private players: PlayerTime[] = []
    private selectedPlayer: PlayerTime | null = null

    private started: boolean = false

    private static instance: PlayerTimeManager

    private constructor() {
        this.players = [
            {
                id: 0,
                name: "Player 1",
                timeSpent: 0,
                backgroundColor: "#000088",
                borderColor: tinycolor("#000055").brighten(40).toHexString(),
                selected: false,
            },
            {
                id: 1,
                name: "Player 2",
                timeSpent: 0,
                backgroundColor: "#008800",
                borderColor: tinycolor("#005500").brighten(40).toHexString(),
                selected: false,
            },
            {
                id: 2,
                name: "Player 3",
                timeSpent: 0,
                backgroundColor: "#880000",
                borderColor: tinycolor("#550000").brighten(40).toHexString(),
                selected: false,
            },
        ]
        this.setSelectedPlayer(0) // Set the first player as selected by default
    }

    static getInstance(): PlayerTimeManager {
        PlayerTimeManager.instance ??= new PlayerTimeManager()
        return PlayerTimeManager.instance
    }

    addPlayer() {
        const newPlayerId = getNextAvailableNumber(
            this.players.map((p) => p.id)
        )
        const newPlayerColor = getNextAvailableColor()
        const isSelected = this.players.length === 0 ? true : false

        const newPlayer = {
            id: newPlayerId,
            name: `Player ${newPlayerId + 1}`,
            timeSpent: 0,
            backgroundColor: newPlayerColor,
            borderColor: tinycolor(newPlayerColor).brighten(40).toHexString(),
            selected: isSelected,
        }
        this.players.push(newPlayer)
        if (isSelected) this.selectedPlayer = newPlayer
        this.notify()
    }

    removePlayer(playerId: number) {
        if (this.selectedPlayer?.id === playerId) {
            this.nextPlayer(playerId, true)
        }

        this.players = this.players.filter((p) => p.id !== playerId)
        this.notify()
    }

    updatePlayer(playerId: number, updatedData: Partial<PlayerTime>) {
        const player = this.getPlayerById(playerId)
        if (!player) {
            throw new Error(`Player with id ${playerId} does not exist`)
        }

        Object.assign(player, updatedData)
        this.notify()
    }

    setSelectedPlayer(playerId: number) {
        this.players.forEach((p) => {
            p.selected = p.id === playerId
        })
        this.selectedPlayer = this.getPlayerById(playerId) || null
    }

    update(deltaTime: number) {
        if (!this.started) {
            return
        }

        if (this.selectedPlayer) {
            this.selectedPlayer.timeSpent += deltaTime
            this.notify()
        }
    }

    setStarted(started: boolean) {
        this.started = started
        this.notify()
    }

    getTimeGoing(): boolean {
        return this.started
    }

    nextPlayer(playerId: number, override: boolean = false) {
        if (!this.started && !override) {
            console.log("Game has not started yet")
            return
        }

        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i]
            if (player.id === playerId) {
                const nextIndex = (i + 1) % this.players.length
                this.setSelectedPlayer(this.players[nextIndex].id)
                return
            }
        }
    }

    getPlayers() {
        return this.players
    }

    getPlayerById(playerId: number): PlayerTime | undefined {
        return this.players.find((p) => p.id === playerId)
    }

    private subscribers: (() => void)[] = []

    subscribe(callback: () => void) {
        this.subscribers.push(callback)
    }

    unsubscribe(callback: () => void) {
        this.subscribers = this.subscribers.filter((cb) => cb !== callback)
    }

    private notify() {
        this.subscribers.forEach((cb) => cb())
    }
}
