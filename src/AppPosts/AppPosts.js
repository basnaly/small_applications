import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import './Posts.css';
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import SignUpComponent from "./SignUpComponents";
import SignInComponent from "./SignInComponents";
import CreatePostComponent from "./CreatePostComponent";
import PostsListsComponent from "./PostsListsComponent";
import PostsContext from "./PostsContext";
import config from "./config";

const LogoutButton = styled(Button)({
    textTransform: 'none',
    color: 'deeppink',
    border: '1px solid deeppink',
    fontSize: '16px',
    padding: '3px 7px',
    backgroundColor: 'white',
})

const AppPosts = () => {

    const [logedUser, setLogedUser] = useState('');
    const [isPostsUpdate, setIsPostsUpdate] = useState();

    const Logout = () => {
        setLogedUser('')
        sessionStorage.deleteItem('postAppAuth') //
    }

    const getMe = () => {
        axios.get('/me', config)
            .then(result => {
                setLogedUser(result.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        getMe()
    }, [])

    if (logedUser) {
        return (
            <PostsContext.Provider value={{ isPostsUpdate, setIsPostsUpdate }} >
                <div className="d-flex flex-column align-items-center">
                    <div className="loged-pst d-flex">
                        Hello, {logedUser} !
                    </div>
                    <LogoutButton onClick={Logout}
                        variant={'contained'}
                        className="d-flex align-self-end mx-5"
                    >
                        Logout
                    </LogoutButton>
                    <CreatePostComponent logedUser={logedUser} />
                    <PostsListsComponent logedUser={logedUser} />
                </div>
            </PostsContext.Provider>
        )
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="sign-pst d-flex flex-column align-items-center">
                Please sign up or sign in
            </div>
            <div className="d-flex m-3">
                <SignUpComponent setLogedUser={setLogedUser} />

                <SignInComponent setLogedUser={setLogedUser} />
            </div>

        </div>
    )
}

export default AppPosts;