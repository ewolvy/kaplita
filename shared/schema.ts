import { pgTable, text, serial, integer, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const dailyWaterLog = pgTable("daily_water_log", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  date: date("date").notNull(),
  glassesConsumed: integer("glasses_consumed").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaterLogSchema = createInsertSchema(dailyWaterLog).pick({
  userId: true,
  date: true,
  glassesConsumed: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWaterLog = z.infer<typeof insertWaterLogSchema>;
export type WaterLog = typeof dailyWaterLog.$inferSelect;
