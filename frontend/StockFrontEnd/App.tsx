import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

interface Stock {
  symbol: string;
  refreshInterval: number;
  // Add more properties as needed
}

const App: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    // Fetch stock data from Django backend
    fetch('http://localhost:8000/stocks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'n=3', // Change this value based on your requirement
    })
      .then(response => response.json())
      .then((data: Stock[]) => {
        // Update state with fetched stocks
        setStocks(data);
      })
      .catch(error => console.error('Error fetching stocks:', error));
  }, []);

  // Render stock data
  return (
    <View>
      <Text>Stock List</Text>
      {stocks.map(stock => (
        <View key={stock.symbol}>
          <Text>{`Symbol: ${stock.symbol}`}</Text>
          <Text>{`Refresh Interval: ${stock.refreshInterval}s`}</Text>
          {/* Add more details as needed */}
        </View>
      ))}
    </View>
  );
};

export default App;
