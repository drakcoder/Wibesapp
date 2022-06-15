import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import User from './user';

// const users = axios.get('http://localhost:8000/getAllUsers');

function People() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/getAllUsers');
                console.log(data);
                setUsers(data.users);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);
    // people.push(<User title={u.properties.name} text="test" className='mb-3'></User>);
    return (
        <Container>
            {users.map((u) => (<User title={u.properties.name} text="test" className='mb-3'></User>))}
        </Container>
    );
}

export default People;