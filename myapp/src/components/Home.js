import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Coin from "./Coin";
import Navbar from "./Navbar";

function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  // ***************testing fetching from the database
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        console.log(res.data);
        const name = res.data.users[0].first_name;
        console.log(name);
        setData(name);
      })
      .catch((error) => console.log(error));
  }, []);
  // ***************

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      
      <Navbar />

      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search a currency</h1>
          <form>
            <input
              className="coin-input"
              type="text"
              onChange={handleChange}
              placeholder="Search"
            />
          </form>
        </div>
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>

    </div>
  );
}

export default Home;