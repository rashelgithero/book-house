import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseConfig } from './fireBase.config';
export const initializeAppFrameWork = () => {
  initializeApp (firebaseConfig)
 
}

export const googleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
     return signInWithPopup(auth, provider)
    .then(res=> {
    const {displayName, email, photoURL} = res.user;
    const userInfo = {
      isSignedIn: true,
      email: email,
      name: displayName,
      photo: photoURL
    }
    return userInfo;
    })
    .catch((error) => {

    const errors = error.code ||error.message;
    return (errors)
  });
}

export const emailAndPasswordRequired = (e, newUser, setNewUser) => {
  let fieldValid;
        if(e.target.name === 'email'){
            fieldValid =  /\S+@\S+\.\S+/.test(e.target.value);
            if(fieldValid){
                const newUserInfo = {...newUser}
                newUserInfo[e.target.name] = e.target.value;
                newUserInfo.emailInfo = true;
                setNewUser(newUserInfo);
            }
            else{
                const newUserInfo = {...newUser}
                newUserInfo.errEmail = 'Invalid email';
                newUserInfo.emailInfo = false;
                setNewUser(newUserInfo)
            }
        }
        else if(e.target.name === 'password'){
            const passwordLength = e.target.value.length >= 6;
            const passwordNumber = /\d{2}/.test(e.target.value);
            fieldValid = passwordLength &&passwordNumber;
            if(fieldValid) {
                const newUserInfo = {...newUser}
                newUserInfo[e.target.name] = e.target.value;
                newUserInfo.passwordInfo = true;
                setNewUser(newUserInfo);
            }
            else{
                const newUserInfo = {...newUser}
                newUserInfo.errPassword = 'Invalid password';
                newUserInfo.passwordInfo = false;
                setNewUser(newUserInfo)
            }
        }
        else if(e.target.name === 'name'){
            const newUserInfo = {...newUser}
            newUserInfo[e.target.name] = e.target.value;
            setNewUser(newUserInfo);
        }
}

