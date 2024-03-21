import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const firebaseConfig = {
    apiKey: "AIzaSyA2C13_mXSIZ4dxsBD0RXF0MJ6b2hTODWA",
    authDomain: "dma-edfa3.firebaseapp.com",
    projectId: "dma-edfa3",
    storageBucket: "dma-edfa3.appspot.com",
    messagingSenderId: "445216688257",
    appId: "1:445216688257:web:5c074dbc7188862512e580"
  };
  
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in 
      const user = userCredential.user;
      navigate('/home');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during authentication:', errorCode, errorMessage);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit} className="Login">
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <button type="submit">Log in</button>
        </form>
      </header>
    </div>
  );
}

export default Login;