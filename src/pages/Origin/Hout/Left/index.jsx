import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { Menu} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './index.css'
const { SubMenu } = Menu;

export default class Left extends Component {

        state={
            selectedKey:-1,
            isselect:false,
        }    
        


    componentDidMount(){
        console.log(this.menu);   
    }
    
    selectKey=({item, key, keyPath, selectedKeys, domEvent})=>{
        console.log(key);
        let selectedKey = this.state.selectedKey
        selectedKey=key
        this.setState({selectedKey})

        let url = window.location.host+'/'+window.location.hash
        this.setState({
        currentUrl: url
  });

    }

    render() {
        return (
            <div className="left">
                <div className="left_logo" >Salmon</div>
                <Menu theme="dark" /*onClick={this.handlecurrent}*/ ref={c =>this.menu = c} onSelect={this.selectKey} /*selectedKeys={currentUrl}*//*defaultSelectedKeys={['3']} /*defaultOpenKeys={['sub1']}*/ mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />} >
                        <NavLink to="/hout/charts">总体情况</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        <NavLink to="/hout/users"></NavLink>用户信息
                    </Menu.Item>
                    <SubMenu key="sub1" icon={< FileOutlined />} title="文章管理页">
                    <Menu.Item key="3"><NavLink to="/hout/renew">更新文章</NavLink></Menu.Item>
                    <Menu.Item key="4"><NavLink to="/hout/new">新建文章</NavLink></Menu.Item>
                    <Menu.Item key="5"><NavLink to="/hout/notice">公告管理页</NavLink></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="6" icon={< DesktopOutlined/>}>
                        <NavLink to="/hout/bored">大厅留言板管理页</NavLink>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
