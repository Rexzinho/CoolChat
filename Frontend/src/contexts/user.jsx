import { createContext, Provider, useState } from "react";

const UserContext = createContext("");

const UserProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [chats, setChats] = useState([]);
    return(
        <UserContext.Provider value={{user, setUser, chats, setChats}}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext };
export default UserProvider;