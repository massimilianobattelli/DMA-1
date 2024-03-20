import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/'); // Sostituisci con l'URL corretto del tuo backend
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form method="post">
          <label>Nome:  
            <input name="myInput" value=""/>
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
