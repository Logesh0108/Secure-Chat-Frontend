import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_URL;

  async function verifyOtp() {
  const email = localStorage.getItem("user");

  if (!email) {
    alert("Email not found. Please login again.");
    return;
  }

  if (!otp || otp.trim().length !== 6) {
    alert("Please enter a valid 6-digit OTP");
    return;
  }

  const API_BASE = process.env.REACT_APP_API_URL;

  if (!API_BASE) {
    alert("Backend URL not configured");
    console.error("REACT_APP_API_URL is undefined");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp.trim(),
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(data.detail || "OTP verification failed");
      return;
    }

    alert("OTP verified successfully ✅");
    // navigate("/chat");

  } catch (err) {
    console.error("Verify OTP fetch error:", err);
    alert("Network error. Backend not reachable.");
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
        disabled={loading}
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
