import './App.css'
import Homepage from './components/Homepage.jsx'
import { useState, useEffect } from 'react'
import { auth } from './config/firebase.js'
import Landing from './components/Landing.jsx'

function App() {
    const [user, setUser] = useState(null);
    
    const authchange = () => {
      auth.onAuthStateChanged((user) => {
        setUser(user);
      })
    }
    
      useEffect(authchange, []);
  return (
    <>
      {user ? <Homepage/> : <Landing/>}
    </>
  )
}

export default App
