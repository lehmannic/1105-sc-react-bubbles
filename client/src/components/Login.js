import React, { useState } from 'react';

import { axiosWithAuth } from '../utils/axiosWIthAuth';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const attemptLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axiosWithAuth()
      .post('/api/login', credentials)
      .then((res) => {
        // console.log('attemptLogin -> res', res);
        setIsLoading(false);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/protected');
      })
      .catch((err) => {
        console.log('attemptLogin -> err', err);
        // setIsLoading(false);
        // console.log(err);
        // setError('Invalid Credentials');
      });
    setCredentials({});
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className='container'>
        <h3 style={{ color: 'red' }}>{error}</h3>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <form onSubmit={attemptLogin}>
            <input
              type='text'
              name='username'
              placeholder='user name'
              value={credentials.username}
              onChange={handleChange}
            />
            <input
              type='password'
              name='password'
              placeholder='password'
              value={credentials.password}
              onChange={handleChange}
            />
            <button>Log in</button>
            <pre>{JSON.stringify(credentials, null, 2)}</pre>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
