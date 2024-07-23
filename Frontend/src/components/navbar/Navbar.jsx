import { useContext, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../contexts/user";

const Navbar = () =>{
const {user, setUser, chats, setChats} = useContext(UserContext);
  return (
    <div>
        {user && <p>{user.nick}</p>}
        <ul>
            <li><Link to={"/home"}>Home</Link></li>
            <li><Link to={"/chat-list"}>Chat-List</Link></li>
            <li><Link to={"/chat"}>Chat</Link></li>
            {chats.map(({name}) => (<p>{name}</p>))}
        </ul>
    </div>
  )
}

export default Navbar