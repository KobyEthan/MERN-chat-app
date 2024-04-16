import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    const { data } = await axios.get("/api/chat");

    setChats(data);
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chat;
