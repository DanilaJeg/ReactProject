import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ModuleStudent() {
    const { moduleCode } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [module, setModule] = useState(null);
    const [studentCohorts, setStudentCohorts] = useState({});

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const moduleRes = await fetch(`http://127.0.0.1:8000/api/module/${moduleCode}/`);
                if (!moduleRes.ok) {
                    throw new Error('Error fetching module data');
                }

                const moduleData = await moduleRes.json(); 
                setModule(moduleData);

                const cohortUrls = moduleData.delivered_to || [];
                const cohortData = await Promise.all(
                    cohortUrls.map((url) => 
                        fetch(url)
                            .then(response => response.json()
                    ))
                );

                const studentData = await Promise.all(
                    cohortData.map(cohort =>
                        fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort.id}`)
                            .then(response => response.json())
                    )
                );

                const allStudents = studentData.flat();
                setStudents(allStudents);

                // Fetch cohort details for each student
                const cohortPromises = allStudents.map(student => 
                    fetch(student.cohort)
                        .then(response => response.json())
                        .then(cohortData => ({
                            studentId: student.student_id,
                            cohortID: cohortData.id
                        }))
                        .catch(() => ({
                            studentId: student.student_id,
                            cohortName: 'Unknown'
                        }))
                );
                
                const cohortDetails = await Promise.all(cohortPromises);
                
                const cohortMap = {};
                cohortDetails.forEach(detail => {
                    cohortMap[detail.studentId] = detail.cohortID;
                });
                
                setStudentCohorts(cohortMap);

            } catch (error) {
                console.error('Data fetch error:', error);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [moduleCode]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-pulse text-gray-600 text-lg font-medium">Loading module data...</div>
        </div>
    );
    
    if (error) return (
        <div className="max-w-4xl mx-auto p-6 bg-red-50 rounded-lg border border-red-200 mt-8">
            <div className="text-red-600 font-medium text-center">{error}</div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">{module.full_name}</h1>
            <p className="text-gray-600 mb-6">Module Code: {moduleCode}</p>
            
            {/* Module Information Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                <h2 className="text-xl font-semibold">Module Information</h2>
                </div>
                <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <p className="text-sm text-gray-500">Module Code</p>
                    <p className="font-medium">{moduleCode}</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{module.full_name}</p>
                    </div>
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
                <h2 className="text-xl font-semibold">Students Enrolled</h2>
                </div>
                <div className="p-6">
                {students.length === 0 ? (
                    <p className="text-gray-600">No students enrolled in this module.</p>
                ) : (
                    <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cohort</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {students.map((student, index) => (
                            <tr key={student.student_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link 
                                to={`/student/${student.student_id}`}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                {student.student_id}
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                {student.first_name} {student.last_name}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-600">
                                {student.email}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link 
                                to={`/cohort/${studentCohorts[student.student_id]}`}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                {studentCohorts[student.student_id] || 'Unknown'}
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
                to="/modules" 
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                Back to All Modules
                </Link>
                
                <Link 
                to={`/module/${moduleCode}/manage`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                Manage Module
                </Link>
            </div>
        </div>
    );
}

export default ModuleStudent;
