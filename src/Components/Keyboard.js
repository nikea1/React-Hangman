import { useEffect, useState } from "react";

function Key({letter, onClick, checkKey}){
    const [isPressed, setIsPressed] = useState("keys");

    
    useEffect(()=>{
    
        if(checkKey) setIsPressed("keys used");
        else setIsPressed("keys");
  
    }, [checkKey])

    return(
        <button type="button" className={`${isPressed}`} onClick={()=>{onClick(letter); setIsPressed("keys used");}} >{letter}</button>
    )
}
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export function Keyboard({onClick, onKey, reset}){

    return (<div id="Keyboard">
        <ul>
            {letters.map((l, i)=> <li key={i}><Key checkKey={onKey[l.charCodeAt()-65]} onClick={onClick} letter={l} /></li>)}
        </ul>
        <button className="newGame" onClick={()=>reset()}>New Game</button>
    </div>)
}