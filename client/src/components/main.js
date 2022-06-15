import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Post from './post';

function Main() {
    return (
        <Container>
            <Row>
                <Col className='md-4'>
                    <h1>
                        Welcome to WibesApp
                    </h1>
                </Col>
            </Row>
        </Container>
    );
}

export default Main;