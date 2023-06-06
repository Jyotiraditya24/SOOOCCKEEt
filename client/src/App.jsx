import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.connect();
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]); //everytime a event emits this will run
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <p>HOMEPAGE</p>
      <input
        type="text"
        placeholder="Room Number"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join room</button>
      <input
        placeholder="message"
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message</h1>
      <p>{messageRecieved}</p>
    </div>
  ); 
}

export default App;
