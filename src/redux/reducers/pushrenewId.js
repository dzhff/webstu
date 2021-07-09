const initState=''
export default function pushRenewReducer(preState=initState,action){
    const {type,data}=action
    switch (type) {
        case 'addRenewId':
            return preState=data
        case 'deRenewId':
            return preState=''    
        default:
            return preState
    }
}