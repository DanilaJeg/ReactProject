import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ModuleStudent() {
    const [students, setStudents] = useState([]);
    const [cohorts, setCohorts] = useState([]);
    const [module, setModule] = useState(null);
    const { moduleCode } = useParams();

    useEffect(() => {
        const fetchModuleData = async () => {
            try {
                const moduleResponse = await fetch(`http://127.0.0.1:8000/api/module/${moduleCode}/`);
                const moduleData = await moduleResponse.json();
                setModule(moduleData);
            } catch (error) {
                console.error('Error fetching module data:', error);
            }
        };

        fetchModuleData();
    }, [moduleCode]);

    useEffect(() => {
        const fetchCohorts = async () => {
            if (!module || !module.delivered_to) return;

            const cohortPromises = module.delivered_to.map((url) =>
                fetch(url)
                    .then((response) => response.json())
            );

            try {
                const cohortsData = await Promise.all(cohortPromises);
                setCohorts(cohortsData);
            } catch (error) {
                console.error('Error fetching cohorts:', error);
            }
        };

        fetchCohorts();
    }, [module]);

    useEffect(() => {
        const fetchStudents = async () => {
            if (cohorts.length === 0) return;

            const studentPromises = cohorts.map((cohort) =>
                fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort.id}`)
                    .then((response) => response.json())
            );

            try {
                const studentsData = await Promise.all(studentPromises);
                // Flatten the array of student arrays into a single array.
                const allStudents = studentsData.flat();
                
                // Create a Set of student ids to avoid duplicates
                const uniqueStudents = Array.from(
                    new Set(allStudents.map((student) => student.student_id))
                ).map((id) => allStudents.find((student) => student.student_id === id));

                setStudents(uniqueStudents);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [cohorts]);

    if (!module || students.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Module: {module.full_name}</h1>
            <h2>Students in this module:</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.student_id}>
                        {student.first_name} {student.last_name} ({student.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ModuleStudent;
