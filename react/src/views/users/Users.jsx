import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../axios-client.js";
import Loader from "../../components/Loader.jsx";
import { Link } from 'react-router-dom';
import DataTable from '../../components/data-components/DataTable.jsx';

const Users = () => {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    setLoading(true);
    axiosClient.get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        setFilteredData(data.data);
        console.log(users);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  const onDelete = (user) => {
    if (!window.confirm("Eliminar este usuario?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        //notification
        getUsers();
      })
  }
  const handleFilter = (e) => {
    setFilter(e.target.value);

    if (filteredData.length > 0) {
      const a = users.filter(item =>
        item.name.toLowerCase().trim().includes(filter.toLowerCase().trim()));
      setFilteredData(a);
    } else {
      setFilteredData(datas);
    }

  }


  return (
    <div>
      <div className='px-[20px] py-[20px]'>
        <Link to={"/users"}>Listado</Link>
      </div>

      <div className='view-container'>

        <p className='title'>Usuarios</p>
        <div className='w-full flex justify-end my-3'>
          <Link to="/users/create">
            <button className='btn-auth'>Crear</button>
          </Link>
        </div>
        <div className='card w-full table-container'>
          <div className='w-full flex items-center justify-end h-full my-2 px-5 gap-2'>
            <input type="text" placeholder='buscar...' onChange={handleFilter} />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          <div className=''>
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

export default Users