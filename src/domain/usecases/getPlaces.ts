import { PlacesRepository } from "../repositories/placesRepository";
import { Place } from "../entities/place";

export class GetPlaces {
  constructor(private repo: PlacesRepository) {}

  async execute(): Promise<Place[]> {
    return await this.repo.getPlaces();
  }
}
