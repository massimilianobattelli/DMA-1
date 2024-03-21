//npm run
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";

function App() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyA2C13_mXSIZ4dxsBD0RXF0MJ6b2hTODWA",
    authDomain: "dma-edfa3.firebaseapp.com",
    projectId: "dma-edfa3",
    storageBucket: "dma-edfa3.appspot.com",
    messagingSenderId: "445216688257",
    appId: "1:445216688257:web:5c074dbc7188862512e580"
  };
  
  const app = initializeApp(firebaseConfig);

  const fetchData = async () => {
    try {
      //const response = await fetch('http://backend:3001/'); // Sostituisci con l'URL corretto del tuo backend
      const response = await fetch('http://localhost:3001/'); // Sostituisci con l'URL corretto del tuo backend
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/add-user', { // Sostituisci con l'URL corretto del tuo backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputValue }),
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form onSubmit={handleSubmit}>
          <label>Nome:  
            <input name="myInput" value={inputValue} onChange={e => setInputValue(e.target.value)} />
          </label>
          <hr/>
          <button type="submit">Aggiungi</button>
        </form>

        <h3>
          Anagrafica:
        </h3>
        <ul className="list-container">
          {data ? (
            data.map(item => (
              <li key={item.id} className="list-item">
                ID: {item.id}, Name: {item.name}
              </li>
            ))
          ) : (
            <li>Nessun dato disponibile</li>
          )}
        </ul>
      </header>
    </div>
  );

}
export default App;

/*
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in 
      const user = userCredential.user;
      // ...
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during authentication:', errorCode, errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default LoginForm;
*/