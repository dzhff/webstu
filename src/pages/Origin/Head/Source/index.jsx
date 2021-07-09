import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'antd';
import './index.css'

class Source extends Component {
    state={
        passageItem:[],
    }
    componentDidMount(){
        axios(`http://121.4.187.232:8080/passage/queryAllPassage?pageNo=${1}&pageSize=${6}`).then(
            response=>{
                console.log(response.data.passageItem);
                console.log(response);
                this.setState({passageItem:response.data.passageItem})
            }
        )
    }
    tiao=(id)=>{
        console.log(id);
        window.localStorage.setItem('detailID',id)
        this.props.history.push({
            pathname:`/head/detailpassage`
            // query:{obj:record.id}
        })
        // this.props.history.push({
        //     pathname:`/head/detailpassage`
        // })
        console.log(this);

    }
    render() {
        const {passageItem}=this.state
        return (
            <div className="passageAll">
                {
                    passageItem.map((passageItem)=>{
                        return(
                            <Card className="passageOne"  key={passageItem.id} >
                                <p className="p1">{passageItem.title}</p>
                                <p className="p2" onClick={this.tiao.bind(this,passageItem.id)}>详情请前往=></p>
                                <p className="p3">发表于{passageItem.time}</p>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}

export default withRouter(Source
    )