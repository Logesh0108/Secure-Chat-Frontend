import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(240);
  const navigate = useNavigate();
  const email = localStorage.getItem("user");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  async function verifyOtp() {
    const res = await fetch("http://127.0.0.1:8000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (res.ok) {
      navigate("/chat");
    } else {
      alert("Invalid or expired OTP");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 OTP Verification</h2>
        <p style={styles.subtitle}>
          Enter the OTP sent to your email
        </p>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={styles.input}
        />

        <button onClick={verifyOtp} style={styles.button}>
          Verify OTP
        </button>

        <p style={styles.timer}>
          OTP expires in <span style={styles.time}>{timeLeft}s</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    background: "#fff",
    padding: "32px",
    width: "360px",
    borderRadius: "14px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  title: {
    marginBottom: "8px",
    color: "#333",
  },

  subtitle: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    marginBottom: "16px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },

  timer: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#555",
  },

  time: {
    fontWeight: "bold",
    color: "#e63946",
  },
};
