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

    const [fullEquation, setFullEquation] = useState('');
    const [lastClick, setLastClick] = useState('');
    const [equalClick, setEqualClick] = useState(false);

    const clickClean = () => {
        setLastClick('');
        setFullEquation('');
    }

    const clickNumber = (number) => {
        if (!SYMBOLS.includes(lastClick)) {
            setLastClick(prev => prev == 0 ? number : prev + '' + number)
        } else {
            setLastClick(number)
        }

        if (equalClick === true) {
            setFullEquation(number);
            setEqualClick(false);
            setLastClick(number);
        } else {
            setFullEquation(prev => prev == 0 ? number : prev + '' + number);
        }          
    }

    const clickSymbols = (symbol) => {
        if (equalClick === true) {
            setFullEquation(lastClick + symbol);
            setEqualClick(false);
        } else {
            setFullEquation(prev => prev + symbol);
        }
        setLastClick(symbol);     
    }

    const clickEqual = () => {
        if(equalClick) {
            return
        }
        let result = eval(fullEquation);
        console.log(result)
        setLastClick(result);
        setFullEquation(prev => prev + "=" + result);
        setEqualClick(true);
    }

    return (
        <div className="parent d-flex flex-column align-items-center">
            <div className="grid">
                <div className="d-flex flex-column align-items-end justify-content-end px-2"
                    style={ {gridArea: 'a'} }>
                    <div>{ fullEquation }</div>
                    <div>
                        
                        { lastClick }
                    
                    </div>
                </div>
                <div style={ {gridArea: 'b'} }
                    onClick={ clickClean }>
                    AC
                </div>
                <div style={ {gridArea: 'c'} }
                    onClick={ () => clickSymbols('/') }>
                    /
                </div>
                <div style={ {gridArea: 'd'} }
                    onClick={ () => clickSymbols('*') }>
                    *
                </div>
                <div style={ {gridArea: 'e'} }
                    onClick={ () => clickNumber(7) }>
                    7
                </div>
                <div style={ {gridArea: 'f'} }
                    onClick={ () => clickNumber(8) }>
                    8
                </div>
                <div style={ {gridArea: 'g'} }
                    onClick={ () => clickNumber(9) }>
                    9
                </div>
                <div style={ {gridArea: 'h'} }
                    onClick={ () => clickSymbols('-') }>
                    -
                </div>
                <div style={ {gridArea: 'i'} }
                    onClick={ () => clickNumber(4) }>
                    4
                </div>
                <div style={ {gridArea: 'j'} }
                    onClick={ () => clickNumber(5) }>
                    5
                </div>
                <div style={ {gridArea: 'k'} }
                    onClick={ () => clickNumber(6) }>
                    6
                </div>
                <div style={ {gridArea: 'l'} }
                    onClick={ () => clickSymbols('+') }>
                    +
                </div>
                <div style={ {gridArea: 'm'} }
                    onClick={ () => clickNumber(1) }>
                    1
                </div>
                <div style={ {gridArea: 'n'} }
                    onClick={ () => clickNumber(2) }>
                    2
                </div>
                <div style={ {gridArea: 'o'} }
                    onClick={ () => clickNumber(3) }>
                    3
                </div>
                <div style={ {gridArea: 'p'} }
                    className="d-flex justify-content-center align-items-center"
                    onClick={ clickEqual }>
                    <div >=</div>
                </div>
                <div style={ {gridArea: 's'} }
                    onClick={ () => clickNumber(0) }>
                    0
                </div>
                <div style={ {gridArea: 't'} }
                    onClick={ () => clickNumber('.') }>
                    .
                </div>    
            </div>
        </div>
    )
}

export default CalculatorComponent;