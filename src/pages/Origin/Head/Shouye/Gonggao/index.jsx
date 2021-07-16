import React, { Component } from 'react'
import axios from 'axios'
import './index.css'
// import { response } from 'express'

export default class Gonggao extends Component {
    state={
        notice:'',
        isHave:'true',//是否有公告
        err:'',
    }
    
    componentDidMount(){
        axios.get('http://121.4.187.232:8080/notice/queryNotice').then(
            response=>{
                this.setState({notice:response.data})
                if(this.state.notice!==''){this.setState({isHave:true})}
                else {this.setState({isHave:true})}
            },
            error=>{
                this.setState({err:error.message})
            }
        )
    }
    render() {
        const {notice,isHave}=this.state
        return (
            <div className="gonggao_div">
                <div className="gong">今日公告</div>
                    {
                        // err?<h2 style={{color:'red'}}>出现了一点</h2>:
                        isHave? <div className="gong_axi">{notice}</div>:
                        <div className="gong_axi">暂时还未发布公告哦</div>
                    }
                    
                
            </div>
        )
    }
}
