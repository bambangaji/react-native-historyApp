// domain/usecases/locationUseCases.ts
import { LocationRepository } from "../repositories/locationRepository";
import { Location } from "../entities/location";

export class LocationUseCases {
  constructor(private repo: LocationRepository) {}

  async getAllLocations(): Promise<Location[]> {
    return await this.repo.getAll();
  }

  async getLocationById(id: string): Promise<Location | null> {
    return await this.repo.getById(id);
  }

  async insertLocation(location: Location): Promise<void> {
    await this.repo.insert(location);
  }

  async updateLocation(location: Location): Promise<void> {
    await this.repo.update(location);
  }

  async removeLocation(id: string): Promise<void> {
    await this.repo.remove(id);
  }
}
