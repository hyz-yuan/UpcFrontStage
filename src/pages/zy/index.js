import React, { Component } from  'react'
import {Button, Modal, Table} from "antd";
import {fetchPost} from "../../../static/util/fetch";
import MessageInsert from "./MessageInsert";
import moment from 'moment';



 class Message extends  Component{


    
    state={
        title:"消息中心",
        columns:[
            { title: '项目名称',dataIndex: 'projectName'},
            { title: '日期',dataIndex: 'operatorTime'},
            {title: '发送人',dataIndex: 'operator'},
            {title: '来源',dataIndex: 'projectName'},
            {title: '消息内容',dataIndex: 'content'},
            {title: '操作',dataIndex: 'state',},
        ],
       
        messageList:[],
        visible:false,
        insertData:[],


    }
     requestList=()=>{
         let params = {
             id:2

         }
         fetchPost("http://localhost:9080/test/message/getList",params)
             .then( res => this.setMessageData(res))
             .catch(e => console.log(e))
             .finally(() => {

             })

     }
    componentDidMount() {
        this.requestList()

    }
    setMessageData = (list) =>{
        this.setState({
           messageList:list.map((item, index) => {
                return {
                    ...item,
                    operatorTime:moment(parseInt(item.operatorTime)).format("YYYY-MM-DD"),
                    key: index
                }
            })
        });
    }
    handleOperator = ()=>{
        this.setState({
            visible:true

        })
    }
    handleSubmit = ()=>{
       

        let data = this.state.insertData
        console.log(data)


        let params = {
            ...data,
            projectId:2
            
        }
        fetchPost("http://localhost:9080/test/message/insertNewMessage",params)
            .then()
            .finally(()=>{
                this.setState({
                    visible:false,
                    insertData:''
                })
                 this.requestList();

            })
    }

    render() {
        const data = this.state.messageList||{}
        return(
            <div>
                <Table dataSource={data} columns={this.state.columns}/>
                <Button type="primary"  onClick={()=> {this.handleOperator()}}>添加记录</Button>
                <Modal
                    title={"消息发送"}
                    visible={this.state.visible}
                    width={1000}
                    maskClosable={false}
                    destroyOnClose={true}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.setState({
                            visible:false,
                            insertData:''
                        })
                    }}
                >
                    <MessageInsert
                        insertData={this.state.insertData||{}}
                        dispatchData={(data)=>{this.setState({insertData:data})}}
                    />
                </Modal>
            </div>

        )
    }
}
export default  Message;

