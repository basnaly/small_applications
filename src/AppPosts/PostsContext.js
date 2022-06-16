import React, { createContext} from "react";

const PostsContext = createContext({
    isPostsUpdate: false,
    setIsPostsUpdate: () => {}
})

export default PostsContext;