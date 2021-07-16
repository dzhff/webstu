import axios from 'axios';
import React, { Component } from 'react'
import { List,Input,Button,Avatar,Modal, message} from 'antd';
import { Loading } from 'element-react/next';
import Gonggao from '../../Shouye/Gonggao'


import './index.css'

export default class DetailPassage extends Component {
    state={
        token:window.sessionStorage.getItem("adminToken"),
        detailID : window.localStorage.getItem('detailID'),
        userID:window.sessionStorage.getItem('userID'),
        detailArr:[],
        pictures:[],
        sources:[],
        isPict:true,
        commintList:[],
        // confirmState:true,
        visible: false ,
        loading:true
    }
    componentDidMount(){
        // const {detailArr}=this.state
        const {token,detailID}=this.state
        console.log(detailID);
        axios({
            method:'get',
            url:`http://121.4.187.232:8080/passage/passageResources?passageID=${detailID}`,
            headers:{
                token:token
              }
        }).then(
            response=>{
                console.log(response);
                let newAArr=[]
                newAArr.push(response.data[0])
                this.setState({detailArr:newAArr})
                this.setState({loading:false})

                // 图片
                let newPict=[]
                newPict=response.data[2]
                let donePict=[]
                console.log(newPict);
                for(let i in newPict){
                    if(newPict[i]){
                        donePict.push(newPict[i])
                        this.setState({isPict:false})
                    }
                }
                console.log(donePict);
                this.setState({pictures:donePict})

                // 资源
                let newZiyuan=[]
                newZiyuan=response.data[1]
                console.log(newZiyuan);
                this.setState({sources:newZiyuan})

                // pinglun
                console.log(response.data[3]);
                // const{commintList}=this.state
                // this.setState({commintList:response.data[3]},()=>{console.log(commintList);})
                // let newcommint=[]
                // newcommint=response.data[3].map((item,index)=>({
                //     commentID:item.commentID,
                //     userID:item.userID,
                //     username:item.username,
                //     passageID:item.passageID,
                //     content:item.content,
                //     key:index
                // }))
                // console.log(newcommint);
                
                // const commintList=[]
                // for(let i in response.data[3]){
                //     commintList.push(response.data[3][i])
                //     // this.setState({commintList},()=>{
                //     //     console.log(commintList);
                //     // })
                // }
                // console.log(commintList);
                // // let newcommint=[]
                // newcommint=response.data[3]
                // console.log(newcommint);
                // this.setState({commintList:newcommint},()=>{
                //     // console.log(commintList);
                // })
                
            }
        )
        axios.get(`http://121.4.187.232:8080/passage/queryCommentByPassageID?passageID=${detailID}`).then(
            response=>{
                console.log(response.data);
                const commintList=[]
                for(let i in response.data){
                    commintList.push(response.data[i])
                }
                console.log(commintList);
                this.setState({commintList},()=>{
                    console.log(commintList);
                })
                // setInterval(()=>{
                //     this.setState({loading:true})
                // },3000)
            }
        )
        
        
    }

    // 资源下载
    downtown=(index)=>{
        console.log(index);
        const {token,sources}=this.state
        if(token){
            axios({
                method: "post",
                url: `http://121.4.187.232:8080/passage/downResources?filePath=${sources[index].address}`,
                headers:{
                    // 'Content-type': 'application/octet-stream',
                    token:token
                },
                responseType: "blob",
            }).then((res) => {
                console.log(res);
                res = res.data;
                console.log(res.data);
                let blob = new Blob([res], { type: res.type });
                let downloadElement = document.createElement("a");
                let href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = sources[index].address;
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);
               });
                
        }
    }

    // 评论发送
    putCommit=()=>{
        const {input1}=this
        const {detailID,token,userID}=this.state
        console.log(token);
        // console.log(input1.state.value);
        let commits=input1.state.value

        
        // if(commits!==undefined&&commits!==""&&commits!==" "&&commits!=="  "&&commits!=="   "&&commits!=="    "&&commits!=="     "&&commits!=="      "&&commits!=="       "&commits!=="        "){
            if(commits!==undefined&&((commits.indexOf("")>0))){
            if(token!==null&&token!==""){
                axios({
                    method:'post',
                    url:`http://121.4.187.232:8080/comment/createComment?content=${commits}&passageID=${detailID}&userID=${userID}`,
                    headers:{
                        token:token
                    }
                }).then(
                    response=>{
                        console.log(response);
                        message.success("发送评论成功")
                        input1.state.value=""
                    }
                )
            } else{
                this.setState({
                    visible: true,
                  });
        }
       
            // alert('登陆后才能发表评论o')
        //     Modal.confirm({
        //         title: '删除',
        //         content: '是否确认删除？',
        //         onOk:(values) => {
        //             this.setState({confirmState:false})
        //             this.props.history.replace(`/admin/admintor`)
        //         },
        //         onCancel:(values)=>{
        //             this.setState({confirmState:false})
        //         }
        // })
    }else{
        message.error('评论不能为空白值')
        input1.state.value=""
    }
    }

    componentDidUpdate(){
        const {detailID}=this.state
        // console.log(detailID);
        axios.get(`http://121.4.187.232:8080/passage/queryCommentByPassageID?passageID=${detailID}`).then(
            response=>{
                // console.log(response.data);
                const commintList=[]
                for(let i in response.data){
                    commintList.push(response.data[i])
                }
                // console.log(commintList);
                this.setState({commintList},()=>{
                    // console.log(commintList);
                })
            }
        )
    }
    showModal = () => {
        // this.setState({
        //   visible: true,
        // });
      };
      tiaodeng=()=>{
        this.setState({
            visible: false,
          });
          this.props.history.push(`/admin/admintor`)
          message.success('现已进入登录界面')
      }
    
      hideModal = () => {
        this.setState({
          visible: false,
        });
      };
    render() {
        const {detailArr,pictures,sources,commintList,loading}=this.state
        const data = []
        for(let i in commintList){
            data.push({
                content:commintList[i].content,
                username:commintList[i].username,
                
            })
        }
        return (
            <div>
                <div className="Gonggao">
                <Gonggao />
                </div>
                <div className="detailSource">
                <div className="el-loading-demo">
                <Loading text="正在加载中..." loading={loading}>
                {
                    
                detailArr.map((item,index)=>{
                    return(
                        <div style={{marginBottom:'20px'}}>
                            <div /*className="detail_title"*/><h1>{item.title}</h1></div>
                            <div className="detail_time">发表于{item.time}</div>
                            <div className="fenbu">
                                <div className="primary_content_triange"></div>
                                <div className="primary_content"/><p>{item.content}</p></div>
                            </div>
                         )
                        })
                    }
                            
                            {/* {
                                isPict? <br />:
                                <div className="fenbu">
                                <div className="primary_content_triange"></div>
                                <div className="primaryy">图片</div>  
                                </div>   
                            } */}
                            {
                            pictures.map((item,index)=>{
                                return(
                                    <div className="primary_picture">
                                        <img src={'data:image/png;base64,'+item} style={{width:'100%'}}  alt="加载失败"/>
                                        {/* <img src={`data:image/png;base64,${item[1]}`}  alt="加载失败"/> */}
                                    </div>
                                    )
                                })
                            }
                            <div style={{marginTop:'10px'}}><br /></div>
                            {
                            sources.map((item,index)=>{
                                return(
                                    <div > 
                                        <div className="fenbu_ziyuan"key={index}>
                                            <div className="primary_content_triange"></div>
                                            {/* <div className="primary_source">相关资源{`${index+1}`}:</div> */}
                                            <div className="primary_source">相关资源:</div>
                                            <div className="primary_ziyuan">
                                                <span href="#" onClick={this.downtown.bind(this,index)}  className="ziyuan">{item.address}</span>
                                            </div>
                                            </div>
                                        </div>
                                    )
                                    })
                                    }
                            <div>
                                <div className="pinglunkuang">
                                    <div className="kunagkunag">
                                    <div class="leftkuang">发表评论</div>
                                    <Input ref={c =>this.input1 = c} className="inputt" size="large" onPressEnter={this.putCommit} style={{width:'90.5%'}}/>&nbsp;&nbsp;&nbsp;
                                    <Button style={{width:'8%'}}  className="putbtn" size='large'onClick={this.putCommit}>发送</Button>
                                    </div>
                                <Modal className="detailcommit"
                                // title="Modal"
                                visible={this.state.visible}
                                onOk={this.tiaodeng}
                                onCancel={this.hideModal}
                                okText="确认"
                                cancelText="取消"
                                >
                                <p>登录之后才能评论哦！</p>
                                </Modal>
                                </div>
                                <div className="commentList">
                                    <div className="leftkuang">评论列表</div>
                                    <List className="listlist"
                                    // footer={<div>Footer</div>}
                                    // bordered
                                    dataSource={commintList.map((item)=>{
                                        return (
                                        <div className="get_commint">
                                            {/* <div className="triangle"></div> */}
                                            <div className="commint_username">{item.username}</div>
                                            <div className="commint_time">评论于{item.time}</div>
                                            <div className="commint_content">{item.content}</div>
                                            </div> 
                                        )
                                    })}
                                    renderItem={item => (
                                        <List.Item>
                                         <List.Item.Meta
                                            avatar={<Avatar src="https://img.lovestu.com/uploads/2020/08/touxiangmoren.jpg" />}
                                            title={item}
                                            />
                                        {/* {item} */}
                                        </List.Item>
                                    )}
                                    />
                                </div>
                            </div>
                            </Loading>
                        </div>
  
            </div>
            </div>

        )
    }
}
