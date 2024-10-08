import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/user';
import coolchat from '../../axios/config';

import "./Chat.css";

const Chat = () => {

  const { user, chats, socket, currentChatId, setCurrentChatId } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [content, setContent] = useState("");
  const [index, setIndex] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) navigate("/home");
  }, []);

  useEffect(() => {
    if(chats.length === 0 || !location.pathname.includes("chat/")) return;
    const url = window.location.href;
    const index = url.split("/")[4]-1;
    if(!currentChatId){
      console.log("Entrou na sala " + chats[index].id);
      socket.emit("join-room", chats[index].id)
      setCurrentChatId(chats[index].id);
    }
    else if(currentChatId != chats[index].id){
      console.log("Entrou na sala " + chats[index].id);
      socket.emit("leave-room", currentChatId);
      setCurrentChatId(chats[index].id);
      socket.emit("join-room", chats[index].id)
    }
    getMessages(index);
    setIndex(index);
    const room = chats[index];
    setRoom(room);
  }, [location]);

  useEffect(() => {
    if(!socket) return;
    socket.on("receive-message", (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
  }, [socket]);

  const getMessages = async (index) => {
    const { id, password, type } = chats[index];
    console.log(index);
    try {
      const resp = await coolchat.get(`/room/${id}`, {
        params: { password },
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setMessages(resp.data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  const sendMessage = async (e) =>{
    e.preventDefault();
    const message = {
      nick: user.nick,
      content: content
    }
    setMessages(prevMessages => [...prevMessages, message]);
    socket.emit("send-message", message, room.id);
    console.log("enviando mensagens");
    const messageRequest = 
    room.type === "public" ?
      {
        userId: user.userId,
        roomId: room.id,
        content: content
      } :
      {
        userId: user.userId,
        roomId: room.id,
        content: content,
        password: room.password
      }
    await coolchat.post("/room/message", messageRequest, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
  }

  return (
    <>
      {chats[index] && <h2 className="title">{chats[index].name}</h2>}
      <div className="messages-container">
        <ul className="messages">
          {messages.map((message, index) => (
            <li className="message" key={index}>
              {message.nick === user.nick ? (<>
                <div className="message-you"><span>Você</span></div>
                <div className="your-message-content"><span>{message.content}</span></div>
              </>) :
              (<>
                <div className="message-user"><span>{message.nick}</span></div>
                <div className="message-content"><span>{message.content}</span></div>
              </>)}
            </li>
          ))}
        </ul>
        <form onSubmit={sendMessage}>
          <div className="border">
            <div className="inside send-message-container">
              <textarea 
                type="text" 
                placeholder="message" 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className="cool-textarea"
              >
              </textarea>
              <button type="submit" className="cool-btn">Enviar</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Chat