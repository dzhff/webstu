import React, { Component } from 'react'
import axios from 'axios';
import * as echarts from 'echarts'

export default class Charts extends Component {
    // constructor(props){
    //     super(props)
    // }
    state={
        passageItemCount:-1,
        userLength:-1,
        boredLength:-1

    }
    componentDidMount(){
        console.log(this.props);
        const token = window.sessionStorage.getItem('admintorToken')
        let passageItemCount=-1
        let boredLength=-1
        let userLength=-1
        // 文章
        axios({
            method:'get',
            url:`http://121.4.187.232:8080/passage/queryAllPassage?pageNo=${1}&pageSize=${100}`,
            headers:{
                token:token
            }
        }).then(
            response=>{
                console.log(response);
                console.log(response.data.passageItem[0].time);
                let Num=""
                Num=response.data.passageItem[0].time
                // Num.splice(10,10)
                console.log(Num);

                passageItemCount=response.data.passageItemCount
                // this.setState({passageItemCount})

                // 用户
                axios({
                    method:'post',
                    url:`http://121.4.187.232:8080/admin/queryAllUser`,
                    headers:{
                        token:token
                    }
                }).then(
                    response=>{
                        console.log(response.data.length);
                        userLength=response.data.length
                        // this.setState({userLength})

                        // 大厅
                        axios({
                            method:'get',
                            url:`http://121.4.187.232:8080/hallComment/queryAllHallComment`,
                            headers:{
                                token:token
                            }
                        }).then(
                            response=>{
                                console.log(response.data.length);
                                boredLength=response.data.length
                                // this.setState({boredLength})

                                var myChart = echarts.init(document.getElementById('main'));


        // const {boredLength,userLength,passageItemCount} =this.state
        console.log(boredLength,userLength,passageItemCount);
        var option = {
            // title: {
            //     text: '总体情况'
            // },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["当前用户","文章","大厅评论","图片"]
            },
            yAxis: {},
            series: [{
                name: '数量',
                type: 'bar',
                data: [userLength, passageItemCount, boredLength, 20]
            }]
        };
        // var option={
        //     title: {
        //         text: '总体情况'
        //     },
        //     series : [
        //         {
        //             name: '访问来源',
        //             type: 'pie',
        //             radius: '55%',
        //             data:[
                       
        //                 {value:userLength, name:'用户信息'},
        //                 {value:boredLength, name:'大厅留言板'},
        //                 {value:passageItemCount, name:'文章数量'},
                        
        //             ]
        //         }
        //     ]
        // }
         // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option);
                            }
                        )
                    }
                )
            }
        )
        

        
    }

    render() {
        return (
            <div>
                <div id="main" style={{width: '600px',height:'400px',margin:'20px auto', fontSize:'30px'}}></div>
            </div>
        )
    }
}
