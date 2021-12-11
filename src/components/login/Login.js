// dependences
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { logIn } from '../../scripts/auth/auth';

export const Login = () => {

    const navigate = useNavigate();

    const redirect = () =>{
        const mail = document.getElementById('mail');
        const pass = document.getElementById('pass');
        logIn(mail.value,pass.value)
        .then(userData => {
            if (userData && userData.role === 'Gestor') {
                localStorage.setItem('Usuario', userData.nombre + ' ' + userData.apellidos);
                navigate('/Usuarios',{
                    replace: true
                });
            }else{
                console.log('Credenciales Invalidas');
            }
        })
        .catch( error => {
            console.log('Error: ', error);
        });
        return;
    }

    return(
        <div className='row img-background'>
            <div className='col-12 h-100'>


                <div className= 'row justify-content-center h-100'>
                    <div className='col-12 col-sm-10 col-md-6 col-lg-4 text-center my-auto bg-light rounded'>


                        <div className='row py-4 px-3 '>

                            <div className='col-12'>
                                <img className='p-1' width='180' src = 'assets/logo.svg' alt= 'Logotipo'></img>
                            </div>


                            <div className='col-12 mt-3'>
                                <h3>Bienvenido</h3>
                            </div>

                            <form>

                                <div className='col-12 form-group my-3 text-start'>

                                <span className='label-input'>Correo</span>

                                    <input
                                        className='form-control'
                                        type='email'
                                        id='mail'
                                        name='mail'
                                        required
                                    ></input>
                                </div>

                                <div className='col-12 form-group my-3 text-start'>
                        
                                    <span className='label-input'>Contraseña</span>
                       
                                    <input
                                        className='form-control'
                                        type='password'
                                        id='pass'
                                        name='pass'
                                        required
                                    ></input>
                                </div>
                            </form>

                                <div className='col-12'>
                                    <button
                                        className = 'btn btn-submit'
                                        onClick = { redirect }
                                        >
                                        Entrar

                                    </button>
                                </div>


                        </div>

                    </div>
                        
                </div>
            </div>
        </div>
    );
}
