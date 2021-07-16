import React, { Component } from 'react'
// import store from '../../../../../redux/store'
// import {pushrenewAction} from '../../../../../redux/actions/pushrenewId'
import { Table, Button } from 'antd';
import { Loading } from 'element-react/next';
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
            err:false,
            renewCurrent:parseInt(window.location.hash.slice(1), 0) || 1,
            allLoading:true

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
                this.setState({allLoading:false})
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
    changgePage=(page)=>{
        const renewCurrent=page
        this.setState({renewCurrent},()=>{
            window.location.hash = `#${page}`//设置当前页面的hash值为当前page页数
        })
    }
    backCurrentPage=()=>{
        this.changgePage(this.state.renewCurrent)
    }
    componentDidMount(){
        this.backCurrentPage()//刷新时回到刷新前的页数
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
                            // for(let e in updatePassage){
                            //     if(updatePassage[2].key>e){
                            //         updatePassage[2].key=((updatePassage[2].key)-1)
                            //     }
                            // }
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
                title:'序号',
                render: (text, record, index) => `${index + 1}`,
                width:'200px'
            },
            // {
            //   title: '序号',
            //   dataIndex: 'key',
            //   key:'key'
            // },
            {
              title: '标题',
              dataIndex: 'title',
              key:'title'
            },
            {
              title: '内容',
              dataIndex: 'content',
              key:'content',
              onCell: () => {
                return {
                  style: {
                    maxWidth: 260,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer',
                    // color:'red'
                  }
                }
              }
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
                            {/* <span className="a_delete" onClick={this.deletedd(2)}>删除</span> */}
                            {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                            <span className="a_idit" onClick={this.pushEdit}>编辑</span>
                        </div> 
                    )
                }
                
              },
          ];
          
        
          const { loading, selectedRowKeys,passageItem,renewCurrent,allLoading } = this.state;
          const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
          const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div >
                <Loading text="正在加载中..." loading={allLoading}>
                <div style={{ marginBottom: 16 }}>
                <Button type="primary" style={{width:'10%'}} onClick={this.start} disabled={!hasSelected} loading={loading}>
                    删除
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                </div>
                <Table 
                onRow={record=>{
                    return{
                        onClick:event=>{
                            window.localStorage.setItem('renewId',record.id)

                            this.props.history.push(`/hout/pushrenew/${record.id}`)

                            // this.props.history.push({ path : '/hout/pushrenew' ,query : { id: `${record.id}`} })

                            // this.props.history.push({ pathname:'/hout/pushrenew',param:{id : record.id } })
                            console.log(record.id);
                        }
                    }
                }}
                // onRow={record=>{return {onClick={this.pushRenew}}}}
                rowSelection={rowSelection} columns={columns} dataSource={passageItem} pagination={{current:renewCurrent,onChange:this.changgePage}} scroll={{ y: 390 }}/>
                </Loading>
            </div>
            </div>
        )
    }
}
