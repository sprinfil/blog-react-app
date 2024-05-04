import React, { useEffect, useState } from 'react'
import Loader from '../Loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';

const DataTable = ({
  endpoint,
  headers,
  rows,
  filtro
}) => {

  const [filter, setFilter] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  //effect
  useEffect(() => {
    getData();
  }, [])


  //data
  const getData = () => {

    setLoading(true);
      axiosClient.get(endpoint)
      .then(({ data }) => {
        setLoading(false);
        setData(data.data);
        setFilteredData(data.data);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  //filtro
  const handleFilter = (e) => {
    setFilter(e.target.value);
    console.log(filter);
    if (filteredData.length > 0) {
      const a = data.filter(item =>
        item[filtro].toLowerCase().trim().includes(filter.toLowerCase().trim()));
      setFilteredData(a);
    } else {
      setFilteredData(data);
    }

  }

  //delete
  const onDelete = (data) => {
    if (!window.confirm("Eliminar este usuario?")) {
      return;
    }
    axiosClient.delete(`${endpoint}/${data.id}`)
      .then(() => {
        //notification
        getData();
      })
  }



  return (
    <div className='card w-full table-container'>
      <div className='w-full flex items-center justify-end h-full my-2 px-5 gap-2'>
        <input type="text" placeholder='buscar...' onChange={handleFilter} />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>

      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))
            }
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            <tr><td colSpan={headers.length + 1}><Loader /></td></tr>
          }
          {
            filteredData.map((data, index) => {
              {
                return (
                  <tr key={index}>
                    {
                      rows.map((row, index) => (
                        <td key={index}>
                          {data[row]}
                        </td>
                      ))
                    }
                    <td>
                    <Link to={endpoint +"/" + data.id}><button className='btn-auth'> <FontAwesomeIcon icon={faEye} /></button></Link>
                          <button className='btn-auth' onClick={ev => onDelete(data)}><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                  </tr>
                )
              }
            })
          }
        </tbody>

      </table>

    </div>
  )
}

export default DataTable