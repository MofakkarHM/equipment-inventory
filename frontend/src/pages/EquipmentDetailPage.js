import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchEquipmentById } from "../api/equipment";
import { equipmentKeys } from "../api/queryKeys";
function DetailRow({ label, value }) {
    return (_jsxs("tr", { style: { borderBottom: "1px solid #f0f0f0" }, children: [_jsx("td", { style: {
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "#666",
                    width: 140,
                    fontSize: 14,
                }, children: label }), _jsx("td", { style: { padding: "12px 16px", fontSize: 14 }, children: value })] }));
}
export default function EquipmentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    // useQuery
    const { data: item, isLoading: loading, isError, error, } = useQuery({
        queryKey: equipmentKeys.detail(Number(id)),
        queryFn: () => fetchEquipmentById(Number(id)),
        enabled: !!id && !isNaN(Number(id)),
    });
    if (loading) {
        return (_jsx("div", { style: { padding: 40, fontFamily: "sans-serif" }, children: _jsx("p", { children: "Loading equipment details..." }) }));
    }
    if (isError) {
        return (_jsxs("div", { style: { padding: 40, fontFamily: "sans-serif" }, children: [_jsx("button", { onClick: () => navigate("/"), style: { marginBottom: 16, padding: "8px 16px", cursor: "pointer" }, children: "\u2190 Back to list" }), _jsxs("p", { style: { color: "red" }, children: ["\u274C ", error.message] })] }));
    }
    if (!item)
        return null;
    const rows = [
        ["Tag", item.tag],
        ["Type", item.type],
        ["Make", item.make],
        ["Model", item.model],
        ["Location", item.location],
        ["Status", item.status],
        [
            "Added",
            new Date(item.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        ],
    ];
    return (_jsxs("div", { style: {
            maxWidth: 640,
            margin: "40px auto",
            fontFamily: "sans-serif",
            padding: "0 16px",
        }, children: [_jsx("button", { onClick: () => navigate("/"), style: {
                    marginBottom: 24,
                    padding: "8px 16px",
                    cursor: "pointer",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    background: "#f5f5f5",
                }, children: "Back to list" }), _jsx("h1", { style: { margin: "0 0 4px", fontSize: 22 }, children: item.name }), _jsxs("p", { style: { margin: "0 0 24px", color: "#888", fontSize: 14 }, children: ["Equipment ID: ", item.id] }), _jsx("table", { style: { width: "100%", borderCollapse: "collapse" }, children: _jsx("tbody", { children: rows.map(([label, value]) => (_jsx(DetailRow, { label: label, value: value }, label))) }) })] }));
}
