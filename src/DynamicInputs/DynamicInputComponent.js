import React, { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import InputComponent from "./InputComponent";
import TextAreaComponent from "./TextAreaComponent";

const InputButton = styled(Button)({
    textTransform: 'none',
    color: 'magenta',
    border: '1px solid magenta',
    fontSize: '16px',
    backgroundColor: 'white',
    padding: '3px 7px',
})

const TextareaButton = styled(Button)({
    textTransform: 'none',
    color: 'dodgerblue',
    border: '1px solid dodgerblue',
    fontSize: '16px',
    padding: '3px 7px',
})

const DynamicInputComponent = () => {

    const [inputs, setInputs] = useState([{type: 'input', value: ''}]);

    const addInputField = () => {
        setInputs(prev => [...prev, {type: 'input', value: ''}])
    }

    const addTextareaField = () => {
        setInputs(prev => [...prev, {type: 'textarea', value: ''}])
    }

    const changeInputValue = (index, newValue) => {
        console.log(index)
        console.log(newValue)
        setInputs(prev => {
            const newPrev = JSON.parse(JSON.stringify(prev)); // fullCopy to str & to obj
            newPrev[index].value = newValue; 
            return newPrev
        })
    }

    return (
        <div className="d-flex flex-column align-items-center m-3">
            {
                inputs.map((el, index) => el.type === 'input' ? 
                    <InputComponent key={ index} value={ el.value } onChange={ e => changeInputValue(index, e.target.value)}/>
                : <TextAreaComponent key={ index} value={ el.value } onChange={ e => changeInputValue(index, e.target.value)}/>)
            }

            <div className="d-flex m-3">
                <InputButton onClick={ addInputField }
                    variant={'outlined'}
                    className="m-1"
                    >
                    Add input field
                </InputButton>

                <TextareaButton onClick={ addTextareaField }
                    variant={'outlined'} className="align-self-center m-1"
                    size="small">
                    Add textarea field
                </TextareaButton>

            </div>

        </div>
    )
}

export default DynamicInputComponent;