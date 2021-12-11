import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { logOutSuccess } from '../../../../store/auth/action';
import {notification, Dropdown, Menu} from 'antd';
import Cookies from 'universal-cookie';

const modalWarning = type => {
    notification[type]({
        message: 'Good bye!',
        description: 'Your account has been logged out!',
    });
};

const cookies = new Cookies()


class AccountQuickLinks extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout = e => {
        e.preventDefault();
        this.props.dispatch(logOutSuccess());
        modalWarning('warning');
        Router.push('/account/login')
        cookies.remove('_virjt_', {path: '/', sameSite: 'strict'})
        console.log(this.props)
    };

    render() {
        const accountLinks = [
            {
                text: 'Dashoard',
                url: '/account/dashboard',
            },
            {
                text: 'Account Information',
                url: '/account/user-information',
            },
            {
                text: 'Orders',
                url: '/account/orders',
            },
            {
                text: 'Address',
                url: '/account/addresses',
            },
            {
                text: 'Recent Viewed Product',
                url: '/account/recent-viewed-product',
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
            },
        ];
        const menu = (
            <Menu>
                {accountLinks.map(link => (
                    <Menu.Item key={link.url}>
                        <Link href={link.url}>
                            <a>{link.text}</a>
                        </Link>
                    </Menu.Item>
                ))}

                <Menu.Item>
                    <a href="#" onClick={this.handleLogout.bind(this)}>
                        Logout
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} placement="bottomLeft">
                <a href="#" className="header__extra ps-user--mobile">
                    <i className="icon-user"></i>
                </a>
            </Dropdown>
        );
    }
}
const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return{
        logoutUser: () => {dispatch({type: 'LOGOUT_SUCCESS'})}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountQuickLinks);
