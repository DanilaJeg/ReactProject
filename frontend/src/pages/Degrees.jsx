import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteDegree from '../components/DeleteDegree';

function Degrees() {
    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/degree/')
            .then((response) => response.json())
            .then(data => setDegrees(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Degrees</h1>
            <ul>
                {degrees.map((degree) => (
                    <li key={degree.shortcode}>
                        <Link to={`/degree/${degree.shortcode}`}>{degree.full_name} - {degree.shortcode}</Link>

                    </li>
                    ))}
            </ul>
            <Link to={`/degree/create`}>Click Here to create a new degree.</Link>
        <DeleteDegree />
        </div>
    );
}

export default Degrees;
