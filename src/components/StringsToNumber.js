import { useState } from "react";
import './assets/StringToNumber.scss';
import { Link } from "react-router-dom";

export default function StringToNumber() {

    const [inputValue, setInputValue] = useState('');
    const [convertedNumber, setConvertedNumber] = useState(null);
    const [error, setError] = useState('');

    const handleConvert = () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) {
            setError('Please enter a value.');
            setConvertedNumber(null);
            return;
        }

        const number = parseFloat(trimmedInput);
        if (isNaN(number)) {
            setError('Invalid input. Please enter a valid number.');
            setConvertedNumber(null);
        }
        else {
            setError('');
            setConvertedNumber(number);
        };

    }


    return (
        <div className="number_container">
            <h1>String to Number Converter</h1>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter a number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleConvert}>Convert</button>
            </div>

            {error && <p>{error}</p>}
            {convertedNumber !== null && (
                <p>Converted Number: {convertedNumber}</p>
            )}
            <div>
                <Link to='/homework' className="go_home">Go Back To Homeworks</Link>
            </div>
        </div>
    )
}