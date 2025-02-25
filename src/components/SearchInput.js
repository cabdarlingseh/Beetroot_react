import { useState } from "react";
import './assets/Movies.scss';



export default function SearchInput({ onChangeFunction, onSearchFunction }) {

    const [localValue, setLocalValue] = useState('');

    function changeHandler(e) {
        setLocalValue(e.target.value);
        onChangeFunction(localValue);
    }


    return (
        <div>
            <div className="input-group mb-3">
                <input onChange={changeHandler} type="text" className="form-control" placeholder="Movie name" />
                <button onClick={() => onSearchFunction()} className="btn btn-outline-secondary search" type="button">Search</button>
            </div>
        </div>
    )
};