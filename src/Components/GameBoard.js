import {useEffect, useReducer} from "react"
import {Status} from './Status'
import { PlayArea } from './PlayArea'
import { Keyboard } from "./Keyboard"
import {disneyMovies} from '../Javascript/disneyMovies'
let initWord = disneyMovies[Math.floor(Math.random()*disneyMovies.length)]

let initGlobalStatus = {
    key: '',
    word: initWord,
    foundIndex: [],
    found: true,
    isWinner: 0,
    bucket: new Array(26).fill(false),
    isPlaying: true,
    resetGame: false
}

function reducer(state, action){
    switch(action.type){
        case "found":
            return {...state, found: true}
        case "not found":
            return {...state, found: false}
        case "win":
            return {...state, isWinner: 1, isPlaying: false}
        case "lose":
            return {...state, isWinner: -1, isPlaying: false}
        case "get key":
            console.log("Getting letter is reducer")
            let letter = action.payload;
            console.log(`${letter} is in`)
            //Make sure we have single character keys
            if(letter.length > 1) return;

            //make sure its a letter in the alphabet
            if(letter.toUpperCase().charCodeAt(0) < 65 || letter.toUpperCase().charCodeAt(0) > 90) return;

            //make sure the letter has not be used already
            if(state.bucket[letter.toUpperCase().charCodeAt(0) - 65]){ 
                console.log(`${letter} has already been used.`)    
                return;
            }

            //update bucket
            let bc = [...state.bucket]
            bc[letter.charCodeAt()-65] = true;

            //check if the letter is in the word
            let f = []

            for(let i = 0; i < state.word.length; i++){
                if(state.word.charAt(i).toUpperCase() === letter.toUpperCase()){
                    f.push(i)
                }
            } 

            //if we can't find the letter
            if(f.length < 1) {
                console.log("Found the letter")
                return {...state, key: letter, bucket: bc, found: false}
            }

            console.log("Cannot find letter")
            return {...state,key: letter, bucket: bc, foundIndex: f}
        case "reset":
            console.log("RESETTING THE GAME in REDUCER")
            return {...state, resetGame:true, word: disneyMovies[Math.floor(Math.random()*disneyMovies.length)]}
        case "reinitialize":
            return {...state, 
            key: '',
            foundIndex: [],
            found: true,
            isWinner: 0,
            bucket: new Array(26).fill(false),
            isPlaying: true,
            resetGame: false
            }
        default:
            throw new Error();
    }
}


export function GameBoard(){
    
    
    const [globalStatus, dispatch] = useReducer(reducer, initGlobalStatus);
    console.log("Rendering Game Board...")
    // console.log("Current global status at Render: ", globalStatus)
    
    //Keyboard event effect
    useEffect(()=>{
       
        window.onkeydown = (e) => {

            //reset Game on keypress
            if(!globalStatus.isPlaying){
                dispatch({type: "reset"})
                return;
            }
            console.log("Running dispatch for letters")
            dispatch({type: "get key", payload: e.key})
        }
    })// end of keyboard event

    //Reset global state
    useEffect(()=>{
        if(!globalStatus.resetGame) return;
        console.log("Resetting the game with dispatch")
        dispatch({type: "reinitialize"})
    }, [globalStatus.resetGame])


    //Display and render the game status down here
    return(
        
        <main className='container'>
            <div className='wrapper'>
                <Status globalStatus={globalStatus} setGameState={dispatch}/>
                <PlayArea globalStatus={globalStatus} setGameState={dispatch}/>
                <Keyboard onKey={globalStatus.bucket} setGameState={dispatch}/>
            </div>
        </main>
    )
}