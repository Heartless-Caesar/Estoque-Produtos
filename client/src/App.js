import Navbar from "./Components/Navbar";
import AuthForm from "./Components/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryBody from "./Components/Inventory/inventory_list";
import LoginForm from "./Components/login";
import authHeader from "./Services/auth_header";
import { useEffect, useState } from "react";
import getCurrentUser from "./Services/getCurrentUser";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
