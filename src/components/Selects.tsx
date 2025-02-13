'use client';
import { OptionType } from '../constants/interfaces/DropDown';
import { years } from '../constants/availableYears';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });

interface SelectsProps {
  selectedModelOption: OptionType | null;
  setSelectedModelOption: (option: OptionType | null) => void;
  modelOptions: OptionType[];
  isLoading: boolean;
  selectedYearOption: OptionType | null;
  setSelectedYearOption: (option: OptionType | null) => void;
}

export default function Selects({
  selectedModelOption,
  setSelectedModelOption,
  modelOptions,
  isLoading,
  selectedYearOption,
  setSelectedYearOption,
}: SelectsProps) {
  return (
    <>
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
        placeholder="Select year option"
      />
    </>
  );
}
