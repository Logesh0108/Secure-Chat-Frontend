import { useEffect, useRef, useState } from "react";

const REACTIONS = ["❤️", "👍", "😂", "😮"];

export default function Chat() {
  const user = localStorage.getItem("user") || "test@gmail.com";
  const ws = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimer = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [hoverId, setHoverId] = useState(null);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat?user=${encodeURIComponent(user)}`
    );

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === "reaction") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === data.messageId
              ? { ...m, reactions: data.reactions }
              : m
          )
        );
        return;
      }

      if (data.type === "typing") {
        setTypingUser(data.user);
        clearTimeout(typingTimer.current);
        typingTimer.current = setTimeout(() => setTypingUser(""), 1200);
        return;
      }

      if (!data.id) return;
      setMessages((prev) => [...prev, data]);
    };

    return () => ws.current.close();
  }, [user]);

  function safeSend(payload) {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(payload));
    }
  }

  function sendMessage() {
    if (!message.trim()) return;
    safeSend({ type: "message", text: message });
    setMessage("");
  }

  function sendImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      safeSend({ type: "image", image: reader.result });
    reader.readAsDataURL(file);
  }

  function react(messageId, emoji) {
    safeSend({ type: "reaction", messageId, emoji });
  }

  function handleTyping() {
    safeSend({ type: "typing" });
  }

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.title}>🔐 Secure Chat</div>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* MESSAGES */}
      <div style={styles.messages}>
        {messages.map((m) => {
          const mine = m.user === user;

          return (
            <div
              key={m.id}
              style={{
                ...styles.bubble,
                ...(mine ? styles.mine : styles.other),
                alignSelf: mine ? "flex-end" : "flex-start",
              }}
              onMouseEnter={() => setHoverId(m.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              {!mine && <div style={styles.sender}>{m.user}</div>}

              {m.type === "image" ? (
                <img src={m.image} alt="" style={styles.image} />
              ) : (
                <div>{m.text}</div>
              )}

              {m.reactions && (
                <div style={styles.reactions}>
                  {Object.entries(m.reactions).map(
                    ([emoji, users]) =>
                      users.length > 0 && (
                        <span key={emoji}>
                          {emoji} {users.length}
                        </span>
                      )
                  )}
                </div>
              )}

              {!mine && hoverId === m.id && (
                <div style={styles.reactionPicker}>
                  {REACTIONS.map((e) => (
                    <span
                      key={e}
                      style={styles.reactionBtn}
                      onClick={() => react(m.id, e)}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {typingUser && (
          <div style={styles.typing}>
            {typingUser} is typing…
          </div>
        )}
      </div>

      {/* INPUT */}
      <div style={styles.inputBar}>
        <button
          style={styles.iconBtn}
          onClick={() => fileInputRef.current.click()}
        >
          📎
        </button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={sendImage}
        />

        <input
          style={styles.textInput}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message…"
        />

        <button style={styles.sendBtn} onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#0b0b0b",
    color: "#fff",
    overflow: "hidden",
  },

  header: {
    height: "56px",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#0e0e0e",
    borderBottom: "1px solid #222",
    flexShrink: 0,
  },

  title: {
    color: "#ffb300",
    fontWeight: 600,
    fontSize: "16px",
  },

  logoutBtn: {
    background: "transparent",
    border: "1px solid #ff9800",
    color: "#ff9800",
    padding: "6px 12px",
    borderRadius: "14px",
    cursor: "pointer",
  },

  messages: {
    flex: 1,
    padding: "14px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  bubble: {
    maxWidth: "75%",
    padding: "10px 12px",
    borderRadius: "14px",
    fontSize: "14px",
    lineHeight: "1.4",
    wordBreak: "break-word",
  },

  mine: {
    background: "#ff9800",
    color: "#111",
    borderBottomRightRadius: "4px",
  },

  other: {
    background: "#1e1e1e",
    color: "#fff",
    borderBottomLeftRadius: "4px",
  },

  sender: {
    fontSize: "11px",
    color: "#ffb74d",
    marginBottom: "4px",
  },

  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
    marginTop: "6px",
    display: "block",
  },

  reactions: {
    display: "flex",
    gap: "6px",
    marginTop: "4px",
    fontSize: "12px",
    color: "#ffb74d",
  },

  reactionPicker: {
    display: "flex",
    gap: "8px",
    marginTop: "4px",
  },

  reactionBtn: {
    cursor: "pointer",
  },

  typing: {
    fontSize: "12px",
    color: "#ffb74d",
    fontStyle: "italic",
    marginLeft: "6px",
  },

  inputBar: {
    height: "60px",
    padding: "0 10px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#0e0e0e",
    borderTop: "1px solid #222",
    flexShrink: 0,
  },

  textInput: {
    flex: 1,
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "18px",
    padding: "8px 12px",
    color: "#fff",
    outline: "none",
  },

  iconBtn: {
    background: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#ffb300",
  },

  sendBtn: {
    background: "#ff9800",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    color: "#111",
    fontSize: "16px",
    cursor: "pointer",
  },
};
