import React, { useEffect, useState,useContext,Component } from 'react';
import PropTypes from 'prop-types';
import { Store } from './../../Store';
import PostList from './postList';
import axios from 'axios';


function Posts(props) {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [emptySearch, setEmptySearch] = useState(false);

    const { state, dispatch } = useContext(Store);

    let {posts,comments,users} = state;

    const fetchDataPosts = async () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
            const data = res.data;
            return dispatch({
                type: 'FETCH_DATA_POSTS',
                payload: data
              });
        });
      };
      const fetchDataUsers = async () => {
        axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
            const data = res.data;
            return dispatch({
                type: 'FETCH_DATA_USERS',
                payload: data
              });
        });
      };
      const fetchDataComments = async () => {
        axios.get(`https://jsonplaceholder.typicode.com/comments`).then(res => {
            const data = res.data;
            return dispatch({
                type: 'FETCH_DATA_COMMENTS',
                payload: data
              });
        });
      };

    useEffect(() => {
        fetchDataPosts();
        fetchDataUsers();
        fetchDataComments();
    }, []);

    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const userList = users.filter(x => x.name === searchTerm)
             if (!userList.length <= 0) {
                const postSearchList = posts.filter(x => x.userId === userList[0].id)
                setSearchResults(postSearchList);
            }else{
                setEmptySearch(true)
            }
        }else{
            setSearchResults(posts);
            setEmptySearch(false)
        }
    };

    function clearBtn() {
        searchHandler('')
    }

    return (
        <div className="posts m-5">
            <PostList
                posts={searchTerm ? searchResults : posts}
                users={users}
                comments={comments}
                searchKeyword={searchHandler}
                reset={clearBtn}
                emptySearch={emptySearch}
                message={props.Message}
            />
        </div>
    );
}

export default Posts;

Posts.proTypes = {
    searchTerm: PropTypes.string,
    searchResults: PropTypes.array,
    emptySearch: PropTypes.bool,
  }