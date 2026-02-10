import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Backend URL from Render environment variable
  const API_BASE = process.env.REACT_APP_API_URL;

 async function verifyOtp() {
  const email = localStorage.getItem("user");

  if (!email || !otp) {
    alert("Missing email or OTP");
    return;
  }

  if (!process.env.REACT_APP_API_URL) {
    alert("Backend URL not configured");
    return;
  }

  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp.trim(),
        }),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(data.detail || "Invalid OTP");
      return;
    }

    alert("OTP verified successfully ✅");
    // navigate to chat page here
  } catch (err) {
    console.error("Verify OTP error:", err);
    alert("Server not reachable");
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
    marginBottom: "10px",
  },
  input: {
    width: "260px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#121212",
    color: "white",
    outline: "none",
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
