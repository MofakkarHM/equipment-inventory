import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  }; // <-- Close the handleLogout function here!

  // Now, the component itself returns the JSX
  return (
    <div
      style={{ background: "#e8f5e9", padding: "20px", borderRadius: "8px" }}
    >
      <h2>Admin Control Panel</h2>
      <p>You made it past the protected route!</p>
      <button
        onClick={handleLogout}
        style={{
          background: "#d32f2f",
          color: "white",
          padding: "8px 16px",
          border: "none",
        }}
      >
        Log Out
      </button>
    </div>
  );
}
