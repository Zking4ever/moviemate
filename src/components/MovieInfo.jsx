import '../assets/movieinfostyles.css';
function MovieInfo({Data}){
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const videos = Data.videos.results;
    const openTrailer = (link)=>{
        document.getElementById('trailer').src=link;
        document.querySelector('.trailer-container').style.display="flex";
    }
    const closeTrailer = ()=>{
        document.getElementById('trailer').src="";
        document.querySelector('.trailer-container').style.display="none";
    }
     return<>
     <div className="container">
        <div className='poster' style={{backgroundImage:`url(${imageBaseUrl}${Data.poster_path})`}}></div>
        <div className="discription">
            <h2>{Data.original_title}</h2>
            <h5>{Data.release_date}</h5>
            <p>{Data.overview}</p>
            <h2>⭐{Data.vote_average}/10</h2>
            <div className="details">
                <p>Runtime:{Data.runtime}</p>
                <p>Generes:{Data.genres.map((genere,i)=>(genere.name+(i!=Data.genres.length-1? ", ": "")))}</p>
                <p>Votes:{Data.vote_count}</p>
            </div>
            {videos.map((video)=>{var link="https://youtube.com/embed/"+video.key; return (video.type==="Trailer"&&video.name.toLowerCase().includes("official trailer")?<button onClick={()=>openTrailer(link)} style={{margin:5}}>{video.name}</button> : "")})}
            
        </div>
        <div className="trailer-container">
            <iframe id='trailer'
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            <div className="close" onClick={closeTrailer}>❌</div>
        </div>
    </div>
    </>
}

export default MovieInfo;

