import React,{useReducer} from 'react';

export const Store = React.createContext();

const initialState = {
    users: [],
    posts: [],
    comments: [],
    post: []
};

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_DATA_USERS':
            return { ...state, users: action.payload };
        case 'FETCH_DATA_POSTS':
            return { ...state, posts: action.payload };
        case 'FETCH_DATA_COMMENTS':
            return { ...state, comments: action.payload };
        case 'FETCH_DATA_POST':
            return { ...state, post: action.payload };
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return (
        <Store.Provider value={value}>{props.children}</Store.Provider>
    );
}