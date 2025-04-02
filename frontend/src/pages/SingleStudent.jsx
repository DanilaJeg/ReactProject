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

    return (
        <div>
            <p>{student.student_id}</p>
            <p>{student.email}</p>
            <p>{student.first_name}</p>
            <ul>
                {modules.map((module) => {
                    const moduleGrade = grades.find((grade) => grade.module === `http://127.0.0.1:8000/api/module/${module.code}/`);
                    return (
                        <li key={module.code}>
                            <Link to={`/module/${module.code}`}>{module.code}</Link>
                            {moduleGrade ? (
                                <span> - Grade: {moduleGrade.total_grade}</span>
                            ) : (
                                <span> - No grade available</span>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default SingleStudent;