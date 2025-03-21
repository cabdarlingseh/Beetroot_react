export default function Grid({ movies }) {
    return (
        <div className="home container" >
            {
                movies.length ? <h2>Results</h2> : null
            }
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {
                        movies.map(el => {
                            return (
                                <div className="col" key={el.id}>
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
}