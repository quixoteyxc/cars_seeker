'use client';
import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import CustomLink from "../components/ui/CustomLink";
import {OptionType} from "../constants/interfaces/DropDown";
import VehicleService from "../services/vehicleService";
import {VehicleMake} from "../constants/interfaces/CarModel";
import {years} from "../constants/availableYears";
import {Routes} from "../constants/routes";

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
        data.map((carModel: VehicleMake) => {
          return {
            value: carModel.MakeId,
            label: carModel.MakeName,
          };
        })
      );
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);
  console.log(selectedYearOption);
  return (
    <div className=" flex h-screen  justify-center items-center ">
      <div className=" flex flex-col gap-3 max-w-[400px]  w-full">
        <h1 className="mx-auto text-2xl">Select options</h1>
        <Select
          defaultValue={selectedModelOption}
          onChange={setSelectedModelOption}
          options={modelOptions}
          isLoading={isLoading}
          placeholder="Select model option"
        />
        <Select
          defaultValue={selectedYearOption}
          options={years}
          onChange={setSelectedYearOption}
          placeholder={`Select year option`}
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
