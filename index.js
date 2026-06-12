import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());           
app.use(express.json());

// صفحة افتراضية
app.get("/", (req, res) => {
  res.send("✅ Prince Proxy API is running on Render!");
});

// جلب الخدمات
app.get("/services", async (req, res) => {
  try {
    const response = await fetch("https://prince.services/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        key: process.env.prince_API_KEY,
        action: "services"
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// إنشاء طلب شراء
app.post("/order", async (req, res) => {
  try {
    const { service, link, quantity } = req.body;

    const response = await fetch("https://prince.services/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        key: process.env.prince_API_KEY,
        action: "add",
        service,
        link,
        quantity
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
