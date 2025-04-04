import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function CreateCohort() {
    const [id, setID] = useState("");
    const [year, setYear] = useState("");
    const [degree, setDegree] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [degrees, setDegrees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDegrees = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/degree/");
                if (!response.ok) {
                    throw new Error("Failed to fetch degrees");
                }
                const data = await response.json();
                setDegrees(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessage("An error occurred while fetching degrees.");
                setIsError(true);
                setLoading(false);
            }
        };

        fetchDegrees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        const newCohort = {
            id: `${degree}${year}`,
            year: parseInt(year, 10),
            degree: `http://127.0.0.1:8000/api/degree/${degree}/`,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/cohort/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCohort),
            });

            if (!response.ok) throw new Error("Failed to create cohort.");

            const data = await response.json();
            setMessage(`Cohort created: ID ${data.id}`);
            setID("");
            setYear("");
            setDegree("");
            
            // Navigate after a short delay to allow the user to see the success message
            setTimeout(() => navigate("/cohort"), 1500);

        } catch (error) {
            setMessage("An error occurred while creating the cohort.");
            setIsError(true);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create New Cohort</h1>
            
            {message && (
                <div className={`p-4 mb-6 rounded-md ${isError ? 'bg-red-50 text-red-700 border-l-4 border-red-500' : 'bg-green-50 text-green-700 border-l-4 border-green-500'}`}>
                    {message}
                </div>
            )}
            
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Cohort Details</h2>
                </div>
                <div className="p-6">
                    {loading ? (
                        <p className="text-gray-600">Loading degrees...</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-2">
                                    Degree:
                                </label>
                                <select 
                                    id="degree"
                                    value={degree} 
                                    onChange={(e) => setDegree(e.target.value)} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select a degree</option>
                                    {degrees.map((deg) => (
                                        <option key={deg.shortcode} value={deg.shortcode}>
                                            {deg.full_name} ({deg.shortcode})
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-sm text-gray-500">Select the degree program for this cohort</p>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                                    Year:
                                </label>
                                <input 
                                    id="year"
                                    type="number" 
                                    value={year} 
                                    onChange={(e) => setYear(e.target.value)} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="1-4" 
                                    required 
                                    min="1" 
                                    max="4"
                                />
                                <p className="mt-1 text-sm text-gray-500">Enter a value between 1 and 4</p>
                            </div>
                            {degree && year && (
                                <div className="mb-6 p-4 bg-blue-50 rounded-md">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Cohort ID will be: </span> 
                                        <span className="text-blue-700 font-bold">{degree}{year}</span>
                                    </p>
                                </div>
                            )}
                            <div className="flex items-center justify-end mt-8">
                                <Link 
                                    to="/cohort"
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mr-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={!year || !degree}
                                    className={`py-2 px-4 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${!year || !degree ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                                >
                                    Create Cohort
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateCohort;