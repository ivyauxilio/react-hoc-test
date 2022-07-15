import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Store } from './../../Store';
import PostList from './postList';

function Posts(props) {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [emptySearch, setEmptySearch] = useState(false);

    const { state, dispatch } = useContext(Store);

    const { posts, comments, users } = state;

    const fetchDataPosts = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
            return dispatch({
                type: 'FETCH_DATA_POSTS',
                payload: res.data,
            });
        });
    };
    const fetchDataUsers = () => {
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
            return dispatch({
                type: 'FETCH_DATA_USERS',
                payload: res.data,
            });
        });
    };
    const fetchDataComments = () => {
        axios.get('https://jsonplaceholder.typicode.com/comments').then(res => {
            return dispatch({
                type: 'FETCH_DATA_COMMENTS',
                payload: res.data,
            });
        });
    };

    useEffect(() => {
        fetchDataPosts();
        fetchDataUsers();
        fetchDataComments();
    }, []);

    const searchHandler = (search) => {
        setSearchTerm(search);
        if (search !== "") {
            const userList = users.filter(x => x.name === search || x.username === search || x.email === search);

            if (!userList.length <= 0) {
                const postSearchList = posts.filter(x => x.userId === userList[0].id);
                setSearchResults(postSearchList);
            } else {
                setEmptySearch(true);
            }
        } else {
            setSearchResults(posts);
            setEmptySearch(false);
        }
    };

    function clearBtn() {
        searchHandler('');
    }

    return (
        <div className="posts m-lg-5 m-3">
            <PostList
                posts={searchTerm ? searchResults : posts}
                users={users}
                comments={comments}
                searchKeyword={searchHandler}
                reset={clearBtn}
                emptySearch={emptySearch}
            />
        </div>
    );
}

export default Posts;

Posts.proTypes = {
    searchTerm: PropTypes.string,
    searchResults: PropTypes.array,
    emptySearch: PropTypes.bool,
};
