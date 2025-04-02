import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

function Cohorts() {
    const [cohorts, setCohorts] = useState([]);
    
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/cohort/")
            .then(response => response.json())
            .then((data) => setCohorts(data))
            .catch((error) => console.log("Error fetching data:", error))
    }, []);

    return (
        <div>
            <h1>Cohorts</h1>
            <Link to="/cohort/create">Create a new cohort here</Link>
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

export default Cohorts;