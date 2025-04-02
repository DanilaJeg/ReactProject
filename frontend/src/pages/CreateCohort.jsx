import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateCohort() {
    const [id, setID] = useState("");
    const [year, setYear] = useState("");
    const [degree, setDegree] = useState("");
    const [message, setMessage] = useState("");
    const [degrees, setDegrees] = useState([]);
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
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessage("An error occurred while fetching degrees.");
            }
        };

        fetchDegrees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCohort = {
            id,
            year: parseInt(year, 10),
            degree: `http://127.0.0.1:8000/api/degree/${degree}/`,
        };


        console.log(newCohort)
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

            navigate("/cohort");

        } catch (error) {
            setMessage("An error occurred while creating the cohort.");
        }
    };

    return (
        <div>
            <h2>Create Cohort</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cohort ID: </label>
                    <input 
                        type="text" 
                        value={id} 
                        onChange={(e) => setID(e.target.value)}
                        placeholder="COMSCI1" 
                        required 
                    />
                </div>
                <div>
                    <label>Year: </label>
                    <input 
                        type="number" 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)} 
                        placeholder="4" 
                        required 
                        min="1" 
                        max="4"
                    />
                </div>
                <div>
                    <label>Degree: </label>
                    <select 
                        value={degree} 
                        onChange={(e) => setDegree(e.target.value)} 
                        required
                    >
                        <option value="">Select a degree</option>
                        {degrees.map((deg) => (
                            <option key={deg.shortcode} value={deg.shortcode}>
                                {deg.shortcode}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={!id || !year || !degree}>Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateCohort;