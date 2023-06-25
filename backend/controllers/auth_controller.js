import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-EDFFF6DYC3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

const authController = {
  signup: (req, res) => {
    const { email, password } = req.body;
    // Implement your sign-up logic using Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Sign-up successful
        res.send('Sign-up successful');
      })
      .catch((error) => {
        // Handle sign-up error
        res.status(400).send(error.message);
      });
  },

  signin: (req, res) => {
    const { email, password } = req.body;
    // Implement your sign-in logic using Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Sign-in successful
        res.send('Sign-in successful');
      })
      .catch((error) => {
        // Handle sign-in error
        res.status(401).send(error.message);
      });
  }
};

export default authController;
