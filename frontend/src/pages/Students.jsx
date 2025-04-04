import React from "react";
import { Link } from "react-router-dom";

function Student() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Students</h1>
            
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Manage Students</h2>
                </div>
                <div className="p-6">
                    <div className="text-center py-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-3">Add a New Student</h3>
                        <p className="text-gray-600 mb-6">Create a new student record with personal details and cohort assignment</p>
                        
                        <Link 
                            to="/student/create"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors inline-flex items-center"
                        >
                            Add New Student
                        </Link>
                    </div>
                    
                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-md font-medium text-gray-700 mb-3">Additional Options:</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link 
                                    to="/cohort"
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    View Cohorts
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/module"
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    View Modules
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/degree"
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    View Degrees
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;