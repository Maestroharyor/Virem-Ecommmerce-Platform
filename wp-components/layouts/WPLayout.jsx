import React, {useEffect} from 'react';
import Head from 'next/head';
import Router from 'next/router'
import WPHeaderMobile from '../../wp-components/shared/mobile/WPHeaderMobile';
import WPNavigationBottom from '../../wp-components/shared/mobile/WPNavigationBottom';
import { connect } from 'react-redux';
import {loginSuccess} from '../../store/auth/action';
// import FooterDefault from '../../components/shared/footers/FooterDefault';
import FooterFullwidth from '../../wp-components/shared/footers/FooterFullwidth'
import Newsletters from '../../components/partials/commons/Newletters';
// import WPHeaderMarketPlace from '../../wp-components/shared/headers/WPHeaderMarketPlace';
import WPHeaderDefault from '../../wp-components/shared/headers/WPHeaderDefault';
import {cookieDecoder} from '../../wp-components/account/CookieDecode'
import {notification } from 'antd';
import WhatsappChat from '../../wp-components/shared/WhatsappChat'

const welcomeSuccess = type => {
    notification[type]({
        message: 'Welcome Back | We Missed You',
        description: 'Logging you back into your account...',
    });
};


const WPLayout = (props) => {
    // console.log("Props from WP Main Layout: ", props)
    let titleView;
    if (props.title !== undefined) {
        titleView = props.title + ' | ' + process.env.title + ' - ' + process.env.titleDescription;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    useEffect(()=> {
        const {decodedJWToken, isExpired} = cookieDecoder('_virjt_')
        if(!props.isLoggedIn && decodedJWToken !== null && !isExpired){
            
            // console.log({decodedJWToken})
            // console.log({isExpired})
            const user = {
            user_id: decodedJWToken.id,
            username: decodedJWToken.username,
            email: decodedJWToken.email };
            
        props.dispatch(loginSuccess(user));
        welcomeSuccess('success')
        }
     
    }, [])

    return (
        <div className="virem">
            <Head>
                <title>{titleView}</title>
            </Head>
            <WPHeaderDefault />
            {/* <WPHeaderMarketPlace/>*/}
            <WPHeaderMobile />
            <WPNavigationBottom />
            {/*<SubscribePopup active={subscribe} />*/}
            {props.children}
            <Newsletters layout="container" />
            <FooterFullwidth />
            <WhatsappChat />
        </div>
    );
};

const mapStateToProps = state => {
    return state.auth;
};


export default connect(mapStateToProps)(WPLayout);
