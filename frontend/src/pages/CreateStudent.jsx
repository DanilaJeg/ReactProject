import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CreateStudent() {
    const [studentID, setStudentID] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [cohort, setCohort] = useState("");
    const [cohorts, setCohorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCohorts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/cohort/');
                if (!response.ok) {
                    throw new Error("Failed to fetch cohorts.");
                }
                const data = await response.json();
                setCohorts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load cohorts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchCohorts();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const newStudent = {
            student_id: studentID,
            first_name: first,
            last_name: last,
            cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
            email: `${first.toLowerCase()}.${last.toLowerCase()}@dcu.ie`
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/student/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStudent)
            });

            if (!response.ok) throw new Error("Failed to create student.");
            
            navigate(`/student/${newStudent.student_id}`);
        } catch (error) {
            console.error("Error creating student:", error);
            setError("Failed to create student. Please check your inputs and try again.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">Create New Student</h1>
            <p className="text-gray-600 mb-6">Enter student details to register them in the system</p>
            
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p>{error}</p>
                </div>
            )}
            
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Student Information</h2>
                </div>
                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <p className="text-gray-500">Loading cohort data...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="studentID" className="block text-sm font-medium text-gray-700 mb-2">
                                    Student ID
                                </label>
                                <input
                                    id="studentID"
                                    type="text"
                                    value={studentID}
                                    onChange={(e) => setStudentID(e.target.value)}
                                    placeholder="Enter student ID (max 8 characters)"
                                    maxLength={8}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={first}
                                        onChange={(e) => setFirst(e.target.value)}
                                        placeholder="Enter first name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        value={last}
                                        onChange={(e) => setLast(e.target.value)}
                                        placeholder="Enter last name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="cohort" className="block text-sm font-medium text-gray-700 mb-2">
                                    Cohort
                                </label>
                                <select
                                    id="cohort"
                                    value={cohort}
                                    onChange={(e) => setCohort(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select a cohort</option>
                                    {cohorts.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            {first && last && (
                                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Email Preview</h3>
                                    <p className="text-blue-700 font-medium">{first.toLowerCase()}.{last.toLowerCase()}@dcu.ie</p>
                                    <p className="text-xs text-gray-500 mt-1">Email will be automatically generated based on the student's name</p>
                                </div>
                            )}
                            
                            <div className="flex justify-end mt-8 space-x-4">
                                <Link 
                                    to="/student" 
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={!studentID || !first || !last || !cohort}
                                    className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        !studentID || !first || !last || !cohort
                                            ? 'bg-blue-300 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    Create Student
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateStudent;