const initState=''//初始化状态
export default function admintorReducer(preState=initState,action){
    const {type,data}=action
    switch (type) {
        case 'addAdmintor'://增加一个token
            return preState=data
        case 'deAdmintor'://减少一个token
            return preState=''
        default:
            return  preState
    }
}  