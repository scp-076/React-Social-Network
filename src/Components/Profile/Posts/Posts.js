import React from 'react';
import Post from "./Post/Post";
import {ReduxPostForm} from "./PostForm";


const Posts = React.memo(props => {
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps !== this.props || nextState !== this.state;
    // } React.memo в принципе заменяет shouldComponentUpdate();


    let postsElements = props.posts.map((post, index) => <Post key={index} message={post.message}
                                                               likes={post.likes}/>);

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    };

    //let newPostElement = React.createRef(); // делает ссылку на какую-нибудь херню. Херня указывается в нужном теге
    // чтобы не использовать document.getElementBy()

    return (
        <div>
            <ReduxPostForm onSubmit={onAddPost}/>
            {postsElements}
        </div>
    )

});

export default Posts;