import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");

    navigate("/admin");
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "400px",
        margin: "0 auto",
        border: "1px solid #ccc",
      }}
    >
      <h2>Access Denied</h2>
      <p>Please log in to access the Admin Area.</p>
      <button
        onClick={handleLogin}
        style={{
          background: "#0056b3",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Log In
      </button>
    </div>
  );
}
