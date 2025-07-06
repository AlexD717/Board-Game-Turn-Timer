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
                backgroundColor: "#000055",
                borderColor: "#0000ff",
                selected: false,
            },
            {
                id: 1,
                name: "Player 2",
                timeSpent: 0,
                backgroundColor: "#005500",
                borderColor: "#00ff00",
                selected: false,
            },
            {
                id: 2,
                name: "Player 3",
                timeSpent: 0,
                backgroundColor: "#550000",
                borderColor: "#ff0000",
                selected: false,
            },
        ]
        this.setSelectedPlayer(0) // Set the first player as selected by default
    }

    static getInstance(): PlayerTimeManager {
        PlayerTimeManager.instance ??= new PlayerTimeManager()
        return PlayerTimeManager.instance
    }

    addPlayer(player: PlayerTime) {
        if (this.players.some((p) => p.id === player.id)) {
            throw new Error(`Player with id ${player.id} already exists`)
        }
        this.players.push(player)
    }

    removePlayer(playerId: number) {
        this.players = this.players.filter((p) => p.id !== playerId)
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

    nextPlayer(playerId: number) {
        if (!this.started) {
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
