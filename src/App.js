import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { useState, useEffect } from 'react';

function App() {

  const [manager, setManager] = useState();

  useEffect(() => {
    contractManager();
  }, []);

  const contractManager = async () => {
    const _manager = await lottery.methods.manager.call();
    console.log(_manager);
    setManager(_manager);
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>The manager is {manager}</p>
    </div>
  );
}

export default App;
