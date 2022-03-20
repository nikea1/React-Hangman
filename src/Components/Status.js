import { useEffect, useState } from "react"

/*
Globalstatus:

isWinner
guessesLeft
*/

export function Status({globalStatus}){

    const [wins, setWins] = useState(0)
    console.log(`Rendering Status Area...`)
    console.log(`Current Wins at render:`, wins)

    //If winner flag is triggered
    useEffect(() => {
        if(globalStatus.isWinner === 1){
            setWins(w=>w+1)
        }
    }, [globalStatus.isWinner])
    
    return(
        <div id="Status">
            <ul>
                <li>Wins: <span id="wins">{wins}</span></li>
                <li>Guesses left: <span id="guesses">{globalStatus.guessesLeft}</span></li>
            </ul>
        </div>
    ) 
}