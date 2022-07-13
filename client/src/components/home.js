import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Post from './post';
import axios from 'axios';
import Cookies from 'js-cookie';

var curr = 0;

function Home() {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const token = Cookies.get('token');
            const { data } = await axios.get('http://localhost:8000/getAllPosts', { headers: { token: token } });
            console.log(data);
            setPosts(data.posts);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    const [post, setPost] = useState(posts[curr]);
    const nextPost = () => {
        curr++;
        setPost(posts[curr]);
        console.log(curr);
    };
    const likePost = async (uid) => {
        console.log(uid);
        const token = Cookies.get('token');
        console.log(token);
        const status = await axios.patch("http://localhost:8000/updatePost", { uid, token, action: 'like' });
        if (status) {
            curr++;
            setPost(posts[curr]);
        } else {
            alert("An error occurred");
        }
    };
    const dislikePost = async (uid) => {
        console.log(uid);
        const token = Cookies.get('token');
        console.log(token);
        const status = await axios.patch("http://localhost:8000/updatePost", { uid, token, action: 'dislike' });
        if (status) {
            curr++;
            setPost(posts[curr]);
        } else {
            alert("An error occurred");
        }
    };
    return (
        <Container>
            {post != undefined ? (
                <div>
                    <Post title={post.properties.title} text={post.properties.description} className='mb-3'></Post>
                    <Container className='card text-center' style={{ "width": "100%" }}>
                        <div className='card-body'>
                            <button class="btn btn-primary btn-sm float-left"
                                id="left" onClick={() => dislikePost(post.properties.uid)} >
                                Left
                            </button>

                            <button class="btn btn-warning btn-sm"
                                id="center" onClick={nextPost}>
                                Next
                            </button>

                            <button class="btn btn-danger btn-sm float-right"
                                id="right" onClick={() => likePost(post.properties.uid)} >
                                Right
                            </button>
                        </div>
                    </Container>
                </div>
            )
                : (
                    <button onClick={async () => { curr = -1; await fetchPosts(); nextPost(); }}>Click here to get posts</button>
                )
            }
        </Container>
    );
}

export default Home;