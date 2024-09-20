import './diarybody.css'
import {useEffect, useState} from 'react'
import happyimage from '../assets/happy.png'
import sadimage from '../assets/sad.png'
import { db, auth } from '../config/firebase'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'

function Diary() {

    const userId = auth.currentUser.uid
    const [happycount, setHappycount] = useState(0)
    const [sadcount, setSadcount] = useState(0)
    const [journal, setJournal] = useState("")
    const [thought, setThought] = useState("")

    useEffect(() => {
            const fetchDiaryData = async () => {
            const docref = doc(db, "diary", userId)
            const docSnap = await getDoc(docref)
            if(docSnap.exists())
            {
                const data = docSnap.data() 
                setHappycount(data.happycount || 0)
                setSadcount(data.sadcount || 0)
                setJournal(data.journal || "")
                setThought(data.thought || "")
            }
        }
            fetchDiaryData()
    }
    , [userId])

    const HandleSubmit = async () => {
        const diaryData = {
            happycount,
            sadcount,
            journal,
            thought,
            timestamp : new Date()
        }
        try{
            await setDoc(doc(db, "diary", userId), diaryData)       
            alert("Ruminote Submitted successfully")
        }
        catch(err){
            console.error(err)
        }
    }        

    return (
        <>

            <div className = "greeting">
                <h1>Hello!!</h1>
                <h2>What's on your mind today :D</h2>
            </div>
            
            <div className = "diarybody">
                
                    <textarea className = "drypage" placeholder = "Journal...." value = {journal} onChange={(e) => setJournal(e.target.value)} ></textarea>
                    <textarea className = "drypage" placeholder = "Thought Diary...."value = {thought} onChange={(e) => setThought(e.target.value)}></textarea>
            </div>

            <div className = "bottombar">
                <div className='reacts'>
                    <button className = "bottomcounter" onClick={() => setHappycount(happycount+1)} title='Happy'><img src = {happyimage} style = {{width : '50px'}}></img></button>
                    
                    <h2> {happycount}</h2>
                </div>
                <div className= 'reacts'>
                    <button className='bottomcounter' onClick={() => setSadcount(sadcount+1)} title='Sad'> <img src = {sadimage} style = {{width : '50px'}}></img></button>
                    <h2> {sadcount}</h2>
                </div>
                <button className='submit' onClick={HandleSubmit}> Submit</button>
            </div>
            
        </>
    )
}

export default Diary; 

