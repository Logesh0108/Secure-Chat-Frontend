const sharedStyles = {
  /* ===== PAGE ===== */
  page: {
    height: "100vh",
    width: "100%",
    background:
      "radial-gradient(circle at top, #1a1a1a 0%, #050505 60%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  /* ===== CHAT CONTAINER ===== */
  chat: {
    width: "100%",
    maxWidth: "420px",
    height: "92vh",
    background: "#0e0e0e",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.85), inset 0 0 0 1px #1c1c1c",
  },

  /* ===== MESSAGE AREA ===== */
  box: {
    flex: 1,
    padding: "16px 14px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  /* ===== MESSAGE BUBBLES ===== */
  msg: {
    maxWidth: "75%",
    padding: "12px 14px",
    borderRadius: "18px",
    fontSize: "14px",
    lineHeight: "1.45",
    color: "#fff",
    position: "relative",
    boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
    wordBreak: "break-word",
  },

  msgMine: {
    background:
      "linear-gradient(135deg, #ff9800 0%, #ffb300 100%)",
    color: "#111",
    borderBottomRightRadius: "6px",
    boxShadow:
      "0 6px 20px rgba(255,152,0,0.45)",
  },

  msgOther: {
    background: "#1a1a1a",
    borderBottomLeftRadius: "6px",
  },

  /* ===== SENDER NAME ===== */
  sender: {
    fontSize: "11px",
    color: "#ffb74d",
    marginBottom: "6px",
    fontWeight: 500,
  },

  /* ===== IMAGE ===== */
  img: {
    maxWidth: "100%",
    borderRadius: "14px",
    marginTop: "6px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
  },

  /* ===== REACTIONS ===== */
  reactions: {
    display: "flex",
    gap: "8px",
    marginTop: "6px",
    fontSize: "12px",
    color: "#ffd54f",
  },

  picker: {
    display: "flex",
    gap: "10px",
    marginTop: "6px",
  },

  reactBtn: {
    cursor: "pointer",
    fontSize: "15px",
    transition: "transform 0.15s ease",
  },

  /* ===== TYPING ===== */
  typing: {
    fontSize: "12px",
    color: "#ffb74d",
    fontStyle: "italic",
    marginLeft: "8px",
  },

  /* ===== INPUT BAR ===== */
  input: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    background: "#0b0b0b",
    borderTop: "1px solid #1f1f1f",
  },

  textInput: {
    flex: 1,
    background: "#151515",
    border: "1px solid #2a2a2a",
    borderRadius: "22px",
    padding: "10px 16px",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
  },

  iconBtn: {
    background: "#1a1a1a",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    color: "#ffb74d",
    fontSize: "18px",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.6)",
  },

  sendBtn: {
    background:
      "linear-gradient(135deg, #ff9800, #ffb300)",
    border: "none",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    color: "#111",
    fontSize: "18px",
    cursor: "pointer",
    boxShadow:
      "0 6px 18px rgba(255,152,0,0.5)",
  },
};

export default sharedStyles;
