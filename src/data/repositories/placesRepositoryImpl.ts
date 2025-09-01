import { Place } from "../../domain/entities/place";
import { PlacesRepository } from "../../domain/repositories/placesRepository";
import { getDb } from "../../services/database";

export class PlacesRepositoryImpl implements PlacesRepository {
  async getPlaces(): Promise<Place[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<any>("SELECT * FROM places;");
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      location: row.location,
      visited: row.visited, // ✅ convert number → boolean
    }));
  }

  async insertPlace(place: Place): Promise<void> {
    const db = await getDb();
    await db.runAsync(
      "INSERT INTO places (id, name, location, visited) VALUES (?, ?, ?, ?)",
      [place.id, place.name, place.location, place.visited ? 1 : 0]
    );
  }

  async markVisited(id: string): Promise<void> {
    const db = await getDb();
    await db.runAsync("UPDATE places SET visited = 1 WHERE id = ?", [id]);
  }

  async unmarkVisited(id: string): Promise<void> {
    const db = await getDb();
    await db.runAsync("UPDATE places SET visited = 0 WHERE id = ?", [id]);
  }

  async updateVisited(id: string, visited: boolean): Promise<void> {
    const db = await getDb();
    await db.runAsync("UPDATE places SET visited = ? WHERE id = ?", [
      visited ? 1 : 0,
      id,
    ]);
  }
}
