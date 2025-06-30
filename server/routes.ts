import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Water tracking API routes
  app.get("/api/water-log/today", async (req, res) => {
    try {
      const log = await storage.getTodayWaterLog();
      res.json(log || { date: new Date().toISOString().split('T')[0], glassesConsumed: 0 });
    } catch (error) {
      res.status(500).json({ error: "Failed to get today's water log" });
    }
  });

  app.post("/api/water-log/today", async (req, res) => {
    try {
      const { glassesConsumed } = req.body;
      
      if (typeof glassesConsumed !== 'number' || glassesConsumed < 0 || glassesConsumed > 8) {
        return res.status(400).json({ error: "Invalid glasses consumed count" });
      }
      
      const log = await storage.updateTodayWaterLog(glassesConsumed);
      res.json(log);
    } catch (error) {
      res.status(500).json({ error: "Failed to update today's water log" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
