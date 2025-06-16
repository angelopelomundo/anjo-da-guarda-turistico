async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatWindow = document.getElementById("chat-window");
  const message = input.value.trim();
  if (!message) return;

  chatWindow.innerHTML += "<div><strong>Você:</strong> " + message + "</div>";
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    chatWindow.innerHTML += "<div><strong>AnjoGuia:</strong> " + data.reply + "</div>";
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (err) {
    chatWindow.innerHTML += "<div style='color:red;'>Erro ao responder. Tente novamente.</div>";
  }
}
