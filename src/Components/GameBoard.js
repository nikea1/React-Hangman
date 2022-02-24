import {useState, useEffect} from "react"
import {Status} from './Status'
import { PlayArea } from './PlayArea'

function initBoard(Dictionary){
    if(!Dictionary) return {answer:"", display:[]};
   
    let word = {answer:"", display:[]}

    word.answer = Dictionary[Math.floor(Math.random()*Dictionary.length)]
    
    for(let i = 0; i < word.answer.length; i++){

        word.display.push((word.answer.charAt(i)===' ') ? '\u00A0':'_')
    }

    // console.log(word);
    
    return word;
}

export function GameBoard(){

    let Dictionary = ["Hello My Friend"]
    initBoard(Dictionary);
    
    const [newGame, setNewGame] = useState(true);
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
         setNewGame(false);
        }
        else{
            //Filter out all keys except uppercase and capital letters
            if(e.key.length > 1 || (e.key.charCodeAt(0) < 65) || ((e.key.charCodeAt(0) > 90) && (e.key.charCodeAt(0) < 97 )) || (e.key.charCodeAt(0) > 122)) return;

            console.log(e.key.charCodeAt(0));
            //TODO compare keyed in letters with answer string.
            //if match is found update display
            //else check if letter had been guessed
            //if not guessed yes push into guessed list decrement number of guesses
            //else notify user that letter has been used already
            //Check if we won AKA are there any "_" left and guesses left is not 0
            //if there are no "_" and guess left is not 0 mincrement win ask user to play again
            //if guess are 0 you lose, state the answer, ask user to play again.
            //initialize and start new game.
            
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