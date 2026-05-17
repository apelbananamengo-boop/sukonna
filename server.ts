import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Simple API for products (mock data)
  app.get("/api/products", (req, res) => {
    res.json([
      {
        id: 1,
        name: "Royal Jamdani Saree",
        price: "12,500 BDT",
        category: "Saree",
        image: "jamdani",
        description: "Exquisite hand-woven Jamdani saree with gold Zari work."
      },
      {
        id: 2,
        name: "Designer Salwar Set",
        price: "5,800 BDT",
        category: "Salwar Kameez",
        image: "salwar",
        description: "Cotton silk salwar set with detailed embroidery."
      },
      {
        id: 3,
        name: "Luxury Silk Panjabi",
        price: "4,200 BDT",
        category: "Panjabi",
        image: "panjabi_blue",
        description: "Premium silk panjabi with ethnic needlework."
      },
      {
        id: 4,
        name: "Handloom Cotton Saree",
        price: "3,500 BDT",
        category: "Saree",
        image: "handloom",
        description: "Comfortable and elegant handloom cotton for daily wear."
      },
      {
        id: 5,
        name: "Midnight Blue Katan Saree",
        price: "15,000 BDT",
        category: "Saree",
        image: "katan",
        description: "Traditional Katan saree with heavy gold borders."
      },
      {
        id: 6,
        name: "Premium Linen Panjabi",
        price: "3,800 BDT",
        category: "Panjabi",
        image: "panjabi_emerald",
        description: "Breathable linen panjabi for all-day comfort."
      },
      {
        id: 7,
        name: "Floral Muslin Saree",
        price: "8,500 BDT",
        category: "Saree",
        image: "muslin",
        description: "Lightweight muslin with beautiful floral hand-prints."
      },
      {
        id: 8,
        name: "Modern Kurti Set",
        price: "4,500 BDT",
        category: "Salwar Kameez",
        image: "salwar",
        description: "Stylish kurti ensemble with contemporary patterns."
      },
      {
        id: 9,
        name: "Soft Tussar Silk Saree",
        price: "9,200 BDT",
        category: "Saree",
        image: "katan",
        description: "Rich Tussar silk for a sophisticated ethnic look."
      },
      {
        id: 10,
        name: "Block Print Panjabi",
        price: "2,500 BDT",
        category: "Panjabi",
        image: "panjabi_blue",
        description: "Classic hand-blocked patterns on premium cotton."
      },
      {
        id: 11,
        name: "Pastel Chiffon Saree",
        price: "5,500 BDT",
        category: "Saree",
        image: "muslin",
        description: "Elegant chiffon saree in soft pastel shades."
      },
      {
        id: 12,
        name: "Embroidered Salwar Suite",
        price: "7,200 BDT",
        category: "Salwar Kameez",
        image: "salwar",
        description: "Heavily embroidered salwar suite for special occasions."
      },
      {
        id: 13,
        name: "Designer Half-Silk Saree",
        price: "6,800 BDT",
        category: "Saree",
        image: "jamdani",
        description: "Modern half-silk saree with artistic design motifs."
      },
      {
        id: 14,
        name: "Ethnic Embroidery Panjabi",
        price: "4,800 BDT",
        category: "Panjabi",
        image: "panjabi_emerald",
        description: "Intricate needlework on pure silk fabric."
      }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
