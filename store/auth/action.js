export const actionTypes = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    REGISTERED_SUCCESS: 'REGISTERED_SUCCESS',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGIN_NOTIFY: 'LOGIN_NOTIFY',
    REGSITERED_NOTIFY: 'REGISTERED_NOTIFY',
    LOGOUT_NOTIFY: 'LOGOUT_NOTIFY'
    
};

export function loginSuccess(user) {
    return { type: actionTypes.LOGIN_SUCCESS, user: user };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}

export function registeredSuccess(user){
    return {type: actionTypes.REGISTERED_SUCCESS, user: user}
}

export function loginNotify(){
    return {type: actionTypes.LOGIN_NOTIFY}
}

export function registeredNotify(){
    return {type: actionTypes.REGISTERED_NOTIFY}
}

export function logoutNotify(){
    return {type: actionTypes.LOGOUT_NOTIFY}
}