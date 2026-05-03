import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCar } from "../api/cars";
import { normalizeCarForm } from "../lib/carFilters";

const initialForm = {
  brand: "",
  model: "",
  year: "",
  pricePerDay: "",
  fuelType: "petrol",
  mileage: "",
  imageUrl: "",
};

export default function AddCar() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await createCar(normalizeCarForm(form));
      navigate("/my-cars");
    } catch {
      setError("Please log in before adding a car.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Add Car</h1>
      {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-red-700">{error}</p>}
      <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border bg-white p-6 sm:grid-cols-2">
        <input className="rounded-md border px-3 py-2" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required />
        <input className="rounded-md border px-3 py-2" name="model" placeholder="Model" value={form.model} onChange={handleChange} required />
        <input className="rounded-md border px-3 py-2" name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} required />
        <input className="rounded-md border px-3 py-2" name="pricePerDay" type="number" placeholder="Price per day" value={form.pricePerDay} onChange={handleChange} required />
        <select className="rounded-md border px-3 py-2" name="fuelType" value={form.fuelType} onChange={handleChange}>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <input className="rounded-md border px-3 py-2" name="mileage" type="number" placeholder="Mileage" value={form.mileage} onChange={handleChange} required />
        <input className="rounded-md border px-3 py-2 sm:col-span-2" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
        <button className="rounded-md bg-black px-4 py-2 font-semibold text-white sm:col-span-2" type="submit">Save Car</button>
      </form>
    </div>
  );
}
