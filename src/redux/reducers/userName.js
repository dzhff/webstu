const initState=''//初始化状态
export default function usernameReducer(preState=initState,action){
    const {type,data}=action
    switch (type) {
        case 'addName'://增加一个token
            return preState=data
        case 'deName'://减少一个token
            return preState=''
        default:
            return  preState
    }
}