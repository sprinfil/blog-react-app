import {useRef, useState} from 'react';
import {Link, Navigate} from "react-router-dom"
import logoImage from '../img/sapa_logo.png';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const login = () => {

  const {setUser, setToken} = useStateContext();
  const nameRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

const onSubmit = (e) => {
    setErrors(null);
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
    }
    setLoading(true);
    axiosClient.post("/login", payload)

    .then(({data})=>{
      setUser(data.user);
      setToken(data.token);
      setLoading(false);
      
    })
    .catch(err =>{
      setLoading(false);

      const response = err.response;
      if(response && response.status === 422){
        if(response.data.errors){
          setErrors(response.data.errors);
        }else{
          setErrors({
            email: [response.data.message],
          })
        }
       
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
          Bienvenido
        </div>

        {loading &&
        <div className='loader-container'>        
        <div className='loader'></div>
        </div>

      }

        {errors && 
      <div className='alert'>
        {Object.keys(errors).map(key => (
          <p key={key}>{errors[key][0]}</p>
        ))}
      </div>
      }

        <form onSubmit={onSubmit}>
          <label>Usuario</label>
          <input ref={nameRef} type="text" placeholder='Ususario' />
          <br />
          <br />
          <label>Contraseña</label>
          <input ref={passwordRef} type="password" placeholder='Contraseña'/>
          <br />
          <br />
          <button>Ingresar</button>
        </form>
        <Link to="/signup"><p className="signup-label">no tienes cuenta? registrate</p></Link>
      </div>  

    </div>
  )
}

export default login