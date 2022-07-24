import {useState, useEffect} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState("x"); 
  const [dollar,setDollar] = useState(0);
  const onSelect = (event) => {setPrice(event.target.value); reset()}
  const onChange = (event) => {setDollar(event.target.value);}
  const reset = () => {setDollar(0)}
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  },[]);
  return(
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (<strong>Loading...</strong>) : 
      <div>
        <select index={price} onChange={onSelect}>
          <option value="x">Select Coin</option>
          {coins.map((coin) => <option value={coin.quotes.USD.price}>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price}</option>)}
        </select>
        <hr/>
        <div>
          <div>
            <label htmlFor="dollar">Dollar</label>
            <input
              value={dollar}
              id="dollar"
              type="number"
              placeholder="dollar"
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="coin">Coins</label>
            <input
              value={dollar/price}
              id="coin"
              type="number"
              disabled
            />
          </div>
        </div>
        <button onClick={reset}>Reset</button>  
      </div>      
      }
    </div>
  )
}

export default App;
