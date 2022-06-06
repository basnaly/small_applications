import * as React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const InputComponent = ({ max, min, setMax, setMin }) => {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div className="d-flex">
                <TextField className="d-flex mx-2 text-center"
                    id="outlined-basic" label="Min" variant="outlined" 
                    size="small" type="number" 
                    value={ min } onChange={ (e) => setMin(e.target.value)}/>
                <TextField className="d-flex mx-2"
                    id="outlined-basic" label="Max" variant="outlined" 
                    size="small" type="number" 
                    value={ max } onChange={ (e) => setMax(e.target.value)}/>    
            </div>    
        </Box>
    )
}

export default InputComponent;