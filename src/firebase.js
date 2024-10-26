import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCBwbj250hdrw4MCMPhGJW6SpXdJfF62Go",
    authDomain: "otp-3217a.firebaseapp.com",
    projectId: "otp-3217a",
    storageBucket: "otp-3217a.appspot.com",
    messagingSenderId: "957646514448",
    appId: "1:957646514448:web:62b3f71bbc18ccc20b1d95",
    measurementId: "G-P46577W2VM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
