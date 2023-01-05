import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "react-bootstrap";
import WordItemComponent from "./WordItemComponent";


const styles = {
    table: {
        margin: '10px 100px',
        borderCollapse: 'collapse',
        height: '100%',
        backgroundColor: 'honeydew',
        borderRadius: '5px',
    },
    th: {
        border: '1px solid gray',
        borderRadius: '5px',
        padding: '5px',
        textAlign: 'center',
        fontSize: '18px',
    },
}

const WordsListComponent = () => {

    const listWords = useSelector(state => state?.words?.listWords)

    return (
        <div className="d-flex flex-column align-items-center my-4">
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>NN</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Word</th>
                        <th style={styles.th}>Answer</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listWords.map((el, i) =>
                        <WordItemComponent key={ el.id }
                            word={ el } index={ i + 1 } />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default WordsListComponent;