import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faEye, faTrash, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";   

const Posts = () => {
  
  const [filteredData, setFilteresData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFilter = () =>{

  }
  
  return (
    <div>
      <div className='px-[20px] py-[20px]'>
        <Link to={"/posts"}>Listado</Link>
      </div>
      <div className='view-container'>
        <p className='title'>Mis posts</p>
        <div className='card w-full '>
        <div className='w-full flex items-center justify-end h-full my-2 px-5 gap-2'>
          <input type="text" placeholder='buscar...' onChange={handleFilter} />
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
              {loading &&
                <tr><td colSpan={4}><Loader /></td></tr>
              }
              {
                filteredData.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {user.name}
                      </td>
                      <td>
                        {user.email}
                      </td>
                      <td>
                        <Link to={'/users/' + user.id}><button className='btn-auth'> <FontAwesomeIcon icon={faEye} /></button></Link>
                        <button className='btn-auth' onClick={ev => onDelete(user)}><FontAwesomeIcon icon={faTrash} /></button>
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
      
    </div>
  )
}

export default Posts