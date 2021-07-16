import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Register from './Register'
import Admintor from './Admintor'
import Attendant from './Attendant'
import './index.css'

// import Register from './Register'

export default class Admin extends Component {
    // putShow1=()=>{
    //     this.props.history.push('/admin/admintor')
    // }
    render() {
        return (
            <div  className="adminadmin">
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
