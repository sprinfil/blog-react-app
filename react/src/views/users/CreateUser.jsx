import React, { useEffect, useRef, useState } from 'react'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Loader from '../../components/Loader';
import { useStateContext } from '../../contexts/ContextProvider';

const CreateUser = () => {

  const nameRef = useRef();
  const passwordRef = useRef();
  const password_confirmationRef = useRef();
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const {setNotification} = useStateContext();

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
          console.log(data);
          console.log(user);
        })
        .catch(() => {

          setLoading(false);
        })
    }, [])
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if(user.id){
      //editar
      axiosClient.put(`/users/${user.id}`,user)
      .then(()=>{
        setLoading(false);
        setNotification("usuario modificado");
        navigate('/users');
      })
      .catch((err)=>{
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
        }
        setLoading(false);
      })
    }else{
      //crear
         axiosClient.post(`/users`,user)
         .then(()=>{
           setLoading(false);
           setNotification("usuario creado");
           navigate('/users');
         })
         .catch((err)=>{
           const response = err.response;
           if(response && response.status === 422){
             setErrors(response.data.errors);
           }
           setLoading(false);
         })
    }
  }

  return (
    <div>

      <div className='px-[20px] py-[20px]'>
        <p><Link to={"/users"}>Listado</Link> {'>'} Crear Usuario</p>
      </div>
 
      <div className='view-container'>
        {user.id && <p className='title'>Editar usuario {user.name}</p>}
        {!user.id && <p className='title'>Crear Usuario</p>}
        <div className='card px-5 py-5'>
        {loading && <Loader />}
          {errors &&
            <div className='alert'>
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }

          <form onSubmit={onSubmit}>
            <div className='form-container grid grid-cols-2 gap-5'>

              <div>
                <p>Usuario</p>
                <input type="text" onChange={ev => setUser({ ...user, name: ev.target.value })}
                  value={user.name} placeholder='Ususario'
                  ref={nameRef}
                  className='w-full' />
                <br />
                <br />
                <p>Contraseña</p>
                <input type="password"
                  onChange={ev => setUser({ ...user, password: ev.target.value })}
                  placeholder='Contraseña'
                  ref={passwordRef}
                  className='w-full' />
                <br />
                <br />
                <p>Repetir Contraseña</p>
                <input type="password"
                  onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })}
                  placeholder='Contraseña'
                  ref={password_confirmationRef}
                  className='w-full' />
              </div>
              <div>
                <p>Correo electronico</p>
                <input type="text"
                  onChange={ev => setUser({ ...user, email: ev.target.value })}
                  value={user.email}
                  placeholder='correo electronico'
                  ref={emailRef}
                  className='w-full' />
              </div>
              <br />
              <br />
            </div>
            <button className='btn-auth'>Aceptar</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default CreateUser