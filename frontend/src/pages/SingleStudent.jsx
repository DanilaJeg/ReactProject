import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

function SingleStudent() {
    const {studentID} = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/${studentID}/`)
            .then((response) => response.json())
            .then(data => setStudent(data))
            .catch((error) => console.log("Error fetching data:", error))
    }, []);

    if (!student) {
        return <p>Loading...</p>
    }
    console.log(student)

    return (
        <div>
            <p>{student.student_id}</p>
            <p>{student.email}</p>
        </div>
    );
}

export default SingleStudent;