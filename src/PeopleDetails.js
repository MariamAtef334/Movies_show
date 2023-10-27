import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
export default function PeopleDetails() {
    let param = useParams();
    let [peopleDetails, SetPeopleDetails] = useState(null);

    async function getPeopleDetails(id) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=073a465dbee0a6683b13b0c6748185ba&language=en-US`);
        SetPeopleDetails(data);
    }
    useEffect(() => {
        getPeopleDetails(param.id);

    }, [param.id]);

    return (

        <>
        
            <div>
                
                {peopleDetails ? <div className='row'><div className="col-md-3"><img className='w-100' src={"https://image.tmdb.org/t/p/w500" + peopleDetails.profile_path}></img>
                </div>
                    <div className='col-md-9'>
                        <h3>{peopleDetails.title}</h3>
                        <p>{peopleDetails.overview}</p>
                        <ul>
                            <li><soan className=' text-primary'>Name: </soan> {peopleDetails.name}</li>
                            <li><soan className=' text-primary'>popularity: </soan>{peopleDetails.popularity}</li>
                            <li><soan className=' text-primary'>Place_of_birth: </soan>{peopleDetails.place_of_birth}</li>
                            <li> <soan className=' text-primary'>Biography: </soan>{peopleDetails.biography}</li>
                        </ul>
                    </div>
                </div> : <div className=' vh-100 d-flex align-items-center  justify-content-center '>
                    <i className='fas fa-spinner fa-spin'></i></div>}
            </div>

        </>
    )
}
