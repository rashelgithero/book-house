import React from 'react';
import { googleSignIn } from './LoginManager';
import { Button } from 'react-bootstrap';
import './Login.css'


const Login = () => {
    
    const handleGoogleSignIn = () => {
       googleSignIn();
    }
    
    
    return (
        <div className='logInPage'>
            
            <h5>Sign In with <Button onClick={handleGoogleSignIn}>Google</Button></h5>
            <h5>Sign In with <Button>FaceBook</Button></h5>
            
            
        </div>
    );
};

export default Login;