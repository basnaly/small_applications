import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PostsContext from "./PostsContext";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreatePostComponent from "./CreatePostComponent";
import config from "./config";

const PostComponent = ({ logedUser, el }) => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    const { setIsPostsUpdate } = useContext(PostsContext);

    const DeletePost = (id) => {

        axios.post('/delete-post', { id }, config)
            .then(result => {
                setIsPostsUpdate(prev => !prev)
                console.log(result.data)
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
            })
    }

    return (
        <Card sx={{ minWidth: 275, maxWidth: 275 }} className="m-3"
            elevation={5} >
            <CardContent>
                <Typography variant="h5" component="div"
                    className="m-2">
                    {el.title}
                </Typography>
                <Typography variant="body2"
                    className="m-1">
                    {el.content}
                </Typography>

                <div className="d-flex align-items-baseline justify-content-between">
                    <Typography sx={{ fontSize: 16 }}
                        color="text.secondary"
                        className="m-1 mt-2"
                        style={{ textTransform: "capitalize" }}>
                        {el.user}
                    </Typography>

                    <Typography sx={{ fontSize: 14 }}
                        color="text.secondary"
                        className="m-1">
                        {new Date(el.updatedAt).toDateString()}
                    </Typography>
                </div>
            </CardContent>

            {el.user === logedUser ?
                <CardActions className="d-flex justify-content-between">

                    <CreatePostComponent logedUser={logedUser} 
                                        initialTitle={el.title} 
                                        initialContent={el.content}
                                        initialURL='/edit-post'
                                        id={el._id}
                                        buttonText='Edit'
                                        ButtonComponent={Button}/>

                    <Button onClick={() => DeletePost(el._id)}
                        className="px-3 mx-3" variant="outlined" color="error">
                        Delete
                    </Button>
                </CardActions>
                : ''
            }
        </Card>
    )

}

export default PostComponent;