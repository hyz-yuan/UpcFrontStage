import React, { Component } from 'react'
import {fetchPost} from "../../../static/util/fetch";
import ReactEcharts from 'echarts-for-react'


class organizationChart extends Component{
    state = {
        treeData : []
    };
    componentDidMount() {
        this.fetchData()
    }
    fetchData =()=>{
        let params={}
        fetchPost(global.constants.organizationChart,params)
            .then(
                res => this.setTeamStructureData(res),
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    }
    setTeamStructureData =(list)=>{
        this.setState({
            treeData: list
        })
    }

    onChange = value => {
        console.log(value);
        this.setState({ value });
    };
    changeData = (list) =>{
        list.forEach((item)=>{

        })
    }
    render(){
        let treeData =   this.state.treeData
        let option =  {
            tooltip: {
                // show：'true',//默认：true；是否显示提示框组件，包括提示框浮层和 axisPointer。
                trigger: 'item',//默认：item；触发类型。item：数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
                triggerOn: 'mousemove'
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : false,
            series:[
                {
                    name:'树形图',
                    type:'tree',
                    orient: 'vertical',  // vertical horizontal
                    rootLocation: {x: '50%', y: '15%'}, // 根节点位置  {x: 'center',y: 10}
                    nodePadding: 20,
                    layerPadding:40,
                    symbol: 'rectangle',
                    symbolSize: [70, 30],
                    borderColor:'black',
                    //节点类型
                    itemStyle: {
                            normal: {
                                color: '#fff',//节点背景色
                                label: {
                                    show: true,
                                    position: 'inside',
                                    textStyle: {
                                        color: 'black',
                                        fontSize: 15,
                                    //fontWeight:  'bolder'
                                    }
                                },

                            },
                    },
                    lineStyle: {
                        color: '#000',
                        width: 1,
                        curveness : 0,//曲度
                        type: 'solid' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    data: [treeData]
                }]
        }

        return(
            <div >
                <ReactEcharts  option={option} style={{height:'500px',width:'100%'}}/>
            </div>
        )
    }

}

export default organizationChart