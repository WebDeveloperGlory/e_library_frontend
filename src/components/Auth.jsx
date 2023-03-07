import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { auth } from '../constants'
import { styles } from '../styles'
import './css/Auth.css'
import './css/Animations.css'

const Auth = ({ r, setIsLoggedIn, url, offline }) => {
  return (
    <div>
        <section className={`auth ${styles.flexC} mt-12 md:mt-0`}>
            <div className="container active">
                {r === "sign" ? <SignUp url={url} offline={offline} /> : <Login setIsLoggedIn={setIsLoggedIn} url={url} offline={offline} />}
            </div>
        </section>
    </div>
  )
}

function Login({ setIsLoggedIn, url, offline }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const y = { backgroundColor: "#ffce00" };
    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`${url}/api/auth/login`, {
            username: username,
            password: password
        })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setIsLoggedIn(true);
                console.log(res.data.message);
                // Redirect
                navigate('/', { replace: true });
            })
            .catch((err) => {
                console.log(err)
                // Redirect
                navigate('/login', { replace: true });
            })

        setUsername('');
        setPassword('');
    }
    return (
        <div className="user signInBx">
            <div className="imgBx" style={y}></div>
            <div className={`formBx ${styles.flexC}`}>
                <form onSubmit={handleSubmit}>
                    <h2>{auth.authText.loginh2}</h2>
                    <input type="text" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>                         
                    <input type="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" value="Login" />
                    <p className="signUp">{auth.authText.signUp} <Link to='/signup'>{auth.authLinks.signUp}</Link></p>
                </form>
            </div>
        </div>
    )
}
function SignUp({ url, offline }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const r = { backgroundColor: "#f83038" }
    function handleSubmit(e) {
        e.preventDefault();

        if(password === confirmPassword && password.length > 7) {
            axios.post(`${url}/api/auth/signup`, {
                username: username,
                password: password
            })
                .then((res) => {
                    console.log(res.message);
                    // Redirect
                    navigate('/', { replace: true });
                })
                .catch((err) => {
                    console.log(err)
                    // Redirect
                    navigate('/signup', { replace: true });
                })
        } else if(password !== confirmPassword) {
            console.log('Passwords must match')
        } else if(password.length < 8 && confirmPassword.length < 8) {
            console.log('Password must contain 8 characters')
        }else {
            console.log("Invalid password length")
        }
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <div className="user signUpBx">
            <div className={`formBx ${styles.flexC}`}>
                <form onSubmit={handleSubmit}>
                    <h2>{auth.authText.signUph2}</h2>
                    <input type="text" id="username" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username}/>                         
                    <input type="password" id="password" placeholder='Create Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <input type="password" id="confirmPassword" placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                    <input type="submit" value="Sign Up" />
                    <p className="signUp">{auth.authText.login} <Link to='/login'>{auth.authLinks.login}</Link></p>
                </form>
            </div>
            <div className="imgBx" style={r}></div>
        </div>
    )
}
export default Auth