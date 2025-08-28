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

const getMovies = async() => {
  try {
        const response = await fetch('http://localhost:3200/',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        const movie = JSON.parse(data.movies).results;
        setMovies(movie);
  } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
  }
} 
const randomThree = () => {
  const rand = Math.floor(Math.random() * (movies.length));
   return <>
         <Card title={movies[rand].title} rating={movies[rand].vote_average} posterPath={movies[rand].poster_path} key={movies[rand].id} date={movies[rand].release_date} />
         <Card title={movies[rand+1].title} rating={movies[rand+1].vote_average} posterPath={movies[rand].poster_path} key={movies[rand].id} date={movies[rand].release_date} />
         <Card title={movies[rand+2].title} rating={movies[rand+2].vote_average} posterPath={movies[rand].poster_path} key={movies[rand].id} date={movies[rand].release_date} />
     </>
}

  return (
    <>
        <div className="wrapper">
          <Header />
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
           <section>
            <h1>Watch Based On</h1>
            <div className="catagory">
              <div className="partOne">
                  <h2>Mood</h2>
                  <div className="catGrid">
                      <div>😃 Happy</div>
                      <div>AB</div>
                      <div>AB</div>
                  </div>
              </div>
              <div className="partTwo">
                  <h2>Genere</h2>
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
              (movies ?
               movies.map( (movie) => (
                <Movie title={movie.title} rating={movie.vote_average} posterPath={movie.poster_path} key={movie.id} date={movie.release_date} />
                ) )
                : "")
                
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
