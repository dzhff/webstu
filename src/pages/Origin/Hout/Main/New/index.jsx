import React, { Component } from 'react'
import { Input } from 'antd'
import { Upload, Modal ,Button,message} from 'antd';
import { PlusOutlined,UploadOutlined  } from '@ant-design/icons';

import './index.css'
import axios from 'axios';
// import qs from 'qs';
// React.prototype.$qs = qs;
const { TextArea } = Input;


export default class New extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
        //   {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //   },
        //   {
        //     uid: '-2',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //   },
        ],
        SourceList:[],
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
        // file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
        previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => {
        
        this.setState({ fileList },()=>{
        console.log(fileList);
    })
    };

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

    pushUpload=()=>{
        console.log(this.state.SourceList);
        const {token,SourceList} =this.state
        console.log(this.state.fileList);
        const {input1,input2} =this
        let i1=input1.state.value
        let i2 = input2.resizableTextArea.props.value
        // console.log(i1);
        // console.log(i2);
        axios({
            method:'post',
            url:`http://121.4.187.232:8080/admin/createPassage?content=${i2}&title=${i1}`,
            headers:{
                token:token
              }
        }).then(
            response=>{
                console.log(response)

                axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo=1&pageSize=6').then(
                    response=>{
                        let RewingId = response.data.passageItem[0].id
                        console.log(RewingId);

                        const {fileList} = this.state
                        let param = new FormData()
                        param.append('passageID',80)
                        for(let i in fileList){
                            console.log("1",fileList[i]);
                            if(fileList[i]){
                                console.log("2",fileList[i]);
                                param.append('file',fileList[i])
                            }
                            console.log(i);
                        }
                        console.log(param);

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
                                console.log(param);
                                console.log(this.state.fileList);
                            }
                        )

                    // 资源
                    let sourceParam=new FormData()
                    sourceParam.append('passageID',RewingId)
                    for(let i of SourceList){
                        sourceParam.append('file',i)
                    }
                    axios({
                        method:'post',
                        url:`http://121.4.187.232:8080/admin/uploadResources`,
                        data:sourceParam,
                        headers: {'Content-type': 'multipart/form-data',token:token}
                    })
                    axios.post("http://121.4.187.232:8080/admin/uploadResources", sourceParam, {headers: {'Content-type': 'multipart/form-data',token:token}})
                    .then(
                        response=>{
                            console.log(response);
                        }
                    )
                        
                    }
                )
            }
        )
    }


    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );

        // 资源
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
              authorization: 'authorization-text',
            },
            onChange:this.SourceChange,
            // onChange(info) {
            //     // let newZiyuan=[]
            //   if (info.file.status !== 'uploading') {
            //     console.log(info.file, info.fileList);
            //     console.log(info.file.status);
            //     const {SourceList} = this.state.SourceList
            //     this.setState({SourceList:info.file},()=>{
            //         console.log(SourceList);
            //     })
            //   }
            //   if (info.file.status === 'done') {
            //     message.success(`${info.file.name} file uploaded successfully`);
            //     // newZiyuan.push(info.file)
            //   } else if (info.file.status === 'error') {
            //     message.error(`${info.file.name} file upload failed.`);
            //   }
            // //   console.log(newZiyuan);
            // },
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
                    <TextArea ref={c =>this.input2 = c} placeholder="输入你想发表的内容" autoSize style={{width:'50%'}}/>
                </div>
                {/* <span>新建或修改于{item.time}</span> */}
                <div>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
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
                <div>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
                    <Button style={{width:'10%'}} onClick={this.pushUpload}>上传</Button>
                </div>
            </div>
        )
    }
}
