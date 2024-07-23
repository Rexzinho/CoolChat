import { Outlet } from 'react-router-dom';
import UserProvider from './contexts/user';
import { useContext } from 'react';
import './App.css'

import Navbar from './components/navbar/Navbar';

const App = () => {
  return (
    <UserProvider>
      <Navbar/>
      <Outlet/>
    </UserProvider>
  );
}

export default App;
