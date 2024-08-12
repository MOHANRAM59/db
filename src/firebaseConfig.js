import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Remove the line that imports 'analytics' if it's not being used
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAHWVYcbxmmk_Nw9nwJkJE4wWf-vn62t0s",
  authDomain: "movie-database-ecdcf.firebaseapp.com",
  projectId: "movie-database-ecdcf",
  storageBucket: "movie-database-ecdcf.appspot.com",
  messagingSenderId: "71277172240",
  appId: "1:71277172240:web:8cf41ee35326439bb1dc95",
  measurementId: "G-6M22B7KC9B"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db }; // Export only what is used
