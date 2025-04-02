import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreateDegree() {
    const [fullName, setFullName] = useState("");
    const [shortcode, setShortcode] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            navigate("/degree")

        } catch (error) {
            console.error("Error creating degree:", error);
            setMessage("An error occurred while creating the degree.");
        }
    };

    return (
        <div>
            <h2>Create a New Degree</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Shortcode:</label>
                    <input
                        type="text"
                        value={shortcode}
                        onChange={(e) => setShortcode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={!shortcode || !fullName}>Create Degree</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateDegree;
