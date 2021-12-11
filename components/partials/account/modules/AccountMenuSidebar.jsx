import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {connect} from 'react-redux';
import { oathInfo, WPDomain, WPRepository } from '../../../../repositories/WP/WPRepository';
import { serializeQuery } from '../../../../repositories/Repository';
import { logOutSuccess } from '../../../../store/auth/action';
import {notification} from 'antd';
import Cookies from 'universal-cookie';

const modalWarning = type => {
    notification[type]({
        message: 'Good bye!',
        description: 'Your account has been logged out!',
    });
};

const AccountMenuSidebar = (props) => {

    const cookies = new Cookies()

    const handleLogout = (e)=> {
        e.preventDefault();
        props.dispatch(logOutSuccess());
        modalWarning('warning');
        Router.push('/account/login')
        cookies.remove('_virjt_', {path: '/', sameSite: 'strict'})
        // console.log(this.props)
    };


    const [userWoo, setuserWoo] = useState({})

        useEffect(()=>{
            const getUserEndpoint = `wp-json/wc/v3/customers/${props.user_id}?${serializeQuery({
            ...oathInfo,
        })}`;
        WPRepository.get(`${WPDomain}/${getUserEndpoint}`)
        .then(res => {
            // console.log(res)
            const userWoo = res.data
            // console.log(userWoo)
            setuserWoo(userWoo);
        })
        .catch(err => {
            console.log(err)
        })


    }, [])


return(
    <aside className="ps-widget--account-dashboard">
        <div className="ps-widget__header">
            <img src={userWoo.avatar_url ? userWoo.avatar_url : '/static/img/users/1.png'} />
            <figure>
                <figcaption>Hello {props.username}</figcaption>
                <p>{props.email}</p>
            </figure>
        </div>
        <div className="ps-widget__content">
            <ul>
                {props.data.map(link => (
                    <li key={link.text} className={link.active ? 'active' : ''}>
                        <Link href={link.url}>
                            <a>
                                <i className={link.icon}></i>
                                {link.text}
                            </a>
                        </Link>
                    </li>
                ))}
                <li>
                    {/* <Link href="/account/my-account"> */}
                        <a
                        onClick={(e)=> handleLogout(e)}
                        >Logout</a>
                    {/* </Link> */}
                </li>
            </ul>
        </div>
    </aside>
);
}

const mapStateToProps = state => {
    return state.auth
}
export default connect(mapStateToProps)(AccountMenuSidebar);
