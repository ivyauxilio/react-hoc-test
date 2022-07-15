import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Posts from './components/Posts';
import Post from './components/Posts/post';
import { StoreProvider } from './Store';
import layout from './layout';

const Message = 'Hello from';

const PostsComponent = layout(Posts);
const PostComponent = layout(Post);

const MainApp = () =>
    <StoreProvider>
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate replace to="/posts" />}
                />
                <Route exact path="/posts" element={<PostsComponent message={Message} />} />
                <Route path="/post/:id" element={<PostComponent message={Message} />} />
            </Routes>
        </Router>
    </StoreProvider>;

export default MainApp;
