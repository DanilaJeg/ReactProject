import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SetGrades = () => {
    const { student_id } = useParams();
    const navigate = useNavigate();
    
    const [student, setStudent] = useState(null);
    const [existingGrades, setExistingGrades] = useState([]);
    const [availableModules, setAvailableModules] = useState([]);
    const [cohortModules, setCohortModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Form state for adding a new grade
    const [newGrade, setNewGrade] = useState({
        module: '',
        ca_mark: 0,
        exam_mark: 0,
        student: `http://127.0.0.1:8000/api/student/${student_id}/`,
        cohort: ''
    });
    
    // Form state for editing existing grades
    const [editedGrades, setEditedGrades] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            
            // Fetch student details
            console.log(student_id)
            const studentResponse = await fetch(`http://127.0.0.1:8000/api/student/${student_id}/`);
            if (!studentResponse.ok) throw new Error('Failed to fetch student data');
            const studentData = await studentResponse.json();
            setStudent(studentData);
            
            // Get cohort ID from student's cohort URL
            const cohortId = studentData.cohort.split('/').filter(Boolean).pop();
            
            // Fetch existing grades for the student
            const gradesResponse = await fetch(`http://127.0.0.1:8000/api/grade/?student=${student_id}`);
            if (!gradesResponse.ok) throw new Error('Failed to fetch grades data');
            const gradesData = await gradesResponse.json();
            setExistingGrades(gradesData);
            
            // Initialize edited grades state with existing grades
            const grades = {};
            gradesData.forEach(grade => {
            grades[grade.id] = {
                ca_mark: grade.ca_mark,
                exam_mark: grade.exam_mark
            };
            });
            setEditedGrades(grades);
            
            // Fetch modules delivered to the student's cohort
            const cohortModulesResponse = await fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortId}`);
            if (!cohortModulesResponse.ok) throw new Error('Failed to fetch cohort modules');
            const cohortModulesData = await cohortModulesResponse.json();
            setCohortModules(cohortModulesData);
            
            // Determine modules without grades (available for adding new grades)
            const gradedModuleCodes = gradesData.map(grade => {
            // Extract module code from URL
            return grade.module.split('/').filter(Boolean).pop();
            });
            
            const modulesWithoutGrades = cohortModulesData.filter(module => 
            !gradedModuleCodes.includes(module.code)
            );
            
            setAvailableModules(modulesWithoutGrades);
            
            // Set cohort in new grade state
            setNewGrade(prev => ({
            ...prev,
            cohort: studentData.cohort
            }));
            
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Error loading data. Please try again.');
            setLoading(false);
        }
        };
        
        fetchData();
    }, [student_id]);
    
    const handleUpdateGrade = async (gradeId) => {
        try {
        const response = await fetch(`http://127.0.0.1:8000/api/grade/${gradeId}/`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedGrades[gradeId])
        });
        
        if (!response.ok) throw new Error('Failed to update grade');
        
        setError('');
        
        // Refresh grades data
        const gradesResponse = await fetch(`http://127.0.0.1:8000/api/grade/?student=${student_id}`);
        if (!gradesResponse.ok) throw new Error('Failed to refresh grades data');
        const gradesData = await gradesResponse.json();
        setExistingGrades(gradesData);
        
        // Update message
        alert('Grade updated successfully!');
        } catch (err) {
        console.error('Error updating grade:', err);
        setError('Failed to update grade. Please try again.');
        }
    };
    
    const handleAddNewGrade = async (e) => {
        e.preventDefault();
        
        if (!newGrade.module) {
            setError('Please select a module');
            return;
        }
        
        try {
        const response = await fetch('http://127.0.0.1:8000/api/grade/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGrade)
        });
        
        if (!response.ok) throw new Error('Failed to add new grade');
        
        setError('');
        alert('New grade added successfully!');
        
        // Reset form
        setNewGrade({
            module: '',
            ca_mark: 0,
            exam_mark: 0,
            student: `http://127.0.0.1:8000/api/student/${student_id}/`,
            cohort: student.cohort
        });
        
        // Refresh data
        const gradesResponse = await fetch(`http://127.0.0.1:8000/api/grade/?student=${student_id}`);
        if (!gradesResponse.ok) throw new Error('Failed to refresh grades data');
        const gradesData = await gradesResponse.json();
        setExistingGrades(gradesData);
        
        // Update available modules
        const gradedModuleCodes = gradesData.map(grade => {
            return grade.module.split('/').filter(Boolean).pop();
        });
        
        const modulesWithoutGrades = cohortModules.filter(module => 
            !gradedModuleCodes.includes(module.code)
        );
        
        setAvailableModules(modulesWithoutGrades);
        } catch (err) {
        console.error('Error adding grade:', err);
        setError('Failed to add grade. Please try again.');
        }
    };
    
    const handleInputChange = (gradeId, field, value) => {
        // Ensure value is within valid range (0-100)
        const numValue = parseInt(value);
        const validValue = isNaN(numValue) ? 0 : Math.min(100, Math.max(0, numValue));
        
        setEditedGrades(prev => ({
        ...prev,
        [gradeId]: {
            ...prev[gradeId],
            [field]: validValue
        }
        }));
    };
    
    const handleNewGradeChange = (field, value) => {
        // Ensure value is within valid range for marks (0-100)
        if (field === 'ca_mark' || field === 'exam_mark') {
        const numValue = parseInt(value);
        const validValue = isNaN(numValue) ? 0 : Math.min(100, Math.max(0, numValue));
        
        setNewGrade(prev => ({
            ...prev,
            [field]: validValue
        }));
        } else {
        setNewGrade(prev => ({
            ...prev,
            [field]: value
        }));
        }
    };
    
    const goBack = () => {
        navigate(`/student/${student_id}`);
    };
    
    if (loading) return <div className="flex justify-center items-center min-h-screen"><h2 className="text-xl font-semibold">Loading...</h2></div>;
    if (error && !student) return <div className="flex justify-center items-center min-h-screen"><h2 className="text-xl font-semibold text-red-600">Error: {error}</h2></div>;
    
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Manage Grades for {student?.first_name} {student?.last_name}</h1>
        <p className="text-gray-600 mb-6">Student ID: {student?.student_id}</p>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative">{error}</div>}
        
        <div className="bg-white shadow-md rounded-lg mb-8">
            <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
            <h2 className="text-xl font-semibold">Current Grades</h2>
            </div>
            <div className="p-6">
            {existingGrades.length === 0 ? (
                <p className="text-gray-600">No grades recorded yet.</p>
            ) : (
                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CA Mark</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Mark</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {existingGrades.map((grade, index) => {
                        const moduleCode = grade.module.split('/').filter(Boolean).pop();
                        return (
                        <tr key={grade.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap">{moduleCode}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <input
                                type="number"
                                className="border rounded w-20 py-1 px-2"
                                min="0"
                                max="100"
                                value={editedGrades[grade.id]?.ca_mark}
                                onChange={(e) => handleInputChange(grade.id, 'ca_mark', e.target.value)}
                            />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <input
                                type="number"
                                className="border rounded w-20 py-1 px-2"
                                min="0"
                                max="100"
                                value={editedGrades[grade.id]?.exam_mark}
                                onChange={(e) => handleInputChange(grade.id, 'exam_mark', e.target.value)}
                            />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{grade.total_grade}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded"
                                onClick={() => handleUpdateGrade(grade.id)}
                            >
                                Update
                            </button>
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
        
        {availableModules.length > 0 && (
            <div className="bg-white shadow-md rounded-lg mb-8">
            <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                <h2 className="text-xl font-semibold">Add New Grade</h2>
            </div>
            <div className="p-6">
                <form onSubmit={handleAddNewGrade}>
                <div className="mb-6">
                    <label htmlFor="module" className="block text-sm font-medium text-gray-700 mb-2">Module</label>
                    <select
                    id="module"
                    className="border rounded-md shadow-sm w-full py-2 px-3"
                    value={newGrade.module}
                    onChange={(e) => handleNewGradeChange('module', e.target.value)}
                    required
                    >
                    <option value="">Select a module</option>
                    {availableModules.map(module => (
                        <option key={module.code} value={`http://127.0.0.1:8000/api/module/${module.code}/`}>
                        {module.code} - {module.full_name}
                        </option>
                    ))}
                    </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                    <label htmlFor="ca_mark" className="block text-sm font-medium text-gray-700 mb-2">CA Mark (0-100)</label>
                    <input
                        type="number"
                        className="border rounded-md shadow-sm w-full py-2 px-3"
                        id="ca_mark"
                        min="0"
                        max="100"
                        value={newGrade.ca_mark}
                        onChange={(e) => handleNewGradeChange('ca_mark', e.target.value)}
                        required
                    />
                    </div>
                    
                    <div>
                    <label htmlFor="exam_mark" className="block text-sm font-medium text-gray-700 mb-2">Exam Mark (0-100)</label>
                    <input
                        type="number"
                        className="border rounded-md shadow-sm w-full py-2 px-3"
                        id="exam_mark"
                        min="0"
                        max="100"
                        value={newGrade.exam_mark}
                        onChange={(e) => handleNewGradeChange('exam_mark', e.target.value)}
                        required
                    />
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Add Grade
                </button>
                </form>
            </div>
            </div>
        )}
        
        <button 
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={goBack}
        >
            Back to Student Profile
        </button>
        </div>
    );
};

export default SetGrades;