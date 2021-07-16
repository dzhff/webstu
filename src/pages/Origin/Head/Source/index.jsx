import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Card,Pagination } from 'antd';
import showPit from './images/图片2.png'
import './index.css'

class Source extends Component {
    state={
        passageItem:[],
        crrentPage:parseInt(window.location.hash.slice(1), 0) || 1,
        total:-1
    }
    componentDidMount(){
        console.log(this.state.crrentPage);
        axios(`http://121.4.187.232:8080/passage/queryAllPassage?pageNo=${this.state.currentPage}&pageSize=${6}`).then(
            response=>{
                console.log(response.data.passageItem);
                console.log(response);
                this.setState({passageItem:response.data.passageItem})
                this.setState({total:response.data.passageItemCount})
            }
        )
        this.backCurrentPage()//刷新时回到刷新前的页数
        console.log(this.state.crrentPage);
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
    changgepage=(page)=>{
        const crrentPage=page
        console.log(page);
        this.setState({crrentPage},()=>{
            console.log(this.state.crrentPage);
            window.location.hash = `#${page}`
        })
        axios(`http://121.4.187.232:8080/passage/queryAllPassage?pageNo=${page}&pageSize=${6}`).then(
            response=>{
                console.log(response.data.passageItem);
                console.log(response.data.passageItemCount);
                this.setState({passageItem:response.data.passageItem})
                this.setState({total:response.data.passageItemCount})
            }
        )
    }
    backCurrentPage=()=>{
        this.changgepage(this.state.crrentPage)
    }
    render() {
        const {passageItem,crrentPage,total}=this.state
        // let src='src/pages/Origin/Head/Source/show.png'
        return (
            <div className="passageAll">
                <div className="fabiaoluang">资源</div>
                {
                    passageItem.map((passageItem)=>{
                        return(
                            
                                <Card className="passageOne"  key={passageItem.id} >
                                    <div className="fenbushow">
                                <div className="spanpic"><img style={{width:'100%',height:'50%'}} src={showPit} alt="" /></div>
                                <div className="pTotal">
                                <p className="p1">{passageItem.title}</p>
                                <p className="p2" onClick={this.tiao.bind(this,passageItem.id)}>详情请前往=></p>
                                <p className="p3">发表于{passageItem.time}</p>
                                </div>
                                </div>
                            </Card>
                        )
                    })
                }
                <Pagination current={crrentPage} onChange={this.changgepage} total={total} />
            </div>
        )
    }
}

export default withRouter(Source
    )