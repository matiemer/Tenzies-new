### index.html ###
```<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./src/index.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    <title>tenzies-game</title>
  </head>
  <body class="bg-blue-950 flex flex-col h-screen justify-center items-center w-full p-8">
    <div id="root" class="w-8/10 h-8/10 md:max-w-2xl md:max-h-2xl min-w-[350px] "></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### App.tsx ###
```import Die from "./components/Die"
import {useState} from "react"
import {nanoid} from "nanoid";
import Confetti from "react-confetti"

export interface DieType {
value: number
isHeld: boolean
id: string
}

const generateAllNewDice = (): DieType[] => {
return Array.from({length: 10}, () => (
{
value: Math.floor(6 * Math.random()) + 1,
isHeld: false,
id: nanoid()
}))
}

export default function App() {

    const [dice, setDice] = useState<DieType[]>(() => generateAllNewDice())

    const holdDice = (id: string): void => {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ?
                {...die, isHeld: !die.isHeld} : die
        }));
    };
    const rollDice = (): void => {
        setDice(prevDice => prevDice.map(
            die => die.isHeld ? die :
                {...die, value: Math.floor(6 * Math.random()) + 1}
        ))
    }

    const gameWon: boolean =
        dice.every(die => die.isHeld && die.value === dice[0].value);


    const diceElements = dice.map(die =>
        <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            holdDice={holdDice}
            id={die.id}
        />)

    return (
        <>
            {gameWon && <Confetti/>}
            <main className="bg-gray-100 text-black h-full w-full rounded-lg
            flex flex-col justify-center items-center font-inter gap-5">
                <h1 className="font-extrabold text-3xl">Tenzies</h1>
                <h3 className="text-center px-8">Roll until all dice are the same. Click each die to freeze it at its
                    current value between
                    rolls.
                </h3>
                <div className="grid grid-cols-5 grid-rows-2 gap-2 justify-center items-center">
                    {diceElements}
                </div>
                {gameWon ?
                    <button onClick={() => setDice(generateAllNewDice())}
                            className="bg-purple-950 text-white font-bold w-24 h-9 rounded mt-2
                         drop-shadow-xl tracking-wider text-sm cursor-pointer">
                        New Game
                    </button> :
                    <button onClick={rollDice}
                            className="bg-purple-950 text-white font-bold w-24 h-9 rounded mt-2
                         drop-shadow-xl tracking-wider text-sm cursor-pointer">
                        Roll
                    </button>}
            </main>
        </>
    )
}
```
### Die.tsx ###

import type {DieType} from "../App"

```interface DieProps extends DieType{
holdDice: (id: string) => void
}

export default function Die({value , isHeld , holdDice , id} : DieProps) {
return (
<button
className={`${isHeld ? `bg-green-400` : `bg-white`} 
        w-9 h-9 rounded font-extrabold drop-shadow-lg cursor-pointer`}
onClick={()=>holdDice(id)}
>{value}</button>
)
}

```