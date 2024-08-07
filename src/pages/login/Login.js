import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';
import './Login.scss'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/auth/login', {
        email,
        password
      });

      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate('/');
      
    } catch (err) {
      console.log(err);
    }   
  }

  return (
    <div className='Login'>
      <div className="login-box">
        <h2 className='heading'>Login</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input 
            type="text" 
            className='email' 
            id='email' 
            onChange={(e) => {setEmail(e.target.value)}} 
          />

          <label htmlFor="password">Password</label>
          <input 
            type="text" 
            className='password' 
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" value="Submit" className='submit'/>
          <p className='login-footer'> Don't have account? <Link to="/signup">Sign Up</Link> </p>
        </form>
      </div>
    </div>
  )
}

export default Login