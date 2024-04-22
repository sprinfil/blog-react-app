import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { Navigate,Outlet,Link } from 'react-router-dom'
import Menu from './Menu.jsx';
import Header from './Header.jsx';

const DefaultLayout = () => {

    const {user, token, setUser, setToken} = useStateContext();


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

    </div>
  )
}

export default DefaultLayout