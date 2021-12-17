import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Places/Login/Login";
import SignUp from "./Places/SignUp/Signup";
import MainPage from "./Places/Main/MainPage";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            token ? <MainPage token={token} /> : <Login login={setToken} />
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
