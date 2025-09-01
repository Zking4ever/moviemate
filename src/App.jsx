import { useState,useEffect } from 'react'
import './App.css'
import '../src/assets/styles.css'
import Header from '../src/components/Header'
import Card from '../src/components/Card'
import Catagory from '../src/components/Catagory'
import Movie from './components/Movie';
import {GenereData,MoodData} from "./assets/data"


function App() {
  const [isHome,setIsHome] = useState(true);
  const [catagory,SetCatagory] = useState([]);

  const [movies,setMovies] = useState([]);
  useEffect( ()=> {
    //getMovies();
  },[])

  /* geting trending movies */
  const getMovies = async() => {
    try {
          const response = await fetch('http://localhost:3200/api/trending/movies/1',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          const movie = data.movies.results;
          setMovies(movie);
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
    const catagoryHandler = async(genereId)=>{
        {/**
            try {
            const response = await fetch(`http://localhost:3200/api/movies/genere/${genereId}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log("Error occured from frontend getting by genere",error);
        }
             */}
             alert("clicked: "+genereId)
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
                        { MoodData.map((value)=>( <Catagory customOnlCick={catagoryHandler} id={value.id} name={value.name} key={value.id}  />)) }
                    </div>
                </div>
                <div className="partTwo">
                    <h3>Genere</h3>
                    <div className="catGrid">
                        { GenereData.map((value)=>( <Catagory name={value.name} id={value.id} key={value.id} />)) }
                    </div>
                </div>
              </div>
            </section>
    </>
  }
  
  return (
    <>
        <div className="wrapper">
          <Header />
        {
          (isHome ? <HomeComponents/> : "" )
        }
          
           <section>
            {isHome? <h2>Trending Movies</h2>
            : ""}
            <div className="movies">
             {
              (movies && movies.length ?
               movies.map( (movie) => (
                <>
                  <Movie title={movie.title} rating={movie.vote_average} posterPath={movie.poster_path} key={movie.id} date={movie.release_date} />
                  <div style={{padding:10}}> <button>Previous</button>page 0 of 10 <button>Next</button></div>
                </>
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
          Contact
        </footer>
    </>
  )
}

export default App
