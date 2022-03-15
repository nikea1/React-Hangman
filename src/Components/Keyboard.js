function Key({letter, onClick}){
    return(
        <button type="button" className="keys" onClick={()=>onClick(letter)}>{letter}</button>
    )
}
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export function Keyboard({onClick}){

    return (<div>
        <ul className="keyboard">
            {letters.map((l, i)=> <li key={i}><Key onClick={onClick} letter={l} /></li>)}
        </ul>
    </div>)
}