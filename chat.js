const socket = io("https://localhost:9000/", { transports: ["websocket"] });
const form = document.getElementById("chatbox");
const Input = document.getElementById("msg");
const Container = document.querySelector(".container");


const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  Container.append(messageElement);
};

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const message = Input.value;
    append(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value = "";
})
const Username = prompt("Please Enter Your good Name to Chat");
socket.emit("NewUserJoined", Username);
socket.on("userJoined", (name) => {
    append(`${name} : joined the chat`, "right");
});
socket.on("receive", (data) => {
    append(`${data.name}: ${data.message}`, "left");
});
socket.on("leave", (name) => {
    append(`${name} : Left the chat`, "left");
});
socket.on("userOnline",(count)=>{
    const online= document.getElementById("count");
    online.innerHTML= count;
})