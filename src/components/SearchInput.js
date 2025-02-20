import { useState } from "react";



export default function SearchInput() {

    const [localValue, setLocalValue] = useState('');

    function changeHandler(e) {
        setLocalValue(e.target.value);
    }


    return (
        <div>
            <div className="input-group mb-3">
                <input onChange={(e) => setMovieName(e.target.value)} type="text" className="form-control" placeholder="Movie name" />
                <button onClick={searchHandler} className="btn btn-outline-secondary" type="button">Search: {movieName}</button>
            </div>
        </div>
    )
};