import React, { useContext, useEffect, useState } from 'react';
import coolchat from '../../axios/config';
import { UserContext } from '../../contexts/user';
import { useNavigate, Link } from 'react-router-dom';

import Create from '../../assets/Create.svg';
import "./ChatList.css";
import PasswordModal from '../../components/passwordModal/PasswordModal';

const ChatList = () => {

  const [rooms, setRooms] = useState([]);
  const {user, chats, setChats} = useContext(UserContext);

  const [passwordModal, setPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [currentRoom, setCurrentRoom] = useState({});
  const [roomId, setRoomId] = useState(null);

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

  const openChat = async (room) => {
    const index = chats.findIndex((chat => chat.id === room.id));
    if(index !== -1){
      navigate(`/chat/${index + 1}`);
      return;
    }
    if(room.type === "public"){
      const newChats = [...chats, {id: room.id, name: room.name}];
      setChats(newChats);
      navigate(`/chat/${newChats.length}`);
    }
    else{
      setCurrentRoom(room);
      setPasswordModal(true);
    }
  }

  return (
    <div>
      {passwordModal && 
        <PasswordModal 
          setPassword={setPassword}
          password={password}
          room={currentRoom}
          closeModal={() => {
            setPasswordModal(false);
            setPassword("");
          }}
        />
      }
      <div className="title-container">
        <h2 className="title">CONVERSAS COOL</h2>
        <Link to={user ? "/create-chat" : "/home"}>
          <img 
            src={Create} 
            alt="Create chat"
            style={{cursor: "pointer"}}
          />
        </Link>
      </div>
      <ul className="chat-list">
        {rooms.map(room => (
          <li key={room.id}>
            <div className="border">
              <div className="inside" onClick={() => openChat(room)}>
                {room.name}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatList