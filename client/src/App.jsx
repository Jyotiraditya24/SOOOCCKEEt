import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };
  useEffect(() => {
    socket.connect();
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]); //everytime a event emits this will run
  return (
    <div>
      HOMEPAGE
      <input
        placeholder="message"
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message</h1>
      {messageRecieved}
    </div>
  );
}

export default App;
