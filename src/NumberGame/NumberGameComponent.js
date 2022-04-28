import React, { useState } from "react";
import { useEffect } from "react";

import { Button } from 'react-bootstrap';

const styles = {
    array: {
        fontSize: '24px',
        margin: '10px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 100px)',
        gap: '10px',
    },
    scores: {
        fontSize: '26px',
        margin: '20px',
    },
    number: {
        fontSize: '24px',
        margin: '10px',
        marginBottom: '30px',
    },
    span: {
        color: 'red',
        paddingLeft: '8px',
        padding: '5px 15px',
    },
    wrong: {
        fontSize: '24px',
        margin: '10px',
        color: 'red',
    },
}

const GetArrOfNine = ()  => {

    const numbers = Array(100).fill().map((_, index) => index + 1);
    numbers.sort(() => Math.random() - 0.5);
    return numbers.slice(0, 9);       
}

const NumberGameComponent = () => {

    const [arrNumbers, setArrNumbers] = useState(GetArrOfNine());
    const [index, setIndex] = useState(Math.floor(Math.random() * 9));
    const [isClosed, setIsClosed] = useState(false);
    const [clickedNumber, setClickedNumber] = useState(undefined);
    const [scores, setScores] = useState(0);

    let number = arrNumbers[index]

    useEffect(() => {

        setTimeout(() => {
            setIsClosed(true)

        }, 3000)
    }, [arrNumbers])

    const findNumber = num => {
        setClickedNumber(num);
        if (number === num) {
            setScores(prev => prev + 4)
        } else {
            setScores(prev => prev - 1)
        }
    }

    const resetGame = () => {
        setArrNumbers(GetArrOfNine());
        setIndex(Math.floor(Math.random() * 9));
        setIsClosed(false);
        setClickedNumber(undefined);
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div style={ styles.scores }>
                Your scores are: 
                <span data-testid={ 'span-score' }
                    style={ styles.span }>
                    { scores }
                </span> 
            </div>
            { isClosed 
                ? <div style={ styles.number }>
                    Where is the number 
                    <span data-testid={ 'span-number' }
                        style={ styles.span }> 
                        { number } 
                    </span> ?
                </div>
                : <div style={ styles.number }>
                    Look carefully at the location of each number!
                </div>
            }
            <div style={ styles.grid }>
                { arrNumbers.map((el, i) =>
                    <Button onClick={ () => findNumber(el) }
                            data-testid={ 'button' + i }
                            style={ styles.array }
                            disabled={ clickedNumber === el }
                            variant={'info'}
                            key={ i }>
                        { isClosed ? (
                            clickedNumber === el ? el : '?'
                        ) : el }
                    </Button>)
                }
            </div>

            { clickedNumber === number &&
                <div className="d-flex flex-column align-items-center">
                    <div style={ styles.number }>
                        You Won!
                    </div>
                    <Button style={ styles.array }
                        onClick={ resetGame }
                        variant={'danger'}>
                        New game
                    </Button>
                </div>
            }
            { clickedNumber !== number && clickedNumber !== undefined &&
                <div style={ styles.wrong }>
                    It's wrong. Try another one!
                </div>
            }
            
        </div>
    )
}

export default NumberGameComponent;