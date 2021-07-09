import React, { Component } from 'react'
// import { Button } from 'antd';
import store from '../../../../redux/store'
import {deAttTokenAction} from '../../../../redux/actions/attendantToken'
import {formateDate} from  '../../../utiles/dateUtiles'
import { withRouter } from 'react-router-dom'
import {message} from 'antd'
import './index.css'

class Top extends Component {
    state ={
        currentTime:formateDate(Date.now())//当前时间字符串形式
    }
    getTime=()=>{
        // 每隔一秒钟获取档期那时间，并跟新状态数据currentTime
        setInterval(()=>{
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    // 在第一次render（）之后执行
    // 
    componentDidMount(){
        // 获取当时时间
        this.getTime()
    }
    back=()=>{
        store.dispatch(deAttTokenAction(store.getState().guan))
        console.log('退出',store.getState().guan);
        window.sessionStorage.removeItem("admintorToken")
        this.props.history.push('/admin')
        message.success('你已成功退出管理者页面')
    }
    render() {
        const {currentTime}=this.state
        return (
            <div className="Hout_topp">
                <div className="Hout_huanying">
                    <div className="huanying">欢迎&nbsp;&nbsp;admin
                    <span onClick={this.back} style={{width:'8%'}} className="backspan" size='large'>&nbsp;&nbsp;&nbsp;退出</span></div>
                    <div className="huanying_time">{currentTime}</div>
                    <div className="Hout_toppTitle">首页<span className="title_triange"></span></div>
                </div>
            </div>
        )
    }
}

export default withRouter(Top)