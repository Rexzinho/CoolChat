import React, { useContext, useState, useEffect } from 'react'
import coolchat from '../../axios/config';
import { UserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {user, setUser} = useContext(UserContext);

  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    if(user) navigate("/home/profile");
  }, []);

  const login = async () => {
    try {
      const resp = await coolchat.post("/user/login", {nick, password});
      const data = resp.data;
      const newUser = {
        nick: data.nick,
        userId: data.userId,
        token: data.token
      }
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/home/profile");
    } 
    catch (error) {
      const thisError = await error.response.data.msg
      setError(thisError);
    }
  }
  
  return (
    <div>
        <form>
        <div className="form-group">
          <label htmlFor="name">Insira neu nick</label>
          <input 
            placeholder="nick" 
            type="text" 
            name="nick"
            onChange={(event) => setNick(event.target.value)}
            />
        </div>
        <div className="form-group">
          <label htmlFor="name">Insira sua senha</label>
          <input 
            placeholder="password" 
            type="text" 
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </form>
      {error && <p>{error}</p>}
      <button onClick={login}>Logar</button>
    </div>
  )
}

export default Login