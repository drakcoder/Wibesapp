import React from 'react';
import Cookies from 'js-cookie';
const axios = require('axios');

const getCreds = async () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    console.log(email, password);
    const status = await axios.post('http://localhost:8000/login', { email: email, password: password });
    console.log(status);
    if (status.data.success) {
        Cookies.set('token', status.data.token, { path: '' });
    } else {
        alert('wrong creds');
        return;
    }
    window.location.replace('/home');
};

export default function Login() {
    return (
        <div className='container'>
            <form>
                <div className="form-row">
                    <div className='form-group col-md-6'>
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="text" class="form-control" id="email" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" />
                    </div>
                </div>
                <br />
                <button type="button" onClick={getCreds} class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
