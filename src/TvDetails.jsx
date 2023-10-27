import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
export default function TvDetails() {
    let param = useParams();
    let [tvDetails, setTvDetails] = useState(null);

    async function getTvDetails(id) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=073a465dbee0a6683b13b0c6748185ba&language=en-US`);
        setTvDetails(data);
    }
    useEffect(() => {
        getTvDetails(param.id);

    }, [param.id]);

    return (

        <>
        
            <div>
                
                {tvDetails ? <div className='row'><div className="col-md-3"><img className='w-100' src={"https://image.tmdb.org/t/p/w500" + tvDetails.poster_path}></img>
                </div>
                    <div className='col-md-9'>
                        <h3>{tvDetails.name}</h3>
                        <p>{tvDetails.overview}</p>
                        <ul>
                            <li>Status: {tvDetails.status}</li>
                            <li>Vote_average: {tvDetails.vote_average}</li>
                            <li>Type: {tvDetails.type}</li>
                        </ul>
                    </div>
                </div> : <div className=' vh-100 d-flex align-items-center  justify-content-center '>
                    <i className='fas fa-spinner fa-spin'></i></div>}
            </div>

        </>
    )
}
