const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const UserInfo = require("../models/userinfo");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-EDFFF6DYC3",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

const authController = {
  signup: (req, res) => {
    const { email, password, username, instituteName } = req.body;
    // Implement your sign-up logic using Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Sign-up successful

        const newUserInfo = new UserInfo({
          username: username,
          email: email,
          instituteName: instituteName,
          semesters: [], // Empty semester numbers
          subjects: [], // Empty subjects array
        });

        newUserInfo
          .save()
          .then((savedUserInfo) => {
            console.log("New UserInfo saved:", savedUserInfo);
            // Handle success
          })
          .catch((error) => {
            console.error("Error saving UserInfo:", error);
            // Handle error
          });

          res.status(200).json(newUserInfo);
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
      .then(async () => {
        // Sign-in successful
        const user = await UserInfo.findOne({email: email})
        res.status(200).json(user).send();
      })
      .catch((error) => {
        // Handle sign-in error
        res.status(401).send(error.message);
      });
  },
};

module.exports = authController;
