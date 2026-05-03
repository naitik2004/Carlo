import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import AllCars from "../pages/AllCars";
import CarDetails from "../pages/CarDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import MyCars from "../pages/MyCars";
import AddCar from "../pages/AddCar";
import EditCar from "../pages/EditCar";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/cars" element={<AllCars />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-cars" element={<MyCars />} />
      <Route path="/add-car" element={<AddCar />} />
      <Route path="/edit-car/:id" element={<EditCar />} />
    </Routes>
  );
}
