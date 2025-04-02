import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function SingleDegree() {
    const { shortcode } = useParams();
    const [degree, setDegree] = useState(null);
    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/degree/${shortcode}`)
            .then((response) => response.json())
            .then(data => setDegree(data))
            .catch((error) => console.error('Error fetching data:', error));
        
        fetch (`http://127.0.0.1:8000/api/cohort/?degree=${shortcode}`)
            .then((response) => response.json())
            .then(data => setCohorts(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (!degree) {
        return <p>Loading...</p>
    }
    
    return (
        <div>
        <h1>{degree.full_name} Cohorts</h1>
        <ul>
            {cohorts.map((cohort) => (
            <li key={cohort.id}>
                <Link to={`/cohort/${cohort.id}`}>{cohort.id}</Link>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default SingleDegree;