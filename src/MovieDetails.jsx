import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
export default function MovieDetails() {
    let param = useParams();
    let [movieDetails, setMovieDetails] = useState(null);

    async function getMovieDetails(id) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=073a465dbee0a6683b13b0c6748185ba&language=en-US`);
        setMovieDetails(data);
    }
    useEffect(() => {
        getMovieDetails(param.id);

    }, [param.id]);

    return (

        <>
        
            <div>
                
                {movieDetails ? <div className='row'><div className="col-md-3"><img className='w-100' src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path}></img>
                </div>
                    <div className='col-md-9'>
                        <h3>{movieDetails.title}</h3>
                        <p>{movieDetails.overview}</p>
                        <ul>
                            <li>Budget: {movieDetails.budget}</li>
                            <li>popularity: {movieDetails.popularity}</li>
                            <li>original_language: {movieDetails.original_language}</li>
                        </ul>
                    </div>
                </div> : <div className=' vh-100 d-flex align-items-center  justify-content-center '>
                    <i className='fas fa-spinner fa-spin'></i></div>}
            </div>

        </>
    )
}
