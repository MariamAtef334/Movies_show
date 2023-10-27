import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
export default function Tv() {
  let [trendingTv, setTrendingTv] = useState([]);
  let nums = new Array(13).fill(1).map((elem, index) => index + 1);
  async function getTrending(pageNum) {

    let { data } = await Axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=073a465dbee0a6683b13b0c6748185ba&language=en-US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&page=${pageNum}`);
    console.log(data.results);
    setTrendingTv(data.results);

    console.log(trendingTv);
  }
  useEffect(() => {
    getTrending(1);

  }
    , []);
  return (
    <>
      <div className='row' >
        {trendingTv ? trendingTv.map((tv, i) =>
          <div className="col-md-3" key={i}>
            <Link to={`/tvdetails/${tv.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500` + tv.poster_path} className='w-100'></img>
              <h3>{tv.name}</h3>
            </Link>
          </div>) : <div className='d-flex justify-content-center align-items-center vh-100'><i className='fas fa-spinner fa-spin'></i></div>}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
       
          {nums.map((pageNumber) => 
            <>
        
            <li className="page-item "><a className="page-link bg-transparent" onClick={() => getTrending(pageNumber)}>{pageNumber}</a></li>
         
          </>
          )}
             
        </ul>
      </nav>
    </>
  )
}
