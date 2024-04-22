import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Users = () => {

  const users = [
    {
      nombre: "sprinfil",
      email: "jeremy.ojeda@hotmail.com",
    },
    {
      nombre: "maik",
      email: "maik@hotmail.com",
    },
    {
      nombre: "alain",
      email: "alain@hotmail.com",
    }
  ]

  return (
    <div className='view-container'>
      <p className='title'>Usuarios</p>
      <div className='w-full flex justify-end my-3'>
        <button className='btn-auth'>Crear</button>
      </div>
      <div className='card w-full'>
        <div className='w-full flex items-center justify-end h-full my-2 px-5 gap-2'>
          <input type="text" placeholder='buscar...'/>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user,index) => {
                 return ( 
                 <tr key={index}>
                    <td>
                      {user.nombre}
                    </td>
                    <td>
                      {user.email}
                    </td>
                    <td>
                      <button className='btn-primary'> <FontAwesomeIcon icon={faEye} /></button>
                      <button className='btn-primary'><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users