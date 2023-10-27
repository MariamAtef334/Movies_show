import { React, useEffect, useState, useContext } from 'react'
import avatar from '../src/avatar.png';
import { Link } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import { moviesContext } from './Context/Store';
export default function Home() {

  let { trendingMovies, trendingPeople, trendingTv } = useContext(moviesContext);

  return (
    <>
      <div className="row">
        <div className="col-md-4 d-flex  align-items-center ">
          <div>
            <div className="brdr w-25 mb-4"></div>
            <h3>Top<br></br>Trending<br></br>Movies</h3>
            <p>Watch Now The Top Trending Movies</p>
            <div className="brdr mt-4"></div>
          </div>
        </div>

        {
          trendingMovies.map((movie, i) =>
            <div key={i} className="col-md-2">
              <Link to={`/moviedetails/${movie.id}`}>
                <div className="movie">
                  <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}></img>
                  <h3 className='h6'>{movie.title}</h3>
                  <p>{MovieDetails.overview}</p>

                </div>
              </Link>
            </div>
          )
        }
      </div>

      <div className="row py-2">
        <div className="col-md-4 d-flex  align-items-center ">
          <div>
            <div className="brdr w-25 mb-4"></div>
            <h3>Top<br></br>Trending<br></br>Tv</h3>
            <p>Watch Now The Top Trending Tv</p>
            <div className="brdr mt-4"></div>
          </div>
        </div>

        {
          trendingTv.map((tv, i) =>
            <div key={i} className="col-md-2">

              <Link to={`/tvdetails/${tv.id}`}>
                <div className="person">
                  <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + tv.poster_path}></img>
                  <h3 className='h6'>{tv.name}</h3>
                </div>
              </Link>
            </div>
          )
        }
      </div>


      <div className="row py-2">
        <div className="col-md-4 d-flex  align-items-center ">
          <div>
            <div className="brdr w-25 mb-4"></div>
            <h3>Top<br></br>Trending<br></br>Person</h3>
            <p>Watch Now The Top Trending Person</p>
            <div className="brdr mt-4"></div>
          </div>
        </div>

        {
          trendingPeople.map((person, i) =>

            <div key={i} className="col-md-2">
              <Link to={`/peopledetails/${person.id}`}>
                <div className="person">
                  {person.profile_path === null ? <img src={avatar} className='w-100'></img> : <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + person.profile_path}></img>}
                  <h3 className='h6'>{person.name}</h3>
                </div>
              </Link>
            </div>
          )
        }
      </div>
    </>
  )
}
