import { users, type User, type InsertUser, type WaterLog } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTodayWaterLog(): Promise<WaterLog | undefined>;
  updateTodayWaterLog(glassesConsumed: number): Promise<WaterLog>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waterLog: WaterLog | undefined;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.waterLog = undefined;
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

  async getTodayWaterLog(): Promise<WaterLog | undefined> {
    const today = new Date().toISOString().split('T')[0];
    
    // If no log exists or it's from a different day, return undefined
    if (!this.waterLog || this.waterLog.date !== today) {
      return undefined;
    }
    
    return this.waterLog;
  }

  async updateTodayWaterLog(glassesConsumed: number): Promise<WaterLog> {
    const today = new Date().toISOString().split('T')[0];
    
    this.waterLog = {
      id: 1, // Simple ID for in-memory storage
      date: today,
      glassesConsumed,
    };
    
    return this.waterLog;
  }
}

export const storage = new MemStorage();
