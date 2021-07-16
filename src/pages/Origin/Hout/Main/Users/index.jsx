import React, { Component } from 'react'
import { Table } from 'antd';
import axios from 'axios';
import './index.css'

export default class Users extends Component {
    constructor(props){
        super(props)
        this.state={
            usersData:[],
            current:parseInt(window.location.hash.slice(1), 0) || 1,//获取刷新前的页数
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
            }
        )    
    }
    changgePage=(page)=>{
        const current=page
        this.setState({current},()=>{
            console.log(this.state.current);
            window.location.hash = `#${page}`//设置当前页面的hash值为当前page页数
            console.log(parseInt(window.location.hash.slice(1), 0));
        })
    }
    backCurrentPage=()=>{
        this.changgePage(this.state.current)
    }
    componentDidMount(){
        this.backCurrentPage()//刷新时回到刷新前的页数
    }
    render() {
        const columns = [  
            {
                title:'序号',
                render: (text, record, index) => `${index + 1}`,
                width:'200px'
            },
            // {
            //     title: '用户名Id',
            //     dataIndex: 'userId',
            //     key: 'userId',
            // },
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
        const current=this.state.current
        const usersData = this.state.usersData
        return (
            <div>
                <Table columns={columns} pagination={{current:current,onChange:this.changgePage}}  /*changePage={{onclick:this.changgePage}}*/ dataSource={usersData} scroll={{ y: 390 }}/>
            </div>
        )
    }
}
