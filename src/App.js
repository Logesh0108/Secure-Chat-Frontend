import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import OtpVerify from "./pages/OtpVerify";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<OtpVerify />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
