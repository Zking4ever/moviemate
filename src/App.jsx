import { useState,useEffect } from 'react'
import './App.css'
import '../src/assets/styles.css'
import Header from '../src/components/Header'
import MovieInfo from '../src/components/MovieInfo'
import Card from '../src/components/Card'
import Catagory from '../src/components/Catagory'
import Movie from './components/Movie';
import {GenereData,MoodData} from "./assets/data"


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
          const response = await fetch('http://localhost:3200/api/trending/movies/1',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
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
  const randomThree = () => {
    //lets create three random index to load movies
    const rand = Math.floor(Math.random() * (movies.length));
    var rand2 = Math.floor(Math.random() * (movies.length));
    while(rand==rand2){ //making sure they are different
        rand2 = Math.floor(Math.random() * (movies.length));
    }
    const rand3 = Math.floor((rand+rand2)%movies.length);

    return <>
          <Card title={movies[rand].title} rating={movies[rand].vote_average} posterPath={movies[rand].poster_path} key={movies[rand].id} date={movies[rand].release_date} />
          <Card title={movies[rand2].title} rating={movies[rand2].vote_average} posterPath={movies[rand2].poster_path} key={movies[rand2].id} date={movies[rand2].release_date} />
          <Card title={movies[rand3].title} rating={movies[rand3].vote_average} posterPath={movies[rand3].poster_path} key={movies[rand3].id} date={movies[rand3].release_date} />
      </>
  }
  const HomeComponents = ()=>{
    //the index is used in the function to set the corresponding catagorydata
    //we will use the key on the catagory data as index
    const catagoryHandler = async(genereId,index)=>{
       setIsLoading(true);
       //if the type of index is string rhe catagory is from mood
       ((typeof index) == "string" ? SetCatagory(MoodData[index]) : SetCatagory(GenereData[index]));
        setIsHome(false);
        try {
            const response = await fetch(`http://localhost:3200/api/movies/genere/${genereId}`);
            const data = await response.json();
            console.log(data);
            setMovies(data.results);
        } catch (error) {
            console.log("Error occured from frontend getting by genere",error);
        }
        finally{
            setIsLoading(false);
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
                <p>Get latest movies,watch for free</p>
            </section>
          {/* Catagories */}
            <section>
              <h2>Watch Based On</h2>
              <div className="catagory">
                <div className="partOne">
                    <h3>Mood</h3>
                    <div className="catGrid">
                        { MoodData.map((value)=>( <Catagory customOnlCick={catagoryHandler} id={value.id} index={value.key}name={value.name} key={value.key}  />)) }
                    </div>
                </div>
                <div className="partTwo">
                    <h3>Genere</h3>
                    <div className="catGrid">
                        { GenereData.map((value)=>( <Catagory customOnlCick={catagoryHandler} id={value.id} index={value.key} name={value.name} key={value.key} />)) }
                    </div>
                </div>
              </div>
            </section>
    </>
  }

const getMovieInfo = async(id)=>{
      setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3200/api/movie/${id}`);
            const data = await response.json();
            console.log(data);
            setMovieInfo(data);
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
                    <MovieInfo Data={movieInfo} />
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
