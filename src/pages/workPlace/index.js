import React, { Component } from  'react'
import {Button, message,Input,Table} from "antd";
import {fetchPost} from "../../util/fetch";
import RightBodyHeaderBar from "../../component/rightBodyHeaderBar";
export  default class workPlace extends Component{

    state={
        columns:[
            // {
            //     title: '序号',
            //     dataIndex: 'id',
            //     key:'id'
            // },

            {
                title: '地方',
                dataIndex: 'workPlace',
                editable:true,
                key:'workPlace',
                render:(text,record)=>(

                    <Input size="default" value={record.workPlace}

                           onChange={(e)=>this.inputChange({workPlace:e.target.value},record)}

                           onBlur={this.updateChange.bind(this,record)}
                    />

                )
            },
            {
                title:'操作',
                dataIndex: '123',
                key:'123',
                render:(text,record)=>(
                    <span>
                        <Button onClick={this.deleteChange.bind(this,record)}>删除</Button>
                     </span>
                )
            },

        ],
        data:[],
        title:'地理管理',
    };

    componentDidMount() {
        let params={};
        fetchPost(global.constants.WorkPlaceSelect,params)
            .then(
                res => this.setProjectData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })

    }

    setProjectData=(list)=>{
        this.setState({

            data: list.map((item, index) =>{
                return {
                    ...item,
                    key: index,
                }

            })
        })


    };
    insertName=()=>{
        let params={};
        fetchPost(global.constants.insertWorkPlace,params)
            .then(
                res => this.setProjectData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                });
                this.requestData(); })
    };

    inputChange=(e,record)=> {
        console.log(e);
        for(let i in e){
            record[i]=e[i];
        }
        this.setState({
            workPlace:e,

        })
    };
    updateChange=(record)=>{
        let params1={
            id:record.id,
            workPlace:record.workPlace,


        };
        fetchPost(global.constants.updateWorkPlace,params1)
            .then(
                res => {message.info("更新成功")

                }
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                });
                this.requestData();})
    };
    deleteChange=(record)=>{
        let params1={id:record.id,};
        fetchPost(global.constants.deleteWorkPlace,params1)
            .then(
                res => {message.info("删除成功");
                    this.requestData();
                })

            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })

            })

    };
    requestData=()=>{
        let params={};
        fetchPost(global.constants.WorkPlaceSelect,params)
            .then(
                res => this.setProjectData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    };
    render(){
        const {title} = this.state;
        return(
            <div style={{width:'100%'}}>
                <RightBodyHeaderBar title={title}/>
                <Table dataSource={this.state.data} columns={this.state.columns} rowKey={'key'}/>
                <Button onClick={this.insertName} type="primary" style={{borderRadius:'6px',marginLeft:'6px'}}>新增</Button>
            </div>
        )
    }
}