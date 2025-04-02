import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [studentID, setStudentID] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [cohort, setCohort] = useState("");
    const [cohorts, setCohorts] = useState([]);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCohorts = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/cohort/`);
                if(!response.ok) {
                    throw new Error("Failed to fetch cohorts.");
                }

                const data = await response.json();
                setCohorts(data);
            } catch(error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchCohorts();
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newStudent = {
            student_id: studentID,
            first_name: first,
            last_name: last,
            cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
            email,
        }

        console.log(newStudent)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/student/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStudent)
            });

            if (!response.ok) throw new Error("Failed to create student.");
            setStudentID("");
            setFirst("");
            setLast("");
            setCohort("");
            setEmail("");

            navigate(`/student/${newStudent.student_id}`)

        } catch(error) {
            console.error("Error creating student:", error);
        }
    };

    return (
        <div>
            <h2>Create Student</h2>
            <form onSubmit={handleSubmit}>
                <label>Student ID:
                <input type="text" value={studentID} onChange={(e) => setStudentID(e.target.value)} required />
                </label>
                <br />
                <label>First Name:
                <input type="text" value={first} onChange={(e) => setFirst(e.target.value)} required />
                </label>
                <br />
                <label>Last Name:
                <input type="text" value={last} onChange={(e) => setLast(e.target.value)} required />
                </label>
                <br />
                <label>Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <br />
                <label>Cohort:
                <select value={cohort} onChange={(e) => setCohort(e.target.value)} required>
                    <option value="">Select Cohort</option>
                    {cohorts.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                </label>
                <br />
                <button type="submit" disabled={!first || !last || !studentID || !email || !cohort }>Create Student</button>
            </form>
        </div>
    );
}

export default CreateStudent;