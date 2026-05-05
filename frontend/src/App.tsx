import { BrowserRouter, Routes, Route } from "react-router-dom";
import EquipmentDetail from "./pages/EquipmentDetailPage";
import EquipmentListPage from "./pages/EquipmentListPage";

//root with routing
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EquipmentListPage />} />
        <Route path="/equipment/:id" element={<EquipmentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
