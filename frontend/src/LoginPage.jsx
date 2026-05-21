import { useState } from "react";

export default function LoginPage({ onLogin, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 30, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
            required
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10, background: "#646cff", color: "#fff", border: "none", borderRadius: 4, fontSize: 16 }}>
          Login
        </button>
      </form>
    </div>
  );
}
