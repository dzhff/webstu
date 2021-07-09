const initState=''
export default function attendantReducer(preState=initState,action){
    const {type,data}=action
    switch (type) {
        case 'addAttendant':
            return preState=data
        case 'deAttendant':
            return preState=''    
        default:
            return preState
    }
}