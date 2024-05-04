import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEye, faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import DataTable from '../../components/data-components/DataTable';

const Posts = () => {

  return (
    <div>
      <div className='px-[20px] py-[20px]'>
        <Link to={"/posts"}>Listado</Link>
      </div>
      <div className='view-container'>
        <p className='title'>Mis posts</p>
        <div className='card w-full '>

          <DataTable
            endpoint={"/users"}
            headers={["nombre", "email"]}
            rows={['name', 'email']}
            filtro={'name'}
          />
          
        </div>
      </div>

    </div>
  )
}

export default Posts