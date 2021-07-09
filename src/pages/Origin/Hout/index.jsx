import React, { Component } from 'react'
import { Layout } from 'antd';
import Left from './Left'
import Top from './Top'
import Main from './Main'
import './index.css'

// 管理者
import store from '../../../redux/store';
import {addAttTokenAction} from '../../../redux/actions/attendantToken'
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';


const { Footer, Sider, Content } = Layout;


export default class Hout extends Component {
    state={
        admintorToken:window.sessionStorage.getItem('admintorToken')
    }
    pushRegi=()=>{
        this.props.history.push(`/admin/admintor`)
    }
    puahlogin=()=>{
        this.props.history.push(`/admin/register`)
    }
    onFinish=(values)=>{
        const {input1,input2}=this
        
        if(input1.state.value==='admin'&&input2.state.value==='admin'){
        if(values.remember){
        axios.post(`http://121.4.187.232:8080/user/adminLogin?password=${input2.state.value}&username=${input1.state.value}`).then(
            response=>{
                console.log(response);
                const token=response.data.token
                store.dispatch(addAttTokenAction(token))
                console.log(store.getState().guan);
                message.success('管理员登陆成功')
                this.props.history.push('/hout/charts')
                window.sessionStorage.setItem('admintorToken',response.data.token) 
            }
        )
        }
    }
    else{message.error('账户或密码输入错误')}
        }
    onFinishFailed=(values, errorFields,outOfDate)=>{
        if(!outOfDate){
            console.log('错');  
        }
        console.log(outOfDate);
        }
    render() {
        const {admintorToken}=this.state
        return admintorToken?(
            <div style={{height:'100%'}}>
                <Layout style={{height:'100%'}}>
                <Sider><Left /></Sider>
                <Layout>
                    <Footer className="hout_top"><Top /></Footer>
                    <Content><Main /></Content>
                </Layout>
                </Layout>
            </div>
        ):(
            <div className="login">
                <div className="login_bored">
                    <div className="login_header">
                        <div className="login_guan">管理员登录</div>
                        <div className="login_spanAtten">
                        {/* <div className="login_span"><span>管理员登录</span> */}
                        <span>前往用户</span>
                        <span onClick={this.pushRegi} className="pushadmin">登录</span>
                        <span >|</span>
                        <span onClick={this.puahlogin} className="pushadmin">注册</span>
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
                        // {max:4,message:'用户名最多12位'},
                        // {pattern:/^[a-zA-Z]+$/,message:'用户名必须由字母组成'},
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
                        // {min:4,message:'密码最少四位'},
                        // {pattern:/^[a-zA-Z0-9]+$/,message:'密码由数字英文组成'}
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
                        <Button type="primary" htmlType="submit" onClick={this.loginBtn} className="login-form-button">
                        Log in
                        </Button>
                        <span onClick={this.pushGuan}></span>
                        {/* Or <a href="">register now!</a> */}
                    </Form.Item>
                    </Form>
                    </section>
                </div>
            </div>
        )
    }
}
