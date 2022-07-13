import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { store } from './storeSetup/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/login';
import Register from './components/register';
import Main from './components/main';
import People from './components/people';
import CreatePost from './components/createPost';
import Home from './components/home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ToastContainer autoClose={5000} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index path="/" element={<Main></Main>} />
                        <Route index path="home" element={<Home></Home>} />
                        <Route path="people" element={<People />} />
                        <Route path='login' element={<Login></Login>}></Route>
                        <Route path='createPost' element={<CreatePost></CreatePost>}></Route>
                        <Route path='register' element={<Register></Register>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);