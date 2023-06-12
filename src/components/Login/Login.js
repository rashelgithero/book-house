import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import './Login.css'
import { googleSignIn, initializeAppFrameWork } from './LoginManager';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
const Login = () => {
    initializeAppFrameWork()
    const [logInUser, setLogInUser] = useContext(userContext);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
    })
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(res =>{
            setLogInUser(res);
            navigate('/shipment') 
            
        }
            )
        .catch(err => {
            setUser(err);
            setLogInUser(err);
        })
        

    }
    
    
    return (
        <div className='logInPage'>
            <ul>
                <li><h5>Sign In with <Button className='googleBtn' onClick={handleGoogleSignIn}>Google</Button></h5></li>
                <li>
                <h5>Sign In with <Button className='facebookBtn'>Facebook</Button></h5>
                </li>
            </ul>
            <div style={{marginTop: '40px'}}>
                <h4>Have you a account? <span id='signInLink'><Link to='/signIn'>Sign In</Link></span> </h4>
                <article><Link style={{marginLeft: '5px', color: 'red'}} t0="/login">Forgot Password?</Link> <Link style={{marginLeft: '30px'}} to="/login/signup">Sign Up</Link></article>
                
            </div>
            
            
        </div>
    );
};

export default Login;