import React, {useState} from "react";
import {token} from "./../../../declarations/token";
import {Principal} from "@dfinity/principal";

function Balance() {
  const [inputValue, setInput] = useState("");
  const [symbol, setSymbol] = useState("");
  const [results, setResults] = useState("");
  const [ishidden, setHidden] = useState(true);
  
  async function handleClick() {
    console.log(inputValue);
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    setResults(balance.toLocaleString());
    setSymbol(await token.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) =>{setInput(e.target.value)}}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={ishidden}>This account has a balance of {results}{symbol}.</p>
    </div>
  );
}

export default Balance;
