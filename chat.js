async function sendChat() {
  const input = document.getElementById("chat-input");
  const log = document.getElementById("chat-log");

  const userText = input.value.trim();
  if (!userText) return;

  log.innerHTML += `<div><b>You:</b> ${userText}</div>`;
  input.value = "";

  try {
    const res = await fetch("http://localhost:7071/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();
    log.innerHTML += `<div><b>JIVAI:</b> ${data.reply}</div>`;
    log.scrollTop = log.scrollHeight;

  } catch {
    log.innerHTML += `<div><b>JIVAI:</b> Offline. Please try later.</div>`;
  }
}
