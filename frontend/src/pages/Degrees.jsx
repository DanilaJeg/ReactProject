import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteDegree from '../components/DeleteDegree';

function Degrees() {
    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/degree/')
            .then((response) => response.json())
            .then((data) => setDegrees(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
       <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Degrees</h1>
            
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">All Degrees</h2>
                        <Link 
                            to={`/degree/create`}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                        >
                            Create New Degree
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    {degrees.length === 0 ? (
                        <p className="text-gray-600">No degrees available.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shortcode</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {degrees.map((degree, index) => (
                                        <tr key={degree.shortcode} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                {degree.shortcode}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {degree.full_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link 
                                                    to={`/degree/${degree.shortcode}`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                                                >
                                                    View
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
        </div> 
    );
}

export default Degrees;
