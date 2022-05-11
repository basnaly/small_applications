import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { useEffect } from "react";
import { DeleteWord } from "./WordsAction";

const styles = {
    td: {
        border: '1px solid gray',
        padding: '5px',
        fontSize: '18px',
    },
    check: {
        border: '1px solid #6c757d',
        borderRadius: '3px',
        margin: '2px',
        backgroundColor: 'aquamarine',
    },
    input: {
        fontSize: '18px',
        textAlign: 'center',
        color: 'blue'
    },
    delete: {
        border: '1px solid #6c757d',
        borderRadius: '3px',
        margin: '2px',
        backgroundColor: 'lavender',
    },
}

const WordItemComponent = (props) => {

    const [translation, setTranslation] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    let color = 'blue';
    if (translation === props.word.word) color = 'red';
    else if (translation === '') color = 'transparent';

    useEffect(() => {
        if (translation === props.word.word) {
            setTimeout(() => {
                setTranslation('')
            }, 5000)
        }
    }, [translation]);

    const dispatch = useDispatch();

    const deleteWord = () => {
        dispatch(DeleteWord(props.word.id))
        setShowModal(false)
    }

    return (
        <tr>
            <td className="text-center" style={styles.td}>
                {props.index}
            </td>
            <td style={styles.td}>
                {props.word.description}
            </td>
            <td className="text-center" style={styles.td}>
                <InputGroup className="m-0">
                    <FormControl
                        name="translation"
                        placeholder="type the word here"
                        value={translation}
                        type='text'
                        onChange={e => setTranslation(e.target.value)}
                        style={styles.input}
                        aria-label="translation"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </td>
            <td className="text-center" style={{ ...styles.td, color: color }} >
                {(translation === props.word.word)
                    ? 'Right!' : 'Wrong!'
                }
            </td>
            <td className="text-center" style={styles.td}>
                <Button variant="light" size="sm"
                    onClick={() => setShowModal(true)}
                    style={styles.delete}>
                    Learnt!
                </Button>

                <Modal show={showModal} onHide={ handleClose }>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete the word</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Have you already learnt this word?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={ handleClose }>
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={deleteWord}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>


            </td>
        </tr>
    )
}

export default WordItemComponent;
