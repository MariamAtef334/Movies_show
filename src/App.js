
import './App.css';
import Home from './Home';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Movies from './Movies';
import Navbar from './Navbar';
import People from './People';
import Notfound from './Notfound';
import Login from './Login';
import Register from './Register';
import Tv from './Tv';
import MovieDetails from './MovieDetails';
import PeopleDetails from './PeopleDetails';
import MoviesContextProvider from './Context/Store';
import TvDetails from './TvDetails'
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

function App() {
  let navigate = useNavigate();
  let [userData, setUserData] = useState(null);
  function saveUserData() {
    const encodedToken = localStorage.getItem("userToken");
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    console.log(decodedToken);
  }
  function ProtectedRoute(props) {
    if (localStorage.getItem('userToken') === null) {
      return <Navigate to='/login' />;
    } else {
      return props.children;
    }
  }
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUserData();
    }
  }
    , [])
  function logOut() {
    userData = null;
    localStorage.removeItem('userToken');
    navigate('/login');
  
  }
  return (
    <>

      <MoviesContextProvider>
        <Navbar userData={userData} logOut={logOut} />
        <div className="container">

          <Routes>
            <Route path='' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
            <Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
            <Route path='login' element={<Login saveUserData={saveUserData} />}></Route>
            <Route path='Register' element={<Register />}></Route>
            <Route path='movies' element={<ProtectedRoute><Movies /></ProtectedRoute>}></Route>
            <Route path='people' element={<ProtectedRoute><People /></ProtectedRoute>}></Route>
            <Route path='tv' element={<ProtectedRoute><Tv /></ProtectedRoute>}></Route>
            <Route path='peopledetails' element={<PeopleDetails />}><Route path=":id" element={<PeopleDetails />}></Route>
            </Route>
            <Route path='moviedetails' element={<MovieDetails />}>
              <Route path=":id" element={<MovieDetails />}></Route>
            </Route>
            <Route path='tvdetails' element={<TvDetails />}>
              <Route path=":id" element={<TvDetails />}></Route>
            </Route>
            <Route path='*' element={<Notfound />}></Route>
          </Routes>

        </div>

      </MoviesContextProvider>
    </>
  );
}

export default App;
