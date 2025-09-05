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
            {videos.map((video)=>{var link="https://youtube.com/embed/"+video.key; return (video.type==="Trailer"?<button onClick={()=>openTrailer(link)}>{video.name}</button> : "")})}
            
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

/*
{
    "adult": false,
    "backdrop_path": "/mEW9XMgYDO6U0MJcIRqRuSwjzN5.jpg",
    "belongs_to_collection": {
        "id": 1129084,
        "name": "Nobody Collection",
        "poster_path": "/kD1kynx9lrTrnpzWyxLB9demzHc.jpg",
        "backdrop_path": "/jNxcPaz5OT3A3PqTgQevwe8pVh8.jpg"
    },
    "budget": 25000000,
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 53,
            "name": "Thriller"
        }
    ],
    "homepage": "https://www.nobody.movie",
    "id": 1007734,
    "imdb_id": "tt28996126",
    "origin_country": [
        "US"
    ],
    "original_language": "en",
    "original_title": "Nobody 2",
    "overview": "Former assassin Hutch Mansell takes his family on a nostalgic vacation to a small-town theme park, only to be pulled back into violence when they clash with a corrupt operator, a crooked sheriff, and a ruthless crime boss.",
    "popularity": 38.7997,
    "poster_path": "/svXVRoRSu6zzFtCzkRsjZS7Lqpd.jpg",
    "production_companies": [
        {
            "id": 33,
            "logo_path": "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
            "name": "Universal Pictures",
            "origin_country": "US"
        },
        {
            "id": 121470,
            "logo_path": "/zvJFu1C6gB80A98n6IGXBvMtgVl.png",
            "name": "87North Productions",
            "origin_country": "US"
        },
        {
            "id": 86647,
            "logo_path": "/jefZmEJlxUAkuuwkH9CHQchgmJX.png",
            "name": "OPE Partners",
            "origin_country": "US"
        },
        {
            "id": 123230,
            "logo_path": null,
            "name": "Eighty Two Films",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2025-08-13",
    "revenue": 28583560,
    "runtime": 89,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        },
        {
            "english_name": "Interlingua",
            "iso_639_1": "ia",
            "name": ""
        }
    ],
    "status": "Released",
    "tagline": "Nobody ruins his vacation.",
    "title": "Nobody 2",
    "video": false,
    "vote_average": 7.225,
    "vote_count": 122
}
    */

