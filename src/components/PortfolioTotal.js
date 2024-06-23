// components/PortfolioTotal.js
import React from 'react';

const PortfolioTotal = ({ totalValue, calculateTotalValue, prices }) => {
  return (
    <div style={styles.totalContainer}>
      <button onClick={() => calculateTotalValue(prices)} style={{ color: '#bc6c25' }}>Calculate Total Value</button>
      <p style={styles.totalValue}>Total Portfolio Value: ${totalValue}</p>
    </div>
  );
};

const styles = {
  totalContainer: {
    padding: '15px',
    borderWidth: '1px',
    borderColor: '#d4a373',
    borderRadius: '10px',
    backgroundColor: '#faedcd',
    textAlign: 'center',
    marginTop: '10px',
  },
  totalValue: { fontSize: '18px', fontWeight: 'bold', marginTop: '10px' },
};

export default PortfolioTotal;
