import React, { useState } from "react";

import '../Calculator/Calculator.css';

const SYMBOLS = ['*', '/', '+', '-'];

const calculate = (string) => {
    for (let element of SYMBOLS) {
        let re = new RegExp(`(\\d+(\\${element}\\d+)+)`, 'gi');
        let matchExpr = string.match(re) || [];
        console.log(string)
        for (let match of matchExpr) {
            let numbers = match.split(element);
            let result = '';
            if (element === '*') result = numbers.reduce((acc, curr) => +curr * acc, 1);
            else if (element === '/') result = numbers.reduce((acc, curr, i) => i === 0 ? +curr : acc / +curr, 1);
            else if (element === '+') result = numbers.reduce((acc, curr) => +curr + acc, 0);
            else if (element === '-') result = numbers.reduce((acc, curr, i) => i === 0 ? +curr : acc - +curr, 1);
            string = string.replace(match, result);
        }
    }
    return string;
}

const CalculatorComponent = () => {

    const [fullEquation, setFullEquation] = useState(''); //upper display part
    const [lastClick, setLastClick] = useState(''); // lower display part
    const [equalClick, setEqualClick] = useState(false); // avoid double =

    const clickClean = () => {
        setLastClick('');
        setFullEquation('');
    }

    const clickNumber = (number) => {
        if (!SYMBOLS.includes(lastClick)) { //last click not one of symb
            setLastClick(prev => {
                if (prev.endsWith('.') && number === '.') { // if last click finished wit/h .
                    return prev; //and curren
                }
                return prev == 0 ? '' + number : prev + '' + number
            })
        } else {
            setLastClick(number + '')
        }

        if (equalClick === true) {
            setFullEquation(number + '');
            setEqualClick(false);
            setLastClick(number + '');
        } else {
            setFullEquation(prev => {
                if (prev.endsWith('.') && number === '.') { // if last click finished with .
                    return prev; //and curren
                }
                return prev == 0 ? '' + number : prev + '' + number
            });
        }          
    }

    const clickSymbols = (symbol) => {
        if (equalClick === true) {
            setFullEquation(lastClick + symbol);
            setEqualClick(false);
        } else {
            setFullEquation(prev => {
                if (SYMBOLS.includes(lastClick) && symbol !== '-') {
                    prev = prev.slice(0, -1)
                }
                return prev + symbol
            });
        }
        setLastClick(symbol);    
    }

    const clickEqual = () => {
        if (equalClick) {
            return
        }
        let result = eval(fullEquation);
        console.log(result)
        setLastClick('' + result);
        setFullEquation(prev => prev + "=" + result);
        setEqualClick(true);
    }

    return (
        <div className="parent d-flex flex-column align-items-center">
            <div className="grid">
                <div className="result d-flex flex-column align-items-end justify-content-end px-2"
                    style={ {gridArea: 'a'} }>
                    <div>{ fullEquation }</div>
                    <div id="display">
                        { lastClick ?? 0 }
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