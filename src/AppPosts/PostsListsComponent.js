import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import config from "./config";

import PostComponent from "./PostComponent";
import PostsContext from "./PostsContext";

const PostsListsComponent = ({ logedUser }) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { isPostsUpdate } = useContext(PostsContext);

    const getPosts = () => {

        setLoading(true);

        axios.get('/list-posts', config)
            .then(result => {
                console.log(result.data)
                setPosts(result.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
            })
    }

    useEffect(() => {
        getPosts()
    }, [isPostsUpdate]) 

    return (
        <div className="d-flex flex-wrap justify-content-center mt-3">
            { posts.map(el => 
                <PostComponent logedUser={logedUser}
                    isPostsUpdate={isPostsUpdate}
                    el={ el } key={ el._id }/>
                )
            }
        </div>
    )
}

export default PostsListsComponent;