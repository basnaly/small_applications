import React, { useState } from "react";
import axios from "axios";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material";

const SubmitButton = styled(Button)({
    textTransform: 'none',
    color: 'dodgerblue',
    border: '1px solid dodgerblue',
    fontSize: '16px',
    backgroundColor: 'white',
    padding: '3px 7px',
})

const ClearButton = styled(Button)({
    textTransform: 'none',
    color: 'crimson',
    border: '1px solid crimson',
    fontSize: '16px',
    backgroundColor: 'white',
    padding: '3px 7px',
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid lightskyblue',
    boxShadow: 24,
    p: 4,
};

const requestURL = 'https://freecodecampbackend.basnaly.repl.co/timestamp/api/';
const TimestampComponent = () => {

    const [error, setError] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [showDate, setShowData] = useState({});

    const Submit = () => {
        setLoading(true);

        axios.get(requestURL + date)
            .then(result => {
                console.log(result.data)
                if (result?.data?.error) {
                    setError(result?.data?.error)
                } else {
                    setShowData(result.data)
                }
                setLoading(false)

            })
    }

    const Clear = () => {
        setDate('')
        setShowData({})
    }

    return (

        <Box sx={style} className="d-flex flex-column align-items-center">
            <Typography className="form-tsp d-flex flex-column align-items-center">
                Enter the date or the timestamp
            </Typography>

            <div className="error-tsp d-flex m-2">{error}</div>

            <Typography className="d-flex align-items-center justify-content-center"
                id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField className="mx-3 mb-2"
                    id="outlined-helperText"
                    label="Date or timestamp"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Typography>

            <div>
                <SubmitButton onClick={Submit}
                    variant={'outlined'}
                    className="mt-4 mx-3">
                    Submit
                </SubmitButton>

                <ClearButton onClick={Clear}
                    color={'error'}
                    variant={'outlined'}
                    className="mt-4 mx-3">
                    Clear
                </ClearButton>
            </div>

            { Object.keys(showDate).length > 0 &&
                <div className="d-flex flex-column align-items-center m-3">
                    <div className="format-tsp">
                        unix:
                        <span className="span-tsp">
                            {showDate?.unix}
                        </span>
                    </div>
                    <div className="format-tsp">
                        utc:
                        <span className="span-tsp">
                            {showDate?.utc}
                        </span>
                    </div>
                </div>
            }

        </Box>


    )
}

export default TimestampComponent;