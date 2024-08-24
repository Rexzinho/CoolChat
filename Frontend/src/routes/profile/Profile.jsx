import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';

const Profile = () =>{

  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) navigate("/home");
  }, []);

  return (
    <div>
      {user && <h2 className="title">{user.nick}</h2>}
    </div>
  )
}

export default Profile;