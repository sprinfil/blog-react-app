import React, { useRef } from 'react'
import logoImage from '../img/sapa_logo.png';
import { Link } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider.jsx';
import axiosClient from '../axios-client';


const SignUp = () => {

  const nameRef = useRef();
  const passwordRef = useRef();
  const password_confirmationRef = useRef();
  const emailRef = useRef();
  const {setUser, setToken} = useStateContext();


  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
      email: emailRef.current.value,
    }
    console.log(payload);

    axiosClient.post("/signup", payload)
    .then(({data})=>{
      setUser(data.user);
      setToken(data.token);
    })
    .catch(err =>{
      const response = err.response;
      if(response && response.status === 422){
        console.log(response.data.errors);
      }
    })
  }

  return (
    <div className='login-container'>

      <div className='card'>

        <div className='image-container'>
          <img src={logoImage} alt="" />
        </div>

        <div className='title'>
          Registrarse
        </div>


        <form onSubmit={onSubmit}>
          <div className='form-container'>
            <div>
              <label>Usuario</label>
              <input type="text" placeholder='Ususario' ref={nameRef}/>
              <br />
              <br />
              <label>Contraseña</label>
              <input type="password" placeholder='Contraseña' ref={passwordRef}/>
              <br />
              <br />
              <label>Repetir Contraseña</label>
              <input type="password" placeholder='Contraseña' ref={password_confirmationRef}/>
            </div>
            <div>
              <label>Correo electronico</label>
              <input type="text" placeholder='correo electronico' ref={emailRef}/>
            </div>
            <br />
            <br />
          </div>
          <button>Registrarse</button>
        </form>


        <Link to="/login"><p className="signup-label">Ya tienes cuenta? inicia sesion</p></Link>
      </div>
    </div>
  )
}

export default SignUp