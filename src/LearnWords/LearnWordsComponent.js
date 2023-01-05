import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
    Button, Dropdown,
    InputGroup, FormControl,
    DropdownButton, Modal,
} from 'react-bootstrap';

import { AddWord } from "./WordsAction";
import WordsListComponent from "./WordsListComponent";

const styles = {
    title: {
        fontSize: '34px',
        margin: '10px',
        color: 'lime',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    },
    group: {
        backgroundColor: 'honeydew',
    },
    border: {
        border: '1px solid gray',
        borderRadius: '5px',
    },
    button: {
        backgroundColor: 'honeydew',
        border: '1px solid gray',
        borderRadius: '5px',
    }
}

const LearnWordsComponent = () => {

    const [word, setWord] = useState('');
    const [description, setDescription] = useState('');

    const listWords = useSelector(state => state?.words?.listWords);

    const dispatch = useDispatch();

    const save = e => {
        e.preventDefault();

        let addedWord = {
            id: new Date().getTime(),
            word: word,
            description: description,
        }

        dispatch(AddWord(addedWord));
        setWord('');
        setDescription('');
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div style={ styles.title }>
                Learn english words
            </div>
            <div className="d-flex align-items-center my-2">
                <InputGroup className="m-3"
                            style={ styles.border }>
                    <InputGroup.Text id="basic-addon1"
                                style={ styles.group }>
                        Word
                    </InputGroup.Text>
                    <FormControl
                        name="word"
                        placeholder="Type the word here"
                        value= { word }
                        type='text'
                        onChange={ e => setWord(e.target.value) }
                        aria-label="word"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>

                <InputGroup className="m-3"
                            style={ styles.border }>
                    <InputGroup.Text style={ styles.group }>
                        Description
                    </InputGroup.Text>
                    <FormControl 
                            as="textarea" 
                            name="description"
                            placeholder="Type the word's descriptions here"
                            value={ description }
                            type='text'
                            onChange={ e => setDescription(e.target.value) }
                            aria-label="description" />
                </InputGroup>

                <Button className="m-3"
                        variant="outline-secondary" 
                        id="button-addon1"
                        style={ styles.button }
                        onClick={ save }>
                    Save
                </Button>
            </div>
            <WordsListComponent />
        </div>
    )
}

export default LearnWordsComponent;