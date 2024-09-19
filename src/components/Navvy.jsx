import './navvy.css'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'
import logoutimg from '../assets/logout.png'
import logo from '../assets/diary.png'


function Navvy() {
    const signout = async () => {
        try{
            await signOut(auth)
        }
        catch(err)
        {
            console.err(err)
        }
    }

    return (
        <>
        <nav className = "navbar">
            <div className= "div1">
                <img src= {logo} className = "logo"></img> 
                <h1 className = "rumi">Rumi</h1>
                <h1 className = "note">Note</h1>
            </div>
            <div className = "div2">
                <button onClick={signout} title = 'Sign out'className='signout'><img src={logoutimg}  style = {{width : '40px'}} ></img></button>
            </div>
        </nav>
        </>
    )
}

export default Navvy