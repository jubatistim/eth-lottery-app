import "./App.css";
import lottery from "./lottery";
import { useState, useEffect } from "react";
import web3 from "./web3";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState("");
  const [balance, setBalance] = useState("");
  const [ammount, setAmmount] = useState("");
  const [message, setMessage] = useState("");

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

  const handleAmmountChange = async (event) => {
    setAmmount(event.target.value);
  };

  const enterOnSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(ammount, 'ether')
    });

    setMessage('You have been entered!');
  };

  const pickWinnerOnSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    setMessage('A winner have been picked!');
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. There are currently{" "}
        {players.length.toString()} people entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether").toString()} ether!
      </p>
      <hr />
      <form onSubmit={enterOnSubmit}>
        <h4>Want to try your lucky?</h4>
        <div>
          <label>Ammount of ether to enter</label>
          <input onChange={handleAmmountChange}></input>
        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={pickWinnerOnSubmit}>Pick a winner</button>
      <hr />
      <h1>{message}</h1>
    </div>
  );
}

export default App;
