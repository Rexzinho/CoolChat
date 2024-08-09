import React, { useContext, useEffect, useState } from 'react';
import coolchat from '../../axios/config';
import { UserContext } from '../../contexts/user';
import { useNavigate, Link } from 'react-router-dom';

import Create from '../../assets/Create.svg';
import "./ChatList.css";

const ChatList = () => {

  const [rooms, setRooms] = useState([]);
  const {chats, setChats} = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      const resp = await coolchat.get("/room");
      setRooms(resp.data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  const openChat = async (id, name) => {
    console.log(chats);
    const index = chats.findIndex((chat => chat.id === id));
    console.log(index);
    if(index !== -1){
      navigate(`/chat/${index + 1}`);
      return;
    }
    const newChats = [...chats, {id, name}];
    setChats(newChats);
    navigate(`/chat/${newChats.length}`);
  }

  return (
    <div>
      <div className="title-container">
        <h2 className="title">CONVERSAS COOL</h2>
        <Link to={"/create-chat"}>
          <img 
            src={Create} 
            alt="Create chat"
            style={{cursor: "pointer"}}
          />
        </Link>
      </div>
      <ul className="chat-list">
        {rooms.map(({id, name}) => (
          <li>
            <div className="border">
              <div className="inside" onClick={() => openChat(id, name)}>
                {name}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatList