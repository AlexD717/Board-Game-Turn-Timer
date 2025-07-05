export interface PlayerTime {
    id: number
    name: string
    timeLeft: number
    backgroundColor: string
    borderColor: string
    selected: boolean
}

export class PlayerTimeManager {
    private players: PlayerTime[] = []

    private static instance: PlayerTimeManager

    private constructor() {
        this.players = [
            {
                id: 0,
                name: "Player 1",
                timeLeft: 30,
                backgroundColor: "#000055",
                borderColor: "#0000ff",
                selected: true,
            },
            {
                id: 1,
                name: "Player 2",
                timeLeft: 30,
                backgroundColor: "#005500",
                borderColor: "#00ff00",
                selected: false,
            },
            {
                id: 2,
                name: "Player 3",
                timeLeft: 30,
                backgroundColor: "#550000",
                borderColor: "#ff0000",
                selected: false,
            },
        ]
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

    updateTime(playerId: number, timeLeft: number) {
        const player = this.players.find((p) => p.id === playerId)
        if (player) {
            player.timeLeft = timeLeft
        }
    }

    getPlayers() {
        return this.players
    }

    getPlayerById(playerId: number): PlayerTime | undefined {
        return this.players.find((p) => p.id === playerId)
    }
}
