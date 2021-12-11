// dependences
import { useNavigate, useParams } from 'react-router-dom';
import { usuarios_getId, usuarios_crear,usuarios_actualizar } from '../../scripts/users/users';
import { departamentos_todos } from '../../scripts/department/department';
import { useEffect, useState } from 'react';
import './usuarios.css'

export const UsuariosRegistro = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(undefined);
    const [reloadUsers, setReloadUsers] = useState(false);
    const [departmentos, setDepartamento] = useState([]);
    const [reloadDepartamento, setReloadDepartamentos] = useState(false)
  
    useEffect(() => {
        departamentos_todos().then(arreglo => {
          setDepartamento(arreglo);
        })
        .catch(error => {
          console.log('Error: ',error);
        });

      setReloadDepartamentos(false)
    }, [reloadDepartamento]);

    
    useEffect(() => {
        usuarios_getId(params.id).then(arreglo => {
            setUser(arreglo);
        })
        .catch(error => {
            console.log('Error: ',error);
        });
        
        setReloadUsers(false)
    }, [reloadUsers]);

    
    let title = 'Registro de Usuarios';
    if (params.id !== 'any') {
        title = 'Edición de Usuarios';
    }
    const roles = ['Gestor','Empleado'];
    const nameInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('Apellidos');
    const emailInput = document.getElementById('mail');
    const passInput = document.getElementById('pass');
    const rolInput = document.getElementById('rol');
    const dptoInput = document.getElementById('depto');
    const diasInput = document.getElementById('dias');

    if (user) {
        nameInput.value = user.nombre;
        apellidosInput.value = user.apellidos;
        emailInput.value = user.email? user.email:'';
        passInput.value = user.pass;
        rolInput.value = user.role;
        dptoInput.value = user.departamento;
        diasInput.value = user.dias;
    }
    const guardarUsuario = async () =>{
        console.log('Redireccion');
        const usuario ={
            nombre:nameInput.value,
            apellidos:apellidosInput.value,
            email:emailInput.value,
            pass:passInput.value,
            role:rolInput.value,
            departamento:dptoInput.value,
            dias:diasInput.value,
        }
        if (user) {
            console.log('Edicion');
            usuarios_actualizar(usuario,params.id).then(success => {
                console.log(success);
                navigate('/Usuarios');
              }).catch(error => {
                console.log('Error: ',error);
              });
        }
        else{
            console.log('Creacion');
           await usuarios_crear(usuario).then(success => {
                navigate('/Usuarios');
                console.log(success);
            }).catch(error => {
                console.log('Error: ', error);
            });
        }
        return;
    }
  
    return(
        <div className= 'row justify-content-center img-background-usuarios'>
            <div className='col-12 col-sm-10 col-md-9 col-lg-7 text-center my-auto bg-light rounded'>

                <form id='form' onSubmit={ guardarUsuario } action='javascript:void(0);'>
                    <div className='row py-4 px-3 '>

                        <div className='col-12 form-group my-3 my-md-3 text-center'>
                            <h3>
                                {title}
                            </h3>
                        </div>

                        <div className='col-12 col-md-6 col-lg-4 form-group my-1 my-md-3 text-start'>

                            <span className='label-input mr-auto'>Nombre</span>

                            <input
                                className='form-control'
                                type='text'
                                id='nombre'
                                name='nombre'
                                required
                            ></input>
                        </div>

                        <div className='col-12 col-md-6 col-lg-4 form-group my-1 my-md-3 text-start'>
                    
                            <span className='label-input'>Apellidos</span>
                
                            <input
                                className='form-control'
                                type='text'
                                id='Apellidos'
                                name='Apellidos'
                                required
                            ></input>
                        </div>

                        <div className='col-12 col-md-6 col-lg-4 form-group my-1 my-md-3 text-start'>

                            <span className='label-input'>Correo</span>

                            <input
                                className='form-control'
                                type='email'
                                id='mail'
                                name='mail'
                                required
                            ></input>
                        </div>

                        <div className='col-12 col-md-6 col-lg-4 form-group my-1 my-md-3 text-start'>
                
                            <span className='label-input'>Contraseña</span>
                
                            <input
                                className='form-control'
                                type='text'
                                id='pass'
                                name='pass'
                                required
                            ></input>
                        </div>
                        
                        <div className='col-12 col-md-6 col-lg-4 form-group my-1 my-md-3 text-start'>
                            <span className='label-input'>Rol</span>
                            <select 
                                className='form-control'
                                id='rol'
                                name='rol'
                                required
                                >
                                {roles.map((role, i)=>{
                                   return ( <option 
                                    key={i} 
                                    value={role}>
                                        {role}
                                    </option>);
                                })}
                            </select>
                        </div>

                        <div className='col-12 col-md-6 col-lg-4 form-group my-1 my-md-3 text-start'>
                            <span className='label-input'>Departamento</span>
                            <select 
                                className='form-control'
                                id='depto'
                                name='depto'
                                required
                                >
                                    <option value='Sin Asignar'>
                                        Sin Asignar
                                    </option>
                                {departmentos.map((departamento, i)=>{
                                   return ( <option 
                                    key={departamento.id} 
                                    value={departamento.nombre}>
                                        {departamento.nombre}
                                    </option>);
                                })}
                            </select>
                        </div>
                        <div className='col-12 col-md-12 form-group my-1 my-md-3 text-start'>
                            <span className='label-input'>Dias Laborales</span>
                            <input
                                className='form-control'
                                type='text'
                                id='dias'
                                name='dias'
                                required
                            ></input>
                        </div>

                        <div className='col-12'>
                            <button
                                type='submit'
                                className = 'btn btn-submit'
                                onSubmit = { guardarUsuario }
                                >
                                Guardar

                            </button>
                        </div>


                    </div>
                </form>

            </div>
                
        </div>
    );
}
