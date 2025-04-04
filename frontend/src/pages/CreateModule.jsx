import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateModule() {
    const [code, setCode] = useState("");
    const [fullName, setFullName] = useState("");
    const [cohorts, setCohorts] = useState([]);
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [caSplit, setCaSplit] = useState(50);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCohorts = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/cohort/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch cohorts");
                }
                const data = await response.json();
                setCohorts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessage("An error occurred while fetching cohorts.");
                setIsError(true);
                setLoading(false);
            }
        };

        fetchCohorts();
    }, []);

    // This function is no longer needed as we're using checkboxes
    // Keeping an empty version to avoid breaking any references

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        const newModule = {
            code,
            full_name: fullName,
            delivered_to: selectedCohorts.map(id => `http://127.0.0.1:8000/api/cohort/${id}/`),
            ca_split: parseInt(caSplit, 10)
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/module/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newModule)
            });

            if (!response.ok) throw new Error("Failed to create module.");

            const data = await response.json();
            setMessage(`Module Created: Code ${data.code}`);
            setCode("");
            setFullName("");
            setSelectedCohorts([]);
            setCaSplit(50);
            
            // Navigate after a short delay to allow the user to see the success message
            setTimeout(() => navigate("/module"), 1500);

        } catch (error) {
            console.error("Error creating module:", error);
            setMessage("Error creating module.");
            setIsError(true);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create New Module</h1>
            
            {message && (
                <div className={`p-4 mb-6 rounded-md ${isError ? 'bg-red-50 text-red-700 border-l-4 border-red-500' : 'bg-green-50 text-green-700 border-l-4 border-green-500'}`}>
                    {message}
                </div>
            )}
            
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Module Details</h2>
                </div>
                <div className="p-6">
                    {loading ? (
                        <p className="text-gray-600">Loading cohorts...</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="mb-6">
                                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                                        Module Code: <span className="text-xs text-gray-500">(max 5 characters)</span>
                                    </label>
                                    <input 
                                        id="code"
                                        value={code} 
                                        onChange={(e) => setCode(e.target.value)} 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g. CS101" 
                                        maxLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name:
                                    </label>
                                    <input 
                                        id="fullName"
                                        value={fullName} 
                                        onChange={(e) => setFullName(e.target.value)} 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g. Introduction to Computer Science" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="caSplit" className="block text-sm font-medium text-gray-700 mb-2">
                                    Continuous Assessment Split: {caSplit}%
                                </label>
                                <input 
                                    id="caSplit"
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={caSplit} 
                                    onChange={(e) => setCaSplit(Number(e.target.value))} 
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    required 
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0% CA / 100% Exam</span>
                                    <span>50% CA / 50% Exam</span>
                                    <span>100% CA / 0% Exam</span>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Delivered to Cohorts:
                                </label>
                                <div className="border border-gray-300 rounded-md p-3 max-h-64 overflow-y-auto bg-white">
                                    {cohorts.length === 0 ? (
                                        <p className="text-gray-500 text-sm">No cohorts available</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {cohorts.map((cohort) => (
                                                <div key={cohort.id} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`cohort-${cohort.id}`}
                                                        value={cohort.id}
                                                        checked={selectedCohorts.includes(cohort.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedCohorts([...selectedCohorts, cohort.id]);
                                                            } else {
                                                                setSelectedCohorts(selectedCohorts.filter(id => id !== cohort.id));
                                                            }
                                                        }}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <label htmlFor={`cohort-${cohort.id}`} className="ml-2 block text-sm text-gray-700">
                                                        {cohort.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Select all cohorts that will take this module</p>
                                {selectedCohorts.length > 0 && (
                                    <div className="mt-2 text-sm">
                                        <span className="font-medium">{selectedCohorts.length}</span> cohort{selectedCohorts.length !== 1 ? 's' : ''} selected
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-end mt-8">
                                <Link 
                                    to="/module"
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mr-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button 
                                    type="submit"
                                    disabled={!code || !fullName}
                                    className={`py-2 px-4 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${!code || !fullName ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                                >
                                    Create Module
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateModule;