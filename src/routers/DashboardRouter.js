import { Routes, Route, } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { UsuariosListado } from '../components/usuarios/UsuariosListado';
import { UsuariosRegistro } from '../components/usuarios/UsuariosRegistro';
import { DepartamentosListado } from '../components/departamentos/DepartamentosListado';
import { DepartamentosRegistro } from '../components/departamentos/Departamentosregistro';
import { UsuariosEliminar } from '../components/usuarios/UsuariosDelete';

export const DashBoardRoutes = () =>{
    return(
        <>
         <Navbar />
            <Routes>
                    <Route path='Usuarios' element={<UsuariosListado />} />
                    <Route path='Usuarios_Create/:id' element={<UsuariosRegistro />} />
                    <Route path='Usuarios_Delete/:id/:area' element={<UsuariosEliminar />} />
                    <Route path='Departamentos' element={<DepartamentosListado />} />
                    <Route path='Departamentos_Create/:id' element={<DepartamentosRegistro />} />
            </Routes>
        </>
    );
}
