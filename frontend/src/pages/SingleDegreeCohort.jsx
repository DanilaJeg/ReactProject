import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

function SingleDegreeCohort() {
    const { cohortID } = useParams();
    const [cohort, setCohort] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [degree, setDegree] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch cohort data
                const cohortResponse = await fetch(`http://127.0.0.1:8000/api/cohort/${cohortID}/`);
                if (!cohortResponse.ok) throw new Error("Failed to fetch cohort");
                const cohortData = await cohortResponse.json();
                setCohort(cohortData);
                
                // Fetch students in this cohort
                const studentsResponse = await fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohortID}`);
                if (!studentsResponse.ok) throw new Error("Failed to fetch students");
                const studentsData = await studentsResponse.json();
                setStudents(studentsData);
                
                // Fetch degree data for this cohort
                const degreeResponse = await fetch(cohortData.degree);
                if (!degreeResponse.ok) throw new Error("Failed to fetch degree");
                const degreeData = await degreeResponse.json();
                setDegree(degreeData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cohortID]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!cohort) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                    <p className="text-red-700">Cohort not found</p>
                </div>
                <Link 
                    to="/cohort"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                >
                    Back to Cohorts
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">{cohort.name}</h1>
            <p className="text-gray-600 mb-6">Cohort ID: {cohort.id}</p>
            
            {/* Cohort Info Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Cohort Information</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Cohort ID</p>
                            <p className="font-medium">{cohort.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{cohort.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium">Year {cohort.year}</p>
                        </div>
                        {degree && (
                            <div>
                                <p className="text-sm text-gray-500">Degree</p>
                                <Link 
                                    to={`/degree/${degree.shortcode}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    {degree.full_name} ({degree.shortcode})
                                </Link>
                            </div>
                        )}
                        <div>
                            <p className="text-sm text-gray-500">Students Enrolled</p>
                            <p className="font-medium">{students.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Students Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Students</h2>
                        <Link 
                            to="/student/create"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                        >
                            Add New Student
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    {students.length === 0 ? (
                        <p className="text-gray-600">No students enrolled in this cohort.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {students.map((student, index) => (
                                        <tr key={student.student_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                {student.student_id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {student.first_name} {student.last_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {student.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link 
                                                    to={`/student/${student.student_id}`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    View Profile
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
                <Link 
                    to="/cohort"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                >
                    Back to All Cohorts
                </Link>
                
                <Link 
                    to={`/cohort/${cohort.id}/modules`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                    View Modules
                </Link>
            </div>
        </div>
    );
}

export default SingleDegreeCohort;