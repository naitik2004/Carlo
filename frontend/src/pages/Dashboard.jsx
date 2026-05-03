import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome{user?.name ? `, ${user.name}` : ""}. Manage your rentals from here.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md" to="/my-cars">
          <h2 className="text-xl font-semibold">My Cars</h2>
          <p className="text-gray-600">Edit, delete, and review your listings.</p>
        </Link>
        <Link className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md" to="/add-car">
          <h2 className="text-xl font-semibold">Add Car</h2>
          <p className="text-gray-600">Publish a new rental listing.</p>
        </Link>
      </div>
    </div>
  );
}
