import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

function Cohorts() {
    const [cohorts, setCohorts] = useState([]);
    const [degree, setDegree] = useState(null);
    
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/cohort/")
            .then(response => response.json())
            .then((data) => setCohorts(data))
            .catch((error) => console.log("Error fetching data:", error))
    }, []);

    useEffect(() => {
        const fetchDegree = async () => {
            if (!cohorts) return;

            const degreePromises = cohorts.map((cohort) => 
                fetch(cohort.degree)
                    .then((response) => response.json())
            );

            try {
                const degreeData = await Promise.all(degreePromises);
                setDegree(degreeData);
            } catch(error) {
                console.error("Error fetching degree:", error);
            }
        };

        fetchDegree();
    }, [cohorts]);

    console.log(degree)

    return (
       <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Cohorts</h1>
            
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">All Cohorts</h2>
                        <Link 
                            to="/cohort/create"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                        >
                            Create New Cohort
                        </Link>
                    </div>
                </div>
                <div className="p-6">
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
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link 
                                                    to={`/cohort/${cohort.id}`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                        {cohort.id}
                                                </Link>
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
                </div>
            </div>
        </div> 
    );
}

export default Cohorts;