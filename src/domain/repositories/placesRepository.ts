import { Place } from "../entities/place";

export interface PlacesRepository {
  getPlaces(): Promise<Place[]>;
  markVisited(id: string): Promise<void>;
  unmarkVisited(id: string): Promise<void>;
}
