import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDKt6aV7LgC41D9tMiqntQI23bqnk24JVk",
  authDomain: "kiosko-42d08.firebaseapp.com",
  databaseURL: "https://kiosko-42d08-default-rtdb.firebaseio.com",
  projectId: "kiosko-42d08",
  storageBucket: "kiosko-42d08.firebasestorage.app",
  messagingSenderId: "510649700332",
  appId: "1:510649700332:web:d53602cc1041a7ee5ffac9",
  measurementId: "G-17E7YT656P"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };