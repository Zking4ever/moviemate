import { useState,useEffect } from 'react'
import './App.css'
import '../src/assets/styles.css'
import Header from '../src/components/Header'
import Card from '../src/components/Card'
import Movie from './components/Movie';



function App() {

  const [movies,setMovies] = useState([]);
  useEffect( ()=> {
    getMovies();
  },[])

  /* geting trending movies */
  const getMovies = async() => {
    try {
          const response = await fetch('http://localhost:3200/',{
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

  const getByGenere = async(id)=>{
    try {
        
        alert(id);
    } catch (error) {
      console.log("Error occured getting by genere",error);
    }
  }

  return (
    <>
        <div className="wrapper">
          <Header />
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
                      <div onClick={()=>getByGenere(3)} >😃 Happy</div>
                      <div></div>
                      <div>AB</div>
                  </div>
              </div>
              <div className="partTwo">
                  <h3>Genere</h3>
                  <div className="catGrid">
                      <div>AB</div>
                      <div>AB</div>
                      <div>AB</div>
                      <div>AB</div>
                  </div>
              </div>
            </div>
           </section>
           <section>
            <h2>Trending Movies</h2>
            <div className="movies">
             {
              (movies && movies.length ?
               movies.map( (movie) => (
                <Movie title={movie.title} rating={movie.vote_average} posterPath={movie.poster_path} key={movie.id} date={movie.release_date} />
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
