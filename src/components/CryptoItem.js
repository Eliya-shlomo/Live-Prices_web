// components/CryptoItem.js
import React from 'react';

const CryptoItem = ({ crypto, portfolio, handleInputChange }) => {
  return (
    <div style={styles.cryptoContainer}>
      <p style={styles.name}>{crypto.name} ({crypto.symbol})</p>
      <p style={styles.price}>${crypto.quote.USD.price.toFixed(2)}</p>
      <p style={styles.change}>{crypto.quote.USD.percent_change_24h.toFixed(2)}%</p>
      <p style={styles.details}>Market Cap: ${crypto.quote.USD.market_cap.toLocaleString()}</p>
      <p style={styles.details}>Volume (24h): ${crypto.quote.USD.volume_24h.toLocaleString()}</p>
      <input
        type="number"
        style={styles.input}
        placeholder={`Amount of ${crypto.symbol} you own`}
        value={portfolio[crypto.symbol]}
        onChange={(e) => handleInputChange(crypto.symbol, e.target.value)}
      />
    </div>
  );
};

const styles = {
  cryptoContainer: {
    marginBottom: '20px',
    padding: '15px',
    borderWidth: '1px',
    borderColor: '#ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  name: { fontSize: '18px', fontWeight: 'bold' },
  price: { fontSize: '16px', color: '#00b894' },
  change: { fontSize: '14px', color: '#d63031' },
  details: { fontSize: '12px', color: '#636e72' },
  input: { height: '40px', borderColor: 'gray', borderWidth: '1px', marginTop: '20px', paddingHorizontal: '10px' },
};

export default CryptoItem;
