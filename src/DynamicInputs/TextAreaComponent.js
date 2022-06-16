import React from "react";

import { Box, TextareaAutosize } from "@mui/material";

const TextAreaComponent = ( {value, onChange} ) => {

    return (

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextareaAutosize className=""
                aria-label="minimum height"
                minRows={3}
                placeholder={'Textarea field'}
                value={value}
                onChange={onChange}
            />
        </Box>

    )
}

export default TextAreaComponent;