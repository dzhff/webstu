import React, { Component } from 'react'
// import { Route,Redirect,Switch } from 'react-router-dom'
import store from '../../../../redux/store'
import {addAdmTokenAction} from '../../../../redux/actions/admintorToken'
import {addNameAction} from '../../../../redux/actions/userNameToken'
import { Form, Input, Button, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import './index.css'

export default class Admintor extends Component {
    // state={
    //     token:''
    // }
    componentDidMount(){
        // 检测redux中状态的变化，只要变化，就调用render
        store.subscribe(()=>{
            this.setState({})
        })
    }
    pushRegi=()=>{
        this.props.history.push(`/admin/register`)
        console.log(this);
    }
    // loginBtn=()=>{
        // const {input1,input2}=this
        // const onFinish=(values)=>{
        //     console.log(values);
        // }
        // this.props.form.validateFields((err,values)=>{
        //     if(!err){
        //         console.log('提交表单成功',values);
        //     }else{
        //         console.log('提交表单失败');
        //     }
        // })
        // axios.post(`http://121.4.187.232:8080/user/userLogin?password=${input2.state.value}&username=${input1.state.value}`).then(
        //     response=>{
        //         console.log(response);
        //     }
        // )
        // console.log(input1.state.value);
        // console.log(input2.state.value);
    // }
    onFinish=(values)=>{
        const {input1,input2}=this
        if(values.remember){
            axios.post(`http://121.4.187.232:8080/user/userLogin?password=${input2.state.value}&username=${input1.state.value}`).then(
            response=>{
                console.log(response);
                const token=response.data.token
                store.dispatch(addAdmTokenAction(token))
                store.dispatch(addNameAction(input1.state.value))
                console.log(store.getState().deng);
                console.log(store.getState().mingzi);
                if(token!==''){
                    // 
                    // this.props.history.push(`/head/shouye`)
                    let username= input1.state.value
                    this.props.history.push({
                        pathname: '/head/shouye',
                        search: "admin="+username,
                    });
                }

                window.localStorage.setItem("adminToken",token)

                // let userName=JSON.stringify(input1.state.value)
                // window.sessionStorage.setItem("admin",userName)
                
                // let a = JSON.parse(window.localStorage.getItem('admin'))
                // console.log(a);
                console.log(input1.state.value);
            }
        )
        }
    }
    onFinishFailed=(values, errorFields,outOfDate)=>{
        if(!outOfDate){
            console.log('错');
        }

    }
    pushGuan=()=>{
        this.props.history.push(`/admin/attendant`)
    }
    render() {
        // const NormalLoginForm = () => {
        //     const onFinish = (values) => {
        //       console.log('Received values of form: ', values);
        //     };
        return (  
            <div className="login">
                <div className="login_bored">
                    <div className="login_header">
                        <div className="login_title">Salmon</div>
                        <div className="login_span"><span>登录</span>
                        <span>还没有账户?<span onClick={this.pushRegi} className="registerBtn">立即注册</span></span>
                        </div>
                    </div>
                    <section className="login_section">
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    >
                    <Form.Item
                        name="username"
                        rules={[
                        {required: true,whitespace:true,message: '请输入你的用户名',},
                        {max:4,message:'用户名最多12位'},
                        {pattern:/^[a-zA-Z]+$/,message:'用户名必须由字母组成'},
                        ]}
                    >
                        <Input
                        ref={c =>this.input1 = c}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        type="text"
                        placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {required: true,message: '请输入你的密码',},
                        {min:4,message:'密码最少四位'},
                        {pattern:/^[a-zA-Z0-9]+$/,message:'密码由数字英文组成'}
                        ]}
                    >
                        <Input
                        ref={c =>this.input2 = c}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        {/* <a className="login-form-forgot" href="../../index">
                        Forgot password
                        </a> */}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" /*onClick={this.loginBtn}*/ className="login-form-button">
                        Log in
                        </Button>
                        <span onClick={this.pushGuan} className="guanBtn">管理员登陆</span>
                        {/* Or <a href="">register now!</a> */}
                    </Form.Item>
                    </Form>
                    </section>
                </div>
            </div>
        )
    
       
    }
}
