import React from 'react';
import logoImage from '../img/sapa_logo.png';

const login = () => {
  return (
    <div className='login-container'>

      <div className='card'>

        <div className='image-container'>
          <img src={logoImage} alt="" />
        </div>

        <div className='title'>
          Bienvenido
        </div>


        <form>
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

      </div>  

    </div>
  )
}

export default login