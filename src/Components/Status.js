import { useEffect, useState } from "react"

let initStatus = {
    wins: 0,
    guesses: 7
}

export function Status({globalStatus, flag, changeWinner}){

    const [status, setStatus] = useState(initStatus)
    console.log(`Rendering Status Area...`)
    console.log(`Current Status at render:`, status)

    //update Status area
    useEffect(()=>{
        // console.log("check found", globalStatus.found)
        if ( !globalStatus.isPlaying || globalStatus.found) return;
           setStatus(previousState=>{
               return {...previousState, guesses: previousState.guesses - 1}
           })
            flag(true)
    }, [globalStatus.found])

    //use Effect to check for game over
    useEffect(()=>{
        if(!globalStatus.isPlaying || status.guesses > 0) return;
        console.log("Sending lost to Parent and ending the game")
        changeWinner(-1)
    }, [status.guesses])
   
    //If winner flag is triggered
    useEffect(() => {
        if(globalStatus.isWinner === 1){
            setStatus(previousState => {
                return{...previousState, wins: previousState.wins + 1}
            })
        }
    }, [globalStatus.isWinner])
    
    //reset Status
    useEffect(() => {
        if(!globalStatus.resetGame) return;
        setStatus(previousState => {
            return{...previousState, guesses:7}
        })
    },[globalStatus.resetGame])

    return(
        <div id="Status">
            <ul>
                <li>Wins: <span id="wins">{status.wins}</span></li>
                <li>Guesses left: <span id="tries">{status.guesses}</span></li>
                {/* <li>Letters Guessed: <div id="lettersGuessed">{status.letters.join(", ")}</div></li> */}
            </ul>
        </div>
    ) 
}