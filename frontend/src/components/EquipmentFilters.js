import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TYPES = ["", "server", "switch", "router", "ups", "panel"];
const MAKES = ["", "Dell", "Cisco", "HP", "APC", "ASUS"];
export default function EquipmentFilters({ type, make, search, onType, onMake, onSearch, }) {
    return (_jsxs("div", { style: {
            display: "flex",
            gap: 12,
            marginBottom: 16,
            flexWrap: "wrap",
            alignItems: "center",
        }, children: [_jsx("select", { value: type, onChange: (e) => onType(e.target.value), style: {
                    padding: "8px 12px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                }, children: TYPES.map((t) => (_jsx("option", { value: t, children: t === "" ? "All Types" : t }, t))) }), _jsx("select", { value: make, onChange: (e) => onMake(e.target.value), style: {
                    padding: "8px 12px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                }, children: MAKES.map((m) => (_jsx("option", { value: m, children: m === "" ? "All Makes" : m }, m))) }), _jsx("input", { type: "text", value: search, onChange: (e) => onSearch(e.target.value), placeholder: "Search by tag...", style: {
                    padding: "8px 12px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    width: 200,
                } }), (type || make || search) && (_jsx("button", { onClick: () => {
                    onType("");
                    onMake("");
                    onSearch("");
                }, style: {
                    padding: "8px 12px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    background: "#f5f5f5",
                }, children: "Clear filters" }))] }));
}
