export function Status(){

    return(
        <div id="Status">
            <ul>
                <li>Wins:<span id="wins">0</span></li>
                <li>Guesses left: <span id="tries">10</span></li>
                <li>Letters Guessed: <div id="lettersGuessed"></div></li>
            </ul>
        </div>
    )
}