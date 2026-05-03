import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-5xl font-bold leading-tight">CarRental</h1>
          <p className="mt-4 max-w-xl text-lg text-gray-600">
            Browse local cars, compare prices, and list your own vehicle for rental.
          </p>
          <div className="mt-6 flex gap-3">
            <Link className="rounded-md bg-black px-5 py-3 font-semibold text-white" to="/cars">Browse Cars</Link>
            <Link className="rounded-md border px-5 py-3 font-semibold" to="/signup">Create Account</Link>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Quick actions</h2>
          <div className="mt-4 grid gap-3">
            <Link className="rounded-md border p-4 hover:bg-gray-50" to="/cars">Find an available car</Link>
            <Link className="rounded-md border p-4 hover:bg-gray-50" to="/add-car">List a car for rent</Link>
            <Link className="rounded-md border p-4 hover:bg-gray-50" to="/dashboard">Open dashboard</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
