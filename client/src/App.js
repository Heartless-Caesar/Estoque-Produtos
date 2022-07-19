import Navbar from "./Components/Navbar";
import AuthForm from "./Components/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryBody from "./Components/Inventory/inventory_list";
import LoginForm from "./Components/login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/estoque" element={<InventoryBody />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
