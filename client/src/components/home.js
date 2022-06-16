import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Post from './post';
import axios from 'axios';

var curr = 0;

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/getAllPosts');
                console.log(data);
                setPosts(data.posts);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, []);
    const [post, setPost] = useState(posts[curr]);
    const nextPost = () => {
        curr++;
        setPost(posts[curr]);
        console.log(curr);
    };
    return (
        <Container>
            {post != undefined ? (
                <div>
                    <Post title={post.properties.title} text={post.properties.description} className='mb-3'></Post>
                    <Container className='card text-center' style={{ "width": "100%" }}>
                        <div className='card-body'>
                            <button class="btn btn-primary btn-sm float-left"
                                id="left" >
                                Left
                            </button>

                            <button class="btn btn-warning btn-sm"
                                id="center" onClick={nextPost}>
                                Next
                            </button>

                            <button class="btn btn-danger btn-sm float-right"
                                id="right" >
                                Right
                            </button>
                        </div>
                    </Container>
                </div>
            )
                : (
                    <button onClick={() => { curr = -1; nextPost(); }}>Click here to get posts</button>
                )
            }
        </Container>
    );
}

export default Home;