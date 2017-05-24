import axios from 'axios';
import { REMOVE as REMOVE_USER } from './users';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';



/* ------------   ACTION CREATORS     ------------------ */

const setUser  = user => ({ type: SET_CURRENT_USER, user });



/* ------------       REDUCER     ------------------ */

export default function reducer (user = [], action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      return action.user;
      

    default:
      return user;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const loginUser = (user) => dispatch => {
  axios.post('/login', user)
       .then(res => dispatch(setUser(res.data)))
       .catch((error)=>console.error("fail to login", error))
};


export const logoutUser = () => dispatch => {
  axios.post('/logout')
       .then(res => dispatch(setUser(null)))
       .catch((error)=>console.error("fail to logout", error))
};


export const fetchUser = () => dispatch => {
  axios.get('/api/users/currentuser')
        .then(user => {
        	console.log("------------user.data",user.data);
        	dispatch(setUser(user.data))
        })
        .catch((error)=>console.error("fail to retrieve current user", error))
}