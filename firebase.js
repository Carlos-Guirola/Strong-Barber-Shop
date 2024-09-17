// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbTxP3r-FptzpbNZxwTr8lVt_0QLFQsGQ",
  authDomain: "strong-3ccdb.firebaseapp.com",
  projectId: "strong-3ccdb",
  storageBucket: "strong-3ccdb.appspot.com",
  messagingSenderId: "766608836915",
  appId: "1:766608836915:web:aa9170cad44f8b238c1646",
  measurementId: "G-ZHMZ64Z5RC"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore (base de datos)
const db = getFirestore(app);

// Exporta app y db
export { app, db };


