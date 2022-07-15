import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../../Store';

function Post() {
    const { state, dispatch } = useContext(Store);
    const { post, users } = state;
    const { id } = useParams();

    const fetchDataPost = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => {
            return dispatch({
                type: 'FETCH_DATA_POST',
                payload: res.data,
            });
        });
    };
    useEffect(() => {
        fetchDataPost();
    }, []);
    return (
        <div className="container my-5">
            <div className="border rounded text-black my-2 p-3 shadow-lg p-3 mb-5 bg-white ">
                
                {users.filter(x => x.id === post.userId).map(user => (
                    <div key={user.id}>
                        <h4>{user.name}</h4>
                    </div>
                ))}
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        </div>
    )
};

export default Post;
