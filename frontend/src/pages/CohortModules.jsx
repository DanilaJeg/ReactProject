import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

function CohortModules() {
    const {cohortID} = useParams();
    const [modules, setModules] = useState([]);
    const [cohort, setCohort] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortID}`)
            .then((response) => response.json())
            .then((data) => setModules(data))
            .catch((error) => console.log("Error fetching data:", error))
        
        fetch(`http://127.0.0.1:8000/api/cohort/${cohortID}/`)
            .then((response) => response.json())
            .then((data) => setCohort(data))
            .catch((error) => console.log("Error fetching data:", error))
    }, []);

    if(!cohort) {
        return <p></p>
    }

    return (
        <div>
            <h1>{cohort.name}</h1>
            <ul>
                {modules.map((module) => (
                    <li key={module.code}>
                        <Link to={`/module/${module.code}`}>{module.code}</Link>: {module.full_name} {module.ca_split}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default CohortModules;