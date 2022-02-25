export function Status({status}){

    return(
        <div id="Status">
            <ul>
                <li>Wins:<span id="wins">{status.wins}</span></li>
                <li>Guesses left: <span id="tries">{status.guesses}</span></li>
                <li>Letters Guessed: <div id="lettersGuessed">{status.letters.join(', ')}</div></li>
            </ul>
        </div>
    )
}