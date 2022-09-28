import React, {useState} from "react";
import { token } from "../../../declarations/token";

function Faucet() {

  const [buttonText, setText] = useState("Collect Tokens");
  const [isDisabled, setDisabled] = useState(false);

  async function handleClick(event) {
    setDisabled(true);
    const result = await token.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>!FREE!   Claim 10,000 TNK870 token to your account!   !FREE!</label>
      <p className="trade-buttons">
        <button 
          id="btn-payout" 
          onClick={handleClick}
          disabled={isDisabled}
          >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
