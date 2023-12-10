import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

interface Stock {
  symbol: string;
  refreshInterval: number;
  // Add more properties as needed
}

const App: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [numberOfStocks, setNumberOfStocks] = useState<string>('3'); // Default value
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchStocks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/stocks/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `n=${numberOfStocks}`,
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching stocks: ${response.statusText}`);
      }
  
      const data: { stocks: Stock[] } | { error: string } = await response.json();
  
      if ('error' in data) {
        setError(data.error);
        console.error(`Error fetching stocks: ${data.error}`);
      } else {
        setError(undefined);
        setStocks(data.stocks);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error(`Error fetching stocks: ${errorMessage}`);
    }
  };
  
  useEffect(() => {
    // Fetch stock data when the component mounts
    fetchStocks();
  }, [numberOfStocks]); // Fetch again when numberOfStocks changes

  // Render stock data
  return (
    <View>
      <Text>Number of Stocks:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={setNumberOfStocks}
        value={numberOfStocks}
        keyboardType="numeric"
      />
      <Button title="Fetch Stocks" onPress={fetchStocks} />
      {error && <Text>Error: {error}</Text>}
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
