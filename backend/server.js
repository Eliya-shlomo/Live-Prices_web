const express = require('express');
const next = require('next');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

app.prepare().then(() => {
  const server = express();

  server.use(cors());

  server.get('/api/crypto-prices', async (req, res) => {
    try {
      const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': API_KEY,
        },
        params: {
          start: 1,
          limit: 100,
          convert: 'USD',
        },
      });
      const data = response.data.data.filter(crypto => ['vechain', 'solana', 'usd-coin'].includes(crypto.slug));
      res.json(data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
