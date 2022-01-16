import React, {useEffect} from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import {loginSuccess} from '../../store/auth/action';
import FooterFullwidth from '../../wp-components/shared/footers/FooterFullwidth';
import SwicherDemo from '../../components/shared/switcher-demo/SwitcherDemo';
import WPHeaderDefault from '../../wp-components/shared/headers/WPHeaderDefault';
import WPHeaderMobile from '../../wp-components/shared/mobile/WPHeaderMobile';
import WPNavigationBottom from '../../wp-components/shared/mobile/WPNavigationBottom';
import ViremChat from '../../wp-components/shared/chat/ViremChat';
import {cookieDecoder} from '../../wp-components/account/CookieDecode'
import {notification } from 'antd';


const welcomeSuccess = type => {
    notification[type]({
        message: 'Welcome Back | We Missed You',
        description: 'Logging you back into your account...',
    });
};


const WPLayoutHomeDefault = (props) => {
    let titleView;
    if (props.title !== undefined) {
        titleView = props.title + ' | ' + process.env.titleDescription;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    useEffect(()=> {
        const {decodedJWToken, isExpired} = cookieDecoder('_virjt_')
        if(decodedJWToken !== null && !isExpired){
            
            // console.log({decodedJWToken})
            // console.log({isExpired})
            const user = {
            user_id: decodedJWToken.id,
            username: decodedJWToken.username,
            email: decodedJWToken.email 
        };
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
            <WPHeaderMobile />
            <WPNavigationBottom />
            <main id="homepage-1">{props.children}</main>
            <FooterFullwidth />
            <ViremChat />
            {/*<SwicherDemo />*/}
            {/*<SubscribePopup active={subscribe} />*/}
        </div>
    );
};

const mapStateToProps = state => {
    return state.auth;
};

export default connect(mapStateToProps)(WPLayoutHomeDefault);
