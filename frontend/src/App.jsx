import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}
