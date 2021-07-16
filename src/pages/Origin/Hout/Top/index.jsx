import React, { Component } from 'react'
// import { Button } from 'antd';
import store from '../../../../redux/store'
import {deAttTokenAction} from '../../../../redux/actions/attendantToken'
import {formateDate} from  '../../../utiles/dateUtiles'
import { withRouter } from 'react-router-dom'
// import PubSub from 'pubsub-js'
import {message} from 'antd'
import './index.css'

class Top extends Component {
    state ={
        currentTime:formateDate(Date.now()),//当前时间字符串形式
        menu:[],
        TopTitle:''
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

        // 获取当前路径
        this.getTitle()
        
        console.log(this.props);
    }
    getTitle=()=>{
        const path = this.props.location.pathname
        // console.log(path);
        let title
        const menu=[
            {index:1,key:'/hout/charts',title:'总体情况'},
            {index:2,key:'/hout/users',title:'用户信息'},
            {index:3,key:'/hout/renew',title:'更新文章'},
            {index:4,key:'/hout/new',title:'新建文章'},
            {index:5,key:'/hout/notice',title:'公告管理页'},
            {index:6,key:'/hout/bored',title:'大厅留言板管理页'},
        ]

        menu.forEach(item=>{
            if(path===item.key){
                // console.log(item.title);
                title=item.title
                // console.log(title);
                // this.setState({TopTitle})
            }
        })
        return title
        
    }  
    back=()=>{
        store.dispatch(deAttTokenAction(store.getState().guan))
        console.log('退出',store.getState().guan);
        window.sessionStorage.removeItem("admintorToken")
        this.props.history.replace('/admin')
        message.success('你已成功退出管理者页面')
    }
    render() {
        const {currentTime}=this.state

        const title=this.getTitle()

        return (
            <div className="Hout_topp">
                <div className="Hout_huanying">
                    <div className="huanying">欢迎&nbsp;&nbsp;admin
                    <span onClick={this.back} style={{width:'8%'}} className="backspan" size='large'>&nbsp;&nbsp;&nbsp;退出</span></div>
                    <div className="huanying_time">{currentTime}</div>
                    <div className="Hout_toppTitle">{title}<span className="title_triange"></span></div>
                </div>
            </div>
        )
    }
}

export default withRouter(Top)