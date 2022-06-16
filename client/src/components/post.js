import React from 'react';
import { Container } from 'react-bootstrap';

export default function post(props) {
    return (
        <div className="card" style={{ "width": "100%" }}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.text}</p>
            </div>
        </div >
    );
}
