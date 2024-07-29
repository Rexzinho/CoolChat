import { useContext, useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from "../../contexts/user";

import './Navbar.css';

const Navbar = () =>{

  const {user, setUser, chats, setChats} = useContext(UserContext);
  const locate = useLocation();
  
  return (
    <div className="navbar">
        {user && <p>{user.nick}</p>}
        <ul>
          <li className={!locate.pathname.includes("home") && "nav-item"}>
              <Link to={"/home"}>
                <div className="border"><div className="inside">Home</div></div>
              </Link>
          </li>
          <li className={!locate.pathname.includes("chat-list") && "nav-item"}>
              <Link to={"/chat-list"}>
                <div className="border"><div className="inside">Chat-list</div></div>
              </Link>
          </li>
          {chats.map(({name}, index) => (
            <li className={!locate.pathname.includes(index+1) && "nav-item"}>
              <Link to={`/chat/${(index+1)}`}>
                <div className="border"><div className="inside">{name}</div></div>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default Navbar