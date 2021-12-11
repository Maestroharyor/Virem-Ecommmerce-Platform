import Cookies from 'universal-cookie';
import {decodeToken, isExpired} from 'react-jwt'


const cookie = new Cookies();
export const cookieDecoder = cookieName => {
    const jwt = cookie.get(cookieName)
    
    return{
        decodedJWToken : decodeToken(jwt),
        isExpired : isExpired(jwt)
    }
}