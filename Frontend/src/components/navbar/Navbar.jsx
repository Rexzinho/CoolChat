import { useContext, useState, useEffect } from "react"
import { Link, useNavigate, useLocation, redirect } from 'react-router-dom';
import { UserContext } from "../../contexts/user";

import CloseButton from '../../assets/CloseButton.svg'
import './Navbar.css';

const Navbar = () =>{

  const {user, setUser, chats, setChats} = useContext(UserContext);
  const locate = useLocation();

  const navigate = useNavigate();

  const logOut = () => {
    navigate("/home");
    setUser(null);
    setChats([]);
    localStorage.clear();
  }

  const closeChat = (index) => {
    const newChats = chats.filter((_, i) => i != index);
    setChats(newChats);
    navigate("/profile");
  }
  
  return (
    <div className="navbar">
        {user && 
        <div className="user-info">
          {user && <label>{user.nick}</label>}
          <button onClick={logOut}>Sair</button>
        </div>}
        <ul>
          <li className={!locate.pathname.includes("home") && "nav-item"}>
              <Link to={user ? "/profile" : "/home"}>
                <div className="border"><div className="inside">
                  <h2>Home</h2>
                </div></div>
              </Link>
          </li>
          <li className={!locate.pathname.includes("chat-list") && "nav-item"}>
              <Link to={"/chat-list"}>
                <div className="border"><div className="inside">
                  <h2>Chat-list</h2>
                </div></div>
              </Link>
          </li>
          {chats.map(({name}, index) => (
            <li className={!locate.pathname.includes(index+1) && "nav-item"}>
              <Link to={`/chat/${(index+1)}`}>
                <div className="border"><div className="inside" style={{display: "flex"}}>
                  <h2>{name}</h2>
                  <button className="close-button" onClick={() => closeChat(index)}>
                    <img src={CloseButton} alt="close-button" />
                  </button>
                </div></div>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default Navbar