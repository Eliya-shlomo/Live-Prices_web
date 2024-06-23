import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native-web';
import axios from 'axios';
import CryptoItem from './CryptoItem';
import PortfolioTotal from './PortfolioTotal';

const CryptoPrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [portfolio, setPortfolio] = useState({ VET: '', SOL: '', USDC: '' });
  const [totalValue, setTotalValue] = useState(0);

  const calculateTotalValue = (prices, portfolio) => {
    const vetPrice = prices.find(crypto => crypto.symbol === 'VET')?.quote.USD.price || 0;
    const solPrice = prices.find(crypto => crypto.symbol === 'SOL')?.quote.USD.price || 0;
    const usdcPrice = prices.find(crypto => crypto.symbol === 'USDC')?.quote.USD.price || 0;
    const total = (parseFloat(portfolio.VET) * vetPrice || 0) +
                  (parseFloat(portfolio.SOL) * solPrice || 0) +
                  (parseFloat(portfolio.USDC) * usdcPrice || 0);
    setTotalValue(total.toFixed(2));
  };

  const fetchPrices = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/crypto-prices');
      setPrices(response.data);
      calculateTotalValue(response.data, portfolio);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [portfolio]);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval); 
  }, [fetchPrices]);

  const handleInputChange = (crypto, value) => {
    const updatedPortfolio = {
      ...portfolio,
      [crypto]: value
    };
    setPortfolio(updatedPortfolio);
    calculateTotalValue(prices, updatedPortfolio);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ccd5ae" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchPrices} />}
    >
      {prices.map((crypto) => (
        <CryptoItem
          key={crypto.id}
          crypto={crypto}
          portfolio={portfolio}
          handleInputChange={handleInputChange}
        />
      ))}
      <PortfolioTotal
        totalValue={totalValue}
        calculateTotalValue={() => calculateTotalValue(prices, portfolio)}
        prices={prices}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      padding: 20,
      backgroundColor: '#e9edc9',
      justifyContent: 'space-between',
      alignItems:'center'
    },
    cryptoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    left: {
      marginRight: 10,
    },
    center: {
      flex: 1,
    },
    right: {
      marginLeft: 10,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
    },
  });

export default CryptoPrices;
