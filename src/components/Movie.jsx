
function Movie({ title, rating, posterPath,key }){
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    return(
        <>
            <div id={`${key}`} className="movie" style={{backgroundImage:`url(${imageBaseUrl}${posterPath})`}}>
                  <div className="detail">
                    <h3>{title}</h3>
                    <span>⭐{rating} {}</span>
                  </div>
            </div>
        </>
    )
}

export default Movie;