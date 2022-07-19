import Navbar from "./Components/Navbar";
import AuthForm from "./Components/Inventory/Auth/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryBody from "./Components/Inventory/inventory_list";
import LoginForm from "./Components/Inventory/Auth/login";
import { useEffect, useState } from "react";
import getCurrentUser from "./Services/getCurrentUser";
import InventoryPage from "./Components/Inventory/inventory_page";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/estoque" element={<InventoryBody />} />
        <Route path="/estoque/:id" element={<InventoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
