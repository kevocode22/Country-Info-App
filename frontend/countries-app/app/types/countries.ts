export type Country = {
  countryCode: string;
  name: string;
};

export interface PopulationData {
  populationCounts: { year: number; value: number }[];
  country: string;
}

export interface CountryData {
  flagUrl: string;
  borders: BorderData[];
  commonName: string;
  country: string;
}

export interface BorderData {
  countryCode: string;
  commonName: string;
}

export interface FlagData {
  name: string;
  flag: string;
}
