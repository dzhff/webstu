import React, { Component } from 'react'
import store from '../../../../../redux/store'
import {pushrenewAction} from '../../../../../redux/actions/pushrenewId'
import { Table, Button } from 'antd';
import './index.css'
import axios from 'axios';
// import PubSub from 'pubsub-js';
// import { Router } from 'react-router-dom';

export default class Renew extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            token:window.sessionStorage.getItem('admintorToken'),
            passageItem:[],
            passageItemCount:-1,
            err:false
          };
        

          axios({
            method:'get',
            url:`http://121.4.187.232:8080/passage/queryAllPassage?pageNo=${1}&pageSize=${6}`,
            headers:{
                token:this.state.token
              }
        }).then(
            response=>{
                this.setState({passageItemCount:response.data.passageItemCount})
                axios({
                    method:'get',
                    url:`http://121.4.187.232:8080/passage/queryAllPassage?pageNo=${1}&pageSize=${this.state.passageItemCount}`,
                    headers:{
                        token:this.state.token
                      }
                }).then(
                    response=>{
                        console.log(response);
                        this.setState({passageItem:response.data.passageItem})
                        console.log(this.state.passageItem);
                        let newPassageItem=[]
                        newPassageItem=this.state.passageItem.map((item,index)=>({
                            key:index,
                            content:item.content,
                            title:item.title,
                            time:item.time,
                            id:item.id
                        }))
                        this.setState({passageItem:newPassageItem})
                        console.log(this.state.passageItem);
                    }
                )
            }
        )
          
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };
    
      start = () => {
        const {selectedRowKeys,passageItem}=this.state

        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
        for(let i in passageItem){
            for(let j in selectedRowKeys){
                if(passageItem[i].key===selectedRowKeys[j]){
                    axios({
                        method:'post',
                        url:`http://121.4.187.232:8080/admin/deletePassage?passageID=${passageItem[i].id}`,
                        headers:{
                            token:this.state.token
                        }
                    }).then(
                        response=>{
                            console.log(response);
                            console.log(passageItem);
                            let updatePassage=[]
                            updatePassage=passageItem.map((item)=>({
                                key:item.key,
                                content:item.content,
                                title:item.title,
                                time:item.time,
                                id:item.id
                            }))
                            updatePassage.splice(i,1)
                            for(let e in updatePassage){
                                if(updatePassage[2].key>e){
                                    updatePassage[2].key=((updatePassage[2].key)-1)
                                }
                            }
                            this.setState({passageItem:updatePassage},()=>{
                                console.log(passageItem);
                            })
                        }
                    )
                    .catch(
                        response=>{
                            console.log(response);
                            // this.setState({err:true},()=>{console.log(this.state.err);})
                        }
                    )
                }   
            }
        }  

        
      };
    

      deletedd=(index)=>{
      }

    render() {
        const columns = [
            {
              title: '序号',
              dataIndex: 'key',
              key:'key'
            },
            {
              title: '标题',
              dataIndex: 'title',
              key:'title'
            },
            {
              title: '内容',
              dataIndex: 'content',
              key:'content',
            },
            {
                title: '时间',
                dataIndex: 'time',
                key:'time'
              },
              {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (text,row,index) => {
                    // console.log(index);
                    return(
                        <div>
                            <span className="a_delete" onClick={this.deletedd(2)}>删除</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="a_idit" onClick={this.pushEdit}>编辑</span>
                        </div> 
                    )
                }
                
              },
          ];
          
        
          const { loading, selectedRowKeys,passageItem } = this.state;
          const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
          const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div>
                <div style={{ marginBottom: 16 }}>
                <Button type="primary" style={{width:'10%'}} onClick={this.start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                </div>
                <Table 
                onRow={record=>{
                    return{
                        onClick:event=>{
                            // PubSub.publish('renewId',{Id:record.id})
                            store.dispatch(pushrenewAction(record.id))
                            window.localStorage.setItem('renewId',record.id)
                            this.props.history.push({
                                pathname:'/hout/pushrenew',
                                // query:{obj:record.id}
                            })
                        }
                    }
                }}
                // onRow={record=>{return {onClick={this.pushRenew}}}}
                rowSelection={rowSelection} columns={columns} dataSource={passageItem} pagination={{onChange:this.changePage}} scroll={{ y: 390 }}/>
            </div>
            </div>
        )
    }
}
