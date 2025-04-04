import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

function Cohorts() {
    const [cohorts, setCohorts] = useState([]);
    const [degree, setDegree] = useState(null);
    
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/cohort/")
            .then(response => response.json())
            .then((data) => setCohorts(data))
            .catch((error) => console.log("Error fetching data:", error))
    }, []);

    useEffect(() => {
        const fetchDegree = async () => {
            if (!cohorts) return;

            const degreePromises = cohorts.map((cohort) => 
                fetch(cohort.degree)
                    .then((response) => response.json())
            );

            try {
                const degreeData = await Promise.all(degreePromises);
                setDegree(degreeData);
            } catch(error) {
                console.error("Error fetching degree:", error);
            }
        };

        fetchDegree();
    }, [cohorts]);

    console.log(degree)


    return (
        <div>
            <h1>Cohorts</h1>
            <Link to="/cohort/create">Create a new cohort here</Link>
            <ul>
                {cohorts.map((cohort) => (
                    <li key={cohort.id}>
                        <Link to={`/cohort/${cohort.id}`}>{cohort.id}</Link> {cohort.name}                
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cohorts;