import { Location } from "../entities/location";

export interface LocationRepository {
  getAll(): Promise<Location[]>;
  getById(id: string): Promise<Location | null>;
  insert(location: Location): Promise<void>;
  update(location: Location): Promise<void>;
  remove(id: string): Promise<void>;
}
