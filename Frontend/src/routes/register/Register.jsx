import { useContext, useState } from "react"
import coolchat from '../../axios/config';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../contexts/user";

const Register = () =>{

  const {user, setUser} = useContext(UserContext);

  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      await coolchat.post("/user/register", {nick, password, confirmationPassword});
      navigate("/home/profile");
    } 
    catch (error) {
      const thisError = await error.response.data.msg
      setError(thisError);
      console.log(error);
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