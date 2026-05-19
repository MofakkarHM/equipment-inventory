import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
    const navigate = useNavigate();
    const handleLogin = () => {
        localStorage.setItem("loggedIn", "true");
        navigate("/admin");
    };
    return (_jsxs("div", { style: {
            padding: "40px",
            maxWidth: "400px",
            margin: "0 auto",
            border: "1px solid #ccc",
        }, children: [_jsx("h2", { children: "Access Denied" }), _jsx("p", { children: "Please log in to access the Admin Area." }), _jsx("button", { onClick: handleLogin, style: {
                    background: "#0056b3",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                }, children: "Log In" })] }));
}
