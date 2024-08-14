import { useContext, useState } from "react";
import FormGroup from "../../components/form-group/FormGroup";
import coolchat from "../../axios/config";
import { UserContext } from "../../contexts/user";
import { useNavigate } from "react-router-dom";

const CreateChat = () => {

  const navigate = useNavigate();

  const {chats, setChats} = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState(null);

  const createRoom = async (e) => {
    console.log("AAA");
    e.preventDefault();
    try {
      const resp = await coolchat.post("/room/create", {
        name,
        password,
        type: isPrivate ? "private" : "public"
      });
      const createdRoom = resp.data.room;
      setChats(prevChats => [...prevChats, createdRoom]);
      navigate(`/chat/${(chats.length + 1)}`);  
    } 
    catch (error) {
      const thisError = await error.response.data.msg;
      setError(thisError);
    }
  }

  return (<>
    <h1 className="title">CRIANDO UMA SALA</h1>
    <form className="home-form" onSubmit={createRoom}>
      <FormGroup
          label="Insira o nome do chat"
          placeholder="nome"
          name={"name"}
          set={setName}
          value={name}
      />
      <label>Sala Privada?</label>
      <input type="checkBox" onChange={(e) => setIsPrivate(e.target.checked)}/>
      {isPrivate && 
        <FormGroup
          label="Insira a senha do chat"
          placeholder="senha"
          name={"name"}
          set={setPassword}
          value={password}
        />
      }
      <button type="submit" className="cool-btn">Criar Sala</button>
    </form>
    {error && <p className="error-message">{error}</p>}
  </>)
}

export default CreateChat;