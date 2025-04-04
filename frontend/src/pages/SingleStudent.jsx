import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function SingleStudent() {
    const { studentID } = useParams();
    const [student, setStudent] = useState(null);
    const [cohort, setCohort] = useState(null);
    const [modules, setModules] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentRes = await fetch(`http://127.0.0.1:8000/api/student/${studentID}/`);
                if (!studentRes.ok) throw new Error("Error fetching student.");
                const studentData = await studentRes.json();
                setStudent(studentData);

                const cohortRes = await fetch(studentData.cohort);
                if (!cohortRes.ok) throw new Error("Error fetching cohort.");
                const cohortData = await cohortRes.json();
                setCohort(cohortData);

                const gradesRes = await fetch(`http://127.0.0.1:8000/api/grade/?student=${studentID}`);
                if (!gradesRes.ok) throw new Error("Error fetching grades.");
                const gradesData = await gradesRes.json();
                setGrades(gradesData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudentData();
    }, [studentID]);

    useEffect(() => {
        if (!cohort?.id) return;

        const fetchModuleData = async () => {
            try {
                const ModuleRes = await fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohort.id}`);
                if (!ModuleRes.ok) throw new Error("Error fetching modules.");
                setModules(await ModuleRes.json());

                

            } catch (error) {
                console.error(error);
            }
        };

        fetchModuleData();
    }, [cohort]);

    if (!student) return <p>Loading...</p>;
    if (!cohort) return <p>Loading</p>;
    console.log(cohort)

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">{student.first_name} {student.last_name}</h1>
            
            {/* Student Info Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                <h2 className="text-xl font-semibold">Student Information</h2>
                </div>
                <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-medium">{student.student_id}</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{student.email}</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">Cohort</p>
                    <Link 
                        to={`/cohort/${cohort.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {cohort.id}
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Modules Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                <h2 className="text-xl font-semibold">Enrolled Modules</h2>
                </div>
                <div className="p-6">
                {modules.length === 0 ? (
                    <p className="text-gray-600">No modules enrolled.</p>
                ) : (
                    <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {modules.map((module, index) => {
                            const moduleGrade = grades.find(
                            (grade) => grade.module === `http://127.0.0.1:8000/api/module/${module.code}/`
                            );
                            return (
                            <tr key={module.code} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <Link 
                                    to={`/module/${module.code}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    {module.code}
                                </Link>
                                <p className="text-sm text-gray-500">{module.full_name}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                {moduleGrade ? (
                                    <span className="px-2 py-1 text-sm bg-green-100 text-green-900 rounded-full">
                                    {(moduleGrade.total_grade).toFixed(2).padStart(5, '0')}
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                                    No grade
                                    </span>
                                )}
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    </div>
                )}
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
                <Link 
                to={`/student/${student.student_id}/grade`} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                Manage Grades
                </Link>
                
                <Link 
                to={`/cohort/${cohort.id}`} 
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                View Student Cohort
                </Link>
            </div>
        </div> 
    );
}

export default SingleStudent;