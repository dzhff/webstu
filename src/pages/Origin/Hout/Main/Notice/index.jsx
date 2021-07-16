import axios from 'axios'
import React from 'react'
import { Button} from 'antd';

import './index.css'

 function Notice(){
    const [notice,setnotice] = React.useState(' ')
    const [zheng,setzheng] = React.useState(false)
    const inputNotice=React.useRef()
    React.useEffect(()=>{
        axios.get(`http://121.4.187.232:8080/notice/queryNotice`).then(
            response=>{
                setnotice((notice)=>{return notice=response.data})
                console.log(notice);
            }
        )
    },[notice])
    function duicuo(){
        setzheng((zheng)=>{return zheng=!zheng})
        console.log(zheng);
      }

      function queding(){
        setzheng((zheng)=>{return zheng=!zheng})
        console.log(zheng);
    //    alert(inputNotice.current.value) 
       const token=window.sessionStorage.getItem('admintorToken')
       axios({
        method:'post',
        url:`http://121.4.187.232:8080/admin/updateNotice?content=${inputNotice.current.value}`,
        headers:{
            token:token
          }
    }).then(
        response=>{
            console.log(response);
        }
    )
    setnotice((notice)=>{return notice=inputNotice.current.value})
      }
    return( <div className="hout_noticee">
                {
                    zheng?<div>
                            <div className="today_title">更新公告&nbsp;&nbsp;&nbsp;<Button onClick={queding} style={{width:'10%'}} >确认更改{zheng}</Button></div>
                            <div className="today_hang">
                            <div className="notice_triangle"></div>
                            {/* <div className="today_content">{notice}</div> */}
                            <input type="textarea" ref={inputNotice} placeholder={notice} size="middle" style={{width:'50%'}}/>
                            </div>
                    </div>:
                    <div>
                        <div className="today_title">今日公告&nbsp;&nbsp;&nbsp;<Button onClick={duicuo} style={{width:'10%'}} >点击更改{zheng}</Button></div>
                        <div className="today_hang">
                        <div className="notice_triangle"></div>
                        <div className="today_content">{notice}</div>
                        </div>
                    </div>
                }
           </div>
        )
}

export default Notice

