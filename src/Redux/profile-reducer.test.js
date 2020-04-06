import profileReducer, {addPostAC, deletePostAC} from "./profile-reducer";

let state = {
    posts: [{id: 1, message: 'First message from props', likes: 1},
        {id: 2, message: 'Second message from props', likes: 2}]
};

it('posts length should be incremented', () => {

    // 1. test data
    let action = addPostAC('TESTTEST');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectations
    expect(newState.posts.length).toBe(3);
});

it('post message should be correct', () => {

    // 1. test data
    let action = addPostAC('TESTTEST');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectations
    expect(newState.posts[2].message).toBe('TESTTEST');
});

it('posts length should decrement after deletion ', () => {

    // 1. test data
    let action = deletePostAC(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectations
    expect(newState.posts.length).toBe(2);
});
