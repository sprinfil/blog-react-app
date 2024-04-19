import React from 'react'
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { Navigate,Outlet,Link } from 'react-router-dom'

const DefaultLayout = () => {

    const {user, token, setUser, setToken} = useStateContext()

    if(!token){
        return <Navigate to="login"/>
    }


  return (
    <div>DefaultLayout</div>
  )
}

export default DefaultLayout