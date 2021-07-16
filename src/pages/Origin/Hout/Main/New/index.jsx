import React, { Component } from 'react'
import { Input } from 'antd'
import { Upload, Modal ,Button,message} from 'antd';
import { PlusOutlined,UploadOutlined  } from '@ant-design/icons';

import './index.css'
import axios from 'axios';
const { TextArea } = Input;


export default class New extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        SourceList:[],
        newTitle:'',
        newContent:'',
        token:window.sessionStorage.getItem('admintorToken'),
    }
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

    handleChange = ({ fileList }) => {
        // console.log(fileList);
        this.setState({ fileList },()=>{
        console.log(fileList);
    })
    };

    // 资源
    SourceChange=(info)=>{
        // let newZiyuan=[]
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            console.log(info.file.status);
            let Arr=[]
            Arr=info.fileList
            console.log(Arr);
            const {SourceList} = this.state
            this.setState({SourceList:Arr},()=>{
                console.log(SourceList);
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
    pan=()=>{
        return false
    }

    onPressEnter=(e)=>{
        const newContent=e.target.value
        this.setState({newContent})
    }

    // 上传
    pushUpload=()=>{

        const {token,SourceList} =this.state

        const {input1,input2} =this
        
        let i1=input1.state.value
        let i2 = input2.resizableTextArea.props.value
        console.log(input2.resizableTextArea);
        // console.log(i1);
        // console.log(i2);
        if(i1!==undefined&&i1!==""&&i1!==" "&&i1!=="  "&&i1!=="   "&&i1!=="    "&&i1!=="     "&&i1!=="      "&&i1!=="       "&i1!=="        "){
            if(i2!==undefined&&i2!==""&&i2!==" "&&i2!=="  "&&i2!=="   "&&i2!=="    "&&i2!=="     "&&i2!=="      "&&i2!=="       "&i2!=="        "){
        axios({
            method:'post',
            url:`http://121.4.187.232:8080/admin/createPassage?content=${i2}&title=${i1}`,
            headers:{
                token:token
              }
        }).then(
            response=>{
                input1.state.value=""
                const newContent=""
                this.setState({newContent})
                
                axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo=1&pageSize=6').then(
                    response=>{
                        let RewingId = response.data.passageItem[0].id

                        const {fileList} = this.state
                        console.log(fileList);

                        // 图片
                        let param = new FormData()
                        param.append('passageID',RewingId)
                        for(let i in fileList){

                            if(fileList[i]){
                                console.log(fileList[i]);
                                param.append('file',fileList[i].originFileObj)
                            }
                        }


                        axios({
                            method:'post',
                            url:`http://121.4.187.232:8080/admin/uploadImg`,
                            data:param,
                            headers:{
                                "Content-Type":"multipart/form-data",
                                // "Content-Type": "application/x-www-form-urlencoded ",
                                token:token,
                                
                              }
                        }).then(
                            response=>{
                                console.log(response);
                                this.setState({fileList:[]})
 
                            }
                        )

                    // 资源
                    let sourceParam=new FormData()
                    sourceParam.append('passageID',RewingId)
                    for(let i in SourceList){
                        console.log(SourceList[i]);
                        sourceParam.append('file',SourceList[i].originFileObj)
                    }
                    axios.post("http://121.4.187.232:8080/admin/uploadResources", sourceParam, {headers: {'Content-type': 'multipart/form-data',token:token}})
                    .then(
                        response=>{
                            const SourceList=[]
                            this.setState({SourceList})
                            console.log(response);
                            this.setState({SourceList})
                        }
                    )
                        
                    }
                )
            }
        )
        this.setState({SourceList:[]})
        message.success('新建文章成功！')
            }else{message.error('新建文章内容不能为空！')}
        }else{message.error('新建文章题目不能为空！')}
    }



    render() {
        const { previewVisible, previewImage, fileList, previewTitle,newContent } = this.state;
        const uploadButton = (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );

        // 资源
        const props = {
            name: 'file',
            beforeUpload:this.pan,
            headers: {
              authorization: 'authorization-text',
            },
            onChange:this.SourceChange,
            accept:"image/png, image/jpeg"
            
          };
          
        return (
            <div>
                <div className="new_title">
                    <span style={{fontSize:'19px'}}>标题</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Input ref={c =>this.input1 = c} placeholder="请输入新的标题" size="middle" style={{width:'50%'}}/>
                </div>
                <div className="new_content">
                    <span style={{fontSize:'19px'}}>内容</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <Input  placeholder="标题" size="middle" style={{width:'50%'}}/> */}
                    <TextArea ref={c =>this.input2 = c} value={newContent} onChange={this.onPressEnter} placeholder="输入你想发表的内容" autoSize style={{width:'50%'}}/>
                </div>
                {/* <span>新建或修改于{item.time}</span> */}
                <div>
                <Upload
                    action={(file)=>{console.log(file);console.log(111111);}}
                    beforeUpload={()=>false}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    accept="image/png, image/jpeg"
                    >
                    {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                    >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
                <div style={{marginBottom:'0px',marginTop:'20px'}}>
                <Upload {...props}>
                    <Button className="shangchuanziyuan" icon={<UploadOutlined />}>上传资源</Button>
                </Upload>,
                </div>
                {/* {
                    SourceList.map((item,index)=>{
                        return(
                            <div>资源{index}-{item.uid}</div>
                        )
                    })
                } */}
                <div>
                    <Button style={{width:'10%'}} type="primary" onClick={this.pushUpload}>上传</Button>
                </div>
            </div>
        )
    }
}
