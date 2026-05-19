import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export default function AdminPage() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        navigate("/");
    }; // <-- Close the handleLogout function here!
    // Now, the component itself returns the JSX
    return (_jsxs("div", { style: { background: "#e8f5e9", padding: "20px", borderRadius: "8px" }, children: [_jsx("h2", { children: "Admin Control Panel" }), _jsx("p", { children: "You made it past the protected route!" }), _jsx("button", { onClick: handleLogout, style: {
                    background: "#d32f2f",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                }, children: "Log Out" })] }));
}
