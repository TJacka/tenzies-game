import Die from "./Die"

export default function App() {
    return (
        <main>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. <br />Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                <Die value="1" />
                <Die value="1" />
                <Die value="2" />
                <Die value="2" />
                <Die value="3" />
                <Die value="3" />
                <Die value="4" />
                <Die value="5" />
                <Die value="6" />
                <Die value="6" />
            </div>
            <button>
                Roll
            </button>
        </main>
    )
}