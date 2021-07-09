import React, { Component } from 'react'
// import store from '../../../../../redux/store'
// import {pushrenewAction} from '../../../../../redux/actions/pushrenewId'
import {Input} from 'antd'
import './index.css'
// import PubSub from 'pubsub-js';
import axios from 'axios';
const { TextArea } = Input;

export default class PushRenew extends Component {
    state={
        Id:-1,
        token:window.sessionStorage.getItem('admintorToken'),
        renewData:[]

    }
    componentDidMount(){
        const IDD=window.localStorage.getItem("renewId")
        console.log(IDD);
        

        // PubSub.subscribe('renewId',(_,stateId)=>{
        //     this.setState({Id:stateId.Id},()=>{
        //         console.log(stateId.Id);
        //     })
            axios({
                method:'get',
                url:`http://121.4.187.232:8080/passage/passageResources?passageID=${IDD}`,
                headers:{
                    token:this.state.token
                }
            }).then(
                response=>{
                    console.log(response.data);
                    // this.setState({renewData:response.data[0]})
                    let doneRenewData=[]
                    let upRenewData=[]
                    doneRenewData=response.data.map((item)=>({
                        title:item.title,
                        content:item.content,
                        time:item.time,
                        id:item.id
                    }))
                    for(let i in doneRenewData){
                        if(doneRenewData[i].title!==undefined){
                            upRenewData.push(doneRenewData[i])
                        }
                    }
                    console.log(doneRenewData);
                    console.log(upRenewData);
                    this.setState({renewData:upRenewData})
                }
            )
        // })
    }
    render() {
        const renewData=this.state.renewData
        return (
            <div>
                {
                   renewData.map((item)=>{
                       return(
                        <div>
                        <div className="push_title">
                            <span style={{fontSize:'19px'}}>标题</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input  defaultValue={item.title} size="middle" style={{width:'50%'}}/>
                        </div>
                        <div className="push_content">
                            <span style={{fontSize:'19px'}}>内容</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* <Input  placeholder="标题" size="middle" style={{width:'50%'}}/> */}
                            <TextArea defaultValue={item.content} autoSize style={{width:'50%'}}/>
                        </div>
                        <span>新建或修改于{item.time}</span>
                        </div>
                       )
                    })
               }  
               
            </div>
        )
    }
}
