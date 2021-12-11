// dependences
import { useNavigate, useParams } from 'react-router-dom';
import { departamentos_eliminar, departamentos_getId } from '../../scripts/department/department';
import { usuarios_eliminar, usuarios_departamento, usuarios_actualizar } from '../../scripts/users/users';
export const UsuariosEliminar = () => {
    const params = useParams();
    const navigate = useNavigate();
    let title = 'Eliminar '
    if (params.area === 'dpto') {
        title = title+'Departamento';
    }else{
        title = title+'Usuario';
    }
    const regresar = () => {
        navigate(-1);
    };
    const eliminar = async () =>{
        if (params.area === 'dpto') {

           await departamentos_getId(params.id).then(async respuesta => {
                const nameDep = respuesta.nombre;
                await usuarios_departamento(nameDep).then(async usuarios => {
                    for (const usuario of usuarios) {
                        const newUser = { 
                            nombre:usuario.nombre,
                            apellidos:usuario.apellidos,
                            email:usuario.email?usuario.email:'',
                            pass:usuario.pass,
                            role:usuario.role,
                            departamento:'Sin Asignar',
                            dias:usuario.dias,
                        };
                       await usuarios_actualizar(newUser,usuario.id).then(success => {
                           }).catch(error => {
                             console.log('Error: ',error);
                           });
                    }
                }).catch(error => {
                    console.log('Error: '+error);
                });
                console.log(respuesta);
                
            }).catch(error => {
                console.log('Error: '+error);
            });
            await departamentos_eliminar(params.id).then(respuesta=>{
                navigate(-1);
            }).catch(error =>{
                console.log('Error: ',error);
            });
        }else{
            usuarios_eliminar(params.id).then(respuesta => {
                console.log(respuesta);
                navigate(-1);
            }).catch(error => {
                console.log('Error: '+error);
            });
        }
    };
    return(
        <>
        <div className='row full-size'>
            <div className='col-12 h-100'>
                <div className='row justify-content-center h-100'>
                    <div className='col-12 col-sm-10 col-md-6 col-lg-4 bg-light text-center my-auto shadow rounded'>

                        <div className='row justify-content-center'>
                            <div className='col-12 mt-3'>
                                <h2 className='text-danger'>{title}</h2>
                            </div>

                            <div className='col-12 mt-1'>
                                <h3>¿Estas seguro?</h3>
                            </div>
                            <div className='col-12 my-1'>
                                <h4>Esta accion no puede revertirse</h4>
                            </div>

                            <div className='col-6 my-3'>
                                <button className='btn btn-danger'
                                    onClick={eliminar}>
                                    Si, continuar
                                </button>
                            </div>

                            <div className='col-6 my-3'>
                                <button className='btn btn-warning'
                                onClick={regresar}>
                                    No, Regresar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
