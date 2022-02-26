import {useState, useEffect} from "react"
import {Status} from './Status'
import { PlayArea } from './PlayArea'
import {disneyMovies} from '../Javascript/game'

function loadWord(Dictionary){
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

    let Dictionary = disneyMovies;
    
    const [newGame, setNewGame] = useState(true);
    //Status data
    const [gameStatus, setGameStatus] = useState({
        wins: 0,
        guesses: 10,
        letters: [],
        bucket: new Array(26).fill(0),
        haveWinner: false,
    })

    //Display data
    const [word, setWord] = useState({
        answer: '',
        display: []
    })

    //check for winner
    useEffect(() => {
        //Check if phase is solved
        if(!newGame){
            for(let i = 0; i < word.display.length; i++){
                if(word.display[i] === '_') return;
            }
            
            setGameStatus(previousState=>{
                return {...previousState, haveWinner:true}
            })
           
        }
    }, [newGame, word.display])

    //We have a Winner!
    useEffect(()=>{
        //Check if phase is solved
        console.log(`haveWinner is ${gameStatus.haveWinner}`)
        if(gameStatus.haveWinner){
            alert("You Win!")
            setGameStatus(previousState => {
                return {...previousState, wins: previousState.wins + 1}
            })
            setNewGame(true)
        }
    }, [gameStatus.haveWinner]);

    //We have a loser
    useEffect(()=>{
        if(gameStatus.guesses === 0){
            console.log("You lost")
            alert(`Game Over. \n The answer was "${word.answer}"`)
            setNewGame(true)
        }
    },[gameStatus.bucket])

    document.onkeyup = function(e){
        //Start a new game 
        //initialize the board
        if(newGame){
         setWord(loadWord(Dictionary));
         setGameStatus(previousState => {
             return {...previousState, 
                guesses:10, 
                letters:[], 
                bucket: new Array(26).fill(false), 
                haveWinner:false
            }
         })
         setNewGame(false);
        }
        else{
            let c = e.key; //get char
            let cc = c.toUpperCase().charCodeAt(0)
            //Filter out all keys except uppercase and capital letters
            if(c.length > 1 || (cc < 65) || (cc > 90)) return;

            // console.log(c.charCodeAt(0));
           
            //check if letter is used
            if(gameStatus.bucket[cc - 65]){
                console.log("Letter already used")
                alert(`The letter ${c} is already used`)
                //TODO: Fancy CSS and status display?
                return;

            }
            
            let f = [];
            //Checked if keyed in letter in in the phrase
            for(let i = 0; i < word.answer.length; i++){
                if(word.answer[i].toUpperCase() === c.toUpperCase()){
                    console.log(`Found ${c} at ${i}`)
                    f.push(i);
                } 
            }// end of checking if letter is in phrase

            //if letter was not found, update status add letter to guessed letter list 
            //and decrease the number of guesses
            if(f.length<1){
                console.log(`Letter ${c} was not found.`)
                setGameStatus(previousState => {
                    return {...previousState, guesses: previousState.guesses - 1, letters: [...previousState.letters,c]}
                })
            } //end of guessed letter list
            //else update the display data
            else{
                let ud = []

                //copy current display
                word.display.forEach((element, j) => {
                    ud[j] = element;
                })
                //replace blank spaces with keyed in letter
                f.forEach(element =>{
                    ud[element] = c;
                })

                //update display
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
                bc[cc - 65] = true;
                
                //update backet
                setGameStatus(previousState =>{
                return {...previousState, bucket: bc}
            })
            
     
            
    
            //TODO: fix useeffect warning of lose statement?
            
        }
    }
     
    //Display and render the game status down here
    return(
        
        <div className='container'>
            <div className='wrapper'>
                <Status status={gameStatus} />
                <PlayArea words={word} game={newGame} />
            </div>
        </div>
    )
}