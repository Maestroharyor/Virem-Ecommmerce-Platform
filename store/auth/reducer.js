import { actionTypes } from './action';

export const initState = {
    isLoggedIn: false,
    user_id: '',
    username: '',
    email: ''  
    
};


function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.REGISTERED_SUCCESS:
            // console.log(action)
            return {
                ...state,
                ...{ isLoggedIn: true },
                ...{user_id: action.user.user_id},
                ...{username: action.user.username},
                ...{email: action.user.email}
            };
        case actionTypes.LOGIN_SUCCESS:
            // console.log(action)
            return {
                ...state,
                ...{ isLoggedIn: true },
                ...{user_id: action.user.user_id},
                ...{username: action.user.username},
                ...{email: action.user.email}
            };
        case actionTypes.LOGOUT_SUCCESS:
            // console.log(action)
            return {
                ...state,
                ...{ isLoggedIn: false },
                ...{user_id: ''},
                ...{username: ''},
                ...{email: ''}
            };
        default:
            return state;
    }
}

export default reducer;