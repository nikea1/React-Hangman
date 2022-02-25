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
        bucket: new Array(26).fill(0),
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
             
             return {...previousState, guesses:10, letters:[], bucket: new Array(26).fill(false)}
         })
         setNewGame(false);
        }
        else{
            let c = e.key;
            //Filter out all keys except uppercase and capital letters
            if(c.length > 1 || (c.toUpperCase().charCodeAt(0) < 65) || (c.toUpperCase().charCodeAt(0) > 90)) return;

            // console.log(c.charCodeAt(0));
           
            //check if letter is used
            if(gameStatus.bucket[c.toUpperCase().charCodeAt(0) - 65]){
                console.log("Letter already used")
            }else{
                let f = [];
                //Checked if keyed in letter in in the phrase
                for(let i = 0; i < word.answer.length; i++){
                    if(word.answer[i].toUpperCase() == c.toUpperCase()){
                        console.log(`Found ${c} at ${i}`)
                        f.push(i);
                    } 
                }// end of checking if letter is in phrase

                //if letter was no found, update status add letter to guessed letter list 
                if(f.length<1){
                    console.log(`Letter ${c} was not found.`)
                    let g = gameStatus.guesses - 1;
                    let l = []
                    gameStatus.letters.forEach(el => {
                        l.push(el);
                    })
                    l.push(c);
                    setGameStatus(previousState => {
                        return {...previousState, guesses: g, letters: l}
                    })
                } //end of guessed letter list
                //else update the display data
                else{
                    let ud = []
                    word.display.forEach((element, j) => {
                        ud[j] = element;
                    })

                    f.forEach(element =>{
                        ud[element] = c;
                    })

                    setWord(previousState =>{
                        return {...previousState, display: ud}
                    })
                } // end of display update
                 //Update bucket list in game status
                //make copy of old bucket list
                 let bc = [];
                 gameStatus.bucket.forEach((element, i) => {
                     bc[i] = element;
                 });
                 //add new value
                 bc[c.toUpperCase().charCodeAt(0) - 65] = true;
                 setGameStatus(previousState =>{
                    return {...previousState, bucket: bc}
                })
            }
           
            
    
            //TODO: else notify user that letter has been used already
            //Check if we won AKA are there any "_" left and guesses left is not 0 or less
                //if there are no "_" and guess left is not 0 mincrement win ask user to play again
                //if guess are 0 you lose, state the answer, ask user to play again.
                //initialize and start new game.
            
        }
    }
     
    //Display and render the game status down here
    return(
        
        <div className='container'>
            <div className='wrapper'>
                <Status status={gameStatus} />
                <PlayArea words={word} />
            </div>
        </div>
    )
}