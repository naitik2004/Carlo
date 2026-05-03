import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../api/cars";
import { buildCarQuery } from "../lib/carFilters";

export default function AllCars() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({ search: "", fuel: "", minPrice: "", maxPrice: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCars() {
      setLoading(true);
      setError("");

      try {
        const data = await getCars(buildCarQuery(filters));
        setCars(data);
      } catch {
        setError("Could not load cars right now.");
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, [filters]);

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Available Cars</h1>
          <p className="text-gray-600">Search, filter, and open a car listing.</p>
        </div>
        <Link to="/add-car" className="rounded-md bg-black px-4 py-2 text-center font-semibold text-white">
          Add Car
        </Link>
      </div>

      <div className="mb-6 grid gap-3 rounded-lg border bg-white p-4 sm:grid-cols-4">
        <input className="rounded-md border px-3 py-2" name="search" placeholder="Search model" value={filters.search} onChange={handleChange} />
        <select className="rounded-md border px-3 py-2" name="fuel" value={filters.fuel} onChange={handleChange}>
          <option value="">Any fuel</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <input className="rounded-md border px-3 py-2" name="minPrice" type="number" placeholder="Min price" value={filters.minPrice} onChange={handleChange} />
        <input className="rounded-md border px-3 py-2" name="maxPrice" type="number" placeholder="Max price" value={filters.maxPrice} onChange={handleChange} />
      </div>

      {loading && <p className="text-gray-600">Loading cars...</p>}
      {error && <p className="rounded-md bg-red-50 p-3 text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link key={car._id} to={`/cars/${car._id}`} className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex h-40 items-center justify-center rounded-md bg-gray-100">
              {car.imageUrl ? <img className="h-full w-full rounded-md object-cover" src={car.imageUrl} alt={`${car.brand} ${car.model}`} /> : <span className="text-gray-500">No image</span>}
            </div>
            <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
            <p className="text-gray-600">{car.year} • {car.fuelType}</p>
            <p className="mt-2 font-bold">₹{car.pricePerDay}/day</p>
          </Link>
        ))}
      </div>

      {!loading && cars.length === 0 && <p className="rounded-md border bg-white p-6 text-center text-gray-600">No cars match your filters.</p>}
    </div>
  );
}
