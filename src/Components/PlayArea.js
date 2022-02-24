
export function PlayArea({words}){

    return(
        
        <div id="PlayArea">
            <h3>{(words&&words.display.length>0) ? words.display.join(' '):"Press Any Key to Start!"}</h3>
        </div>
    )
}

