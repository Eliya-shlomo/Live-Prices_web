// pages/index.js
import CryptoPrices from '../components/CryptoPrices';

export default function Home() {
  return (
    <div style={styles.container}>
      <CryptoPrices />
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#264653', textAlign: 'center' },
};
