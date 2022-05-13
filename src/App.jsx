import React, { useEffect } from "react";
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

export default function App() {
    
    const [rollNumber, setRollNumber] = React.useState(0);
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        let array = [];
        for (let i = 1; i < 11; i++) {
            array.push(generateNewDie());
        }
        return array;
    }

    function rollDice(id) {
        if (!tenzies) {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
            die :
            generateNewDie()
            }));
            setRollNumber(rollNumber + 1);
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRollNumber(rollNumber == 0); 
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
            {...die, isHeld: !die.isHeld} : 
                die
        }))
    }

    React.useEffect(() => {
        if (dice.every(die => die.isHeld) && dice.every(die => die.value)) {
            setTenzies(true)
        }
    }, [dice])

    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. <br />Click each die to freeze it at its current value between rolls.</p>
            <div className="container" >
                {diceElements}
            </div>
            <button 
                onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
            <h3 class="rollnumber">Roll Number: {rollNumber ? rollNumber : "0"}</h3>
        </main>
    )
}