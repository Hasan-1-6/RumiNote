import './App.css'
import Homepage from './components/Homepage.jsx'
import { useState, useEffect } from 'react'
import { auth } from './config/firebase.js'
import Landing from './components/Landing.jsx'
import { getFirestore, collection, query, where, getDocs, writeBatch, Timestamp, getDoc } from 'firebase/firestore'
import { db } from './config/firebase.js'

const deleteOldData = async () => {
  try{
    const now = Timestamp.now()
    const twentyFourHoursAgo = new Date(now.toDate().getTime() - 24*60*60*1000);
    const q = query(collection(db, 'diary'), where('timestamp', '<', Timestamp.fromDate(twentyFourHoursAgo)));
    const querySnapshot = await getDocs(q)

    if(!querySnapshot.empty) {
      const batch = writeBatch(db)
      querySnapshot.forEach((doc) => {
          batch.delete(doc.ref)
      });

      await batch.commit();
      console.log(`Deleted ${querySnapshot.size} succesfully`)
    }
    else {
      console.log('No old data found (24hours)')
    }
    
  }
  catch (error) {
    console.error("Error deleting old data: ", error);
  }
}



function App() {


  useEffect(() => {
    deleteOldData();  // Run the deletion when the app loads
  }, [])
  
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
