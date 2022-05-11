import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { DeleteTransaction } from "./TransactonAction";

const styles = {
    td: {
        border: '1px solid gray',
        padding: '5px',
        fontSize: '18px',
    },
    button: {
        border: '1px solid #6c757d',
        borderRadius: '3px',
        margin: '2px',
        backgroundColor: 'mistyrose',
    },
}

const TransactionItemComponent = (props) => {

    const dispatch = useDispatch();

    const deleteTransaction = () => dispatch(DeleteTransaction(props.transaction.id));

    return (
        <tr>
            <td className="text-center" style={styles.td}>
                {props.index}
            </td>
            <td style={styles.td}>
                {props.transaction.date}
            </td>
            <td className="text-center" style={styles.td}>
                {props.transaction.description}
            </td>
            <td className="text-center" style={styles.td}>
                {props.transaction.sum}
            </td>
            <td className="text-center" style={styles.td}>
                <Button variant="light" size="sm"
                    onClick={ deleteTransaction }
                    style={styles.button}>
                    Delete
                </Button>
            </td>    
        </tr>

    )
}

export default TransactionItemComponent;