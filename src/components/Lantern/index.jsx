import React, { Component } from 'react'
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import './index.css'
// import { Button } from 'antd';
import img1 from './images/p1.jpg'
import img2 from './images/p2.jpg'
import img3 from './images/p3.jpg'


import 'antd/dist/antd.css';
import './index.css'

export default class Lantern extends Component {
    render() {
        // const contentStyle = {
        //     height: '100px',
        //     color: '#fff',
        //     lineHeight: '100px',
        //     textAlign: 'center',
        //     background: '#364d79',
        //   };
        return (
            <div className='lantern'>
                {/* <Button type="primary">Primary Button</Button> */}
                <Carousel autoplay>
                <div>
                    <h3><img src={img1} style={{height:'100%'}} alt="logo" />></h3>
                </div>
                <div>
                    <h3><img src={img2}  alt="logo" />></h3>
                </div>
                <div>
                    <h3><img src={img3}  alt="logo" />></h3>
                </div>
                </Carousel>,
                {/* mountNode, */}
            </div>
        )
    }
}
