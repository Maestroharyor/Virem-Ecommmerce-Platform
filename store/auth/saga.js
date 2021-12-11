import { all, put, takeEvery } from 'redux-saga/effects';
import {notification } from 'antd';

import { actionTypes, loginNotify, registeredNotify, logoutNotify } from './action';

const modalSuccess = type => {
    notification[type]({
        message: 'Welcome back',
        description: 'You are login successful!',
    });
};

const modalRegSuccess = type => {
    notification[type]({
        message: 'Welcome to Virem',
        description: 'Your account has been created successfully!',
    });
};

const modalWarning = type => {
    notification[type]({
        message: 'Good bye!',
        description: 'Your account has been logged out!',
    });
};

function* loginSaga() {
    try {
        yield put(loginNotify());
        modalSuccess('success');
    } catch (err) {
        console.log(err);
    }
}

function* registerSaga() {
    try {
        yield put(registeredNotify());
        modalRegSuccess('success');
    } catch (err) {
        console.log(err);
    }
}


function* logOutSaga() {
    try {
        yield put(logoutNotify());
        modalWarning('warning');
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.LOGIN_NOTIFY, loginSaga)]);
    yield all([takeEvery(actionTypes.REGSITERED_NOTIFY, registerSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT_NOTIFY, logOutSaga)]);
}
