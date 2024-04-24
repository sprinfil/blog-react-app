import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setNotification = (message) => {
        const elemento = document.querySelector('.notification-success');
        elemento.classList.remove('fadeOut');
        elemento.classList.add('fadeIn');
        _setNotification(message);
        setTimeout(()=>{
            elemento.classList.remove('fadeIn');
            elemento.classList.add('fadeOut');
        }, 3000)
        setTimeout(()=>{
            _setNotification('');
        }, 3400)
    }

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        } else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }


    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)