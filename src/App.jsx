import './App.css'
import '../src/assets/styles.css'
import { useState,useEffect } from 'react'
import {GenereData,MoodData} from "./assets/data"
import Header from '../src/components/Header'
import Card from '../src/components/Card'
import Catagories from '../src/components/Catagories'
import Movie from '../src/components/Movie'
import MovieInfo from '../src/components/MovieInfo'

const backendURL = import.meta.env.VITE_API_URL;

function App() {
  const [isLoading,setIsLoading] = useState(false);
  const [isHome,setIsHome] = useState(true);
  const [catagory,SetCatagory] = useState([]);
  const [movies,setMovies] = useState([]);
  const [movieInfo,setMovieInfo] = useState([]);
  
  useEffect( ()=> {
    getMovies();
  },[])

  /* geting trending movies */
  const getMovies = async() => {
    setIsLoading(true);
    try {
          const response = await fetch(`${backendURL}/api/trending/movies/1`);
          const data = await response.json();
          const movie = data.movies.results;
          (isHome? "" : setIsHome(true));
          setMovies(movie);
          setIsLoading(false);
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        setMovies([]);
    }
  } 
  /* geting random three for the homepage(hero section) */
  const randomThree = () => {
    //lets create three random index to load movies
    const rand = Math.floor(Math.random() * (movies.length));
    var rand2 = Math.floor(Math.random() * (movies.length));
    while(rand==rand2){ //making sure they are different
        rand2 = Math.floor(Math.random() * (movies.length));
    }
    const rand3 = Math.floor((rand+rand2)%movies.length);

    return <>
          <Card title={movies[rand].title}  clickHandler={getMovieInfo} rating={movies[rand].vote_average} posterPath={movies[rand].poster_path} key={movies[rand].id} movieid={movies[rand].id} date={movies[rand].release_date} />
          <Card title={movies[rand2].title} clickHandler={getMovieInfo} rating={movies[rand2].vote_average} posterPath={movies[rand2].poster_path} key={movies[rand2].id} movieid={movies[rand2].id} date={movies[rand2].release_date} />
          <Card title={movies[rand3].title} clickHandler={getMovieInfo} rating={movies[rand3].vote_average} posterPath={movies[rand3].poster_path} key={movies[rand3].id} movieid={movies[rand3].id} date={movies[rand3].release_date} />
      </>
  }
  
  const HomeComponents = ()=>{
    //the index is used in the function to set the corresponding catagorydata
    //we will use the key on the catagory data as index
    const catagoryHandler = async(genereId,index)=>{
      alert("Loading movies for the selected catagory. Please wait...");
       setIsLoading(true);
       //if the type of index is string rhe catagory is from mood
       ((typeof index) == "string" ? SetCatagory(MoodData[index]) : SetCatagory(GenereData[index]));
        setIsHome(false);
        try {
            const response = await fetch(`${backendURL}/api/movies/genere/${genereId}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log("Error occured from frontend getting by genere",error);
        }
        finally{
            setIsLoading(false);
            alert("Movies loaded for the selected catagory.");
        }
    }

    return <>
      {/* Hero section */}
            <section>
                <div className="cards">
                  {
                    (movies && movies.length!=0 ? randomThree() : 
                  <> 
                    <div className="card offline"></div>
                    <div className="card offline"></div>
                    <div className="card offline"></div>
                  </>)
                  }
                </div>
                <h2>MovieMate</h2>
                <p>Meet your next favorite movie</p>
            </section>
          {/* Catagories */}
            <Catagories catagoryHandler={catagoryHandler}/>
    </>
  }

const getMovieInfo = async(id)=>{
      setIsLoading(true);
        try {
            const response = await fetch(`${backendURL}/api/movie/${id}`);
            const data = await response.json();
            console.log(data);
            setMovieInfo(data);
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            setIsHome(false)
            SetCatagory(null);

        } catch (error) {
            console.error("Error fetching from backend "+error);
        }
        finally{
          setIsLoading(false);
        }
    }
  
  return (
    <>
        <div className="wrapper">
            <Header home={getMovies} />
            {
              //check if loading then if its home page then if its on catagory or movieinfo
              (isLoading? <p>Loading...</p>
                :
                  ( isHome ? <HomeComponents/> : 
                  /*If its not home. display the corresponding catagories result */
                  (catagory? <h2>Movies for "{catagory.name}"</h2>: 
                    <>
                      <MovieInfo Data={movieInfo} />
                      <h2 style={{textAlign:"left",marginLeft:50,marginTop:30}}>Related Movies</h2>
                    </>
                  )
                  )
              )
            }
           <section>
            {isHome && !isLoading? <h2>Trending Movies</h2>
            : ""}
            <div className="movies">
             {
              (movies && movies.length && !isLoading?
               movies.map( (movie) => (
                  <Movie title={movie.title} clickHandler={getMovieInfo} rating={movie.vote_average} posterPath={movie.poster_path} movieid={movie.id} key={movie.id} date={movie.release_date} />
                ) )

                : <>
                    <div className='movie offline' ></div><div className='movie offline' style={{backgroundColor:"rgb(255, 255, 255,.1)"}}></div><div className='movie offline' ></div>
                    <div className='movie offline'></div><div className='movie offline' ></div>
                  </>
              )
             }
            </div>
           </section>
        </div>

        <footer>
          Contact information
        </footer>
    </>
  )
}

export default App
