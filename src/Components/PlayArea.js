import { useEffect, useState } from "react"
import {disneyMovies} from '../Javascript/disneyMovies'

function loadWord(){
    //get random Disney Title
    let displayWord = {answer: disneyMovies[Math.floor(Math.random()*disneyMovies.length)], display:[]}

    // console.log("Generating display object", displayWord)  
    
    // Generate display  
    for(let i = 0; i < displayWord.answer.length; i++){
        
        let d = displayWord.answer.toUpperCase().charCodeAt(i);
        
        displayWord.display.push((d >=65 && d <= 90  ) ? '_': displayWord.answer.charAt(i));
    }
    // console.log("Finish display word", displayWord)
   
    return displayWord;
}

/*
GlobalStatus:
guessesLeft
isWinner
isPlaying
resetGame
key
*/

function displayResult(isWinner, answer){
    if(isWinner === 1) return( <h2>You Win</h2>);
    if(isWinner === -1) return (<h2>Game Over! The answer was '{answer}'</h2>);
}

export function PlayArea({globalStatus, setGameState}){
 
    const [display, setDisplay] = useState(loadWord())
    
    console.log("rendering Play Area...")

    //Update Display
    useEffect(()=>{
        if(globalStatus.key === '')return;
       
        console.log(`Looking for letter ${globalStatus.key}...`)
        
        //check if the letter is in the word
        let f = []

        for(let i = 0; i < display.answer.length; i++){
            if(display.answer.charAt(i).toUpperCase() === globalStatus.key.toUpperCase()){
                f.push(i)
            }
        } 
        //Reset display if letter is in the word
        if(f.length > 0){

            console.log(`Found letter ${globalStatus.key}!`)

            setDisplay(previousState => {

                let ud = [...previousState.display]

                f.forEach(i => {
                    ud[i] = previousState.answer[i]
                })
                return {...previousState, display: ud}
            })
            return
        }

        //could not find the letter in the word
        console.log(`Could not find letter ${globalStatus.key}`)

        setGameState({type:"GUESSED_WRONG"})
    }, [globalStatus.key, display.answer, setGameState])


    //Check is play won
    useEffect(()=>{
        console.log("Checking for winner")
        
        //If there is are any blanks left then the game continues
        for(let i = 0; i < display.display.length; i++){

            if(display.display[i] === '_'){ 
                console.log("No winner yet")
                return;
            }
        }

        //You found every letter
        console.log("You Won!")

        setGameState({type: 'WIN'})

    }, [display.display, setGameState])

    //check if player lost
    useEffect(() => {
        console.log("Checking for lost")

        if(globalStatus.guessesLeft < 1)
            setGameState({type: "LOSE"})
            
    }, [globalStatus.guessesLeft, setGameState])

    //Reset Display
    useEffect(()=>{
        if(!globalStatus.resetGame)return;

        console.log("Resetting play Area")
        setDisplay(() => { return loadWord() })        
    }, [ globalStatus.resetGame])
    

    return(
        <div id="PlayArea">
            {!globalStatus.isPlaying && displayResult(globalStatus.isWinner, display.answer)}
            <div className="hangman">
                <svg height="170" width="125">
                    <line x1={5} y1={165} x2={105} y2={165} stroke="black" />{/* Base */}
                    <line x1={55} y1={165} x2={55} y2={5} stroke="black" />{/* Pole*/}
                    <line x1={55} y1={5} x2={105} y2={5} stroke="black" /> {/* Beam */}
                    
                    {/* Draw the man */}
                    {(globalStatus.guessesLeft < 7) && <line x1={105} y1={5} x2={105} y2={25} stroke="black" /> } {/* Rope */}
                    {(globalStatus.guessesLeft < 6) && <circle cx={105} cy={40} r={15} stroke="black" /> }         {/* head */}
                    {(globalStatus.guessesLeft < 5) && <line x1={105} y1={55} x2={105} y2={110} stroke="black" /> }{/* body */}
                    {(globalStatus.guessesLeft < 4) && <line x1={105} y1={55} x2={90} y2={90} stroke="black" />} {/* left arm */}
                    {(globalStatus.guessesLeft < 3) && <line x1={105} y1={55} x2={120} y2={90} stroke="black" /> }{/* right arm */}
                    {(globalStatus.guessesLeft < 2) && <line x1={105} y1={110} x2={90} y2={145} stroke="black" /> } {/* left leg */}
                    {(globalStatus.guessesLeft < 1) && <line x1={105} y1={110} x2={120} y2={145} stroke="black" /> } {/* right leg */}
                    Sorry Your Web browser does not support SVG. :(
                </svg>
            </div>
            <p className="display">{display.display.join('')}</p>
            {/* <div className="newGameprompt">{(!globalStatus.isPlaying) ? <p>Press Any Key to Start a New Game!</p> : ""}</div> */}
        </div>
    )
}

