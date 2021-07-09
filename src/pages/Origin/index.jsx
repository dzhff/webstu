import React, { Component } from 'react'
import { Route,Redirect,Switch } from 'react-router-dom'
import Head from './Head'
import Admin from './Admin'
import Hout from './Hout'

export default class Origin extends Component {
    render() {
        return (
            <div style={{width:'100%',height:'100%'}}>
                {/* <Head />
                <Link to="/admin">登录</Link>
                <Route path="/admin" component={Admin}></Route> */}
                <Switch>
                    <Route path="/head" component={Head}></Route>
                    <Route path="/admin" component={Admin}></Route>
                    <Route path="/hout" component={Hout}></Route>
                    <Redirect to="/head"/>
                </Switch>
            </div>
        )
    }
}
