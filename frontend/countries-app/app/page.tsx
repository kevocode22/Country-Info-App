"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Country } from "./types/countries";
import Link from "next/link";

export default function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/countries/available-countries`
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="text-2xl text-white">
      <h1 className="text-white text-4xl pb-6 w-full text-center">
        Available Countries
      </h1>
      <ul>
        {countries.map((country: Country) => (
          <li>
            <Link
              key={country.countryCode}
              className="text-white hover:text-green-500"
              href={`/country/${country.countryCode}`}
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
