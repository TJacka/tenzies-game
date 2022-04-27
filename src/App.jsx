import React, { useEffect } from "react";
import Die from "./Die"
import { nanoid } from 'nanoid'


export default function App() {
    
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
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
            die :
            generateNewDie()
        }))
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
            {...die, isHeld: !die.isHeld} : 
                die
        }))
    }

    // function buttonText() {
    //     if (tenzies) {
    //         button.innerText = "New Game";
    //         <Confetti />;
    //     } else if (tenzies === false) {
    //         button.innerText = "Roll"
    //     }
    // }

    React.useEffect(() => {
        if (dice.every(die => die.isHeld) && dice.every(die => die.value)) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    ))
    
    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. <br />Click each die to freeze it at its current value between rolls.</p>
            <div className="container" >
                {diceElements}
            </div>
            <button 
                onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}