import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import sessions from './sessions'

export default combineReducers({ users, stories, sessions });
