import { useNavigate } from 'react-router-dom';
import { usuarios_todos } from '../../scripts/users/users';
import { useEffect, useState } from 'react';
import { Link } from '../../../node_modules/react-router-dom/index';


export  const UsuariosListado = () => {
    
    const [users, setUser] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false)
  
    useEffect(() => {
        usuarios_todos().then(arreglo => {
          setUser(arreglo);
        })
        .catch(error => {
          console.log('Error: ',error);
        });

      setReloadUsers(false)
    }, [reloadUsers]);

    const navigate = useNavigate();
   
    const addUser = () =>{
        navigate('/Usuarios_Create/any');
        return;
    }

    return(
        <>
            <div className='row mt-3 m-5'>
                <div className='col-12 text-center'>
                    <h1>Listado de usuarios</h1>
                </div>

                <div className = 'col-12 text-center text-sm-start'>
                    <button
                        className = 'btn btn-success btn-block'
                        onClick = { addUser }
                        >
                    Nuevo usuario
                    </button>
                </div>
                <table className="table table-sm table-striped table-responsive table-hover mt-3 table-bordered" id='tablaUsuarios'>
                    <thead className="thead-inverse|thead-default">
                        <tr>
                            <th scope="col" className='bg-dark text-light font-weight-bold text-center'>Nombre</th>
                            <th scope="col" className='bg-dark text-light font-weight-bold text-center'>Departamento</th>
                            <th scope="col" className='bg-dark text-light font-weight-bold text-center'>Correo</th>
                            <th scope="col" className='bg-dark text-light font-weight-bold text-center'>Días Laborales</th>
                            <th scope="col" className='bg-dark text-light font-weight-bold text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={user.id} >
                                <td className='text-center text-wrap'>{user.nombre} {user.apellidos}</td>
                                <td className='text-center text-wrap'>{user.departamento}</td>
                                <td className='text-center text-wrap'>{user.email}</td>
                                <td className='text-center text-wrap'>{user.dias}</td>
                                <td className='text-center text-wrap'>
                                    <Link to = {`/Usuarios_Create/${user.id}`} >
                                        <button 
                                            className='btn btn-warning mx-2'
                                        >
                                        Editar</button>    
                                    </Link>
                                    <Link to = {`/Usuarios_Delete/${user.id}/user`} >
                                    <button className='btn btn-danger mx-2'>Eliminar</button>
                                    </Link>
                                </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>   
        </>
    );
}
