import React, { Component } from 'react'
import { Form, Input, Button ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import './index.css'

export default class Admintor extends Component {
    state={

    }
    pushAdmintor=()=>{
        this.props.history.replace(`/admin/admintor`)
    }
    // loginBtn=()=>{
        // const {input1,input2}=this
        // axios.post(`http://121.4.187.232:8080/user/register?password=${input2.state.value}&username=${input1.state.value}`).then(
        //     response=>{
        //         console.log(response);
        //     }
        // )
        // console.log(input1.state.value);
        // console.log(input2.state.value);
        // }
    onFinish=(values)=>{
        console.log(values);
        const {input1,input2}=this
        // if(values.remember){
            axios.post(`http://121.4.187.232:8080/user/register?password=${input2.state.value}&username=${input1.state.value}`).then(
            response=>{
                console.log(response.config.url);
                axios.post(`http://121.4.187.232:8080/user/userLogin?password=${input2.state.value}&username=${input1.state.value}`).then(
                response=>{
                    console.log(response.data.token);
                    const token = response.data.token
                    const userID=response.data.userID
                    let username= input1.state.value 
                    if(token!==''){ 
                        this.props.history.replace(`/head/shouye/?username=${username}`)
                    }
                    window.sessionStorage.setItem("adminToken",token)
                    window.sessionStorage.setItem("userID",userID)
                }
                )
                message.success('注册成功即可前往主页面')
            }
        )
        // }
        }
    onFinishFailed=(values, errorFields,outOfDate)=>{
         console.log(values, errorFields);
            console.log('_',errorFields);
        if(!outOfDate){
            // console.log('错');、
            // console.log(values, errorFields);
            // console.log(errorFields);
            message.error('请按正确规则注册账户或密码')
        }
        }
    pushGuan=()=>{
        this.props.history.replace(`/admin/attendant`)
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
                        <div className="login_span"><span>注册</span>
                        <span>已有账户?<span onClick={this.pushAdmintor} className="adminBtn">前往登录</span></span>
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
                        {max:12,message:'用户名最多12位'},
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
                    {/* <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        {/* <Checkbox>Remember me</Checkbox> */}
                        {/* </Form.Item> */}

                        {/* <a className="login-form-forgot" href="../../index">
                        Forgot password
                        </a> */}
                    {/* </Form.Item> */} 

                    <Form.Item>
                        <Button type="primary" style={{width:'100%'}} htmlType="submit" /*onClick={this.loginBtn}*/ className="login-form-button">
                        Log in
                        </Button>
                        {/* Or <a href="">register now!</a> */}
                        <span onClick={this.pushGuan} className="guanBtn">管理员登陆</span>
                    </Form.Item>
                    </Form>
                    </section>
                </div>
            </div>
        )
    
       
    }
}
