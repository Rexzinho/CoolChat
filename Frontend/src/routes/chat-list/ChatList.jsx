import React, { useContext, useEffect, useState } from 'react';
import coolchat from '../../axios/config';
import { UserContext } from '../../contexts/user';

const ChatList = () => {

  const [rooms, setRooms] = useState([]);
  const {chats, setChats} = useContext(UserContext);

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
    if(chats.some((chat => chat.id === id))) return;
    const newChats = [...chats, {id, name}];
    setChats(newChats);
  }

  return (
    <div>
      <h2>Salas</h2>
      {rooms.map(({id, name}) => (
        <div>
          <p onClick={() => openChat(id, name)}>{name}</p>
        </div>
      ))}
    </div>
  )
}

export default ChatList