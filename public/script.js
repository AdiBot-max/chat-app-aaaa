// public/script.js

const nameScreen = document.getElementById("nameScreen");
const chatScreen = document.getElementById("chatScreen");

const nameInput = document.getElementById("nameInput");
const joinBtn = document.getElementById("joinBtn");

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

let username = "";

const protocol = location.protocol === "https:" ? "wss" : "ws";

const ws = new WebSocket(`${protocol}://${location.host}`);

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

  ws.send(JSON.stringify({
    username,
    message
  }));

  input.value = "";
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  addMessage(`${data.username}: ${data.message}`);
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
