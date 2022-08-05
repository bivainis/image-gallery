import { GalleryPage } from "pages/GalleryPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gallery" element={<GalleryPage />} />

        <Route path="*" element={<Navigate to="/gallery" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
