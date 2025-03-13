import { useState } from "react";
import './assets/Movies.scss';
import { Button, TextField } from "@mui/material";



export default function SearchInput({ onChangeFunction, onSearchFunction }) {

    const [localValue, setLocalValue] = useState('');

    function changeHandler(e) {
        setLocalValue(e.target.value);
        onChangeFunction(localValue);
    }


    return (
        <div>
            <div className="input-group mb-3">

                <TextField id="standard-basic" label="Movie name" variant="standard" onChange={changeHandler} className="search_input" />

                {/* <input onChange={changeHandler} type="text" className="form-control" placeholder="Movie name" /> */}

                <Button onClick={() => onSearchFunction()} variant="contained" color="success">Search</Button>

                {/* <button onClick={() => onSearchFunction()} className="btn btn-outline-secondary search" type="button">Search</button> */}
            </div>
        </div>
    )
};