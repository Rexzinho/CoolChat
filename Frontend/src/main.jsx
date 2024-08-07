import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate, Link } from 'react-router-dom';
import Home from './routes/home/Home';
import ChatList from './routes/chat-list/ChatList';
import Chat from './routes/chat/Chat';
import Register from './routes/register/Register';
import Login from './routes/login/Login';
import Profile from './routes/profile/Profile';

const router = createBrowserRouter([{
  element: <App/>,
  children: [{
      path: "/home",
      element: <Home/>
    },
    {
      path: "/chat-list",
      element: <ChatList/>
    },
    {
      path: "/chat/:number",
      element: <Chat/>
    },
    {
      path: "/home/register",
      element: <Register/>
    },
    {
      path: "/home/login",
      element: <Login/>
    },
    {
      path: "/home/profile",
      element: <Profile/>
    },
    {
      path: "*",
      element: <Link to={"/home"}>Home</Link>
    }
  ]  
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
  </React.StrictMode>,
)
