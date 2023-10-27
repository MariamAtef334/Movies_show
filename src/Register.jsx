import Axios from 'axios';
import React, { useState } from 'react';
import Joi from 'joi'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
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
    const validateResult = validation();

    if (validateResult.error) {
      setIsLoading(false);
      setErrorList(validateResult.error.details);
    } else {
      try {
        const { data } = await Axios.post(
          `https://api.noroff.dev/api/v1/social/auth/register`,
          user
        );
        navigate('/login');
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        if (error.response) {
          const errorData = error.response.data;
          if (
            errorData.errors.length > 0 &&
            errorData.errors[0].message === 'Profile already exists'
          ) {
            setErrorList([
              { message: 'Profile already exists. Please try again.' },
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
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(8).required(),
      banner: Joi.optional(),
      avatar: Joi.optional(),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className='w-75 mx-auto'>
        <h2>Register now</h2>
        {errorList.map((error, i) => <div key={i} className='alert alert-danger '>{error.message}</div>)}
        <form onSubmit={submitForm}>

          <label htmlFor='name'>Name :</label>
          <input onChange={getUserData} name="name" id="name" className='form-control mb-2 '></input>
          <label htmlFor='email'>Email : (Only noroff.no emails allowed "first.last@stud.noroff.no")</label>
          <input onChange={getUserData} name="email" id="email" className='form-control mb-2 ' type='email'></input>
          <label htmlFor='password'>Password :</label>
          <input onChange={getUserData} name="password" id="password" className='form-control mb-2 ' type="password"></input>

        </form>

        <button className='btn btn-outline-info ' type="submit" onClick={submitForm}>{isLoading === true ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}</button>
      </div>
    </>
  )
}
