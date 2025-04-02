import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

function SingleDegreeCohort() {
    const { cohortID } = useParams();
    const [cohort, setCohort] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/${cohortID}/`)
            .then((response) => response.json())
            .then(data => setCohort(data))
            .catch((error) => console.log("Error fetching data:", error))

        fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohortID}`)
            .then((response) => response.json())
            .then(data => setStudents(data))
            .catch((error) => console.log("Error fetching data:", error))
    }, []);

    if (!cohort) {
        return (
            <p>
                Loading
            </p>
        )
    }

    return (
        <div>
            <h1>
                {cohort.name}
            </h1>
            <Link to={`/cohort/${cohort.id}/modules`}>Modules Delivered to This Cohort</Link>
            <ul>
                {students.map((student) => (
                        <li key={student.student_id}>
                            <Link to={`/student/${student.student_id}`}>{student.first_name} {student.last_name}</Link>
                        </li>
                ))}
            </ul>
        </div>
    );

}


export default SingleDegreeCohort;