import React, { useCallback, useState } from 'react'
import "./Login.css"
import { redirect, useNavigate } from 'react-router';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSignin = async() => {
        try {
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if(response.status === 200) {
                setSuccess(data.message);
                setError('');
                navigate('/');  
            } else {
                setError(data.message);
                setSuccess('');
            }
        } catch(err) {
            console.error('Error during sigin:', err);
            setError('Something went wrong. Please Try again later');
            setSuccess('');
        }
    }

    return (

        <div className='login-card'>
            <img id="login-logo" src='/Images/logo.png' alt="Login" />
            <h6>Cloaked</h6>
            <div className='login-form'>
                {error && <div className='error-message'>{error}</div>}
                {success && <div className='success-message'>{success}</div>}

                <div className='login-sub-from'>
                    <input className='login-field' onChange={(e) => {setUsername(e.target.value)}} type="text" name='username' placeholder='Enter Your Username'/>
                </div>

                <div className='login-sub-form'>  
                    <input className='login-field' onChange={(e) => {setPassword(e.target.value)}} name='password' type="text" placeholder='Password'/>
                </div>
                <br />
                <button className='login-btn' onClick={handleSignin} type="submit">Sign In</button>
            </div>
            <div className='login-post-form'>
                <div className='post-t1'>Forgot Password?</div>
                <div className='post-t2'>Sign Up</div>
            </div>
        </div>
    )
}

export default Login;
