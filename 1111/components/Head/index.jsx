import React, { Component } from 'react'
// import {Route,Switch,Redirect,NavLink} from 'react-router-dom'
// import Shouye from './pages/Shouye'
// import Bored from './pages/Bored'
// import Source from './pages/Source'


export default class Head extends Component {
    render() {
        return (
            <div>
                <div className="head_top">
                <a href="#" className="head_title">Salmon</a>
                {/* <ul>
                    <li><NavLink to="/shouye">首页</NavLink></li>
                    <li><NavLink to="/bored">大厅留言板</NavLink></li>
                    <li><NavLink to="/source">资源</NavLink></li>
                </ul> */}
                <ul>
                    <li>hhhh</li>
                    <li>hhhh</li>
                    <li>hhhh</li>
                    
                </ul>
                </div>
                <div className="head_mid">
                    {/* <Switch>
                        <Route path="/shouye" component={Shouye}></Route>
                        <Route path="/bored" component={Bored}></Route>
                        <Route path="/source" component={Source}></Route>
                        <Redirect to="/shouye"/> */}
                    {/* </Switch> */}
                </div>
            </div>
        )
    }
}
