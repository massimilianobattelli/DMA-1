import logo from '../logo.svg';
import '../App.css';
import { useState, useEffect } from 'react';

function Home() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

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
export default Home;