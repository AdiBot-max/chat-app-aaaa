const nameScreen = document.getElementById("nameScreen");
const chatScreen = document.getElementById("chatScreen");

const nameInput = document.getElementById("nameInput");
const joinBtn = document.getElementById("joinBtn");

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

let username = "";
let ws;

function connectWebSocket() {

  const protocol =
    location.protocol === "https:" ? "wss" : "ws";

  ws = new WebSocket(`${protocol}://${location.host}`);

  ws.onopen = () => {
    console.log("Connected to server");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    addMessage(`${data.username}: ${data.message}`);
  };

  ws.onclose = () => {
    console.log("Disconnected");

    // retry after 1 second
    setTimeout(connectWebSocket, 1000);
  };

}

connectWebSocket();

function addMessage(text) {

  const div = document.createElement("div");

  div.className = "message";
  div.textContent = text;

  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight;
}

joinBtn.onclick = () => {

  const value = nameInput.value.trim();

  if (value === "") return;

  username = value;

  nameScreen.style.display = "none";
  chatScreen.style.display = "flex";
};

send.onclick = () => {

  const message = input.value.trim();

  if (message === "") return;

  // Prevent sending if disconnected
  if (ws.readyState !== WebSocket.OPEN) {
    alert("Server waking up... try again in a second");
    return;
  }

  ws.send(JSON.stringify({
    username,
    message
  }));

  input.value = "";
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    send.click();
  }
});

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    joinBtn.click();
  }
});
