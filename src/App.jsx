import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Products from "./Components/Products";
import Protectedroute from "./Components/Protectedroute";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Protectedroute>
              <Products />
            </Protectedroute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
