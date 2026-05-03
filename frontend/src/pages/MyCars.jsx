import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCar, getMyCars } from "../api/cars";

export default function MyCars() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  async function loadCars() {
    setError("");

    try {
      const data = await getMyCars();
      setCars(data);
    } catch {
      setError("Log in to view your cars.");
    }
  }

  useEffect(() => {
    loadCars();
  }, []);

  const handleDelete = async (id) => {
    await deleteCar(id);
    setCars(cars.filter((car) => car._id !== id));
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Cars</h1>
          <p className="text-gray-600">Manage listings connected to your account.</p>
        </div>
        <Link className="rounded-md bg-black px-4 py-2 font-semibold text-white" to="/add-car">Add Car</Link>
      </div>

      {error && <p className="rounded-md bg-red-50 p-3 text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div key={car._id} className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
            <p className="text-gray-600">{car.year} • {car.fuelType}</p>
            <p className="mt-2 font-bold">₹{car.pricePerDay}/day</p>
            <div className="mt-4 flex gap-2">
              <Link className="rounded-md border px-3 py-2 text-sm font-semibold" to={`/edit-car/${car._id}`}>Edit</Link>
              <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white" onClick={() => handleDelete(car._id)} type="button">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {!error && cars.length === 0 && <p className="rounded-md border bg-white p-6 text-center text-gray-600">No listings yet.</p>}
    </div>
  );
}
