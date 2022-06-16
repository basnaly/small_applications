import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button, Typography, TextareaAutosize } from "@mui/material";
import { styled } from "@mui/material";
import PostsContext from "./PostsContext";
import config from "./config";

const AddPostButton = styled(Button)({
    textTransform: 'none',
    color: 'blue',
    border: '1px solid blue',
    fontSize: '16px',
    backgroundColor: 'white',
    padding: '3px 7px',
})

const SendButton = styled(Button)({
    textTransform: 'none',
    color: 'forestgreen',
    border: '1px solid forestgreen',
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

const CreatePostComponent = ( { 
    logedUser,
    initialTitle = '', 
    initialContent = '',
    initialURL = '/add-post',
    id,
    buttonText = 'Add post', 
    ButtonComponent = AddPostButton
}) => {

    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');

    const { setIsPostsUpdate } = useContext(PostsContext);

    const handleOpen = () => setIsModalOpen(true)
    const handleClose = () => setIsModalOpen(false);

    const Submit = () => {

        if (!title || !content) {
            setError('Title and content cannot be empty')
            return
        }

        setLoading(true);

        axios.post(initialURL, {title, content, logedUser, id}, config)
            .then(result => {
                console.log(result.data)
                setLoading(false)
                if (!id) {
                    setTitle('')
                    setContent('')
                }
                setIsModalOpen(false)
                setIsPostsUpdate(prev => !prev)  
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
            })
    }

    useEffect(() => {
        setTitle(initialTitle)
    }, [initialTitle])

    useEffect(() => {
        setContent(initialContent)
    }, [initialContent])

    return (
        <div className="d-flex flex-column align-items-center">
            <ButtonComponent onClick={ handleOpen }
                variant={'outlined'}
                className="mx-3"
            >
                {buttonText}
            </ButtonComponent>

            <Modal className="d-flex flex-column align-items-center"
                open={ isModalOpen }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} className="d-flex flex-column align-items-center">
                    <Typography className="form-pst d-flex flex-column align-items-center">
                        Create post form
                    </Typography>

                    <div className="error-pst d-flex mb-2">{error}</div>

                    <Typography className="d-flex align-items-center justify-content-center"
                        id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField className="field-pst mx-3"
                            id="outlined-helperText"
                            label="Title"
                            value={ title }
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setError('');
                            }}
                        />
                    </Typography>

                    <Typography className="d-flex align-items-center justify-content-center"
                        id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextareaAutosize className="area-pst"
                            aria-label="minimum height"
                            minRows={3}
                            placeholder={'Content'}
                            value={ content }
                            onChange={(e) => {
                                setContent(e.target.value);
                                setError('');
                            }}
                        />
                    </Typography>

                    <div>
                        <SendButton onClick={ Submit }
                            variant={'outlined'}
                            disabled={loading}
                            className="mt-4 mx-3">
                            {
                                loading ? 'Saving...' : 'Submit'
                            }
                        </SendButton>

                        <CancelButton onClick={handleClose}
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

export default CreatePostComponent;