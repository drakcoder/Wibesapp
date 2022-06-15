import React from 'react';
import { Container } from 'react-bootstrap';
import Cookies from 'js-cookie';

const axios = require('axios');
// axios.defaults.withCredentials = true;

const registerUser = async () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;
    let confirm_password = document.getElementById('confirmPassword').value;
    if (password != confirm_password) {
        alert("passwords are not matching");
    }
    let res = await axios.post('http://localhost:8000/register', { name, email, password });
    Cookies.set('token', res.data.token, { path: '' });
    return res.data;
};

export default function Register() {
    return (
        <Container>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="Nema">Name</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="Email">Email</label>
                        <input type="text" className="form-control" id="email" />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="Password">Password</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" />
                    </div>
                </div>
                <br />
                <button type="button" onClick={async () => {
                    let res = await registerUser();
                    window.location.replace('/home');
                }} className="btn btn-primary">Sign in</button>
            </form>
        </Container>
    );
}
