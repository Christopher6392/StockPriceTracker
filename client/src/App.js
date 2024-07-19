import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await axios.get(`/api/stocks`);
      setStocks(response.data);
      setSelectedStock(response.data[0].name);
    };
    fetchStocks();
  }, []);

  useEffect(() => {
    if (selectedStock) {
      const interval = setInterval(() => {
        axios.get(`/api/stocks/${selectedStock}`)
          .then(response => {
            const updatedStocks = stocks.map(stock => stock.name === selectedStock ? response.data : stock);
            setStocks(updatedStocks);
          });
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [selectedStock, stocks]);

  const handleSelect = event => {
    setSelectedStock(event.target.value);
  };

  return (
    <div>
      <select value={selectedStock} onChange={handleSelect}>
        {
          stocks.map(stock => (
            <option key={stock.name} value={stock.name}>
              {stock.name}
            </option>
          ))
        }
      </select>
      <h2>
        Current Price: {selectedStock && stocks.find(stock => stock.name === selectedStock).price}
      </h2>
    </div>
  );
}

export default App;
