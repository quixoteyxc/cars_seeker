'use client';
import { Suspense, useCallback, useEffect, useState } from 'react';
import CustomLink from '../components/ui/CustomLink';
import { OptionType } from '../constants/interfaces/DropDown';
import VehicleService from '../services/vehicleService';
import { VehicleMake } from '../constants/interfaces/CarModel';
import { Routes } from '../constants/routes';
import dynamic from 'next/dynamic';

const Selects = dynamic(() => import('../components/Selects'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Home() {
  const [selectedModelOption, setSelectedModelOption] =
    useState<OptionType | null>(null);
  const [modelOptions, setModelOptions] = useState<OptionType[]>([]);
  const [selectedYearOption, setSelectedYearOption] =
    useState<OptionType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchOptions = useCallback(async () => {
    try {
      const vehicleService = new VehicleService();
      const data = await vehicleService.getAllVehicleModels();
      setModelOptions(
        data.map((carModel: VehicleMake) => ({
          value: carModel.MakeId,
          label: carModel.MakeName,
        }))
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col gap-3 max-w-[400px] w-full">
        <h1 className="mx-auto text-2xl">Select options</h1>
        <Selects
          selectedModelOption={selectedModelOption}
          setSelectedModelOption={setSelectedModelOption}
          modelOptions={modelOptions}
          isLoading={isLoading}
          selectedYearOption={selectedYearOption}
          setSelectedYearOption={setSelectedYearOption}
        />
        <CustomLink
          href={Routes.result(
            selectedModelOption?.value,
            selectedYearOption?.value
          )}
          isDisabled={!selectedYearOption || !selectedModelOption}
        >
          Find
        </CustomLink>
      </div>
    </div>
  );
}
