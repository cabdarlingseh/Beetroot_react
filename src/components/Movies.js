import SearchInput from "./SearchInput";
import Grid from './Grid';
import './assets/Home.scss'; //This is scoped styling
import {
    useEffect,
    useState
} from "react";


const API_key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjc0MWQ5MTA4OTFmY2E4ZDFjM2IzNjk1MTE2YWRjNCIsIm5iZiI6MTczNjUwNzU3Ni43OTMsInN1YiI6IjY3ODEwMGI4MTI2Njc5Njg4NTRlYzZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ak8XRqKjGEaCIMAXg90eC8yjfx58vRU31CjRXoz4HKA';

const base_url = 'https://api.themoviedb.org/3/search/movie';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_key}`
    }
};


export default function Home() {

    const [movies, setMovies] = useState([]);
    const [movieName, setMovieName] = useState('');
    const [resultsDisplayed, setResultsDisplayed] = useState(false);

    useEffect(() => {
        if (resultsDisplayed) {
            document.body.style.height = "100%";
        }
        else {
            document.body.style.height = "100vh";
        };

        return () => {
            document.body.style.height = "";
        };
    }, [resultsDisplayed]);

    function searchHandler() {
        fetch(base_url + '?query=' + movieName, options)
            .then(res => {
                return res.json()
            })
            .then(resp => {
                setMovies(resp.results);
                setResultsDisplayed(resp.results.length > 0);
            })
    }

    return (
        <div className="container" >
            {resultsDisplayed && <div className="background" />}
            <h1> The Film Database </h1>
            <SearchInput onChangeFunction={setMovieName} onSearchFunction={searchHandler} />
            < Grid movies={movies} />
        </div>
    )
}