import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//Tailwind version
export function EquipmentCardTailwind({ tag, name, type, make, location, status, onView, onDelete, }) {
    const statusClass = status === "active"
        ? "badge-success"
        : status === "inactive"
            ? "badge-danger"
            : "badge-warning";
    return (_jsxs("div", { className: "bg-white dark:bg-gray-900\r\n                    border border-gray-200 dark:border-gray-800\r\n                    rounded-xl shadow-sm\r\n                    hover:shadow-md hover:border-gray-300\r\n                    dark:hover:border-gray-700\r\n                    transition-all duration-200\r\n                    p-5", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "font-mono text-xs font-medium\r\n                         text-gray-400 dark:text-gray-500\r\n                         bg-gray-50 dark:bg-gray-800\r\n                         px-2 py-1 rounded-md", children: tag }), _jsx("span", { className: statusClass, children: status })] }), _jsx("h3", { className: "text-base font-semibold\r\n                     text-gray-900 dark:text-white\r\n                     mb-1 leading-tight", children: name }), _jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400\r\n                         bg-gray-100 dark:bg-gray-800\r\n                         px-2 py-0.5 rounded-full", children: type }), _jsx("span", { className: "text-xs text-gray-400 dark:text-gray-500", children: "\u00B7" }), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: make }), _jsx("span", { className: "text-xs text-gray-400 dark:text-gray-500", children: "\u00B7" }), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: location })] }), _jsx("div", { className: "border-t border-gray-100 dark:border-gray-800 mb-4" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: onView, className: "flex-1 btn-primary btn-sm", children: "View Details" }), _jsx("button", { onClick: onDelete, className: "btn-danger btn-sm px-3", children: "\uD83D\uDDD1" })] })] }));
}
//Bootstrap version
export function EquipmentCardBootstrap({ tag, name, type, make, location, status, onView, onDelete, }) {
    const badgeClass = status === "active"
        ? "bg-success"
        : status === "inactive"
            ? "bg-danger"
            : "bg-warning text-dark";
    return (_jsx("div", { className: "card h-100", children: _jsxs("div", { className: "card-body", children: [_jsxs("div", { className: "d-flex justify-content-between\r\n                        align-items-center mb-3", children: [_jsx("code", { className: "text-muted small", children: tag }), _jsx("span", { className: `badge ${badgeClass}`, children: status })] }), _jsx("h5", { className: "card-title mb-1", children: name }), _jsxs("p", { className: "card-text text-muted small mb-3", children: [type, " \u00B7 ", make, " \u00B7 ", location] }), _jsx("hr", { className: "my-3" }), _jsxs("div", { className: "d-flex gap-2", children: [_jsx("button", { onClick: onView, className: "btn btn-primary btn-sm flex-fill", children: "View Details" }), _jsx("button", { onClick: onDelete, className: "btn btn-outline-danger btn-sm", children: "\uD83D\uDDD1" })] })] }) }));
}
