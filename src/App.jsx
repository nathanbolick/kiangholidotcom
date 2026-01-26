import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import PhotoPage from "./pages/Photo.jsx";
import FilmPage from "./pages/Film.jsx";
import AboutPage from "./pages/About.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Default route: send to /photo (feel free to change to a dedicated Home page) */}
        <Route index element={<Navigate to="/photo" replace />} />
        <Route path="photo" element={<PhotoPage />} />
        <Route path="film" element={<FilmPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/photo" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
