
import { React, useEffect, useState, createContext } from 'react'
import Axios from 'axios';


export let moviesContext = createContext(0);

export default function MoviesContextProvider(props) {
    let [trendingMovies, setTrendingMovies] = useState([]);
    let [trendingTv, setTrendingTv] = useState([]);
    let [trendingPeople, setTrendingPeople] = useState([]);
    async function getTrending(mediaType, callBack) {

        let { data } = await Axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`);
        console.log({ data });
        callBack(data.results.slice(0, 10));

    }

    useEffect(() => {
        getTrending('movie', setTrendingMovies);
        getTrending('tv', setTrendingTv);
        getTrending('person', setTrendingPeople);
        console.log(trendingMovies[1])
    }
        , []);
    return <moviesContext.Provider value={{ trendingMovies, trendingPeople, trendingTv }}>
        {props.children};

    </moviesContext.Provider>
}