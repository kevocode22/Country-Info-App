import { useEffect, useState } from "react";
import axios from "axios";
import {
  BorderData,
  CountryData,
  FlagData,
  PopulationData,
} from "@/app/types/countries";

// Tipo de retorno del hook
interface CountryInfoHookReturn {
  countryData: CountryData | null;
  populationData: PopulationData[];
  flags: FlagData[];
  isLoading: boolean;
  error: string | null;
}

export const useCountryInfo = (code: string): CountryInfoHookReturn => {
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [flags, setFlags] = useState<FlagData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountryInfo = async () => {
    try {
      const response = await axios.get<CountryData>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/countries/country-info/${code}`
      );
      setCountryData(response.data);
    } catch (err) {
      setError("Error fetching country info");
    }
  };

  const fetchPopulation = async () => {
    try {
      const response = await axios.get<PopulationData[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/countries/population`
      );
      setPopulationData(response.data);
    } catch (err) {
      setError("Error fetching population data");
    }
  };

  const fetchFlagByCountry = async () => {
    try {
      const response = await axios.get<{ data: FlagData[] }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/countries/flags`
      );
      setFlags(response.data.data);
    } catch (err) {
      setError("Error fetching flag data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchCountryInfo(),
        fetchPopulation(),
        fetchFlagByCountry(),
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, [code]);

  return {
    countryData,
    populationData,
    flags,
    isLoading,
    error,
  };
};
