import { Link } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex flex-wrap gap-4 justify-between">
      <Link to="/" className="text-xl font-semibold">CarRental</Link>

      <div className="flex flex-wrap gap-4">
        <Link to="/cars" className="hover:text-blue-600">Cars</Link>
        {isLoggedIn && <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>}
        {isLoggedIn ? (
          <button onClick={logout} className="hover:text-blue-600" type="button">Logout</button>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
            <Link to="/signup" className="hover:text-blue-600">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
