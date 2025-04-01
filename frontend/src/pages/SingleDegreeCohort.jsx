import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function SingleDegreeCohort() {
    const { cohortID } = useParams();
    const [cohort, setCohort] = useState(null);

    useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cohort/${cohortID}/`)
        .then((response) => response.json())
        .then(data => setCohort(data))
        .catch((error) => console.log("Error fetching data: ", error))
    }, []);

    if (!cohort) {
        return (
            <p>
                Loading
            </p>
        )
    }

    console.log(cohort)

    return (
        <div>
            <h1>
                {cohort.name}
            </h1>
        </div>
    );

}


export default SingleDegreeCohort;