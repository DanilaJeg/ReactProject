import { Link } from "react-router-dom";

function Students() {
    return (
        <div>
            <h1>Create Student</h1>
            <Link to="/student/create">Add a new student here!</Link>
        </div>
    );
}

export default Students;