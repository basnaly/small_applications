import React from "react";
import { useState } from "react";

import { Button } from 'react-bootstrap';

const styles = {
    parent: {
        width: '500px',
        margin: 'auto',
        border: '1px solid gray',
        borderRadius: '10px',
        backgroundColor: 'beige',
        marginTop: '30px',
    },
    title: {
        fontSize: '28px',
        margin: '10px',
    },
    input: {
        width: '300px',
        padding: '5px 10px',
        margin: '10px',
    },
    service: {
        fontSize: '20px',
        margin: '10px',
    },
    select: {
        fontSize: '18px',
        padding: '5px 10px',
        margin: '10px',
    },
    button: {
        margin: '20px',
        fontSize: '18px',
    },
    tip: {
        fontSize: '20px',
        margin: '5px',
    },
    sum: {
        fontSize: '24px',
        margin: '5px',
        color: 'red',
    },
    last:{
        fontSize: '20px',
        margin: '5px',
        marginBottom: '20px'
    
    },
}

const serviceCoeff = [
    {mark: 'Excellent', coefficient: 0.05},
    {mark: 'Good', coefficient: 0.03},
    {mark: 'Middling', coefficient: 0.01},
    {mark: 'Bad', coefficient: 0},
];

const CalcComponent = () => {

    const [bill, setBill] = useState('');
    const [people ,setPeople] = useState('');
    const [service, setService] = useState('Excellent');
    const [tip, setTip] = useState('');
    const [sum, setSum] = useState('');
    const [billPerPerson, setBillPerPerson] = useState('');
    const [error, setError] = useState('');

    const validate = () => {
        
        let error = '';

        if (!bill) {
            error = 'The sum of bill cannot be blank';
        }
        else if (!people) {
            error = 'The number of people cannot be blank';
        }

        if (error) {
            setError(error);
            return false;
        }

        return true;
    }

    const calculate = () => {

        const isValid = validate();
        if (!isValid) {
            return;
        }

        console.log(service)
        let markService = serviceCoeff.find(el => el.mark === service).coefficient;

        let calcTip =  +((bill * 0.1) + (bill * markService)).toFixed(2);
        setTip(calcTip);

        let calcSum =  +((bill * 0.1 + bill) + (bill * markService)).toFixed(2);
        setSum(calcSum);

        let perPerson = +(calcSum / people).toFixed(2);
        setBillPerPerson(perPerson);
    }

    return(
        <div className="d-flex flex-column align-items-center"
                style={ styles.parent }>
            <div style={ styles.title }>
                Tip Calculator
            </div>
            <input name="bill"
                placeholder="How much was your bill?"
                value={ bill }
                style={ styles.input }
                onChange={e => setBill(+e.target.value)}
                type='number'
            />
            <input name="people"
                placeholder="How many people sharing the bill?"
                value={ people }
                style={ styles.input }
                onChange={e => setPeople(+e.target.value)}
                type='number'
            />

            <div data-testid="error-element"
                style={{ fontSize: 16, color: 'red' }}>
                {error}
            </div>

            <div className="d-flex flex-column align-items-center">
                <div style={ styles.service }>
                    How was the service?
                </div>
                <select  name="service" 
                        data-testid="select-element"
                        id="marks"
                        style={ styles.select }
                        value={ service }
                        onChange={e => setService(e.target.value)}>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Middling">Middling</option>
                    <option value="Bad">Bad</option>
                </select>
            </div>

            <Button onClick={ calculate }
                    style={ styles.button }
                    variant={ 'info' } >
                Calculate
            </Button>
            { tip !== '' &&
            <div className="d-flex flex-column align-items-center">
                <div style={ styles.tip }>
                    The tip is: 
                    <span data-testid="tip"
                        style={ styles.sum }>
                        { tip }</span>
                </div>
                <div style={ styles.tip }>
                    The bill with the tip is: 
                    <span data-testid="bill-tip"
                        style={ styles.sum }>
                        { sum }    
                    </span>
                </div>
                <div style={ styles.last }>
                    The bill with the tip per person: 
                    <span data-testid="per-person"
                        style={ styles.sum }>
                        { billPerPerson }
                    </span>
                </div>
            </div>
            }
        </div>
    )
}

export default CalcComponent;