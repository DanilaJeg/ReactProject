import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SingleModule() {
    const {code} = useParams();
    const [module, setModule] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/${code}`)
            .then((response) => response.json())
            .then((data) => setModule(data))
            .catch((error) => console.log("Error fetching data:", error))
    }, []);

    if (!module){
        return <p>Loading...</p>
    }

    console.log(module)

    return (
        <div>
            <h1>{module.code}</h1>
            <Link to={`/module/${module.code}/student`}>Students taking this module</Link>
        </div>
    );
}

export default SingleModule;