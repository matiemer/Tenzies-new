import type {DieType} from "./App.tsx";

interface DieProps extends Omit<DieType, "id"> {
    hold: () => void
}

export default function Die({value, isHeld, hold}: DieProps) {
    return (
        <button
            className={`${isHeld ? `bg-green-400` : `bg-white`} w-10 h-10 rounded 
            drop-shadow-lg text-lg font-bold cursor-pointer`}
            onClick={hold}>
            {value}
        </button>
    )
}