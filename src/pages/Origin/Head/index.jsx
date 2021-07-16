import React, { Component } from 'react'
import {Route,Switch,NavLink,Redirect, withRouter} from 'react-router-dom'
import {Modal,message} from 'antd'
import './index.css'
import Shouye from './Shouye'
// import Bored from './Bored'
// import Source from './Source'
import DetailPassage from './Source/DetailPassage'
// import store from '../../../redux/store'
import qs from 'querystring'
// import {addNameAction} from '../../../redux/actions/userNameToken'
import Hout from '../Hout'


class Head extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',//登录者的名字
            token:window.sessionStorage.getItem('adminToken'),
            isadminToken:false,
            visible: false ,
        }
        // console.log(props.location.state!==undefined);
        // if(props.location.state!==undefined){
        //     console.log(props.location.state.username);
        //     const adminn=props.location.state.username
        //     console.log(adminn);
        //     this.setState({adminn},()=>{
        //         console.log(this.state.adminn);
        //         console.log("hahha");
        //     })
        // }
        // console.log(props);
        // console.log(store.getState().mingzi);
        // console.log(JSON.parse(window.sessionStorage.getItem("adminName")));
        // console.log(window.sessionStorage.getItem("adminName")!=="");
        // console.log(window.sessionStorage.getItem("adminName")!=="null");
        // console.log();
        // let zandiName=window.sessionStorage.getItem("adminName")
        // if(store.getState().mingzi!==""){
        //     this.setState({adminn:store.getState().mingzi},()=>{
        //         console.log("1",this.state.adminn);
        //     })
        // }else if(zandiName!==""&&zandiName!=="null"){
        //     this.setState({adminn:zandiName},()=>{
        //         console.log("2",this.state.adminn);
        //     })
        // }else{
        //     this.setState({adminn:""},()=>{
        //         console.log("3",this.state.adminn);
        //     })
        // }
    }
    backadmin=()=>{
        this.setState({
            visible: true,
          });
        window.sessionStorage.removeItem("adminToken")
        window.sessionStorage.removeItem("adminName")
        this.setState({username:''})
        this.setState({isadminToken:false})
        this.props.history.replace(`/head/shouye/`)
        message.success('现已成功退出')
        // this.setState({
        //     visible: true,
        //   });
        
    }
    // tiaodeng=()=>{
    //     this.setState({
    //         visible: false,
    //       });
    //       this.props.history.push(`/admin/admintor`)
    //       message.success('现已进入登录界面')
    //   }
    
    //   hideModal = () => {
    //     this.setState({
    //       visible: false,
    //     });
    //   };
    componentDidMount(){
        console.log(this.props);
        console.log(this.props.location);
        const {search} =this.props.location
        const {username}=qs.parse(search.slice(1))
        console.log(username);
        console.log(username!=="undefined");
        console.log(username!==undefined);
        if(username!==undefined){
            this.setState({username})
            this.setState({isadminToken:true})
        }
    }
    render() {
        const isadminToken=this.state.isadminToken
        const username=this.state.username
        return (
            <div className="top">
                {/* <div className="head_top"> */}
                <header>
                    <h2 href="#" className="head_title" >Salmon</h2>
                    <ul className="navigation ul_one">
                        {/* <li><NavLink to="/head/shouye">首页</NavLink></li> */}
                        {/* <li><NavLink to="/bored">大厅留言板</NavLink></li> */}
                        {/* <li><NavLink to="/head/source">资源</NavLink></li> */}
                    </ul>
                        {
                            isadminToken?<ul className="navigation ul_two ul_three"><li className="backadmin" >欢迎，</li><li className="backadminName">{username}</li>
                            <li onClick={this.backadmin} className="backadminBack">
                                退出
                                <Modal
                                // title="Modal"
                                visible={this.state.visible}
                                onOk={this.tiaodeng}
                                onCancel={this.hideModal}
                                okText="确认"
                                cancelText="取消"
                                >
                                <p>是否确认退出</p>
                                </Modal>
                            </li></ul>:
                            <div>
                                <ul className="navigation ul_two">
                                <li><NavLink to="/admin">登录</NavLink></li>
                                <li>|</li>
                                <li> <NavLink to="/admin/register">注册</NavLink></li>
                                {/* <li><NavLink to="/hout">后台</NavLink></li>         */}
                                </ul>
                            </div>
                        }
                </header>  
                {/* </div> */}
                <div className="banner">
                    
                    {/* <Jianjie /> */}
                    <div className="content">
                        <Switch>
                            <Route path="/head/shouye" component={Shouye}></Route>
                            {/* <Route path="/head/source" component={Source}></Route> */}
                            <Route path="/head/detailpassage" component={DetailPassage}></Route>
                            {/* <Route path="/admin/admintor" component={Admintor}></Route>
                            <Route path="/admin/register" component={Register}></Route> */}
                            <Route path="/hout"component={Hout}></Route>
                            <Redirect to="/head/shouye"/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Head)
