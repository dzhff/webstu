// 引入creatStore，专门用于创建最为核心的store对象
import { createStore ,combineReducers} from "redux";
// 引入为Admintor组件服务的reducer
import admintorReducer from "./reducers/admintorToken";
// 引入为Attendant组件服务的reducer
import attendantReducer from "./reducers/attendantToken";
// 引入为Attendant组件服务的reducer
import pushRenewReducer from './reducers/pushrenewId'
// 引入为username名字服务的reducer
import usernameReducer from './reducers/userName'


const allReducer = combineReducers({
    deng:admintorReducer,
    guan:attendantReducer,
    Idhao:pushRenewReducer,
    mingzi:usernameReducer
})

// 暴露store
export default createStore(allReducer)
