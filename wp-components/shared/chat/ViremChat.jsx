import { useState, useEffect } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import styles from "../../../public/static/css/viremchat.module.css";
import WhatsappChat from '../../../wp-components/shared/chat/WhatsappChat';
// import TawkLive from '../../../wp-components/shared/chat/TawkLive';
import TawkTo from 'tawkto-react'

function ViremChat() {
  const [openMenu, setOpenMenu] = useState(false);
  const [whatsappOpen, setWhatsAppOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    
    new TawkTo('61e3942bb84f7301d32b3c16', '1fpgflmc5')
    // window.Tawk_API.hideWidget()
    if(window.Tawk_API){
        window.Tawk_API.hideWidget()
    }

    

}, [])
  return (
    <div className="position-relative">
      <button
        className={`
        ${styles.floating_button}
        ${openMenu ? `${styles.floating_button_opened}` : ``}

        
        `}
        onClick={() => {
            if(openMenu){
                setOpenMenu(false)
                window.Tawk_API.hideWidget()
            } else{
                setOpenMenu(true);
            }

            if(!openMenu){
                setChatOpen(false)
            }
        }
        } 
      >
        {openMenu ? <FaTimes /> : <IoChatboxEllipses />}
      </button>
      {!openMenu && (
        <div className={`${styles.help_text}`}>
          <p>How may we help you?</p>
        </div>
      )}
      {openMenu && (
        <div className={styles.chats}>
{          !chatOpen && <button
            className={styles.live_chat_button}
            onClick={() => {
                window.Tawk_API.showWidget()
                setChatOpen(true)
            }}
          >
            <IoChatboxEllipses />
          </button>}
          <button
            className={styles.whatsapp_chat_button}
            onClick={() => {
              setWhatsAppOpen(true);
            }}
          >
            <FaWhatsapp />
          </button>
        </div>
      )}

      {whatsappOpen && (
        <WhatsappChat
          whatsappOpen={whatsappOpen}
          setWhatsAppOpen={setWhatsAppOpen}
        />
      )}

    </div>
  );
}

export default ViremChat;
