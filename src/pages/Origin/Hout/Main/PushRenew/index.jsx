import React, { Component } from 'react'
import {Input} from 'antd'
import { Upload, Modal ,Button,message,List,Avatar} from 'antd';
import { PlusOutlined ,UploadOutlined} from '@ant-design/icons';
import './index.css'
import axios from 'axios';
import { Loading } from 'element-react/next';
const { TextArea } = Input;

export default class PushRenew extends Component {
    state={
        Id:-1,
        token:window.sessionStorage.getItem('admintorToken'),
        // renewData:[],
        renewContent:'',
        renewTime:'',
        renewTitle:'',
        // 图片
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        undonefilePic:[],//将要上传的图片
        doneDeletePic:[],
        willPic:[],
        unsourceList:[],//将要上传的新资源
        sourceList:[],//资源
        doneDeleteSource:[],//删除原有资源的数组
        loading:true,
        commintList:[]
    }

    componentDidMount(){
        const IDD=window.localStorage.getItem("renewId")
        const {token}=this.state
    
            axios({
                method:'get',
                url:`http://121.4.187.232:8080/passage/passageResources?passageID=${IDD}`,
                headers:{
                    token:token
                }
            }).then(
                response=>{
                    console.log(response);
                    // this.setState({renewData:response.data[0]})
                    // let doneRenewData=[]
                    // let upRenewData=[]
                    // doneRenewData=response.data.map((item)=>({
                    //     title:item.title,
                    //     content:item.content,
                    //     time:item.time,
                    //     id:item.id
                    // }))
                    // for(let i in doneRenewData){
                    //     if(doneRenewData[i].title!==undefined){
                    //         upRenewData.push(doneRenewData[i])
                    //     }
                    // }
                    const renewTitle=response.data[0].title
                    const renewContent=response.data[0].content
                    const renewTime=response.data[0].time
                    this.setState({renewContent,renewTime,renewTitle})
                    this.setState({loading:false})
        
                    // this.setState({renewData:upRenewData})

                    // 图片
                    // let {fileList}=this.state
                    // fileList=response.data[2]
                    let zanshipict=[]
                    for(let i in response.data[2]){

                        let base64=this.base64ToBlob({b64data: response.data[2][i], contentType: 'image/png'})
                        // 转后后的blob对象
                        base64.then((res)=>{
                            zanshipict.push({
                                status:'done',
                                url:res.preview,
                                imgID:i,
                                uid:`-${i}`,
                                name:`image${i}`
                            })
                            this.setState({fileList:zanshipict},
                        )
                        })
                    } 
                    
                    // 资源
                    const {sourceList}=this.state
                    let Listt=[]
                    Listt=response.data[1]
                    // console.log(Listt);
                    for(let i in Listt){
                        // console.log(this.sources[i].id);
                       axios({
                        method: "post",
                        url: `http://121.4.187.232:8080/passage/downResources?filePath=${Listt[i].address}`,
                        headers:{
                            // 'Content-type': 'application/octet-stream',
                            token:this.token
                            },
                        responseType: "blob",
                        }).then(
                    response=>{
                        // console.log(response);
                        // let 
                        sourceList.push({
                            name:response.config.url,
                            url:response.config.url,
                            sourceID:Listt[i].id,
                            key:i,
                            status:'done'
                        })
                        this.setState({sourceList},()=>{
                            console.log(sourceList);
                        })
                    }
                )

                }
                }
            )
            axios.get(`http://121.4.187.232:8080/passage/queryCommentByPassageID?passageID=${IDD}`).then(
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
            // setInterval(()=>{
            //     this.setState({loading:true})
            // },2000)
        // })
    }

    // 图片
    getBase64=(file)=> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await this.getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
      };
    
    //   图片改变的钩子
    handleChange = ({ file,fileList }) => {
        console.log(file);
        console.log(file.uid);
        console.log(fileList);
        this.setState({ fileList })
        console.log(fileList);
        let {undonefilePic}=this.state
        
        undonefilePic.push(file)
        this.setState({undonefilePic},()=>{
            console.log(undonefilePic);
        })

       
        
    };

    // 图片删除
    handleRemove=(file)=>{
        console.log(file);
        const {fileList}=this.state
        const {doneDeletePic}=this.state
        // let donepict=[]
        // donepict=fileList
        let adddonePict=0//计算原有的图片数量
            for(let i in fileList){
                // 删除原有的图片
                if(fileList[i].status==='done'){
                    adddonePict++
                    if(fileList[i].imgID===file.imgID){
                        fileList.splice(i,1)
                        this.setState({fileList})
    
                        doneDeletePic.push(file)
                        console.log(doneDeletePic);
                        this.setState({doneDeletePic},()=>{
                            console.log(doneDeletePic);
                        })
    
                    }
                }else{
                    // 删除新增的图片
                    const {undonefilePic} = this.state
                    for(let j in undonefilePic){
                        if(undonefilePic[j].uid===file.uid){
                            let k=parseInt(adddonePict)+parseInt(j)
                            undonefilePic.splice(j,1)
                            this.setState({undonefilePic},()=>{
                                console.log(undonefilePic);
                            })
                            fileList.splice(k,1)
                            this.setState({fileList},()=>{
                                console.log(fileList);
                            })
                        }
                    }
                    
                }
            }
        
    }

    // 资源
    // 资源改变的钩子
    SourceChange=(info)=>{
        // let newZiyuan=[]
        if (info.file.status !== 'uploading') {
            const {sourceList} = this.state
            sourceList.push(info.file)
            this.setState({sourceList},()=>{
                // console.log(sourceList);
            })
            const {unsourceList} =this.state
            unsourceList.push(info.file)
            this.setState({unsourceList},()=>{
                // console.log(unsourceList);
            })
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // newZiyuan.push(info.file)
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        //   console.log(newZiyuan);
    }

    //资源删除
    SourceRemove=(file)=>{
        console.log(file);
        const {sourceList,doneDeleteSource} = this.state
        let donefileNum=-2
        let adddonefileNum=0//计算原本有多少个资源
        for(let i in sourceList){
            if(sourceList[i].status==='done'){
                adddonefileNum++
                if(sourceList[i].sourceID===file.sourceID){
                    donefileNum=i
                    doneDeleteSource.push(file)
                    this.setState({doneDeleteSource},()=>{
                        console.log(doneDeleteSource);
                    })
                    sourceList.splice(i,1)
                    this.setState({sourceList},()=>{
                        console.log(sourceList);
                    })
                }
            }else{
                console.log(adddonefileNum);
                const {unsourceList}=this.state
                console.log(unsourceList);
                console.log(sourceList[i]);
                for(let j in unsourceList){
                    // console.log(unsourceList[j].uid);
                    console.log(unsourceList[j].uid===file.uid);
                    if(unsourceList[j].uid===file.uid){
                        let k=parseInt(adddonefileNum)+parseInt(j)
                        console.log(j);
                        unsourceList.splice(j,1)
                        this.setState({unsourceList},()=>{
                            console.log(unsourceList);
                        })
                        sourceList.splice(k,1)
                        this.setState({sourceList},()=>{
                            console.log(sourceList);
                        })
                    }
                }
            }
        }
        console.log(donefileNum);
    }

    panduan=()=>{
        return false
    }
    
    // 标题的改变
    changeTitle=(e)=>{
        console.log(e.target.value);
        const renewTitle=e.target.value
        this.setState({renewTitle})
    }

    changeContent=(e)=>{
        console.log(e.target.value);
        const renewContent=e.target.value
        this.setState({renewContent})
    }

    // 上传
    RenewUpload=()=>{
        const IDD=window.localStorage.getItem("renewId")
        const {token}=this.state

        // if(this.state.renewContent!==undefined&&this.state.renewContent!==""&&this.state.renewContent!==" "&&this.state.renewContent!=="  "&&this.state.renewContent!=="   "&&this.state.renewContent!=="    "&&this.state.renewContent!=="     "&&this.state.renewContent!=="      "&&this.state.renewContent!=="       "&this.state.renewContent!=="        "){
            // if(this.state.renewContent!==undefined&&this.state.renewContent!==""&&this.state.renewContent!==" "&&this.state.renewContent!=="  "&&this.state.renewContent!=="   "&&this.state.renewContent!=="    "&&this.state.renewContent!=="     "&&this.state.renewContent!=="      "&&this.state.renewContent!=="       "&this.state.renewContent!=="        "){
            if(this.state.renewContent!==undefined&&((this.state.renewContent.indexOf("")>0))){
                if(this.state.renewContent!==undefined&&((this.state.renewContent.indexOf("")>0))){

        axios({
            method:'post',
            url:`http://121.4.187.232:8080/admin/updatePassage?content=${this.state.renewContent}&passageID=${IDD}&title=${this.state.renewContent}`,
            headers:{
                token:token
              }
        }).then(
            response=>{
                console.log(response);
                const renewContent=""
                const renewTitle=""
                this.setState({renewContent,renewTitle})
            }
        )

        // 删除原有图片
        const {doneDeletePic}=this.state
        for(let i in doneDeletePic){
            axios({
                method:'post',
                url:`http://121.4.187.232:8080/admin/deleteImg?imgID=${doneDeletePic[i].imgID}`,
                headers:{
                    token:token
                  }
            }).then(
                response=>{
                    console.log(response);
                }
            )
        }

        // 图片
         let param = new FormData()
        param.append('passageID',IDD)
        const {undonefilePic}=this.state
            for(let i in undonefilePic){
                param.append('file',undonefilePic[i])
                console.log(undonefilePic[i]);
            }
            axios({
                method:'post',
                url:`http://121.4.187.232:8080/admin/uploadImg`,
                data:param,
                headers:{
                    "Content-Type":"multipart/form-data",
                    token:token,
                  }
            }).then(
                response=>{
                    console.log(response);
                }
            )
        
            
        // 资源

        // 删除原有的资源
        const {doneDeleteSource} =this.state
        // console.log(doneDeleteSource!=="");
        // console.log(doneDeleteSource==="");

        for(let i in doneDeleteSource){
            axios({
                method:'post',
                url:`http://121.4.187.232:8080/admin/deleteResources?resourcesID=${doneDeleteSource[i].sourceID}`,
                headers:{
                    token:token
                }
            }).then(
                response=>{
                    console.log(response);
                }
            )
        }

        // 上传新的资源
        const {unsourceList}=this.state
        let sourceParam=new FormData()
        sourceParam.append('passageID',IDD)
        for(let i in unsourceList){
            sourceParam.append('file',unsourceList[i])
            console.log(unsourceList[i]);
        }
        axios({
            method:'post',
            url:`http://121.4.187.232:8080/admin/uploadResources`,
            data:sourceParam,
            headers:{
                "Content-Type":"multipart/form-data",
                // "Content-Type": "application/x-www-form-urlencoded ",
                token:token,
                
              }
        }).then(
            response=>{
                console.log(response);
                message.success('更新成功')
                this.props.history.replace('/hout/renew')
            }
        )
            // setInterval(()=>{
            //     this.props
            // },1000)
            message.success('更新文章成功')
            }else{message.error('更新文章的内容不能为空！')}
        }else{message.error('更新文章的标题不能为空')}

    }

    // 获取图片 图片的转换
    base64ToBlob =({b64data = '', contentType = '', sliceSize = 512} = {})=> {
        return new Promise((resolve, reject) => {
          // 使用 atob() 方法将数据解码
          let byteCharacters = atob(b64data);
          let byteArrays = [];
          for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);
            let byteNumbers = [];
            for (let i = 0; i < slice.length; i++) {
                byteNumbers.push(slice.charCodeAt(i));
            }
            // 8 位无符号整数值的类型化数组。内容将初始化为 0。
            // 如果无法分配请求数目的字节，则将引发异常。
            byteArrays.push(new Uint8Array(byteNumbers));
          }
          let result = new Blob(byteArrays, {
            type: contentType
          })
          result = Object.assign(result,{
            // 这里一定要处理一下 URL.createObjectURL
            preview: URL.createObjectURL(result),
            name: `XXX.png`
          });
          resolve(result)
        })
      }

    render() {
        // \commintList,loading}=this.state
        
        // const renewData=this.state.renewData
        const { previewVisible, previewImage, fileList, previewTitle,sourceList,commintList,renewContent,renewTime,renewTitle ,loading} = this.state;
        const uploadButton = (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );
        const data = []
        for(let i in commintList){
            data.push({
                content:commintList[i].content,
                username:commintList[i].username,
                
            })
        }

        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            beforeUpload:this.panduan,
            headers: {
              authorization: 'authorization-text',
            },
            onChange:this.SourceChange,
            fileList:sourceList,
            onRemove:this.SourceRemove,
            accept:"image/png, image/jpeg"
            
          };
        return (
            <div style={{width:'100%',height:'100%'}}>
                {/* {
                   renewData.map((item)=>{
                       return( */}
                        <div className="el-loading-demo">
                            <Loading text="正在加载中..." loading={loading}>
                        <div className="push_title">
                            <span style={{fontSize:'19px',width:'4%'}}>标题</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input ref={c=>this.input1=c} value={renewTitle} onChange={this.changeTitle} size="middle" style={{width:'50%'}}/>
                        </div>
                        <div className="push_content">
                            <span style={{fontSize:'19px',width:'4%'}}>内容</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* <Input  placeholder="标题" size="middle" style={{width:'50%'}}/> */}
                            <TextArea ref={c=>this.input2=c}  value={renewContent} onChange={this.changeContent} autoSize style={{width:'50%'}}/>
                        </div>

                        {/* 图片 */}
                        <div className="push_picture">
                        {/* <span style={{fontSize:'19px',width:'4%'}}>图片</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                        <Upload
                        beforeUpload={()=>false}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        onRemove={this.handleRemove}
                        accept="image/png, image/jpeg"
                        >
                        {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={this.handleCancel}
                        // headers= {authorization='authorization-text'}
                        {...props}
                        >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                        </div>
                        <div className="push_source">
                        {/* <span style={{fontSize:'19px',width:'5%'}}>资源</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                        <Upload {...props} >
                            <Button icon={<UploadOutlined />}>资源上传</Button>
                        </Upload>
                        </div>
                        <div>
                        <div className="pushnewcommit">评论列表</div>
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
                        <div>
                            <Button style={{width:'10%'}} type="primary" onClick={this.RenewUpload}>更新</Button>
                        </div>
                        <span style={{color:'#828282'}}>新建或修改于{renewTime}</span>
                        </Loading>
                        </div>
                       
            {/* //         })
            //    }   */}
               
            </div>
        )
    }
}
