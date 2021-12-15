import axios from "axios";
import { returnError } from "../error/errorAction";
import {
    USER_LOADED, 
    USER_LOADING,
    AUTH_ERROR, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./authType"


export const tokenConfig = getState =>{
    // GET TOKEN FORM LOCALSTRING
    const token = getState().auth.token;

    //HEADER
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }

    // IF TOKEN, ADD TO HEADERS
    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config
}

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch,getState)=>{
    // USER LOADING
    dispatch({ type: USER_LOADING});

   
    // Replace url to verfiy user on the bases of token
    // Not yet define on backend
    axios.get("/api/",tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload:res.data
    }))
    .catch(err=>{
        dispatch(returnError(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
}

export const logIn = (data) => (dispatch)=>{
    dispatch({type : USER_LOADING});

    // axios.post("http://localhost:8000/api/v1/users/login",data)
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/v1/users/login',
        data: data
    })
        .then(res=>dispatch({
            type: LOGIN_SUCCESS,
            payload:res.data
        }))
        .catch(err=>{
            dispatch(returnError(err.response.data, err.response.status));
            dispatch({
                type:LOGIN_FAIL
            });
        });
}
export const signUp = (data) => (dispatch)=>{
    dispatch({type : USER_LOADING});

    // data req to signUp {
    //     name,email,password,passwordConfirm,role
    // }
    console.log(data)
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/v1/users/signup',
        data: data
    })
        .then(res=>dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        }))
        .catch(err=>{
            dispatch(returnError(err.response.data, err.response.status));
            dispatch({
                type:REGISTER_FAIL
            });
        });
}
export const logOut = ()=> (dispatch)=>{
    dispatch({
        type:LOGOUT_SUCCESS
    })
}