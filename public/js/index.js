/**
 * Author: Shrikant Pardhi
 * Version: 1.0.0
 */

const socket = io();

$username = "";
$chatroom = "";

$joinForm = document.querySelector(".join-form");
$form = document.querySelector(".compose-form");
$messageContent = document.querySelector(".messages");
$userList = document.querySelector(".userlist");

$joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  $username = event.target.elements[0].value;
  $chatroom = event.target.elements[1].value;
  socket.emit("join", { username: $username, chatname: $chatroom });
  document.querySelector(".welcome-screen").remove();
  document.querySelector(".main-content").classList.remove("hidden");
  document.querySelector(".chat-title").innerHTML = $chatroom;
  // add user to list
  var li = document.createElement("li");
  li.innerText = `${$username}`;
  $userList.appendChild(li);
});

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  $message = event.target.elements[0].value;
  $timestamp = dayjs().format("HH:mm");
  console.log($message);
  socket.emit("sendMessage", { message: $message, username: $username, chatname: $chatroom });

  var selfMessage = document.createElement("div");
  selfMessage.innerHTML = `<div class="message-content self-message-shape">
                              <div class="message">${$message}</div>
                              <div class="timestamp">${$timestamp}</div>
                          </div>`;
  selfMessage.setAttribute("class", "self-message-container");

  $messageContent.appendChild(selfMessage);
  event.target.elements[0].value = "";
});

// get who joins the room
socket.on("notification", (option) => {
  console.log(`${option} joined the chat.`);
  var div = document.createElement("div");
  div.innerHTML = `<div class="message">${option.username} joined the chat.</div>`;
  div.setAttribute("class", "join-message");
  $messageContent.appendChild(div);

  // add user to list
  var li = document.createElement("li");
  li.innerText = `${option.username}`;
  $userList.appendChild(li);
});

// receive the message
socket.on("updateChat", (message) => {
  console.log(message);
  var fromDiv = document.createElement("div");
  fromDiv.innerHTML = `<div class="username">${message.user}</div>
                        <div class="message-content from-message-shape">
                            <div class="message">${message.text}</div>
                            <div class="timestamp">${message.timestamp}</div>
                        </div>`;
  fromDiv.setAttribute("class", "from-message-container");
  $messageContent.appendChild(fromDiv);
});
