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
    height: '185px', 
    marginBottom: '12px',
    padding: '10px',
    borderWidth: '1px',
    borderColor: '#ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  name: { fontSize: '18px', fontWeight: 'bold', lineHeight: '0.4' }, 
  price: { fontSize: '16px', color: '#00b894', lineHeight: '0.4' }, 
  change: { fontSize: '14px', color: '#d63031', lineHeight: '0.4' }, 
  details: { fontSize: '12px', color: '#636e72', lineHeight: '0.4' }, 
  input: { height: '28px', width: '32%', borderColor: 'gray', borderWidth: '1px', marginTop: '10px', padding: '5px',textAlign: 'center'   },
};

export default CryptoItem;

