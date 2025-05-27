const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const BASE_URL = "https://newsapi.org/v2";
const API_KEY = process.env.NEWS_API_KEY; // Store your API key in .env
// Route for `everything` endpoint
app.get("/news/everything", async (req, res) => {
  try {
    const { q, from, to, sortBy, language } = req.query;
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q,
        from,
        to,
        sortBy,
        language: language || "en",
        apiKey: API_KEY,
      },
    });


    res.json(response.data);
  } catch (error) {
    // console.error("News API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Route for `top-headlines` endpoint
app.get("/news/top-headlines", async (req, res) => {
  try {
    const { country, category, language } = req.query;
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country: country || "us",
        category,
        language: language || "en",
        apiKey: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    // console.error("News API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
