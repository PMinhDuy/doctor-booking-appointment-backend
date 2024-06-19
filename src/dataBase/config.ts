// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDtvz8haEmQJVOWbRPoqRrqyFTxBAMtiN4',
  authDomain: 'doctor-booking-appointment.firebaseapp.com',
  projectId: 'doctor-booking-appointment',
  storageBucket: 'doctor-booking-appointment.appspot.com',
  messagingSenderId: '305174721518',
  appId: '1:305174721518:web:28d391c9f8c862537a94ff',
  measurementId: 'G-PJ9BLMLWLP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
