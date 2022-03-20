import {useEffect, useReducer} from "react"
import {Status} from './Status'
import { PlayArea } from './PlayArea'
import { Keyboard } from "./Keyboard"

let initGlobalStatus = {
    key: '',
    guessesLeft: 7,
    isWinner: 0,
    bucket: new Array(26).fill(false),
    isPlaying: true,
    resetGame: false
}

//helper function
function pickFromObj (obj, keys){
    let out = {}

    keys.forEach(k => {
        out[k] = obj[k];
    })
    return out;
}

function reducer(state, action){
    switch(action.type){
        case "GUESSED_WRONG":
            return {...state, guessesLeft: state.guessesLeft - 1}
        case "WIN":
            return {...state, isWinner: 1, isPlaying: false}
        case "LOSE":
            return {...state, isWinner: -1, isPlaying: false}
        case "GET_LETTER":
            //Only get letters when game is on
            if(!state.isPlaying) return state

            console.log("Getting letter is reducer")
            
            let letter = action.payload;

            //make sure the letter has not be used already
            if(state.bucket[letter.toUpperCase().charCodeAt(0) - 65]){ 
                console.log(`${letter} has already been used.`)    
                return state;
            }

            //update letter bucket
            let bc = [...state.bucket]
            bc[letter.toUpperCase().charCodeAt(0)-65] = true;

            console.log("Got letter ", letter)
            return {...state,key: letter, bucket: bc}

        case "RESET":
            console.log("RESETTING THE GAME in REDUCER")
            return {...state, resetGame: true}

        case "REINITIALIZE":
            return initGlobalStatus;

        default:
            throw new Error();
    }
}

export function GameBoard(){
    
    const [globalStatus, dispatch] = useReducer(reducer, initGlobalStatus);
    console.log("Rendering Game Board...")
    
    //Keyboard event
    window.onkeydown = (e) => {

        //reset Game on keypress
        if(!globalStatus.isPlaying){
            dispatch({type: "RESET"})
            return;
        }
        console.log(`keying in ${e.key}`)
       
        //Make sure we have single character keys
        if(e.key.length > 1) return;

        //make sure its a letter in the alphabet
        if(e.key.toUpperCase().charCodeAt(0) < 65 || e.key.toUpperCase().charCodeAt(0) > 90) return;
        
        console.log("Running dispatch for letters")
        
        dispatch({type: "GET_LETTER", payload: e.key})
    }// end of keyboard event

    //Reset global state
    useEffect(()=>{
        if(!globalStatus.resetGame) return;
        console.log("Resetting the game with dispatch")
        dispatch({type: "REINITIALIZE"})
    }, [globalStatus.resetGame])

    //Display and render the game status down here {guessesLeft: globalStatus.guessesLeft, isWinner: globalStatus.isWinner}
    return(
        
        <main className='container'>
            <div className='wrapper'>
                <Status globalStatus={pickFromObj(globalStatus, ['guessesLeft', 'isWinner'])}/>
                <PlayArea globalStatus={pickFromObj(globalStatus, ['guessesLeft', 'isWinner', 'resetGame', 'isPlaying', 'key'])} setGameState={dispatch}/>
                <Keyboard lettersPressed={globalStatus.bucket} setGameState={dispatch}/>
            </div>
        </main>
    )
}