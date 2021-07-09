import React, { Component } from 'react'
import { Input,Button,List } from 'antd';
import axios from 'axios'
// import { response } from 'express';

// import SendBored from './SendBored'
// import ListBored from './ListBored'

export default class Bored extends Component {
    state={//初始化状态
        boredArr:[],
        isHave:true,
        err:'',
        inputValue:'',
    }
    putBored=()=>{
        // console.log(this);
        const {input1}=this
        const vall=input1.state.value
        // if(/^\s+$/gi.test(document.getElementById('text_id').value)){
        if(vall!==undefined&&!(/^\s+$/gi.vall)){

        // if(vall!==undefined&&((vall.indexOf("")>0))){
        // if(vall!==undefined&&(vall.length>0)){

            axios.post(`http://121.4.187.232:8080/hallComment/createHallComment?content=${input1.state.value}`).then(
            response=>{
                // this.setState({inputValue:})
                // console.log(response);
                // console.log(response.config.data);
                // this.$message('发送成功')
                input1.state.value=''
                // alert('发送成功')
            }
        )
        }
        else{alert('不能输入空白值')}
    }
        
    componentDidMount(){
        axios.get("http://121.4.187.232:8080/hallComment/queryAllHallComment").then(
            response=>{
                this.setState({boredArr:response.data})
                console.log(this.state.boredArr);
            }
        )
    }
    componentDidUpdate(){
        axios.get("http://121.4.187.232:8080/hallComment/queryAllHallComment").then(
            response=>{
                this.setState({boredArr:response.data})
                // console.log(this.state.boredArr);
            }
        )
    }
    render() {
        const {boredArr} = this.state
        return (
            <div>
                <div className="bored_title" style={{fontSize:'16px'}}>留言区</div>
                <div className="bored_search">
                    <Input ref={c =>this.input1 = c}  placeholder="留下你想说的话吧！" size="large" style={{width:'50%'}}/>
                    &nbsp;<Button onClick={this.putBored} size='large'>发送</Button>
                </div>
                <div className="bored_main">
                {/* <Divider orientation="left">Default Size</Divider> */}
                    <List
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={boredArr.map((bored)=>{
                        return (
                           <div className="get_bored">
                               <div className="triangle"></div>
                               <div className="content">{bored.content}</div>
                               <div className="time">发表于{bored.time}</div>
                            </div> 
                        )
                    })}
                    renderItem={item => (
                        <List.Item>{item}</List.Item>
                    )}
                    />
                </div>
            </div>
        )
    }
}
