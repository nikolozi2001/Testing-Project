import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST proxy (for dataset queries)
app.post(/^\/api\/(.*)/, async (req, res) => {
  const targetPath = req.params[0];
  const targetUrl = "http://pc-axis.geostat.ge/" + encodeURI(targetPath);

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();
    res.set("Content-Type", "application/json");
    res.send(data);
  } catch (err) {
    console.error("POST proxy error:", err);
    res.status(500).send({ error: "Proxy failed", details: err.message });
  }
});

// GET proxy (for metadata / browser access)
app.get(/^\/api\/(.*)/, async (req, res) => {
  const targetPath = req.params[0];
  const targetUrl = "http://pc-axis.geostat.ge/" + encodeURI(targetPath);

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();
    res.set("Content-Type", response.headers.get("content-type") || "text/plain");
    res.send(data);
  } catch (err) {
    console.error("GET proxy error:", err);
    res.status(500).send({ error: "Proxy failed", details: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}`);
});
