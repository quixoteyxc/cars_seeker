import Link from 'next/link';
import VehicleService from '../../../../services/vehicleService';
import { years } from '../../../../constants/availableYears';
import { VehicleMake } from '../../../../constants/interfaces/CarModel';

export async function generateStaticParams() {
  const vehicleService = new VehicleService();
  const makesData = await vehicleService.getAllVehicleModels();
  const makes = makesData.map(
    (vehicleModel: VehicleMake) => vehicleModel.MakeId
  );
  const Years = years.map((year) => year.value);

  const paths = makes.flatMap((makeId) =>
    Years.map((year) => ({
      makeId: makeId.toString(),
      year: year.toString(),
    }))
  );

  return paths;
}

export default async function Page({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  const { makeId, year } = params;
  const vehicleService = new VehicleService();

  try {
    const models = await vehicleService.getAllVehicles(makeId, year);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Car Information</h1>
        <p className="text-lg">Make: {makeId}</p>
        <p className="text-lg">Year: {year}</p>
        <h2 className="text-xl font-semibold mt-4">Models:</h2>
        <ul className="list-disc pl-5">
          {models.length > 0 ? (
            <>
              {' '}
              {models.map((model, index) => (
                <li key={index} className="mt-2">
                  {model.Model_Name}
                </li>
              ))}
            </>
          ) : (
            <p>No such vehicles</p>
          )}
        </ul>
        <Link
          className="w-20 mt-4 px-5 pb-1 rounded flex justify-center items-center bg-blue-700 text-white text-base-medium cursor-pointer"
          href={'/'}
        >
          Back
        </Link>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-lg">Failed to load data</p>
      </div>
    );
  }
}
