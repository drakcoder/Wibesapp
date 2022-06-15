import React from 'react';

export default function post(props) {
    console.log(props.title,);
    return (
        <div className="card" style={{ "width": "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.text}</p>
            </div>
        </div>
    );
}
