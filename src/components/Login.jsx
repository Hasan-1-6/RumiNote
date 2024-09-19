import './login.css'
import { useState } from 'react'
import {auth} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
 
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [IsSignInActive, setIsSignInActive] = useState(true);

    const handleSignInChange = () => {
        setIsSignInActive(!IsSignInActive)
    }

    async function signIn() {
        try{
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (err){
            alert(err);
        }
    }

    async function signUp() {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (err){
            alert(err);
        }
    }

    return(
        <>
            <div className='loginbody'>
                {IsSignInActive && <h1 className='welcome'>Welcome Back!</h1>}
                {!IsSignInActive && <h1 className='welcome'>Hello There!</h1>}
                <input className='inpfield'  onChange={(e) => setEmail(e.target.value)} placeholder='Email...' type='email'/>
                <input className='inpfield' onChange={(e) => setPassword(e.target.value)}  placeholder='Password...' type='password'/>
                {IsSignInActive && <button className='signin' onClick={signIn}>Sign In</button>}
                {!IsSignInActive &&  <button className='signin' onClick={signUp}>Register</button>}
                {IsSignInActive && <p className='bottomtext' onClick={handleSignInChange}>New User? Create an account</p>}
                {!IsSignInActive && <p className='bottomtext' onClick={handleSignInChange}>Have an account? Login </p>}

            </div>
        </>
    )

}

export default Login;
