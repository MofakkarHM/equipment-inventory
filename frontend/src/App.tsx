import { BrowserRouter, Routes, Route } from "react-router-dom";
import EquipmentDetail from "./pages/EquipmentDetailPage";
import EquipmentListPage from "./pages/EquipmentListPage";
import PageLayout from "./components/PageLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<EquipmentListPage />} />
          <Route path="/equipment/:id" element={<EquipmentDetail />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
