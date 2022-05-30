import './App.css';
import lottery from './lottery';
import { useState, useEffect } from 'react';

function App() {

  const [manager, setManager] = useState();
  const [players, setPlayers] = useState();

  useEffect(() => {
    contractManager();
  }, []);

  const contractManager = async () => {
    const _manager = await lottery.methods.manager().call();
    setManager(_manager);

    const _players = await lottery.methods.getPlayers().call();
    console.log('AHHHHHHHHH');
    console.log(_players.length.toString());
    setPlayers(_players);
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}. There are currently {players.length.toString()} people entered, competing to win 3.395 ether!</p>
    </div>
  );
}

export default App;
