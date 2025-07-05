import "./App.css"
import TurnTimer from "./ui/components/TurnTimer"

function App() {
    return (
        <>
            <h1>Turn Timer</h1>
            <div className="card">
                <TurnTimer
                    name="Player 1"
                    timeLeft={30}
                    backgroundColor="#000055"
                    borderColor="#0000ff"
                    selected={true}
                />
                <TurnTimer
                    name="Player 2"
                    timeLeft={30}
                    backgroundColor="#005500"
                    borderColor="#00ff00"
                    selected={false}
                />
                <TurnTimer
                    name="Player 3"
                    timeLeft={30}
                    backgroundColor="#550000"
                    borderColor="#ff0000"
                    selected={false}
                />

                <p>Developed by: Alexey Dmitriev</p>
            </div>
        </>
    )
}

export default App
