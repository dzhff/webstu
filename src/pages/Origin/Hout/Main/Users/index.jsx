import React, { Component } from 'react'
import { Table } from 'antd';
import axios from 'axios';
import './index.css'

export default class Users extends Component {
    constructor(props){
        super(props)
        this.state={
            usersData:[],
        }
        const token=window.sessionStorage.getItem('admintorToken')
        axios({
            method:'post',
            url:'http://121.4.187.232:8080/admin/queryAllUser',
            headers:{
                token:token
              }
        }).then(
            response=>{
                console.log(response);
                this.setState({usersData:response.data})
                // console.log(this.state.usersData[0]);
                // console.log(this.state.usersData.username);
                // const data =[]
                // for(let i in this.state.usersData){
                //     data.push(
                //         this.state.usersData[i]
                //     )
                // }
                // console.log(data);
                // this.setState({usersData:data})

            }
        )    
    }
    changgePage=(event)=>{
        console.log(event);
    }
    render() {
        const columns = [
            {
                title: '用户名Id',
                dataIndex: 'userId',
                key: 'userId',
            },
            {
              title: '用户名',
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: '密码',
              dataIndex: 'password',
              key: 'password',
            },
        ]
        
        const usersData = this.state.usersData
        return (
            <div>
                <Table columns={columns} changePage={{onclick:this.changgePage}} dataSource={usersData} scroll={{ y: 390 }}/>
            </div>
        )
    }
}
