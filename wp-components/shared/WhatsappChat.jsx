import {useState} from 'react';
import {AiOutlineWhatsApp} from 'react-icons/ai'
import ReactWhatsapp from 'react-whatsapp';
import styles from '../../public/static/css/whatsapp.module.css'

const WhatsappChat = () => {
    const [showbubble, setShowbubble] = useState(false)
    const [message, setMessage] = useState('')

    const setWhatsappMessage = e => {
        setMessage(e.target.value)
    }

    const clearMessage = e => {
        // setMessage('')
        document.getElementById("whatsappinput").value = ""
    }
    return (
        <div className={` ${styles.whatsapp_chat}`}>
            {showbubble && 
            <div className={`py-3 bg-white shadow rounded ${styles.chat}`}>
            <div className={`bg-white ps-5 pt-1 pb-4 d-flex align-items-center ${styles.form_header}`}>
                <img src="/static/img/virem-logo-full.png" alt="Virem Customer Service" className="rounded-circle me-3" style={{width: "60px", height:"60px"}} />
                <div>
                    <h5 className={`mb-0 ${styles.chat_name}`}>Customer Support</h5>
                    <p className="mb-0">Typically replies instantly</p>
                </div>
            </div>

            <div className={` p-4 position-relative ${styles.form_body}`} style={{backgroundImage: `url("/static/img/whatsappchat.png")`}}>
                <div className={`p-4 bg-white rounded shadow-sm ${styles.chat_bubble}`}>
                <p className="text-secondary fw-bold">Virem</p>
                <p>Hey there 👋 <br />
                I'm here to help, so let me know what's up <br />
                and I'll be happy to find a solution 🤓</p>
                </div>
                
                <input type="text" className={`form-control form-control-sm mt-3 shadow-sm text-dark ${styles.chat_message_box}`} placeholder="Enter your message here..." onChange={e => setWhatsappMessage(e)} id="whatsappinput" />
            </div>
            <div className={`bg-white d-grid py-3 px-5 ${styles.form_chat}`}>

                <ReactWhatsapp number="+2348087614841" className={`mt-3 btn btn-lg d-flex justify-content-center align-items-center text-white ${styles.form_chat_button}`}  message={message} onClick={clearMessage}>
                    <AiOutlineWhatsApp className="me-2" />
                    <span className="fw-bold">Start Chat</span>
                </ReactWhatsapp>
            </div>
        </div>
            }
            

            <button className={`btn btn-lg btn-dark shadow mt-4 d-flex justify-content-center align-items-center fs-5 fw-bold ${styles.whatsapp_floating_button}`} onClick={()=> setShowbubble(!showbubble)}>
                <AiOutlineWhatsApp className="me-2"  />
                <span className="fw-bold">Need Help?</span>
            </button>
        </div>
    )
}

export default WhatsappChat