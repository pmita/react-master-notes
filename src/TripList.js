/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import './TripList.css';
// ASSETS
import { useFetch } from './hooks/useFetch';

const TripList = () => {
    // STATE
    const [url, setUrl] = useState('http://localhost:3000/trips');
    const { data, isPending, error } = useFetch(url, {title: "GET"});

    return(
        <div className='trip-list'>
            <h2>Trip List</h2>
            {isPending && <div>Loading Trips...</div>}
            {error && <div>{error}</div>}
            <ul>
                {data && data.map((trip) => (
                    <li key={trip.id}>
                        <h3>{trip.title}</h3>
                        <p>{trip.price}</p>
                    </li>
                ))}
            </ul>
            <div className='fitlers'>
                <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}>European</button>
                <button onClick={() => setUrl('http://localhost:3000/trips?loc=america')}>American</button>
                <button onClick={() => setUrl('http://localhost:3000/trips')}>All</button>
            </div>
        </div>
    );
};

export default TripList;