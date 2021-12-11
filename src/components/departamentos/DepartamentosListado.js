// dependences
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { departamentos_todos } from '../../scripts/department/department';
import { Link } from '../../../node_modules/react-router-dom/index';

export const DepartamentosListado = () => {
    
    const [department, setUser] = useState([]);
    const [reloadUsers, setReloadDepartamentos] = useState(false)
  
    useEffect(() => {
        departamentos_todos().then(arreglo => {
          setUser(arreglo);
        })
        .catch(error => {
          console.log('Error: ',error);
        });

      setReloadDepartamentos(false)
    }, [reloadUsers]);

    const navigate = useNavigate();

    const addDepartment = () =>{
        navigate('/Departamentos_Create/any');
        return;
    }
    return(
        <>
            <div className='row mt-3 m-5'>
                <div className='col-12 text-center'>
                    <h1>Listado de Departamentos</h1>
                </div>

                <div className = 'col-12 text-center text-sm-start'>
                    <button
                        className = 'btn btn-success btn-block'
                        onClick = { addDepartment }
                        >
                    Nuevo departamento
                    </button>
                </div>
                <table className="table table-sm table-striped table-responsive table-hover mt-3 table-bordered" id='tablaUsuarios'>
                    <thead className="thead-inverse|thead-default">
                        <tr>
                            <th scope="col" className='bg-dark text-light font-weight-bold text-center'>Nombre</th>
                            <th scope="col" className='bg-dark text-light font-weight-bold text-center'>Descripcion</th>
                            <th scope="col" className='bg-dark text-light font-weight-bold text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {department.map((user) => {
                            return (
                                <tr key={user.id} >
                                <td className='text-center'>{user.nombre}</td>
                                <td className='text-center'>{user.descripcion}</td>
                                <td className='text-center'>
                                <Link to = {`/Departamentos_Create/${user.id}`} >
                                        <button 
                                            className='btn btn-warning mx-2'
                                        >
                                        Editar</button>    
                                    </Link>
                                    <Link to = {`/Usuarios_Delete/${user.id}/dpto`} >
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
