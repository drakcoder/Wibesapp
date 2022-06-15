import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, removeToken } from '../features/users/user';

const User = (props) => {
    return (
        <div className="card mb-4" style={{ "width": "100%" }}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.text}</p>
                <span href="#" className="btn btn-primary">Follow</span>
            </div>
        </div>
    );
};

export default User;