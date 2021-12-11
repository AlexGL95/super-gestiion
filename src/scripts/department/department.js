// importaciones Firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../credentials/db";
import { 
    getFirestore, 
    collection, 
    deleteDoc,
    getDocs,
    getDoc, 
    addDoc,
    setDoc,
    doc, 
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getDepartamentos = async (db) =>  {
    const departamentos_coleccion = collection(db, 'departamentos');
    const respuestaFirebase = await getDocs(departamentos_coleccion);
    const departamentos_lista = respuestaFirebase.docs.map(departamento =>  {
        const {
            nombre, descripcion,
        } = departamento.data();
        return {
            nombre, descripcion,
            id: departamento.id
        };
    });
    return departamentos_lista;
}

const departamentos_create = async (db,departamento) => {
    const docRef = await addDoc( collection(db, 'departamentos'), departamento);
    return docRef.id;
}

const departamentos_update = async (db, departamento, id) => {
    await setDoc( doc(db, 'departamentos', id), departamento);
    return true;
}

const departamentos_delete = async (db, id) => {
    await deleteDoc(doc(db, 'departamentos', id));
    return true;
}

const departamentos_getById = async (db, id) => {
   const departamento =  await getDoc(doc(db, 'departamentos', id));
   if (!departamento.data()) {
    return undefined;
}
    return {...departamento.data(), id:departamento.id};
}

export async function departamentos_eliminar(id){
    return await departamentos_delete(db,id);
}

export async function departamentos_getId(id){
   return await departamentos_getById(db,id);
}

export async function departamentos_actualizar (departamento,id) {
    return await departamentos_update(db,departamento,id);
};

export async function departamentos_crear(departamento) {
    return await departamentos_create(db,departamento);
};

export async function departamentos_todos () {
    return await getDepartamentos(db);
};
