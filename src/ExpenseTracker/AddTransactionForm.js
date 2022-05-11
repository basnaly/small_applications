import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, InputGroup, FormControl } from "react-bootstrap";
import { AddTransaction } from "./TransactonAction";
import moment from "moment";

const styles = {
    form: {
        fontSize: '18px',
    },
    save: {
        fontSize: '18px',
        backgroundColor: '#e9ecef',
        color: '#212529',
    },
}

const AddTranactionForm = () => {

    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [sum, setSum] = useState('');
    const [payment, setPayment] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const validate = () => {
        let error = '';

        if (!date) {
            error = 'Date cannot be blank';
        }

        if (!description) {
            error = 'Description cannot be blank';
        }

        if (!sum) {
            error = 'Sum cannot be blank';
        }

        if (error) {
            setError(error)
            return false;
        }

        return true;
    }

    const save = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) {
            return
        }

        let formatedDate = moment(date).format('DD/MM/YYYY');

        let addedTransaction = {
            id: new Date().getTime(),
            date: formatedDate,
            description: description,
            sum: +sum,
        }

        dispatch(AddTransaction(addedTransaction));

        setDate('');
        setDescription('');
        setSum('');
        setError('');
    }

    return (
        <div>
            {/* <div>Mastercard</div> */}
            <div className="my-3">
                <InputGroup className="mb-3" >
                    <InputGroup.Text style={styles.form}>
                        Payment{ payment }
                    </InputGroup.Text>
                    <FormControl aria-label="date"
                        name="date"
                        placeholder="Enter the date"
                        value={date}
                        type="date" step='1'
                        style={styles.form}
                        onChange={e => setDate(e.target.value)}
                    />
                    <FormControl aria-label="description"
                        name="description"
                        placeholder="Enter description"
                        value={description}
                        type="text"
                        style={styles.form}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <FormControl aria-label="sum"
                        name="sum"
                        placeholder="Enter the sum"
                        value={sum}
                        type="number" step="0.01"
                        style={styles.form}
                        onChange={e => setSum(e.target.value)}
                    />
                    <Button variant="outline-secondary" id="button-addon2"
                        style={styles.save}
                        onClick={ save }>
                        Save
                    </Button>
                </InputGroup>

                <div data-testid="error-element"
                    style={{ fontSize: 14, color: 'red' }}>
                    {error}
                </div>
            </div>

        </div>
    )
}

export default AddTranactionForm;
