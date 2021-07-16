import React, { Component } from 'react'
import { Table,Button} from 'antd';
import './index.css'
import axios from 'axios';

export default class index extends Component {
    
        state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            boredData:[],
            key:[],
            token:window.sessionStorage.getItem('admintorToken'),
            selected:[]
          };
        //   const token=window.localStorage.getItem('admintorToken')
          
    
    componentDidMount(){
        
        axios({
            method:'get',
            url:'http://121.4.187.232:8080/hallComment/queryAllHallComment',
            headers:{
                token:this.state.token
              }
        }).then(
            response=>{
                console.log(response);
                this.setState({boredData:response.data})
                let newArr=[]
                newArr = this.state.boredData.map((item,index) => ({key:index,content:item.content,time:item.time,id:item.id}));
                this.setState({boredData:newArr})
                console.log(this.state.boredData);
            }
        )
    }
            onSelectChange = selectedRowKeys => {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.setState({ selectedRowKeys });
            };

          start = () => {
              const {loading} =this.state
            this.setState({ loading: true });
            // this.setState(state=>({loading:!state.loading}))
            console.log(loading);
            // ajax request after empty completing
            setTimeout(() => {
              this.setState({
                selectedRowKeys: [],
                loading: false,
              });
            }, 1000);

            let selectedRowKeys=this.state.selectedRowKeys
            

            for(let i in selectedRowKeys){
                let boredData=this.state.boredData
                for(let j in boredData){
                    if(boredData[j].key===selectedRowKeys[i]){
                        axios({
                            method:'post',
                            url:`http://121.4.187.232:8080/admin/deleteHallComment?ID=${boredData[j].id}`,
                            headers:{
                                token:this.state.token
                            }
                        }).then(
                            response=>{
                                console.log(response);
                                const {boredData}=this.state
                                let newBoredData = []
                                newBoredData=boredData.map((item)=>({
                                    key:item.key,
                                    content:item.content,
                                    time:item.time,
                                    id:item.id
                                }))
                                console.log(newBoredData);
                                newBoredData.splice(j,1)
                                console.log(newBoredData);
                                for(let e in newBoredData){
                                    if(newBoredData[e].key>e){
                                        newBoredData[e].key=((newBoredData[e].key)-1)
                                        console.log(newBoredData[e].key>e);
                                    }
                                }
                                console.log(newBoredData);
                                this.setState({boredData:newBoredData},()=>{
                                    console.log(boredData);
                                })

                            }
                        )
                        
                    }

                }
            }

        };
    
    render() {
        const columns = [
             {
              title: 'key',
              dataIndex: 'key',
            },
            {
              title: 'Content',
              dataIndex: 'content',
            },
            {
              title: 'Time',
              dataIndex: 'time',
            },
          ];
        
            const loading=this.state.loading
            const selectedRowKeys=this.state.selectedRowKeys
            const boredData=this.state.boredData
            // const key = this.state.key
            const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            };
            const hasSelected = selectedRowKeys.length > 0;
            
        return (
            <div>
                <div className="hout_bored_title">今日留言板&nbsp;&nbsp;&nbsp;
                
                <span style={{ marginLeft: 8 ,fontSize:'16px'}} className="selectedItem">
                    {hasSelected ? `已选中 ${selectedRowKeys.length} 项` : ''}
                </span>
                </div>
                <Table  rowSelection={rowSelection} columns={columns} dataSource={boredData} scroll={{ y: 390 }}/>
                <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={this.start} style={{width:'10%'}} disabled={!hasSelected} loading={loading}>
                    删除
                </Button>
                </div>
            </div>
        )
    }
}









// function HoutBored() {
//     const columns = [
//         {
//           title: 'Name',
//           dataIndex: 'name',
//         },
//         {
//           title: 'Age',
//           dataIndex: 'age',
//         },
//         {
//           title: 'Address',
//           dataIndex: 'address',
//         },
//       ];
//       const data = [];
//         for (let i = 0; i < 46; i++) {
//         data.push({
//             key: i,
//             name: `Edward King ${i}`,
//             age: 32,
//             address: `London, Park Lane no. ${i}`,
//         });
//         }
//         // state = {
//         //     selectedRowKeys: [], // Check here to configure the default column
//         //     loading: false,
//         //   };
        
//         const [selectedRowKeys,setselectedRowKeys] =React.useState([])
//         const [loading,setloading] = React.useState(false)

//         function start (){
//             // this.setState({ loading: true });
//             setloading ((loading)=>{return loading=true})
//             // ajax request after empty completing
//             setTimeout(() => {
//             //   this.setState({
//             //     selectedRowKeys: [],
//             //     loading: false,
//             //   });
//                 setloading ((loading)=>{return loading=false})
//                 setselectedRowKeys ((selectedRowKeys)=>{return selectedRowKeys=[]})
//             }, 1000);
//           };

//           function onSelectChange (selectedRowKeys){
//             console.log('selectedRowKeys changed: ', selectedRowKeys);
//             // this.setState({ selectedRowKeys });
//             setselectedRowKeys ((selectedRowKeys)=>{return selectedRowKeys})
//           };

//           const rowSelection = {
//             selectedRowKeys:selectedRowKeys,
//             onChange: onSelectChange,
//           };
//           const hasSelected = selectedRowKeys.length > 0;
//     return (
//         <div>
//             <div className="hout_bored_title">今日留言板&nbsp;&nbsp;&nbsp;<Button style={{width:'6%'}} type="middle">编辑</Button></div>
//             <div>
//             <div style={{ marginBottom: 16 }}>
//             <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
//                 Reload
//             </Button>
//             <span style={{ marginLeft: 8 }}>
//                 {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
//             </span>
//             </div>
//             <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
//         </div>
//         </div>
//     )
// }

// export default HoutBored