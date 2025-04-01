import React, { useState } from "react";

function DeleteDegree() {
    const [shortcode, setShortcode] = useState("");
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        if (!shortcode) {
            setMessage("Please enter a degree shortcode.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/degree/${shortcode}/`, {
                method: "DELETE",
            });

            if (response.ok) {
                setMessage(`Degree with shortcode "${shortcode}" deleted.`);
                setShortcode(""); // Clear input field
            } else {
                setMessage("Failed to delete the degree.");
            }
        } catch (error) {
            console.error("Error deleting degree:", error);
            setMessage("An error occurred while deleting the degree.");
        }
    };

    return (
        <div>
            <h2>Delete a Degree</h2>
            <input
                type="text"
                placeholder="Enter shortcode"
                value={shortcode}
                onChange={(e) => setShortcode(e.target.value)}
            />
            <button onClick={handleDelete}>Delete</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default DeleteDegree;
