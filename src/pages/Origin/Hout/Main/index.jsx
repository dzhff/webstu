import React, { Component } from 'react'
import { Route,Switch,Redirect, } from 'react-router-dom'
import Charts from './Charts'
import Users from './Users'
import Notice from './Notice'
import Renew from './Renew'
import New from './New'
import Bored from './Bored'
import PushRenew from './PushRenew'
import './index.css'



export default class Main extends Component {
    render() {
        return (
            <div className="Hout_mainKuang">
                <Switch>
                    <Route path="/hout/charts" component={Charts}></Route>
                    <Route path="/hout/users" component={Users}></Route>
                    <Route path="/hout/new" component={New}></Route>
                    <Route path="/hout/renew" component={Renew}></Route>
                    <Route path="/hout/notice" component={Notice}></Route>
                    <Route path="/hout/bored" component={Bored}></Route>
                    <Route path="/hout/pushrenew" component={PushRenew}></Route>

                    <Redirect to="/hout/charts"/>
                </Switch>
            </div>
        )
    }
}
