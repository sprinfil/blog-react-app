import React from 'react'
import logoImage from '../img/sapa_logo.png';

const SignUp = () => {
  return (
    <div className='login-container'>

      <div className='card'>

        <div className='image-container'>
          <img src={logoImage} alt="" />
        </div>

        <div className='title'>
          Registrarse
        </div>
        <Link to="/login"><p className="signup-label">no tienes cuenta? registrate</p></Link>
      </div>
    </div>
  )
}

export default SignUp