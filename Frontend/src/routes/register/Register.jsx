import { useContext, useEffect, useState } from "react"
import coolchat from '../../axios/config';
import { redirect, useNavigate } from 'react-router-dom';
import { UserContext } from "../../contexts/user";
import Dice from '../../assets/Dice.svg';
import FormGroup from "../../components/form-group/FormGroup";

import { adjectives, animals } from "./Names";

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

  const createAccount = async (e) => {
    e.preventDefault();
    try {
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

  const generateNick = () => {
    const num1 = Math.floor(Math.random() * adjectives.length);
    const num2 = Math.floor(Math.random() * animals.length);
    const adjective = adjectives[num1];
    const animal = animals[num2];
    setNick(adjective + " " + animal);
  }

  return (
    <div>
      <h2 className="title">Criar uma conta</h2>
      <form onSubmit={createAccount} className="home-form">
        <div className="form-group">
          <label htmlFor="name">Insira neu nick</label>
          <div className="border form-border">
            <div className="inside nick-group">
              <input 
                placeholder="nick" 
                type="text" 
                name="nick"
                onChange={(event) => setNick(event.target.value)}
                value={nick}
              />
              <img src={Dice} alt="Dice" className="dice-img" onClick={generateNick}/>
            </div>
          </div>
        </div>
        <FormGroup
          label="Insira sua senha"
          placeholder="senha"
          name={"password"}
          set={setPassword}
          value={password}
        />
        <FormGroup
          label="Confirme sua senha"
          placeholder="senha de confirmação"
          name={"confirmationPassword"}
          set={setConfirmationPassword}
          value={confirmationPassword}
        />
        <button type="submit" className="cool-btn">Criar conta</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default Register