// server.js
// Proxy-Service für Yahoo Finance API auf Render

const express = require("express");
const fetch = require("node-fetch");
const app = express();

// CORS-Middleware: alle Ursprünge erlauben
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Endpoint: /api/quote?symbol=XYZ
app.get("/api/quote", async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) {
    return res.status(400).json({ error: "Missing symbol parameter" });
  }
  const endpoint = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(
    symbol
  )}?modules=summaryDetail,financialData,earningsTrend,recommendationTrend,price`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error(`Fehler beim Fetch für ${symbol}:`, error);
    return res.status(502).json({ error: String(error) });
  }
});

// Start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Yahoo-Proxy-Service läuft auf Port ${PORT}`);
});