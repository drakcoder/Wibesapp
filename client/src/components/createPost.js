import React from 'react';
import { Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createPost = async () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const token = Cookies.get('token');
    console.log(token);
    const status = await axios.post("http://localhost:8000/createPost", { title, description, token });
    if (status) {
        await toast("Post Created!", { autoClose: 5000 });
        setTimeout(() => {
            window.location.replace('/home');
        }, 5000);
        return;
    }
    alert("an error occured");
};

function CreatePost() {
    return (
        <Container>
            <ToastContainer />
            <div className="card" style={{ "width": "100%" }}>
                <div className="card-body">
                    <label>Title of Post: </label>
                    <input type="text" id='title'></input>
                    <br></br>
                    <label>Description: </label>
                    <input type="text" id='description'></input>
                    <br></br>
                    <a className='btn btn-primary' onClick={createPost}>Create</a>
                </div>
            </div>
        </Container>
    );
}

export default CreatePost;