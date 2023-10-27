import Axios from 'axios';
import React, { useState } from 'react';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitForm(e) {
    e.preventDefault();
    setIsLoading(true);
    let validateResult = validation();
    if (validateResult.error) {
      setIsLoading(false);
      setErrorList(validateResult.error.details);
    } else {
      try {
        let { data } = await Axios.post(
          'https://api.noroff.dev/api/v1/social/auth/login',
          user
        );
        setIsLoading(false);
        localStorage.setItem('userToken', data.accessToken);
        props.saveUserData();
        navigate('/home');
      } catch (error) {
        if (error.response) {
          const errorData = error.response.data;
          if (
            errorData.errors.length > 0 &&
            errorData.errors[0].message === 'Invalid email or password'
          ) {
            setErrorList([
              { message: 'Invalid email or password. Please try again.' },
            ]);
          }
        } else {
          setErrorList([
            { message: 'An error occurred. Please try again later.' },
          ]);
        }
        setIsLoading(false);
      }
    }
  }

  function validation() {
    let schema = Joi.object({
      email: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(8).required(),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className="w-75 mx-auto">
        <h2>Login now</h2>
        {errorList.map((error, index) =>
          <div key={index} className="alert alert-danger">
            {error.message}
          </div>)
        }
        <form onSubmit={submitForm}>
          <label htmlFor="email">Email :</label>
          <input
            onChange={getUserData}
            name="email"
            id="email"
            className="form-control mb-2"
            type="email"
          />
          <label htmlFor="password">Password :</label>
          <input
            onChange={getUserData}
            name="password"
            id="password"
            className="form-control mb-2"
            type="password"
          />
        </form>
        <button
          className="btn btn-outline-info"
          type="submit"
          onClick={submitForm}
        >
          {isLoading === true ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            'Login'
          )}
        </button>
      </div>
    </>
  );
}
