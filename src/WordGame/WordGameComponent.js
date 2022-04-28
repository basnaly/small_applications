import React, { useState } from "react";

import { Button } from 'react-bootstrap';

const styles = {
    scores: {
        fontSize: '24px',
        margin: '10px',
    },
    number: {
        color: 'red',
        paddingLeft: '8px',
        padding: '5px 15px',
    },
    word: {
        fontSize: '24px',
        margin: '10px 15px',
        padding: '5px 15px',
    },
    hr: {
        border: '2px solid black',
        width: '500px',
    },
    alphabet: {
        fontSize: '24px',
        margin: '10px 26px',
        padding: '5px 15px',

    },
    win: {
        fontSize: '28px',
        margin: '10px',
    },
} 

export const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const WORD = ['population', 'country', 'programmer', 'genaration',
              'verification', 'sensational', 'restaurant',
              'different', 'challenge', 'mysterious'];

const WordGameComponent = () => {

    const [word, setWord] = useState(WORD[Math.floor(Math.random() * 10)].split(''));
    const [clickedLetter, setClickedLetter] = useState([]);
    const [scores, setScores] = useState(0);
    
    const isWin = word.every(el => clickedLetter.includes(el));

    const checkLetter = (letter) => {
        setClickedLetter(prev => [...prev, letter]);

        if (word.includes(letter)){
            setScores(prev => prev + 1)
        } else {
            setScores(prev => prev - 1)
        }
    }

    const resetGame = () => {
        setWord(WORD[Math.floor(Math.random() * 10)].split(''));
        setClickedLetter([]);
        setScores(0);
    }

        return (
            <div className="d-flex flex-column align-items-center">
                <div style={ styles.scores }>
                    Your scores are: 
                    <span style={ styles.number }>
                        { scores }
                    </span> 
                </div>
                <div data-testid="word-element"
                    className="my-3">
                    {word.map((el, i) =>
                        <Button style={ styles.word }
                            variant={'warning'}
                            key={ i }>
                            { clickedLetter.includes(el) ? el : '?' }
                        </Button>)
                    }
                </div>
                <hr style={ styles.hr }/>
                <div data-testid="alphabet-element"
                    className="d-flex align-items-center justify-content-center flex-wrap my-3 container">
                    {ALPHABET.map(el =>
                        <Button onClick={ () => checkLetter(el) }
                            data-testid={'button-alphabet-' + el }
                            disabled={ clickedLetter.includes(el) }
                            variant={'info'}
                            style={ styles.alphabet }
                            key={ el }>
                            { el }
                        </Button>)
                    }
                </div>
                { isWin && 
                <div className="d-flex flex-column align-items-center my-2"> 
                    <div data-testid="win-element"
                        style={ styles.win }>
                        You Won!
                    </div>
                    <Button className="m-3"
                            data-testid="new-game"
                            onClick={ resetGame }
                            variant={'danger'}>
                        New Game
                    </Button>    
                </div>
                }
            </div>
        )
}


export default WordGameComponent;