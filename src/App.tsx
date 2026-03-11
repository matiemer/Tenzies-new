import Die from "./Die.tsx"
import {useState} from "react";
import {nanoid} from "nanoid";
import ReactConfetti from "react-confetti";
import {useWindowSize} from "react-use"

export interface DieType {
    value: number
    isHeld: boolean
    id: string
}


const generateNewDice = (): DieType[] => {
    return Array.from({length: 10},
        () => ({
            value: Math.floor(Math.random() * 6 + 1),
            isHeld: false,
            id: nanoid()
        })
    )
}

export default function App() {

    const [dice, setDice] = useState<DieType[]>(() => generateNewDice())
    const {width, height} = useWindowSize()

    const holdDice = (id: string): void => {
        setDice(prevDice => prevDice.map(die => {
                return die.id === id ?
                    {...die, isHeld: !die.isHeld} : die
            })
        )
    }

    const rollDice = (): void => {
        setDice(prevDice => prevDice.map(
            die => die.isHeld ? die : {...die, value: Math.floor(Math.random() * 6 + 1)}
        ))
    }

    const gameWon = dice.every(die => die.value === dice[0].value && die.isHeld)

    const diceElements = dice.map(die => {
        return <Die
            value={die.value}
            isHeld={die.isHeld}
            // id={die.id}
            hold={() => holdDice(die.id)}
            key={die.id}
        />
    })

    return (
        <>
            {gameWon && <ReactConfetti width={width} height={height} recycle={true}/>}
            <main className="bg-gray-100 w-3/4 h-3/4 flex flex-col justify-center items-center gap-5 rounded-2xl">
                <h1 className="font-bold text-3xl">Tenzies</h1>
                <h3 className="text-lg text-center px-8">Roll until all dice are the same. Click each die to freeze it
                    at its
                    current value between rolls.</h3>
                <div className="grid grid-cols-5 grid-rows-2 gap-1">
                    {diceElements}
                </div>
                {!gameWon ?
                    <button
                        className="bg-purple-950 text-white font-medium rounded-lg px-8 py-1 tracking-wide mt-3 cursor-pointer"
                        onClick={rollDice}>
                        Roll
                    </button>
                    :
                    <button
                        className="bg-orange-800 text-white font-medium rounded-lg px-8 py-1 tracking-wide mt-3 cursor-pointer"
                        onClick={() => setDice(generateNewDice())}>
                        New Game
                    </button>
                }

            </main>
        </>
    )
}