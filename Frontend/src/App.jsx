import { Outlet } from 'react-router-dom';
import UserProvider from './contexts/user';
import './App.css'

const App = () => {

  return (
    <UserProvider>
      <p>aaa</p>
      <Outlet/>
    </UserProvider>
  );
}

export default App;
