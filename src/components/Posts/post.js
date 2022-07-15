import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Store } from './../../Store';
import axios from 'axios';


// const Post = (props) => {
function Post(props) {
    const { state, dispatch } = useContext(Store);
    let { post, users } = state;
    let { id } = useParams();

    const fetchDataPost = async () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => {
            const data = res.data;
            return dispatch({
                type: 'FETCH_DATA_POST',
                payload: data
            });
        });
    };
    useEffect(() => {
        fetchDataPost();
    }, []);
    return (
        <div className="container my-5">
            <div className="border rounded text-black my-2 p-3">
                {users.filter(x => x.id === post.userId).map(user => (
                    <div key={user.id}>
                        <h4 className=''>{user.name}</h4>
                    </div>
                ))}
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        </div>
    )
}

export default Post;