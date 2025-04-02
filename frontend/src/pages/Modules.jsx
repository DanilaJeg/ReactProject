import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

function Modules() {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/`)
            .then((response) => response.json())
            .then((data) => setModules(data))
            .catch((error) => console.log("Error fetching data:", error))
    }, []);

    return (
        <div>
            <h1>Modules</h1>
            <Link to="/module/create">Create a new module here</Link>
            <ul>
                {modules.map((module) => (
                    <li key={module.code}>
                        <Link to={`/module/${module.code}`}>{module.code}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default Modules;