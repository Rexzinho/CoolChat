import { createContext, Provider, useState } from "react";

const UserContext = createContext("");

const UserProvider = ({children}) => {
    const [user, setUser] = useState("BANANA");
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext };
export default UserProvider;