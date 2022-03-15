import { useEffect, useState } from "react";

function Key({letter, onClick, checkKey}){
    const [isPressed, setIsPressed] = useState("keys");

    
    useEffect(()=>{
    
        // if(isPressed === "keys used") return;
        if(checkKey) setIsPressed("keys used");
        else setIsPressed("keys");
        // if(checkKey[letter.charCodeAt() - 65]){
        //     setIsPressed("keys used")
        // }
  
    }, [checkKey])

    return(
        <button type="button" className={`${isPressed}`} onClick={()=>{onClick(letter); setIsPressed("keys used")}} >{letter}</button>
    )
}
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export function Keyboard({onClick, onKey}){
    // console.log(onKey)

    return (<div>
        <ul className="keyboard">
            {letters.map((l, i)=> <li key={i}><Key checkKey={onKey[l.charCodeAt()-65]} onClick={onClick} letter={l} /></li>)}
        </ul>
    </div>)
}