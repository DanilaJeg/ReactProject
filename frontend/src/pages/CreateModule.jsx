import React, { useEffect, useState } from 'react';

function CreateModule() {
    const [code, setCode] = useState("");
    const [fullName, setFullName] = useState("");
    const [cohorts, setCohorts] = useState([]);
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [caSplit, setCaSplit] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCohorts = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/cohort/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch cohorts");
                }
                const data = await response.json();
                setCohorts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessage("An error occurred while fetching cohorts.");
            }
        };

        fetchCohorts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newModule = {
            code,
            full_name: fullName,
            delivered_to: selectedCohorts.map(id => `http://127.0.0.1:8000/api/cohort/${id}/`),
            ca_split: caSplit
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
            setCaSplit(0);

        } catch (error) {
            console.error("Error creating module:", error);
            setMessage("Error creating module.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                <input 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    placeholder="Code" 
                    required
                />
                </div>
                <div>
                <input 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    placeholder="Full Name" 
                    required 
                    />
                </div>
                <div>
                <select multiple onChange={(e) => setSelectedCohorts([...e.target.selectedOptions].map(o => o.value))}>
                    {cohorts.map((cohort) => (
                        <option key={cohort.id} value={cohort.id}>{cohort.name}</option>
                    ))}
                </select>
                </div>
                <div>
                <input  
                    type="number" 
                    value={caSplit} 
                    onChange={(e) => setCaSplit(Number(e.target.value))} 
                    placeholder="CA Split" 
                    required 
                />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateModule;