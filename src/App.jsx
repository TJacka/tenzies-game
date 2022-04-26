import React from "react";
import Die from "./Die"
import { nanoid } from 'nanoid'

export default function App() {
    
    const [dice, setDice] = React.useState(allNewDice());

    function allNewDice() {
        let array = [];
        for (let i = 1; i < 11; i++) {
            array.push({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false, 
                id: nanoid()
            });
        }
        return array;
    }

    function rollDice() {
        setDice(allNewDice())
    }

    function holdDice() {
        
    }

    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} />
    ))
    
    return (
        <main>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. <br />Click each die to freeze it at its current value between rolls.</p>
            <div className="container" >
                {diceElements}
            </div>
            <button onClick={rollDice}>
                Roll
            </button>
        </main>
    )
}