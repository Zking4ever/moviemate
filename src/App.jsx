import { useState } from 'react'
import {Icons} from 'react';
import './App.css'
import '../src/assets/styles.css'
import Header from '../src/components/Header'

function App() {
  const [count, setCount] = useState(0);
  const [car,setCar] = useState(0);
  

  return (
    <>
        <div className="wrapper">
          <Header />
           <section>
              <div className="cards">
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
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
                <div className="movie" style={{backgroundImage:"url('../src/assets/Aesthetic Phone Mockup Instagram Post.png')"}}>
                  <div className="detail">
                    <h3>Spider Man</h3>
                    <span>⭐7.5/10</span>
                  </div>
                </div>
                <div className="movie">
                  <div className="detail">
                    <h3>Super Man</h3>
                    <span>⭐7.5/10</span>
                  </div>
                </div>
                <div className="movie">
                  <div className="detail">
                    <h3>Bat Man</h3>
                    <span>⭐7.5/10</span>
                  </div>
                </div>
                <div className="movie">
                  <div className="detail">
                    <h3>Spider Man</h3>
                    <span>⭐7.5/10</span>
                  </div>
                </div>
                <div className="movie">
                  <div className="detail">
                    <h3>Spider Man</h3>
                    <span>⭐7.5/10</span>
                  </div>
                </div>
                <div className="movie">
                  <div className="detail">
                    <h3>Spider Man</h3>
                    <span>⭐7.5/10</span>
                  </div>
                </div>
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
