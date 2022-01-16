import TawkTo from 'tawkto-react'
import {useEffect} from 'react'

function TawkLive() {
    useEffect(() => {
    
        var tawk = new TawkTo('61e3942bb84f7301d32b3c16', '1fpgflmc5')
    
        tawk.onStatusChange((status) => 
        {
            // console.log(status)
        })
    
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default TawkLive
