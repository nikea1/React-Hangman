import {Status} from './Status'
import { PlayArea } from './PlayArea'

export function GameBoard(){

    return(
        <div className='container'>
            <div className='Wrapper'>
                <Status />
                <PlayArea />
            </div>
        </div>
    )
}