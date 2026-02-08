import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function sendOtp() {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Failed to send OTP");
        setLoading(false);
        return;
      }

      // ✅ OTP sent successfully
      localStorage.setItem("user", email);
      navigate("/verify");

    } catch (error) {
      alert("Server not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Secure Chat</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <button
        onClick={sendOtp}
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#0b0b0b",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  title: {
    color: "#ff9800",
    fontSize: "32px",
  },
  input: {
    width: "260px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#121212",
    color: "white",
  },
  button: {
    backgroundColor: "#ff9800",
    color: "black",
    fontWeight: "bold",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
  },
};
