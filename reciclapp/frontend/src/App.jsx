import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import History from "./pages/History";
import Points from "./pages/Points";
import NewRequest from "./pages/NewRequest";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/points" element={<Points />} />
          <Route path="/new-request" element={<NewRequest />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

