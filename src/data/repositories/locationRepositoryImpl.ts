import { Location } from "../../domain/entities/location";
import { LocationRepository } from "../../domain/repositories/locationRepository";
import { getDb } from "../../services/database";

export class LocationRepositoryImpl implements LocationRepository {
  async getAll(): Promise<Location[]> {
    const db = await getDb();
    return await db.getAllAsync<Location>("SELECT * FROM location;");
  }

  async getById(id: string): Promise<Location | null> {
    const db = await getDb();
    const rows = await db.getAllAsync<Location>(
      "SELECT * FROM location WHERE id = ?;",
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async insert(location: Location): Promise<void> {
    const db = await getDb();
    await db.runAsync(
      "INSERT OR IGNORE INTO location (id, name) VALUES (?, ?);",
      [location.id, location.name]
    );
  }

  async update(location: Location): Promise<void> {
    const db = await getDb();
    await db.runAsync(
      "UPDATE location SET name = ? WHERE id = ?;",
      [location.name, location.id]
    );
  }

  async remove(id: string): Promise<void> {
    const db = await getDb();
    await db.runAsync("DELETE FROM location WHERE id = ?;", [id]);
  }
}
