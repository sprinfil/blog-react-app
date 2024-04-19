import React from 'react';
import {Link} from "react-router-dom"
import logoImage from '../img/sapa_logo.png';

const login = () => {


  const onSubmit = (e) =>{
    e.preventDefault();
    console.log("iniciar sesion");
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


        <form onSubmit={onSubmit}>
          <label>Usuario</label>
          <input type="text" placeholder='Ususario' />
          <br />
          <br />
          <label>Contraseña</label>
          <input type="password" placeholder='Contraseña'/>
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