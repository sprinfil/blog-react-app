import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { Navigate,Outlet,Link } from 'react-router-dom'
import Menu from './Menu.jsx';
import Header from './Header.jsx';
import NotificationGif from './NotificationGif.jsx';

const DefaultLayout = () => {

    const {user, token,notification, setUser, setToken} = useStateContext();


    if(!token){
        return <Navigate to="login"/>
    }

    return (
    <div className='defaultLayout-container'>
      <aside>
        <Menu/>
      </aside>
      <main>
        <Header/>
        <Outlet/>
      </main>

    
     <div className='notification-success'>
        {notification}
        <NotificationGif/>
      </div>

    </div>
  )
}

export default DefaultLayout