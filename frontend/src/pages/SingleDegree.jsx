import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function SingleDegree() {
    const { shortcode } = useParams();
    const [degree, setDegree] = useState(null);
    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/degree/${shortcode}`)
            .then((response) => response.json())
            .then(data => setDegree(data))
            .catch((error) => console.error('Error fetching data:', error));
        
        fetch (`http://127.0.0.1:8000/api/cohort/?degree=${shortcode}`)
            .then((response) => response.json())
            .then(data => setCohorts(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (!degree) {
        return <p>Loading...</p>
    }
    
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">{degree.full_name}</h1>
            <p className="text-gray-600 mb-6">Shortcode: {degree.shortcode}</p>
            
            {/* Degree Info Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Degree Information</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Shortcode</p>
                            <p className="font-medium">{degree.shortcode}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{degree.full_name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Number of Cohorts</p>
                            <p className="font-medium">{cohorts.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Cohorts Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Cohorts</h2>
                </div>
                <div className="p-6">
                    {cohorts.length === 0 ? (
                        <p className="text-gray-600">No cohorts available for this degree.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cohort ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cohorts.map((cohort, index) => (
                                        <tr key={cohort.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                {cohort.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {cohort.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Year {cohort.year}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link 
                                                    to={`/cohort/${cohort.id}`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                                                >
                                                    View Students
                                                </Link>
                                                <Link 
                                                    to={`/cohort/${cohort.id}/modules`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    View Modules
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
                    to="/degree"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                >
                    Back to All Degrees
                </Link>
                
                <Link 
                    to="/cohort/create"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                    Create New Cohort
                </Link>
            </div>
        </div>
    );
}

export default SingleDegree;