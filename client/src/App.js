import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import ShortUrl from "./pages/ShortUrl";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="shortUrl" element={<ShortUrl />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<h1>not found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
