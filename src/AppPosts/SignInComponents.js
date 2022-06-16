import React from "react";
import axios from "axios";
import { useState } from "react";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material";


const SignInButton = styled(Button)({
    textTransform: 'none',
    color: 'dodgerblue',
    border: '1px solid dodgerblue',
    fontSize: '16px',
    backgroundColor: 'white',
    padding: '3px 7px',
})

const SubmitButton = styled(Button)({
    textTransform: 'none',
    color: 'dodgerblue',
    border: '1px solid dodgerblue',
    fontSize: '16px',
    backgroundColor: 'white',
    padding: '3px 7px',
})

const CancelButton = styled(Button)({
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

const SignInComponent = ( { setLogedUser } ) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
 
    const handleOpen = () => setIsModalOpen(true)
    const handleClose = () => setIsModalOpen(false);
    
    const Submit = () => {

        setLoading(true);

        axios.post('/signin', { username, password } )
            .then(result => {
                //setData(result.data)
                sessionStorage.setItem('postAppAuth', result.data);
                console.log(result.data)
                setLoading(false)
                setIsModalOpen(false)
                setLogedUser(username)
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
                setPassword('')
            })
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <SignInButton onClick={ handleOpen }
                variant={'outlined'}
                className="mx-3"
            >
                Sign in
            </SignInButton>

            <Modal className="d-flex flex-column align-items-center"
                open={ isModalOpen }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} className="d-flex flex-column align-items-center">
                    <Typography className="form-pst d-flex flex-column align-items-center mb-3">
                        Sign in form
                    </Typography>

                    <div className="error-pst d-flex mb-2">{ error }</div>

                    <div className="d-flex">
                        <Typography className="d-flex align-items-center justify-content-center"
                            id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField className="mx-3"
                                id="outlined-helperText"
                                label="Username"
                                value={ username }
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Typography>

                        <Typography className="d-flex align-items-center justify-content-center"
                            id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField className="mx-3"
                                id="outlined-helperText"
                                label="Password"
                                value={ password }
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                            />
                        </Typography>
                    </div>

                    <div>
                        <SubmitButton onClick={ Submit }
                            variant={'outlined'}
                            disabled={ loading }
                            className="mt-4 mx-3">
                            {
                                loading ? 'Saving...' : 'Submit'
                            }
                            
                        </SubmitButton>

                        <CancelButton onClick={ handleClose }
                            variant={'outlined'}
                            className="mt-4 mx-3">
                            Cancel
                        </CancelButton>
                    </div>
                </Box>

            </Modal>
        </div>
    )
}

export default SignInComponent;