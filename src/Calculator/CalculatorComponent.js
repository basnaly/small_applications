import React, { useState } from "react";

import '../Calculator/Calculator.css';

const SYMBOLS = ['*', '/', '+', '-'];

// const calculate = (string) => {
//     for (let element of SYMBOLS) {
//         let re = new RegExp(`(\\d+(\\${element}\\d+)+)`, 'gi');
//         let matchExpr = string.match(re) || [];
//         console.log(string)
//         for (let match of matchExpr) {
//             let numbers = match.split(element);
//             let result = '';
//             if (element === '*') result = numbers.reduce((acc, curr) => +curr * acc, 1);
//             else if (element === '/') result = numbers.reduce((acc, curr, i) => i === 0 ? +curr : acc / +curr, 1);
//             else if (element === '+') result = numbers.reduce((acc, curr) => +curr + acc, 0);
//             else if (element === '-') result = numbers.reduce((acc, curr, i) => i === 0 ? +curr : acc - +curr, 1);
//             string = string.replace(match, result);
//         }
//     }
//     return string;
// }

const CalculatorComponent = () => {

    const [equation, setEquation] = useState('');
    const [lowerDisplay, setLowerDisplay] = useState('');

    const clickClean = () => {
        setEquation('');
        setLowerDisplay('');
    }

    const clickNumber = number => {
        if (lowerDisplay.endsWith('.') && number === '.') {
            return
        }
        else if (lowerDisplay === '0' && number === 0) {
            return
        }
        else if (lowerDisplay === '0' && number > 0) {
            setLowerDisplay(number + '');
            setEquation(prev => prev.slice(0, -1) + number + '');
        } 
        else if (equation.includes('=')){
            setLowerDisplay(number + '');
            setEquation(number + '');
        } else { // 5 + 3; 55; 5.4
            setEquation(prev => prev + number + '');
            if (!isNaN(lowerDisplay)) {
                setLowerDisplay(prev => prev + number + ''); //55
            } else {
                setLowerDisplay(number + ''); // 5 + 3
            }   
        }     
    }

    const clickSymbols = symbol => {
        if (equation.includes('=')) {
            setEquation(lowerDisplay + symbol);
        } 
        else if (SYMBOLS.includes(lowerDisplay) && symbol !== '-') {
            setEquation(prev => prev.slice(0, -1) + symbol)
        } 
        else if (lowerDisplay === '-'  && symbol === '-') {
            return
        } else {
            setEquation(prev => prev + symbol);
        }
        setLowerDisplay(symbol);
    }

    const clickEqual = () => {
        if (equation.includes('=')) {
            return
        }
        let result = eval(equation);
        setEquation(equation + '=' + result);
        setLowerDisplay(result + '');
    }

    return (
        <div className="parent d-flex flex-column align-items-center">
            <div className="grid">
                <div className="result d-flex flex-column align-items-end justify-content-end px-2"
                    style={ {gridArea: 'a'} }>
                    <div>{ equation }</div>
                    <div id="display">
                        { lowerDisplay ?? 0 }
                    </div>
                </div>
                <div className="ac" 
                    style={ {gridArea: 'b'} }
                    id="clear"
                    onClick={ clickClean }>
                    AC
                </div>
                <div className="operators"
                    style={ {gridArea: 'c'} }
                    id="divide"
                    onClick={ () => clickSymbols('/') }>
                    /
                </div>
                <div className="operators"
                    style={ {gridArea: 'd'} }
                    id="multiply"
                    onClick={ () => clickSymbols('*') }>
                    *
                </div>
                <div className="numbers" 
                    style={ {gridArea: 'e'} }
                    id="seven"
                    onClick={ () => clickNumber(7) }>
                    7
                </div>
                <div className="numbers"
                    style={ {gridArea: 'f'} }
                    id="eight"
                    onClick={ () => clickNumber(8) }>
                    8
                </div>
                <div className="numbers"
                    style={ {gridArea: 'g'} }
                    id="nine"
                    onClick={ () => clickNumber(9) }>
                    9
                </div>
                <div className="operators"
                    style={ {gridArea: 'h'} }
                    id="subtract"
                    onClick={ () => clickSymbols('-') }>
                    -
                </div>
                <div className="numbers"
                    style={ {gridArea: 'i'} }
                    id="four"
                    onClick={ () => clickNumber(4) }>
                    4
                </div>
                <div className="numbers"
                    style={ {gridArea: 'j'} }
                    id="five"
                    onClick={ () => clickNumber(5) }>
                    5
                </div>
                <div className="numbers"
                    style={ {gridArea: 'k'} }
                    id="six"
                    onClick={ () => clickNumber(6) }>
                    6
                </div>
                <div className="operators"
                    style={ {gridArea: 'l'} }
                    id="add"
                    onClick={ () => clickSymbols('+') }>
                    +
                </div>
                <div className="numbers"
                    style={ {gridArea: 'm'} }
                    id="one"
                    onClick={ () => clickNumber(1) }>
                    1
                </div>
                <div className="numbers"
                    style={ {gridArea: 'n'} }
                    id="two"
                    onClick={ () => clickNumber(2) }>
                    2
                </div>
                <div className="numbers"
                    style={ {gridArea: 'o'} }
                    id="three"
                    onClick={ () => clickNumber(3) }>
                    3
                </div>
                <div className="equal d-flex justify-content-center align-items-center"
                    style={ {gridArea: 'p'} }
                    id="equals"
                    onClick={ clickEqual }>
                    <div >=</div>
                </div>
                <div className="numbers"
                    style={ {gridArea: 's'} }
                    id="zero"
                    onClick={ () => clickNumber(0) }>
                    0
                </div>
                <div className="numbers"
                    style={ {gridArea: 't'} }
                    id="decimal"
                    onClick={ () => clickNumber('.') }>
                    .
                </div>    
            </div>
        </div>
    )
}

export default CalculatorComponent;