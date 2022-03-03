import { useEffect, useState } from "react"

function loadWord(word){
    if(!word) return {answer:"", display:[]};
   
    let displayWord = {answer: word, display:[]}
    // console.log("Generating display object", displayWord)
    // word.answer = Dictionary[Math.floor(Math.random()*Dictionary.length)]
    
    for(let i = 0; i < displayWord.answer.length; i++){

        displayWord.display.push((displayWord.answer.charAt(i)===' ') ? '\u00A0':'_')
    }

    // console.log(word);
    // console.log("Finish display word", displayWord)
    return displayWord;
}

// function displayPlayArea {}

function displayResult(isWinner, answer){
    // let {isWinner, answer} = gs;
    if(isWinner === 1) return "You Win";
    if(isWinner === -1) return "Game Over! The answer was '"+answer+"'";
    return;
}

export function PlayArea({globalStatus, changeWinner}){
 
    const [display, setDisplay] = useState(loadWord(globalStatus.word))
    console.log("rendering Play Area...")
    // console.log(`Current Display at render: `, display);

    //Update Display
    useEffect(()=>{
        if(globalStatus.key === '')return;
        console.log("Updating Display...")
        // console.log("Current state", globalStatus)
        // console.log("Current Display State", display)
        if(globalStatus.isPlaying && globalStatus.found){
            let ud = [...display.display]
            globalStatus.foundIndex.forEach(i=>{
                ud[i] = globalStatus.word[i]
            })

            setDisplay(previousState => {
                return {...previousState, display: ud}
            })
        }
    }, [globalStatus.key])


    //TODO: Use effect to check for winner
    useEffect(()=>{
        if(!globalStatus.isPlaying) return;
        console.log("checking for winner")
        
        for(let i = 0; i < display.display.length; i++){

            if(display.display[i] === '_'){ 
                console.log("No winner yet")
                return;
                
            }
        }
        console.log("Sending isWinner back to parent and ending the game")
        changeWinner(1)

    }, [display.display])

    //Reset Display
    useEffect(()=>{
        if(!globalStatus.resetGame)return;
        console.log("Resetting playarea")
        setDisplay((previousState) => {
            let newWord = loadWord(globalStatus.word)
            
            return {...previousState, ...newWord}
        })
        
    }, [ globalStatus.resetGame])
    
    useEffect(()=>{
        // console.log(display)
    },[display])

    return(
        
        <div id="PlayArea">
            <h2 className="results">{(!globalStatus.isPlaying) ? displayResult(globalStatus.isWinner, globalStatus.word) : ''}</h2>
            <h3 className="display">{display.display.join(' ')}</h3>
            <div className="newGameprompt">{(!globalStatus.isPlaying) ? <p>Press Any Key to Start a New Game!</p> : ""}</div>
        </div>
    )
}

