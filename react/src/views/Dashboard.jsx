import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";   
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
  

const Dashboard = () => {

  const { user, token, setUser, setToken } = useStateContext();

  const onLogout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout')
        .then(() => {
            setUser({});
            setToken(null);
        })
}

  return (
    <div className='view-container'>
      <p className='title'>Escritorio</p>
      <div className='dashboard-card'>
        <div className='first'>
          <FontAwesomeIcon icon={faUser}/>  
        </div>
        <div className='second'>
          <p className='primer-parrafo'>Bienvenido/a</p>
          <p className='segundo-parrafo'>{user.name}</p>
        </div>
        <div className='third' onClick={onLogout}>
          <div>
            <FontAwesomeIcon icon={faRightFromBracket}/> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard