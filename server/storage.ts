import { users, type User, type InsertUser, type WaterLog } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTodayWaterLog(userId: string): Promise<WaterLog | undefined>;
  updateTodayWaterLog(userId: string, glassesConsumed: number): Promise<WaterLog>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waterLogs: Map<string, WaterLog>; // key: userId-date
  currentId: number;
  currentLogId: number;

  constructor() {
    this.users = new Map();
    this.waterLogs = new Map();
    this.currentId = 1;
    this.currentLogId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTodayWaterLog(userId: string): Promise<WaterLog | undefined> {
    const today = new Date().toISOString().split('T')[0];
    const key = `${userId}-${today}`;
    
    return this.waterLogs.get(key);
  }

  async updateTodayWaterLog(userId: string, glassesConsumed: number): Promise<WaterLog> {
    const today = new Date().toISOString().split('T')[0];
    const key = `${userId}-${today}`;
    
    const waterLog: WaterLog = {
      id: this.currentLogId++,
      userId,
      date: today,
      glassesConsumed,
    };
    
    this.waterLogs.set(key, waterLog);
    return waterLog;
  }
}

export const storage = new MemStorage();
