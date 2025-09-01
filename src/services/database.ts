import * as SQLite from "expo-sqlite";
import placesData from "../data/sources/places.json";
import locationData from "../data/sources/location.json";


export let db: SQLite.SQLiteDatabase;
export const getDb = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync("places.db");
    }
    return db;
};

const createTables = async () => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        location TEXT,
        visited INTEGER
      );
    `);
  
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS location (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );
    `);
  };
  
  const seedPlaces = async () => {
    const rows = await db.getAllAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM places;"
    );
    const count = rows[0]?.count ?? 0;
  
    if (count === 0) {
      for (const place of placesData) {
        await db.runAsync(
          `INSERT INTO places (id, name, location, visited) VALUES (?, ?, ?, ?)`,
          [place.id, place.name, place.location, place.visited ? 1 : 0]
        );
      }
      console.log("🌱 Places seeded");
    }
  };
  
  const seedLocations = async () => {
    const rows = await db.getAllAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM location;"
    );
    const count = rows[0]?.count ?? 0;
  
    if (count === 0) {
      for (const loc of locationData) {
        await db.runAsync(
          `INSERT INTO location (id, name) VALUES (?, ?)`,
          [loc.id, loc.name]
        );
      }
      console.log("🌱 Locations seeded");
    }
  };
  
  export const initDb = async () => {
    console.log("📂 Starting DB init");
  
    try {
      db = await SQLite.openDatabaseAsync("places.db");
  
      await createTables();
      await seedPlaces();
      await seedLocations();
  
      console.log("✅ DB initialized and tables ready");
      return db;
    } catch (error) {
      console.error("❌ DB init error:", error);
    }
  };
