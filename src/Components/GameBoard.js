import {useState} from "react"
import {Status} from './Status'
import { PlayArea } from './PlayArea'

function initBoard(Dictionary){
    if(!Dictionary) return {answer:"", display:[]};
   
    let word = {answer:"", display:[]}

    word.answer = Dictionary[Math.floor(Math.random()*Dictionary.length)]
    
    for(let i = 0; i < word.answer.length; i++){

        word.display.push((word.answer.charAt(i)===' ') ? '\u00A0':'_')
    }

    console.log(word);
    
    return word;
}

export function GameBoard(){

    let Dictionary = ["Hello My Friend"]
    initBoard(Dictionary);
    
    let newGame = true;
    //Status data
    const [gameStatus, setGameStatus] = useState({
        wins: 0,
        guesses: 10,
        letters: [],
    })

    //Display data
    const [word, setWord] = useState({
        answer: '',
        display: []
    })

    

    document.onkeyup = function(e){
        //Start a new game 
        //initialize the board
        //reset number of guesses and letters guessed
        if(newGame){
         setWord(initBoard(Dictionary));
         setGameStatus(previousState => {
             return {...previousState, guesses:10, letters:[]}
         })
         newGame=false;
        }
    }
     
    //listen for letters being typed
        //check casing

    //Display the game status down here
    return(
        
        <div className='container'>
            <div className='wrapper'>
                <Status status={gameStatus} />
                <PlayArea words={word} />
            </div>
        </div>
    )
}