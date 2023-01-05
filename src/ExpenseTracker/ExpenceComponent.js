import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Button, Dropdown,
    InputGroup, FormControl,
    DropdownButton, Card} from 'react-bootstrap';

import TransactionListComponent from "./TransactionListComponent";
import { SaveBudget } from "./TransactonAction";

const styles = {
    title: {
        fontSize: '34px',
        margin: '10px',
    },
    data: {
        fontSize: '22px',
        margin: '10px',

    },
    span: {
        fontSize: '22px',
        color: 'red',
        margin: '10px',
    },
    dropdown: {
        fontSize: '18px',
    },
    general: {
        fontSize: '18px',
    },
    sum: {
        fontSize: '18px',
        width: '100px',
        color: 'red',
        textAlign: 'center',
    },
    card: {
        fontSize: '18px',
        padding: '8px',
        color: 'red',
    },
    month: {
        padding: '0px',
    },
    save: {
        backgroundColor: '#e9ecef',
        color: '#212529',
        fontSize: '18px',
    },
    group: {
        display: 'flex',
        
    },
}

const month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const ExpenseComponent = () => {

    const currentDate = useSelector(state => state?.tracker?.date);
    console.log(currentDate)

    let todayDate = new Date();
    let date = month[todayDate.getMonth()] + ' ' + todayDate.getFullYear();

    const [budget, setBudget] = useState('');

    const dispatch = useDispatch();

    const saveBudget = (e) => {

        let addBudget = {

            budget: budget,
        }

        dispatch(SaveBudget(addBudget));
        console.log(budget)
    }

    return (
        <div>
            <div className="d-flex flex-column align-items-center">
                <div style={styles.title}>
                    Expense Tracker
                </div>
                <div className="d-flex align-items-center my-2">
                    <InputGroup className="mx-5">
                        <InputGroup.Text style={styles.general}>
                            Month:
                        </InputGroup.Text>
                        <Card style={styles.card}>
                            <Card.Body style={styles.month}>
                                {date}
                            </Card.Body>
                        </Card>
                    </InputGroup>

                    <InputGroup className="mx-5 w-auto flex-nowrap" style={styles.group}>
                        <InputGroup.Text style={styles.general} >
                            Budget:
                        </InputGroup.Text>
                        <FormControl style={styles.sum}
                            aria-label="Amount" 
                            name="budget"
                            value={ budget }
                            type="number" step="0.01"
                            onChange={e => setBudget(e.target.value)}
                        />
                        <Button style={styles.save}
                            variant="outline-secondary" 
                            id="button-addon3"
                            onClick={ saveBudget }>
                            Save
                        </Button>
                    </InputGroup>

                    <DropdownButton align="end" className="mx-5"
                        style={styles.dropdown}
                        title="Select payment method"
                        id="dropdown-menu-align-end"
                        variant="outline-secondary">
                        <Dropdown.Item eventKey="all"
                            style={styles.dropdown}>
                            All
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="mastercard"
                            style={styles.dropdown}>
                            Mastercard
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="visa"
                            style={styles.dropdown}>
                            Visa
                            </Dropdown.Item>
                        <Dropdown.Item eventKey="amex"
                            style={styles.dropdown}>
                            American Express
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="white"
                            style={styles.dropdown}>
                            Checks
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="cash"
                            style={styles.dropdown}>
                            Cash
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="other"
                            style={styles.dropdown}>
                            Other
                        </Dropdown.Item>
                    </DropdownButton>

                </div>
            </div>
            <TransactionListComponent />
        </div>
    )
}

export default ExpenseComponent;
