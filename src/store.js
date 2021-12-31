import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import Feed from './Reducer/Feed'

const store=createStore(Feed,applyMiddleware(thunk))

export default store