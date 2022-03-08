import {useState, useEffect, useCallback} from "react"
import {Status} from './Status'
import { PlayArea } from './PlayArea'
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


export function GameBoard(){
    
    const [globalStatus, setGlobalStatus] = useState(initGlobalStatus)
    console.log("Rendering Game Board...")
    // console.log("Current global status at Render: ", globalStatus)
    
    //callback function for found flag
    function changeFound (bool){
        setGlobalStatus((previousState)=>{
            return {...previousState, found: bool}
        })
    }

    //callback function for winner state
    function changeWinner(s){
        setGlobalStatus((previousState)=>{
            return {...previousState, isWinner: s, isPlaying: false}
        })
    }

    //Keyboard event effect
    useEffect(()=>{
       
        window.onkeydown = (e) => {
            //reset Game on keypress
            if(!globalStatus.isPlaying){
                setGlobalStatus(previousState => {
                    return {...previousState, resetGame: true,  word: disneyMovies[Math.floor(Math.random()*disneyMovies.length)]}
                })
                return;
            }
            //processes key press
            let k = e.key;
            if(k.length > 1 || k.toUpperCase().charCodeAt() < 65 || k.toUpperCase().charCodeAt() > 90 )return;
            if(globalStatus.bucket[k.toUpperCase().charCodeAt() - 65]){
                console.log("Letter already used")
                return;
            };

            // console.log(`Getting key ${k}`)
            //update letter bucket
            let bc = [...globalStatus.bucket]
            bc[k.toUpperCase().charCodeAt()-65] = true;

            // console.log("Finding Indices...")
            // console.log(`Checking for letter ${globalStatus.key} in secret word`)
            
            let f = []
            // console.log(globalStatus.word)

            for(let i = 0; i < globalStatus.word.length; i++){
                if(globalStatus.word.charAt(i).toUpperCase() === k.toUpperCase()){
                    f.push(i);
                }
            }

            //go update status, the letter is not in the word
            if(f.length < 1){
                setGlobalStatus(previousState=>{
                    return {...previousState, key: k, bucket: bc, found: false }
                })
                return;
            }

            console.log(`found letters ${k}`)
            console.log(`Now updating global state...`)
            //go update display, we found the letter
            setGlobalStatus(previousState=>{
                return {...previousState, key: k, bucket: bc, foundIndex: f }
            })
        }
    })// end of keyboard event

    //Reset global state
    useEffect(()=>{
        if(!globalStatus.resetGame) return;
        setGlobalStatus((previousState)=>{
            return {...previousState,
                key: '',
                foundIndex: [],
                found: true,
                isWinner: 0,
                bucket: new Array(26).fill(false),
                isPlaying: true,
                resetGame: false
            }
        })
    }, [globalStatus.resetGame])


    //Display and render the game status down here
    return(
        
        <main className='container'>
            <div className='wrapper'>
                <Status globalStatus={globalStatus} flag={changeFound} changeWinner={changeWinner}/>
                <PlayArea globalStatus={globalStatus} changeWinner={changeWinner} />
            </div>
        </main>
    )
}