import React, { useState } from 'react'
import logo from '../img/sapa_logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faHouse, faUser, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const Menu = () => {

  const [opciones,setOpciones] = useState([
    {
      icon: faHouse,
      title: "Escritorio",
      route: "/dashboard",
      selected: true
    },
    {
      icon: faUser,
      title: "Usuarios",
      route: "/users",
      selected: false
    },
    {
      icon: faNewspaper,
      title: "Posts",
      route: "/posts",
      selected: false
    },
  ])

  const option_selected  = (index) =>{
    const newarray = [...opciones];
    newarray.map((opcion, index)=>{
        opcion.selected = false;
    })
    newarray[index].selected = true;
    setOpciones(newarray);
    console.log(opciones);

  }


  return (
    <div className='menu-container'>
      <div className='content-container'>
        <div className='image-container'>
          <img src={logo} alt="" />
        </div>
        <div className='buttons-container'>
          {
            opciones.map((opcion, index) => (
              <Link to={opcion.route} key={index}>
                <div className={`btn-menu ${opcion.selected ? 'btn-menu-selected':""}`} key={index} onClick={()=> option_selected(index)}>
                  <FontAwesomeIcon icon={opcion.icon} />
                  {opcion.title}
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Menu