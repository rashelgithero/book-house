import React, { createContext, useContext, useState } from 'react';
import './Signup.css'
import { getAuth,createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { emailAndPasswordRequired, initializeAppFrameWork } from '../Login/LoginManager';
import { userContext } from '../../App';
import { Link } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';


const Signup = () => {

    initializeAppFrameWork()
    const [user, setUser] = useState({
        isSignup: '',
        success: '',
        error: '',
    });
    const handleSignupToSignIn = () => {
        const signUp = document.getElementById('signUp');
            signUp.style.display = 'none';
        
        const signIn = document.querySelector('.signIn');
        signIn.style.display = 'block';
    }
    
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        errPassword: '',
        errEmail: '',
        passwordInfo: true,
        emailInfo: true
    })
    const handleSubmit = (e) => {
        const auth = getAuth()
        if(newUser.email && newUser.password){
            createUserWithEmailAndPassword(auth, newUser.email, newUser.password, newUser.name)
            .then(res => {
                const users = res.user;
                const userInfo = {...users};
                userInfo.error = ''
                displayName(newUser.name)
                userInfo.name = newUser.name;
                userInfo.success = true;
                userInfo.isSignup = true;
                setUser(userInfo);
               
            })
            .catch(err =>{
                const userInfo = {}
                userInfo.error = err.message || err.code;
                userInfo.success = false;
                userInfo.isSignup = false;
                setUser(userInfo);
            })
        }
        e.preventDefault()
        
        
    }
    
    const displayName = (name) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
        displayName:  name , photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
        // Profile updated!
        // ...
        }).catch((error) => {
        // An error occurred
        // ...
        });
    }

    
    const handleBlur = (e) => {
        emailAndPasswordRequired(e, newUser, setNewUser)
    }
    
    return (
        <div>
        <div className='signUp' id='signUp'>
            <h2>Please sign up with your email and password:</h2>
            <form onSubmit={handleSubmit}>
                <input onBlur={handleBlur} name='name' type="text"placeholder='Fist Name' required /> 
                <input onBlur={handleBlur} type="text" name="lastName" placeholder='Last Name' required/> 
                <input onBlur={handleBlur} type="email" name="email" placeholder='Your Email' required /> 
                {newUser.emailInfo === false && <p style={{color: 'red'}}>{newUser.errEmail}</p>}
                
                <input onBlur={handleBlur} type="password" name="password" placeholder='Your Password' autoComplete='on' required/>
                {newUser.passwordInfo === false && <p style={{color: 'red'}}>{newUser.errPassword}</p>} 
                <input type="submit" value='Signup Now' className='submitBtn'/> 
                
                {user.isSignup ?
                user.success && 
                <div style={{color: 'green', fontSize: '20px', marginTop: '20px'}}> 
                <p style={{marginBottom: '0px'}}> User Created Successfully</p>
                <Link to='/signIn'
                className='linkToSignIn'> <p>Please Sign In</p>
                </Link>
                </div> :
                <div style={{color: 'red'}}>
                    <p>{user.error}</p>
                </div>
                }
            </form>
        </div>
        
        </div>
    );
};

export default Signup;