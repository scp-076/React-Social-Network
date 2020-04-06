import Posts from "./Posts";
import {connect} from "react-redux";
import {addPostAC, updateNewPostTextAC} from "../../../Redux/profile-reducer";


let mapStateToProps = (state) => {
    return{
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

let mapDispatchToProps = (dispatch) => {
    return{
        addPost: (newPostText) => dispatch(addPostAC(newPostText))
    }
};

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;