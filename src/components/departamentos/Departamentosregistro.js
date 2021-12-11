// dependences
import { useNavigate, useParams } from 'react-router-dom';
import { usuarios_actualizar, usuarios_departamento } from '../../scripts/users/users';
import { departamentos_getId, departamentos_crear, departamentos_actualizar } from '../../scripts/department/department';
import { useEffect, useState } from 'react';
import './departamentos.css'

export const DepartamentosRegistro = () => {
    const nombredpto = document.getElementById('nomDpto');
    const descdpto = document.getElementById('desc');
    
    const navigate = useNavigate();
    const params = useParams();
    const [departamento, setDepartamento] = useState(undefined);
    const [reloadDptos, setReloadDptos] = useState(false);

    useEffect(() => {
        departamentos_getId(params.id).then(arreglo => {
            setDepartamento(arreglo);
        })
        .catch(error => {
            console.log('Error: ',error);
        });
        
        setReloadDptos(false)
    }, [reloadDptos]);

    let title = 'Registro de Departamentos';
    if (params.id !== 'any') {
        title = 'Edición de Departamentos';
    }
    let valorInicial;


    if (departamento) {
        valorInicial = departamento.nombre;
        nombredpto.value = departamento.nombre;
        descdpto.value = departamento.descripcion;
    }else{
        nombredpto.value ='';
        descdpto.value = '';
    }

    const guardarUsuario = async () =>{
        const dpto ={
            nombre:nombredpto.value,
            descripcion:descdpto.value,
        }
        console.log('info de inputs',dpto);
        if (departamento) {
           await usuarios_departamento(valorInicial).then(async(usuarios)=>{
                for (const usuario of usuarios) {
                    const newUser = { 
                        nombre:usuario.nombre,
                        apellidos:usuario.apellidos,
                        email:usuario.email?usuario.email:'',
                        pass:usuario.pass,
                        role:usuario.role,
                        departamento:dpto.nombre,
                        dias:usuario.dias,
                    };
                   await usuarios_actualizar(newUser,usuario.id).then(success => {
                       }).catch(error => {
                         console.log('Error: ',error);
                       });
                }
            }).catch(error=>{
                console.log('Error: ',error);
            });
            await departamentos_actualizar(dpto,params.id).then(success =>{
                navigate('/Departamentos');
            }).catch(error =>{
                console.log('Error: ', error);
            });
        }
        else{
            console.log('Creacion');
           await departamentos_crear(dpto).then(success => {
                navigate('/Departamentos');
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

                        <div className='col-12 col-md-6 form-group my-1 my-md-3 text-start'>

                            <span className='label-input mr-auto'>Nombre</span>

                            <input
                                className='form-control'
                                type='text'
                                id='nomDpto'
                                name='nomDpto'
                                required
                            ></input>
                        </div>

                        <div className='col-12 col-md-6 form-group my-1 my-md-3 text-start'>
                    
                            <span className='label-input'>Descripcion</span>
                
                            <input
                                className='form-control'
                                type='text'
                                id='desc'
                                name='desc'
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
