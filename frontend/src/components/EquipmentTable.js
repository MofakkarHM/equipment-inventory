import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ── status badge colour helper ────────────────────────────────────
function getStatusStyle(status) {
    const base = {
        padding: "2px 8px",
        borderRadius: 12,
        fontSize: 12,
        fontWeight: "bold",
    };
    switch (status) {
        case "active":
            return { ...base, background: "#d4edda", color: "#155724" };
        case "maintenance":
            return { ...base, background: "#fff3cd", color: "#856404" };
        default:
            return { ...base, background: "#f8d7da", color: "#721c24" };
    }
}
const HEADERS = ["Tag", "Name", "Type", "Make", "Model", "Location", "Status"];
export default function EquipmentTable({ equipment, loading, onRowClick, onDelete, isDeleting, }) {
    //loading state
    if (loading) {
        return (_jsx("p", { style: { color: "#555", padding: "20px" }, children: "Loading equipment..." }));
    }
    //empty state
    if (equipment.length === 0) {
        return (_jsxs("div", { style: {
                padding: "40px 20px",
                textAlign: "center",
                color: "#888",
                border: "1px dashed #ccc",
                borderRadius: 8,
                marginTop: 16,
            }, children: [_jsx("p", { style: { fontSize: 32, margin: "0 0 8px" }, children: "\uD83D\uDCED" }), _jsx("p", { style: { margin: 0, fontSize: 16 }, children: "No equipment found matching your filters." }), _jsx("p", { style: { margin: "4px 0 0", fontSize: 13 }, children: "Try adjusting or clearing the filters above." })] }));
    }
    return (_jsx("div", { style: { overflowX: "auto" }, children: _jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [_jsx("thead", { children: _jsx("tr", { style: { background: "#f8f9fa" }, children: HEADERS.map((header) => (_jsx("th", { style: {
                                padding: "12px 16px",
                                textAlign: "left",
                                borderBottom: "2px solid #dee2e6",
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#495057",
                                whiteSpace: "nowrap",
                            }, children: header }, header))) }) }), _jsx("tbody", { children: equipment.map((item) => (_jsxs("tr", { style: { borderBottom: "1px solid #f0f0f0" }, children: [_jsx("td", { onClick: () => onRowClick(item.id), style: {
                                    padding: "12px 16px",
                                    fontSize: 13,
                                    fontFamily: "monospace",
                                    cursor: "pointer",
                                }, children: item.tag }), _jsx("td", { onClick: () => onRowClick(item.id), style: {
                                    padding: "12px 16px",
                                    fontSize: 13,
                                    cursor: "pointer",
                                }, children: item.name }), _jsx("td", { style: { padding: "12px 16px", fontSize: 13 }, children: item.type }), _jsx("td", { style: { padding: "12px 16px", fontSize: 13 }, children: item.make }), _jsx("td", { style: { padding: "12px 16px", fontSize: 13 }, children: item.model }), _jsx("td", { style: { padding: "12px 16px", fontSize: 13 }, children: item.location }), _jsx("td", { style: { padding: "12px 16px", fontSize: 13 }, children: _jsx("span", { style: getStatusStyle(item.status), children: item.status }) }), _jsx("td", { style: { padding: "12px 16px", fontSize: 13 }, children: _jsx("button", { onClick: () => onDelete(item.id), disabled: isDeleting, style: {
                                        padding: "4px 10px",
                                        borderRadius: 4,
                                        border: "1px solid #dc3545",
                                        background: "white",
                                        color: "#dc3545",
                                        cursor: isDeleting ? "not-allowed" : "pointer",
                                        fontSize: 12,
                                        opacity: isDeleting ? 0.6 : 1,
                                    }, children: isDeleting ? "Deleting..." : "Delete" }) })] }, item.id))) })] }) }));
}
