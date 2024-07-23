import { useContext, useEffect, useState } from "react"
import coolchat from '../../axios/config';
import { redirect, useNavigate } from 'react-router-dom';
import { UserContext } from "../../contexts/user";

const Register = () =>{

  const {user, setUser} = useContext(UserContext);

  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if(user) navigate("/home/profile");
  }, []);

  const createAccount = async () => {
    try {
      console.log('bbbb');

      const resp = await coolchat.post("/user/register", {nick, password, confirmationPassword});
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
      <h1>CoolChat</h1>
      <h2>Criar uma conta</h2>
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
        <div className="form-group">
          <label htmlFor="name">Confirme sua senha</label>
          <input 
            placeholder="confirmation password" 
            type="text" 
            name="confirmationPassword"
            onChange={(event) => setConfirmationPassword(event.target.value)}
          />
        </div>
      </form>
      <button onClick={createAccount}>Criar conta</button>
      {error && <p>{error}</p>}
      <button onClick={() => console.log(user)}>TESTE</button>
    </div>
  )
}

export default Register