import axios from 'axios';
import React, { Component } from 'react'
import './index.css'

export default class DetailPassage extends Component {
    state={
        token:window.sessionStorage.getItem("adminToken"),
        detailArr:[],
        pictures:[],
        sources:[],
        isPict:true
    }
    componentDidMount(){
        // const {detailArr}=this.state
        const {token}=this.state
        const detailID = window.localStorage.getItem('detailID')
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
                // let newArr = []
                // newArr=response.data[0]
                let newAArr=[]
                newAArr.push(response.data[0])
                this.setState({detailArr:newAArr})

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

                let newZiyuan=[]
                newZiyuan=response.data[1]
                console.log(newZiyuan);
                this.setState({sources:newZiyuan})
                
            }
        )
        
    }
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
    render() {
        const {detailArr,pictures,sources,isPict}=this.state
        return (
            <div className="detailSource">
                {
                detailArr.map((item,index)=>{
                    return(
                        <div style={{marginBottom:'20px'}}>
                            <div className="detail_title">{item.title}</div>
                            <div className="detail_time">发表于{item.time}</div>
                            <div className="fenbu">
                                <div className="primary_content_triange"></div>
                                <div className="primaryy">内容</div>
                            </div>
                            <div className="primary_content">{item.content}</div>
                        </div>
                         )
                        })
                    }
                            
                            {
                                isPict? <br />:
                                <div className="fenbu">
                                <div className="primary_content_triange"></div>
                                <div className="primaryy">图片</div>
                                </div>   
                            }
                            {
                            pictures.map((item,index)=>{
                                return(
                                    <div className="primary_picture">
                                        <img src={'data:image/png;base64,'+item}  alt="加载失败"/>
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
                                        <div className="fenbu"key={index}>
                                            <div className="primary_content_triange"></div>
                                            <div className="">资源下载{`${index+1}`}：</div>
                                            <div className="primary_ziyuan">
                                                <span href="#" onClick={this.downtown.bind(this,index)}  className="ziyuan">{item.address}</span>
                                            </div>
                                            </div>
                                        </div>
                                    )
                                    })
                                    }
            </div>
        )
    }
}
