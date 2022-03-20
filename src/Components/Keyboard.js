import { useEffect, useState } from "react";

//Array of letters for buttons
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

//Letter Button Component
function Key({letter, setGameState,checkLetter}){
    const [isPressed, setIsPressed] = useState("keys");

    //Updates button state if user keys in letter
    useEffect(()=>{
    
        if(checkLetter) setIsPressed("keys used");
        else setIsPressed("keys");
  
    },[checkLetter, setIsPressed])
    
    return(
        <button type="button" className={`${isPressed}`} onClick={()=>{setGameState({type:"GET_LETTER", payload: letter});}} >{letter}</button>
    )
}

// Container for Letter letter buttons
export function Keyboard({lettersPressed, setGameState}){
    console.log("Hello World")
    return (
        <div id="Keyboard">
            <ul>
                {letters.map((l, i)=> <li key={i}><Key checkLetter={lettersPressed[l.charCodeAt()-65]} setGameState={setGameState} letter={l} /></li>)}
            </ul>
            <button className="newGame" onClick={()=>setGameState({type: "RESET"})}>New Game</button>
        </div>
    )
}