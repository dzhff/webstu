import React, { Component } from 'react'
import './index.css'
import Lantern from '../../../../components/Lantern'
import Gonggao from './Gonggao'
import Bored from '../Bored'
import Source from '../Source'
// import qs from 'querystring'

export default class Shouye extends Component {
    state={
        currentName:''
    }
    componentDidMount(){

    } 
    render() {
        // const username=this.props.location.state
        // console.log(username);
        return (
            <div style={{width:'100%',height:'100%'}}>
                <div className="banner_top"> 
                    <div className="banner_lar">
                        <Lantern />
                    </div>
                    <div>
                    <div className="gonggao">
                        <Gonggao />
                    </div>
                    {/* <div className="dengkuang">
                        <DengKuang/>
                    </div> */}
                    </div>
                </div>
                <div className="banner_source">
                    <Source/>
                </div>
                <div className="banner_bored">
                    <Bored />
                </div>
            </div>
        )
    }
}
