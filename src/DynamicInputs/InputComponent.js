import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const InputComponent = ( {value, onChange}) => {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-helperText"
                label="Input field"
                value={value}
                onChange={onChange}
            />
        </Box>
    )
}

export default InputComponent;