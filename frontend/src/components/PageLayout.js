import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, Link } from "react-router-dom";
export default function PageLayout() {
    return (_jsxs("div", { children: [_jsxs("nav", { style: {
                    background: "#333",
                    padding: "16px",
                    color: "white",
                    display: "flex",
                    gap: "16px",
                }, children: [_jsx("h2", { style: { margin: 0, paddingRight: "20px" }, children: "InfraSight Admin" }), _jsx(Link, { to: "/", style: { color: "white", textDecoration: "none" }, children: "Inventory" }), _jsx(Link, { to: "/admin", style: { color: "white", textDecoration: "none" }, children: "Protected Admin" })] }), _jsx("main", { children: _jsx(Outlet, {}) })] }));
}
