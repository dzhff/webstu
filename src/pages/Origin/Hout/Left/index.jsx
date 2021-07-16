import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu} from 'antd';
import PubSub from 'pubsub-js'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import './index.css'
const { SubMenu } = Menu;

class Left extends Component {

        state={
            selectedKey:-1,
            isselect:false,
        }    
        


    componentDidMount(){
        console.log(this.menu);   
        // const path = this.props.location.pathname
        // console.log(path);
        // console.log(this.menu.props.children);
        // for(let i in this.menu.props.children)
        // console.log(this.menu.);
        PubSub.publish('menuM',{menu:this.menu.props.children})
    }
    
    selectKey=({item, key, keyPath, selectedKeys, domEvent})=>{
        // console.log(key);
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
                    <Menu.Item key="/hout/charts" icon={<PieChartOutlined />} title="总体情况">
                        <Link to="/hout/charts">总体情况</Link>
                    </Menu.Item>
                    <Menu.Item key="/hout/users"title="用户信息" icon={<UserOutlined />}>
                        <Link to="/hout/users"></Link>用户信息
                    </Menu.Item>
                    <SubMenu key="sub1" icon={< FileOutlined />} title="文章管理页">
                    <Menu.Item key="/hout/renew" title="更新文章"><Link to="/hout/renew">更新文章</Link></Menu.Item>
                    <Menu.Item key="/hout/new"title="新建文章"><Link to="/hout/new">新建文章</Link></Menu.Item>
                    
                    </SubMenu>
                    <Menu.Item key="/hout/notice" icon={< ContainerOutlined />}title="公告管理页" ><Link to="/hout/notice">公告管理页</Link></Menu.Item>
                    <Menu.Item key="/hout/bored" title="大厅留言板管理页" icon={< DesktopOutlined/>}>
                        <Link to="/hout/bored">大厅留言板管理页</Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
export default withRouter(Left)