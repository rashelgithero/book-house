import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import { emailAndPasswordRequired, initializeAppFrameWork } from '../Login/LoginManager';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [user, setUser] = useState({
        isSignedIn: '',
        name: '',
        email: '',
        password: '',
        success: false,
        error: '',
        errPassword: '',
        errEmail: '',
        passwordInfo: true,
        emailInfo: true  
    })
    const [logInUser, setLogInUser] = useContext(userContext);
    const navigate = useNavigate();
    initializeAppFrameWork();
    const handleSubmitSignIn  = (e) => {
        if(user.email && user.password){
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then(res =>{
                const signedInUser = res.user;
                console.log(signedInUser)
                const newUserInfo = {...signedInUser}
                console.log(newUserInfo)
                newUserInfo.success = true;
                newUserInfo.error = '';
                newUserInfo.isSignedIn = true;
                setLogInUser(newUserInfo);
                navigate('/shipment')
            })
            .catch(err => {
                const newUserInfo = {};
                newUserInfo.success =false;
                newUserInfo.error = err.code || err.message;
                newUserInfo.isSignedIn = false;
                setLogInUser(newUserInfo);
            })
        }
        e.preventDefault()
    }
    const handleBlurSignIn = (e) => {
        emailAndPasswordRequired(e, user, setUser)
    }
    return (
        <div>
            <form onSubmit={handleSubmitSignIn}>
                <input onBlur={handleBlurSignIn} type="email" name="email" placeholder='Your Email' required autoComplete='on'/>
                {user.emailInfo === false && <p style={{color: 'red'}}>{user.errEmail}</p>}
                <input onBlur={handleBlurSignIn} type="password" name="password" placeholder='Your Password' autoComplete='on' required/>
                {user.passwordInfo === false && <p style={{color: 'red'}}>{user.errPassword}</p>} 

                <input type="submit" value="Sign In" className='submitBtn' />
                {logInUser.isSignedIn ===false && <p style={{color: 'red'}}>{logInUser.error}</p>}

            </form>
        </div>
    );
    
};

export default SignIn;