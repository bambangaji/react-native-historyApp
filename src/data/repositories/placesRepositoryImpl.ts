import { Place } from "../../domain/entities/place";
import { PlacesRepository } from "../../domain/repositories/placesRepository";

const mockPlaces: Place[] = [
  { id: "1", name: "Great Wall of China", visited: false },
  { id: "2", name: "Taj Mahal", visited: false },
  { id: "3", name: "Colosseum", visited: false },
];

export class PlacesRepositoryImpl implements PlacesRepository {
  private places = [...mockPlaces];

  async getPlaces(): Promise<Place[]> {
    return this.places;
  }

  async markVisited(id: string): Promise<void> {
    this.places = this.places.map((p) =>
      p.id === id ? { ...p, visited: true } : p
    );
  }

  async unmarkVisited(id: string): Promise<void> {
    this.places = this.places.map((p) =>
      p.id === id ? { ...p, visited: false } : p
    );
  }
}
