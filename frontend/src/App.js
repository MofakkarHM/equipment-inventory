import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EquipmentDetail from "./pages/EquipmentDetailPage";
import EquipmentListPage from "./pages/EquipmentListPage";
import PageLayout from "./components/PageLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsxs(Route, { element: _jsx(PageLayout, {}), children: [_jsx(Route, { path: "/", element: _jsx(EquipmentListPage, {}) }), _jsx(Route, { path: "/equipment/:id", element: _jsx(EquipmentDetail, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { element: _jsx(ProtectedRoute, {}), children: _jsx(Route, { path: "/admin", element: _jsx(AdminPage, {}) }) })] }) }) }));
}
