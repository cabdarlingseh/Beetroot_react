import { useState } from "react";

const API_key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjc0MWQ5MTA4OTFmY2E4ZDFjM2IzNjk1MTE2YWRjNCIsIm5iZiI6MTczNjUwNzU3Ni43OTMsInN1YiI6IjY3ODEwMGI4MTI2Njc5Njg4NTRlYzZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ak8XRqKjGEaCIMAXg90eC8yjfx58vRU31CjRXoz4HKA';

const base_url = 'https://api.themoviedb.org/3/search/movie';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_key}`
    }
};

export default function SearchInput() {

    const [movieName, setMovieName] = useState('');
    const [movies, setMovies] = useState([]);

    function searchHandler() {
        fetch(base_url + '?query=' + movieName, options)
            .then(res => {
                return res.json()
            })
            .then(resp => {
                setMovies(resp.results);
            })
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input onChange={(e) => setMovieName(e.target.value)} type="text" className="form-control" placeholder="Movie name" />
                <button onClick={searchHandler} className="btn btn-outline-secondary" type="button">Search: {movieName}</button>
            </div>

            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {
                        movies.map(el => {
                            return (
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} className="bd-placeholder-img card-img-top" alt="Movie poster" />
                                        <div className="card-body">
                                            <h2>{el.title}</h2>
                                            <p className="card-text">{el.overview}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};