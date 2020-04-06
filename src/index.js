import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./Redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';

// ReactDOM.render(<App state={state} addPost={addPost}/>, document.getElementById('root'));

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );

// renderEntireTree(store.getState());

// store.subscribe(() => {
//     let state = store.getState();
//     renderEntireTree(state);
// });
// сабскрайб на обновления в store(для ререндера нужных штук) берет на себя connect (react-redux)

serviceWorker.unregister();
