import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.scss'
import { axiosClient } from '../../utils/axiosClient';

function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosClient.post('/auth/signup', {
        name,
        email,
        password
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }   
  }
  return (
    <div className='Signup'>
      <div className="signup-box">
        <h2 className='heading'>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            className='name' 
            id='name'
            onChange={(e) => setName(e.target.value)}
          />

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
          <p className='signup-footer'> Already have account? <Link to="/login">Login</Link> </p>
        </form>
      </div>
    </div>
  )
}

export default Signup