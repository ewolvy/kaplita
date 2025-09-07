import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Water tracking API routes
  app.get("/api/water-log/today", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      
      const log = await storage.getTodayWaterLog(userId);
      res.json(log || { date: new Date().toISOString().split('T')[0], glassesConsumed: 0, userId });
    } catch (error) {
      res.status(500).json({ error: "Failed to get today's water log" });
    }
  });

  app.post("/api/water-log/today", async (req, res) => {
    try {
      const { userId, glassesConsumed } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      
      if (typeof glassesConsumed !== 'number' || glassesConsumed < 0 || glassesConsumed > 8) {
        return res.status(400).json({ error: "Invalid glasses consumed count" });
      }
      
      const log = await storage.updateTodayWaterLog(userId, glassesConsumed);
      res.json(log);
    } catch (error) {
      res.status(500).json({ error: "Failed to update today's water log" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
