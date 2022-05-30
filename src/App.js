import './App.css';
import lottery from './lottery';
import { useState, useEffect } from 'react';
import web3 from './web3';

function App() {

  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState("");
  const [balance, setBalance] = useState("");

  const contractManager = async () => {
    const _manager = await lottery.methods.manager().call();
    setManager(_manager);

    const _players = await lottery.methods.getPlayers().call();
    setPlayers(_players);

    const _balance = await web3.eth.getBalance(lottery.options.address);  
    setBalance(_balance);
  };

  useEffect(() => {
    contractManager();
  }, []);

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}. There are currently {players.length.toString()} people entered, competing to win {web3.utils.fromWei(balance).toString()} ether!</p>
    </div>
  );
}

export default App;
