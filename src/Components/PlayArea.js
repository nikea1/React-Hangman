
export function PlayArea({words, game}){

    return(
        
        <div id="PlayArea">
            <h3>{(words&&words.display.length>0) ? words.display.join(' '):""}</h3>
            <div className="newGame">{(game) ? "Press Any Key to Start a New Game!":""}</div>
        </div>
    )
}

