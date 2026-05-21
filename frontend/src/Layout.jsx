import { Link, Outlet } from "react-router-dom";

export default function Layout({ onLogout }) {
  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <nav style={{ marginBottom: 30, display: "flex", gap: 20 }}>
        <Link to="/home">Home</Link>
        <Link to="/tickets">Tickets</Link>
        <button onClick={onLogout} style={{ marginLeft: "auto", background: "#646cff", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px", cursor: "pointer" }}>Logout</button>
      </nav>
      <Outlet />
    </div>
  );
}
