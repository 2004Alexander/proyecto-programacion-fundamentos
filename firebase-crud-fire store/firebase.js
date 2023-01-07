  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getFirestore,collection,addDoc,getDocs,onSnapshot,deleteDoc,doc,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCx2F8RwGlczEjaIhYe0x3QL9mln6DLUsA",
    authDomain: "fir-javascript-crud-a6414.firebaseapp.com",
    projectId: "fir-javascript-crud-a6414",
    storageBucket: "fir-javascript-crud-a6414.appspot.com",
    messagingSenderId: "1024543086554",
    appId: "1:1024543086554:web:339e478c48185a4d8352e3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore()

  export const saveTask = (title,description) => 
    addDoc(collection(db,'tasks'),{title, description})

    export const getTasks = () => getDocs(collection(db,'tasks'))

    export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'),callback)

   export const deleteTask = id => deleteDoc(doc(db, 'tasks', id))
  
   export const getTask = id => getDoc(doc(db, 'tasks', id))

   export const updateTask = (id,newFields) => updateDoc(doc(db,'tasks',id),newFields) 