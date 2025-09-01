import { PlacesRepository } from "../repositories/placesRepository";
import { Place } from "../entities/place";

export class PlacesUseCases {
  constructor(private repo: PlacesRepository) {}

  async getPlaces(): Promise<Place[]> {
    return await this.repo.getPlaces();
  }

  async markVisited(id: string): Promise<void> {
    return await this.repo.markVisited(id);
  }

  async unmarkVisited(id: string): Promise<void> {
    return await this.repo.unmarkVisited(id);
  }
}
