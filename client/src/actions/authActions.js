import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_token from 'jwt-decode';


//Register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
      .then(res => history.push('/login'))
      .catch(err =>
        dispatch(
        {
            type: GET_ERRORS,
            payload: err.response.data
        }
        ));
}

//Login user

export const loginUser = userData => dispatch => {
    axios.post('api/users/login', userData)
    .then(res => {
        //Save to localstorage
        const {token} = res.data;

        //set token to ls
        localStorage.setItem('jwtToken', token);

        //set token to authheader
        setAuthToken(token);

        //Decode token to get user data
        var decoded = jwt_token(token);
        //set current user - redux
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
    })
    .catch(err => 
        dispatch(
        {
            type: GET_ERRORS,
            payload: err.response.data
        }
    ));
}

//Log user out
export const logoutUser = () => dispatch => {
    //Remove token from localstorage
    localStorage.removeItem('jwtToken');
    //Remove from auth header
    setAuthToken(false);
    //Remove from Redux store
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
}