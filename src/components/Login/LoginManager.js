import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from './fireBase.config';
const app = initializeApp (firebaseConfig)
const auth = getAuth(app);

export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
    const user = result.user;
    console.log(user)
    })
    .catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage, errorCode)
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}