
import {useEffect} from 'react'
import Router from 'next/router'
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';


function WPLayoutAccount(props) {
    // const router = useRouter()
    // console.log("Props from WPLAYOUT ACC: ", props)
    useEffect(()=>{
        // if(typeof window !== 'undefined'){
        //     !props.isLoggedIn ? router.push('/account/login'): ''
        // }

            if(!props.isLoggedIn){
                Router.push('/account/login')
            }
    }, [])
    
        return (
            <>  
                {props.children}
            </>
        );
    }

const mapStateToProps = state => {
    return state.auth;
};


export default connect(mapStateToProps)(WPLayoutAccount);
