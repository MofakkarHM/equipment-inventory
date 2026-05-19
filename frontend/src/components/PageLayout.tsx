import { Outlet, Link } from "react-router-dom";

export default function PageLayout() {
  return (
    <div>
      <nav
        style={{
          background: "#333",
          padding: "16px",
          color: "white",
          display: "flex",
          gap: "16px",
        }}
      >
        <h2 style={{ margin: 0, paddingRight: "20px" }}>InfraSight Admin</h2>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Inventory
        </Link>
        <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
          Protected Admin
        </Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
