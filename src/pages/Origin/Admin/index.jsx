import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Register from './Register'
import Admintor from './Admintor'
import Attendant from './Attendant'
// import Register from './Register'

export default class Admin extends Component {
    // putShow1=()=>{
    //     this.props.history.push('/admin/admintor')
    // }
    render() {
        return (
            <div style={{width:'100%',height:'100%'}}>
                <Switch>
                    <Route path="/admin/admintor" component={Admintor}></Route>
                    <Route path="/admin/register" component={Register}></Route>
                    <Route path="/admin/attendant" component={Attendant}></Route>
                    <Redirect to="/admin/admintor" />
                </Switch>
            </div>
        )
    }
}
