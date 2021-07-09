import React, { Component } from 'react'
import {Route,Switch,NavLink,Redirect} from 'react-router-dom'
import './index.css'
import Shouye from './Shouye'
// import Bored from './Bored'
import Source from './Source'
import DetailPassage from './Source/DetailPassage'
import store from '../../../redux/store'
// import {addNameAction} from '../../../redux/actions/userNameToken'
import Hout from '../Hout'


export default class Head extends Component {
    state={
        adminn:'',
        isadminToken:false,
    }
    componentDidMount(){
        console.log(1);
        // 检测redux中状态的变化，只要变化，就调用render
        // store.subscribe(()=>{
        //     this.setState({})
        // })
        // console.log(store.getState().mingzi);

        if(store.getState().mingzi){
            const userName=JSON.stringify(store.getState().mingzi)
            window.sessionStorage.setItem("admin",userName)
            let a = JSON.parse(window.sessionStorage.getItem('admin'))
            console.log(a);

            if(a!==null&&a!==""){
            console.log(a!==null&&a!=="");
            this.setState({isadminToken:true})
            this.setState({adminn:"Hi！"+a})
        }
        }
        else{
            console.log('jjj');
        }
        // const {isadminToken,adminn} = this.state
        // let loginName=JSON.parse(window.sessionStorage.getItem('admin'))
        // if(loginName!==null){
        //     this.setState({isadminToken:true},()=>{
        //         console.log(isadminToken);
        //     })
        //     this.setState({adminn:"Hi！"+loginName},()=>{
        //         console.log(adminn);
        //     })
        // }
        // console.log(loginName!==null);
        // console.log(loginName);

        // const {adminn} = this.state
        // console.log(this.state.adminn);
        // let a =JSON.parse(window.localStorage.getItem('admin'))
        // this.setState({adminn:a},()=>{
        //     console.log(adminn);
        // })
        // if(this.state.adminn!==""){
            // console.log(this.state.admin!==undefined);
            // this.setState({isadminToken:true})
        // }
    }
    render() {
        const {isadminToken,adminn} = this.state
        return (
            <div className="top">
                {/* <div className="head_top"> */}
                <header>
                    <h2 href="#" className="head_title" >Salmon</h2>
                    <ul className="navigation ul_one">
                        <li><NavLink to="/head/shouye">首页</NavLink></li>
                        {/* <li><NavLink to="/bored">大厅留言板</NavLink></li> */}
                        <li><NavLink to="/head/source">资源</NavLink></li>
                    </ul>
                        {
                            isadminToken?<li>{adminn}</li>:
                            <div>
                                <ul className="navigation ul_two">
                                <li><NavLink to="/admin">登录</NavLink></li>
                                <li>|</li>
                                <li> <NavLink to="/admin/register">注册</NavLink></li>
                                <li><NavLink to="/hout">后台</NavLink></li>        
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
                            <Route path="/head/source" component={Source}></Route>
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
