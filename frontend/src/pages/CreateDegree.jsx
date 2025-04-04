import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

function CreateDegree() {
    const [fullName, setFullName] = useState("");
    const [shortcode, setShortcode] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        const newDegree = {
            full_name: fullName,
            shortcode: shortcode,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/degree/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDegree),
            });

            if (!response.ok) {
                throw new Error("Failed to create degree.");
            }

            const data = await response.json();
            setMessage(`Degree created: ${data.full_name} (${data.shortcode})`);
            setFullName("");
            setShortcode("");

            // Navigate after a short delay to allow the user to see the success message
            setTimeout(() => navigate("/degree"), 1500);

        } catch (error) {
            console.error("Error creating degree:", error);
            setMessage("An error occurred while creating the degree.");
            setIsError(true);
        }
    };
    
    return (
       <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create a New Degree</h1>
            
            {message && (
                <div className={`p-4 mb-6 rounded-md ${isError ? 'bg-red-50 text-red-700 border-l-4 border-red-500' : 'bg-green-50 text-green-700 border-l-4 border-green-500'}`}>
                    {message}
                </div>
            )}
            
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Degree Details</h2>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name:
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g. Bachelor of Science in Computer Science"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="shortcode" className="block text-sm font-medium text-gray-700 mb-2">
                                Shortcode: <span className="text-xs text-gray-500">(max 5 characters)</span>
                            </label>
                            <input
                                id="shortcode"
                                type="text"
                                value={shortcode}
                                onChange={(e) => setShortcode(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g. BSCS"
                                maxLength={5}
                                required
                            />
                            <p className="mt-1 text-sm text-gray-500">A unique identifier for this degree (max 5 characters)</p>
                        </div>
                        <div className="flex items-center justify-end mt-8">
                            <Link 
                                to="/degree"
                                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mr-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit" 
                                disabled={!shortcode || !fullName}
                                className={`py-2 px-4 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${!shortcode || !fullName ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                            >
                                Create Degree
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    );
}

export default CreateDegree;
