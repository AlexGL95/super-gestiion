// importaciones Firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../credentials/db";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

export async function logIn(mail,pass){
    const usuarios = await getUsuarios(db);
    let userData;
    for (const usuario of usuarios) {
        if (usuario.email === mail && usuario.pass === pass) {
            userData = usuario;
        }
    }
    return userData;
}
