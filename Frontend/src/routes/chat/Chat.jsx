import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/user';
import coolchat from '../../axios/config';

import "./Chat.css";

const Chat = () => {

  const { chats } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if(chats.length === 0) return;
    const url = window.location.href;
    const index = url.split("/")[4];
    getMessages(index-1);
    setIndex(index-1)
  }, [location]);

  const getMessages = async (index) => {
    const { id } = chats[index];
    try {
      const resp = await coolchat.get(`/room/${id}`);
      setMessages(resp.data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ul className="messages">
        {chats[index] && <h2 className="title">{chats[index].name}</h2>}
        {messages.map((message, index) => (
          <li className="message" key={index}>
            <div className="message-user">{message.nick}</div>
            <div className="message-content">{message.content}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Chat