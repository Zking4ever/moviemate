
function Movie({ title, rating, posterPath,date }){
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const year = new Date(date).getFullYear();

    return(
        <>
            <div className="movie" style={{backgroundImage:`url(${imageBaseUrl}${posterPath})`}}>
                  <div className="detail">
                    <h3>{title}</h3>
                    <span>⭐{rating} &middot; {year}</span>
                  </div>
            </div>
        </>
    )
}

export default Movie;