import { VehicleMake } from '@/constants/interfaces/CarModel';

const API_URL = process.env.NEXT_PUBLIC_VEHICLE_API_URL;

export class VehicleService {
  async getAllVehicleModels(): Promise<VehicleMake[]> {
    const response = await fetch(
      `${API_URL}/GetMakesForVehicleType/car?format=json`
    );
    const data = await response.json();
    return data.Results;
  }

  async getAllVehicles(makeId: string, year: string): Promise<VehicleMake[]> {
    const response = await fetch(
      `${API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const data = await response.json();
    return data.Results || [];
  }
}

export default VehicleService;
