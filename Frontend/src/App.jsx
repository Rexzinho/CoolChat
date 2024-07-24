import { Outlet } from 'react-router-dom';
import UserProvider from './contexts/user';
import { useContext } from 'react';
import './App.css'

import Navbar from './components/navbar/Navbar';

const App = () => {
  return (
    <UserProvider>
      <div className="main">
        <Navbar/>
        <div className="container">
          <Outlet/>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
