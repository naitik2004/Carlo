import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/api";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCar() {
      try {
        const { data } = await api.get(`/api/cars/${id}`);
        setCar(data);
      } catch {
        setError("Car not found.");
      }
    }

    loadCar();
  }, [id]);

  if (error) {
    return <div className="p-10 text-red-700">{error}</div>;
  }

  if (!car) {
    return <div className="p-10 text-gray-600">Loading car...</div>;
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 p-6 lg:grid-cols-2">
      <div className="flex min-h-80 items-center justify-center rounded-lg bg-gray-100">
        {car.imageUrl ? <img className="h-full w-full rounded-lg object-cover" src={car.imageUrl} alt={`${car.brand} ${car.model}`} /> : <span className="text-gray-500">No image</span>}
      </div>
      <section className="rounded-lg border bg-white p-6">
        <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
        <p className="mt-2 text-gray-600">{car.year} • {car.fuelType}</p>
        <p className="mt-4 text-2xl font-bold">₹{car.pricePerDay}/day</p>
        <p className="mt-2 text-gray-600">{car.mileage} km driven</p>
        <Link className="mt-6 inline-block rounded-md bg-black px-4 py-2 font-semibold text-white" to="/cars">Back to Cars</Link>
      </section>
    </div>
  );
}
