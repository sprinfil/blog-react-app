import React, { useRef, useState } from 'react'
import logoImage from '../img/sapa_logo.png';
import { Link } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider.jsx';
import axiosClient from '../axios-client';
import Loader from "../components/Loader.jsx";


const SignUp = () => {

  const nameRef = useRef();
  const passwordRef = useRef();
  const password_confirmationRef = useRef();
  const emailRef = useRef();
  const {setUser, setToken} = useStateContext();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);


  const onSubmit = (e) => {
    setErrors(null);
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
      email: emailRef.current.value,
    }
    console.log(payload);
    setLoading(true);
    axiosClient.post("/signup", payload)

    .then(({data})=>{
      setUser(data.user);
      setToken(data.token);
      setLoading(false);
    })
    .catch(err =>{
      setLoading(false);
      const response = err.response;
      if(response && response.status === 422){
        setErrors(response.data.errors);
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
        {loading &&
       <Loader/>

      }
      {errors && 
      <div className='alert'>
        {Object.keys(errors).map(key => (
          <p key={key}>{errors[key][0]}</p>
        ))}
      </div>
      }


        <form onSubmit={onSubmit}>
          <div className='form-container'>
            <div>
              <label>Usuario</label>
              <input type="text" placeholder='Ususario' ref={nameRef} className='w-full'/>
              <br />
              <br />
              <label>Contraseña</label>
              <input type="password" placeholder='Contraseña' ref={passwordRef} className='w-full'/>
              <br />
              <br />
              <label>Repetir Contraseña</label>
              <input type="password" placeholder='Contraseña' ref={password_confirmationRef} className='w-full'/>
            </div>
            <div>
              <label>Correo electronico</label>
              <input type="text" placeholder='correo electronico' ref={emailRef} className='w-full'/>
            </div>
            <br />
            <br />
          </div>
          <button className='btn-auth'>Registrarse</button>
        </form>


        <Link to="/login"><p className="signup-label">Ya tienes cuenta? inicia sesion</p></Link>
      </div>
    </div>
  )
}

export default SignUp