import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

function SetGrades() {
    const {studentID} = useParams();
    const [student, setStudent] = useState(null);

    return(
        <div>
            <h1>Set Student Grades</h1>
        </div>
    );
}

export default SetGrades