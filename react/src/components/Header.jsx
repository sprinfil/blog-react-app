import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

const Header = () => {

    const { user, token, setUser, setToken } = useStateContext();
    const [userCard, setUserCard] = useState(false);
    const menuRef = useRef(null);

    const clickUserContainer = () => {
        setUserCard(!userCard);
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
    }, [])

    return (
        <div className='header-container'>
            <div className='header-content'>

                <div className='user-container' onClick={clickUserContainer}>
                    <p>{user.name}</p>
                    <FontAwesomeIcon icon={faUser} />
                    {userCard &&
                        <div className='user-card' ref={menuRef}>
                            <div className='user-card-btn'>
                                <FontAwesomeIcon icon={faUser} />
                                Mi Perfil
                            </div>
                            <div className='user-card-btn' onClick={onLogout}>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                Salir
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header