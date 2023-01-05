import React from "react";
import { useState } from "react";

import { Button } from "react-bootstrap";
import TransactionItemComponent from "./TransactionItemComponent";
import AddTransactionForm from './AddTransactionForm';
import { useSelector } from "react-redux";

const styles = {
    table: {
        margin: '10px',
        borderCollapse: 'collapse',
        height: '100%',
    },
    th: {
        border: '1px solid gray',
        borderRadius: '2px',
        padding: '5px',
        textAlign: 'center',
        fontSize: '18px',
    },
    total: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '10px',
    },
    span: {
        fontSize: '20px',
        color: 'red',
        margin: '10px',
    },
    button: {
        border: '1px solid #6c757d',
        borderRadius: '3px',
        margin: '2px',
        backgroundColor: 'rgb(233, 236, 239)',
    },
}

const TransactionListComponent = () => {

    const [addTransaction, setAddTransaction] = useState(false);

    const transactionList = useSelector(state => state?.tracker?.transactionList);
    const budget = useSelector(state => state?.tracker?.budget);
    console.log(budget)

    let total = +(transactionList.reduce((acc, curr) => acc + curr.sum , 0)).toFixed(2);
    console.log(total);

    let obj = budget;
    let restBudget = +(+obj.budget - total).toFixed(2); 

    return (
        <div className="d-flex flex-column align-items-center my-4">
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>NN</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Sum</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionList.map((el, i) =>
                        <TransactionItemComponent key={ el.id }
                            transaction={el} index={i + 1} />
                    )}
                </tbody>
            </table>
            <div className="d-flex align-items-center my-4">
                <div style={styles.total}>
                    Total:
                    <span style={styles.span}>
                        { total }
                    </span>
                </div>
                <div style={styles.total}>
                    Rest budget:
                    <span style={styles.span}>
                        { restBudget }
                    </span>
                </div>

            </div>
            

            {addTransaction ?
                <AddTransactionForm close={() => setAddTransaction(false)} />//props
                :
                <Button className="mx-5"
                    style={styles.button}
                    variant={'light'}
                    onClick={() => setAddTransaction(prev => !prev)}>
                    Add
                </Button>
            }

        </div>
    )
}

export default TransactionListComponent;
