import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/user';
import coolchat from '../../axios/config';
import { io } from 'socket.io-client';

import "./Chat.css";

const Chat = () => {

  const { user, chats } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [socket, setSocket] = useState(null);
  const [content, setContent] = useState("");
  const [index, setIndex] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) navigate("/home");
  }, []);

  useEffect(() => {
    if(chats.length === 0) return;
    const url = window.location.href;
    const index = url.split("/")[4];
    getMessages(index-1);
    setIndex(index-1);
    if(location.pathname.includes("chat/")){
      const thisSocket = io("http://localhost:9000", {extraHeaders: {
        token: user.token
      }});
      setSocket(thisSocket);
      const room = chats[index-1];
      setRoom(room);
      thisSocket.emit("join-room", room.name)
    }
  }, [location]);

  useEffect(() => {
    if(!socket) return;
    socket.on("receive-message", (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
      console.log(message);
    });
  }, [socket]);

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

  const sendMessage = async (e) =>{
    e.preventDefault();
    console.log(room);
    const message = {
      nick: user.nick,
      content: content
    }
    socket.emit("send-message", message);
    setMessages(prevMessages => [...prevMessages, message]);
    const messageRequest = {
      userId: user.userId,
      roomId: room.id,
      content: content
    }
    console.log(messageRequest);
    await coolchat.post("/room/message", messageRequest, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
  }

  return (
    <>
      <ul className="messages">
        {chats[index] && <h2 className="title">{chats[index].name}</h2>}
        {messages.map((message, index) => (
          <li className="message" key={index}>
            {message.nick === user.nick ? (<>
              <div className="message-you">Você</div>
              <div className="your-message-content">{message.content}</div>
            </>) :
            (<>
              <div className="message-user">{message.nick}</div>
              <div className="message-content">{message.content}</div>
            </>)}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <textarea type="text" placeholder="message" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}

export default Chat