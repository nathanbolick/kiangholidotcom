import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import HomePage from "./pages/Home.jsx";
import PhotoPage from "./pages/Photo.jsx";
import FilmPage from "./pages/Film.jsx";
import AboutPage from "./pages/About.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="photo/:group?" element={<PhotoPage />} />
        <Route path="film/:group?" element={<FilmPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
