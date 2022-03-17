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
    const [counter, setCounter] = useState(0);
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
            return
        }
        setCounter(counter + 1)
    }, [globalStatus.key])


    //Check is play won
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
        setCounter(0);
        
    }, [ globalStatus.resetGame])
    

    return(
        
        <div id="PlayArea">
            <h2 className="results">{(!globalStatus.isPlaying) ? displayResult(globalStatus.isWinner, globalStatus.word) : ''}</h2>
            <div className="hangman">
                <svg height="200" width="200">
                    <line x1="50" y1="180" x2="150" y2="180" stroke="black" />{/* Base */}
                    <line x1="100" y1="180" x2="100" y2="20" stroke="black" />{/* Pole*/}
                    <line x1="100" y1="20" x2="150" y2="20" stroke="black" /> {/* Beam */}
                    
                    {/* Draw the man */}
                    {(counter > 0) ? <line x1="150" y1="20" x2="150" y2="40" stroke="black" /> : <></>} {/* Rope */}
                    {(counter > 1) ? <circle cx="150" cy="55" r="15" stroke="black" /> : <></>}         {/* head */}
                    {(counter > 2) ? <line x1="150" y1="70" x2="150" y2="125" stroke="black" /> : <></>}{/* body */}
                    {(counter > 3) ? <line x1="150" y1="70" x2="135" y2="105" stroke="black" />: <></>} {/* left arm */}
                    {(counter > 4) ? <line x1="150" y1="70" x2="165" y2="105" stroke="black" /> : <></>}{/* right arm */}
                    {(counter > 5) ? <line x1="150" y1="125" x2="135" y2={105+(125-70)} stroke="black" /> : <></>} {/* left leg */}
                    {(counter > 6) ? <line x1="150" y1="125" x2="165" y2={105+(125-70)} stroke="black" /> : <></>} {/* right leg */}
                    Sorry Your Web browser does not support SVG. :(
                </svg>
            </div>
            <p className="display">{display.display.join(' ')}</p>
            <div className="newGameprompt">{(!globalStatus.isPlaying) ? <p>Press Any Key to Start a New Game!</p> : ""}</div>
        </div>
    )
}

