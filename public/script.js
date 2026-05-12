const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

const protocol = location.protocol === "https:" ? "wss" : "ws";

const ws = new WebSocket(`${protocol}://${location.host}`);

function addMessage(text) {
  const div = document.createElement("div");
  div.className = "message";
  div.textContent = text;

  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight;
}

send.onclick = () => {
  if (input.value.trim() === "") return;

  ws.send(input.value);

  input.value = "";
};

ws.onmessage = (event) => {
  addMessage(event.data);
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    send.click();
  }
});
