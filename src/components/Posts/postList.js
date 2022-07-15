import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { ListGroup } from 'react-bootstrap';
import './style.scss';

PostList.displayName = 'PostList'

function PostList(props) {

    const { users, comments, posts, reset, emptySearch } = props;
    const inputEl = useRef("");
    const [searchVal, setSearchValue] = useState("");


    function seach() {
        let string = inputEl.current.value;
        string = string && string.trim();
        props.searchKeyword(string);
    }

    const resetBtn = () => {
        setSearchValue('')
        reset()
    }
  
    return (

        <div>
            <div className="d-flex justify-content-end">
                <div className="col-lg-4">
                    <div className="input-group mb-3 search-wrapper">

                        <input type="text" className="form-control search-box"
                            ref={inputEl}
                            value={searchVal}
                            placeholder="Search..."
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button className="close-icon" type="reset" onClick={resetBtn}></button>
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={() => seach()} type="search">Search</button>
                        </div>
                    </div>
                </div>
            </div>


            <ListGroup >
                {!emptySearch ? posts.map(post =>
                (
                    <div key={post.id}>
                        <Link to={`/post/${post.id}`} className="text-decoration-none">
                            <ListGroup.Item >

                                {users.filter(x => x.id === post.userId).map(user => (
                                    <div key={user.id}>
                                        <small>Username</small>
                                        <h4 className=''>{user.name}</h4>
                                    </div>
                                ))}
                                <p>{post.body}</p>
                            </ListGroup.Item>

                        </Link>
                        {comments.filter(x => x.postId === post.id).map(comment => (
                            <div className="ms-5 my-3" key={comment.id}>
                                <h5>{comment.name}</h5>
                                <div className='border rounded text-black my-2 p-3' >
                                    <p>Comment: <em>{comment.body}</em></p>
                                </div>
                            </div>
                        ))}
                    </div>
                )) :
                    <div>
                        <h2>Empty Search</h2>
                    </div>
                }
            </ListGroup>
        </div>

    )
}

export default PostList;

PostList.proTypes = {
    inputEl: PropTypes.string,
    searchVal: PropTypes.string
  }