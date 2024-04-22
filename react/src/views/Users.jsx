import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../axios-client.js";
import Loader from "../components/Loader.jsx";

const Users = () => {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    setLoading(true);
    axiosClient.get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        console.log(users);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  return (
    <div className='view-container'>
      <p className='title'>Usuarios</p>
      <div className='w-full flex justify-end my-3'>
        <button className='btn-auth'>Crear</button>
      </div>
      <div className='card w-full'>
        <div className='w-full flex items-center justify-end h-full my-2 px-5 gap-2'>
          <input type="text" placeholder='buscar...' />
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
                users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {user.name}
                      </td>
                      <td>
                        {user.email}
                      </td>
                      <td>
                        <button className='btn-auth'> <FontAwesomeIcon icon={faEye} /></button>
                        <button className='btn-auth'><FontAwesomeIcon icon={faTrash} /></button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
          {loading &&
               <Loader/>
              }
        </div>
      </div>
    </div>
  )
}

export default Users