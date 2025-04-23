// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Beispiel: https://dein-proxy.onrender.com/yahoo?symbol=AAPL
app.get('/yahoo', async (req, res) => {
  const symbol = req.query.symbol || 'AAPL';
  const modules = 'summaryDetail,financialData,earningsTrend,recommendationTrend,price';

  try {
    const response = await fetch(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=${modules}`);
    const data = await response.json();

    if (!data.quoteSummary?.result) {
      return res.status(400).json({ error: 'Keine gültigen Daten gefunden', details: data });
    }

    res.json(data.quoteSummary.result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abruf der Daten', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Yahoo Finance Proxy ist online!');
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf Port ${PORT}`);
});