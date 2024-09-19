import Login from './Login'
import './landing.css'
import logo from "../assets/diary.png" 
function Landing() {

    return (
        <>
            <div className='ruminote'>
            <img src= {logo} className = "logo"></img> 
                <h1 className = "rumi">Rumi</h1>
                <h1 className = "note">Note</h1>
            </div>
            <div className='centerdiv'>
                <Login />
                <div className='rightext'>
                    <ul>
                        <li> Rumination means repetitive thinking or dwelling on negative feelings causing distress and other consequences. The repetitive, negative aspect of rumination can contribute to the development of depression or anxiety</li> <br></br>
                        <li>According to various psychologists. Journaling is one of the best ways to help with rumination</li> <br></br>
                        <li>With that in mind, Ruminote was made to help journal out negative emotions, The thought diary helps in venting out any thoughts and the emotion counter helps you keep track of your emotions throughout the day</li><br></br>
                        <li>All the data gets erased every 24 hours to encourage a fresh mindset everyday !!  </li>
                    </ul>
                </div>
            </div>
        </>
    )

}

export default Landing
