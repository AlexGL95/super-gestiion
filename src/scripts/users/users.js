// importaciones Firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../credentials/db";
import { 
    getFirestore, 
    collection, 
    deleteDoc,
    getDocs, 
    getDoc,
    setDoc,
    addDoc,
    doc, 
} from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getUsuarios = async (db) =>  {
    const usuarios_coleccion = collection(db,'usuarios');
    const respuestaFirebase = await getDocs(usuarios_coleccion);
    const usuarios_lista = respuestaFirebase.docs.map(usuario =>
        {
            return {
                ...usuario.data(),
                id: usuario.id
            };
        });
    return usuarios_lista;
}

const usuarios_create = async (db,usuario) => {
    const docRef = await addDoc( collection(db, 'usuarios'), usuario);
    return docRef.id;
}

const usuarios_update = async (db, usuario, id) => {
    await setDoc( doc(db, 'usuarios', id), usuario);
    return true;
}

const usuarios_delete = async (db, id) => {
    await deleteDoc(doc(db, 'usuarios', id));
    return true;
}

const usuarios_getById = async (db, id) => {
   const fireUser = await getDoc(doc(db, 'usuarios', id));
   if (!fireUser.data()) {
       return undefined;
   }
   return { ...fireUser.data(), id: fireUser.id };
}

// funcion que regresa los usuarios que tienen como departamento el string recibido
export async function usuarios_departamento(departamento){
    const usuarios = await getUsuarios(db,departamento);
    const usuarios_array = [];
    for (const usuario of usuarios) {
        if(usuario.departamento === departamento){
            usuarios_array.push(usuario);
        }
    }
    return usuarios_array;
}

// regresa todos los usuarios por departamento
export async function usuarios_todos(){
   return await getUsuarios(db);
}

// crea un usuario
export async function usuarios_crear(usuario){
    return await usuarios_create(db,usuario);
}

// elimina un usuario
export async function usuarios_eliminar(id){
    return await usuarios_delete(db,id);
}

// obtiene un usuario por su id
export async function usuarios_getId(id){
    return await usuarios_getById(db,id);
}

// actualiza un usuario
export async function usuarios_actualizar(usuario,id){
    return await usuarios_update(db,usuario,id);
}

