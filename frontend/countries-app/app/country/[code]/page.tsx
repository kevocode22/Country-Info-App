"use client";
import { Line } from "react-chartjs-2";
import Link from "next/link";
import Image from "next/image";
import { useCountryInfo } from "@/app/hooks/useCountryInfo";
import { BorderData } from "@/app/types/countries";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CountryInfo({ params }: { params: { code: string } }) {
  const { countryData, populationData, flags, isLoading, error } =
    useCountryInfo(params.code);

  /*Find corresponding Country*/
  const matchedCountry = populationData.find(
    (a) => a.country === countryData?.commonName
  );
  /*Find corresponding Flag*/
  const matchedFlag = flags.find(
    (flag) => flag.name === countryData?.commonName
  );

  const chartData = {
    labels: matchedCountry?.populationCounts?.map((pop) => pop.year) || [], // Eje X
    datasets: [
      {
        label: "Population Over Time",
        data:
          matchedCountry?.populationCounts?.map((pop) => Number(pop.value)) ||
          [],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Population Over Time",
      },
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="text-white">
      <h1 className="text-3xl font-bold text-center text-gray-300">
        {matchedCountry?.country || countryData?.commonName}
      </h1>

      <div className="w-full">
        {matchedFlag?.flag && (
          <Image
            src={matchedFlag.flag}
            alt={`${matchedCountry?.country} Flag`}
            width={100}
            height={60}
          />
        )}
      </div>

      <h2 className="font-bold">Border Countries:</h2>
      <ul>
        {countryData?.borders.map((border: BorderData, index: number) => (
          <li key={index}>
            <Link href={`/country/${border.countryCode}`}>
              {border.commonName}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="font-bold">Population Over Time:</h2>
      <div>
        <Line data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}
