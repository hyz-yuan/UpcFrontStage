import React,{Component} from 'react';
import {fetchPost} from "../../../static/util/fetch";
import {Table,Modal} from 'antd';
import moment from "moment";
import UpdateReader from "./UpdateReader";



class MessageList extends Component{

    state={
        data:[],
        queryTerms:[],
        requestLoading:true,
        isVisible:false
    }
    requestList= ()=>{
        fetchPost("http://localhost:9080/test/message/getList")
            .then(
                res => this.setData(res)

            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    }
    componentDidMount(){
        this.requestList()
    }
    setData = (list) => {
        this.setState({
            data: list.map((item, index) => {
                return {
                    ...item,
                    beginTime:moment(parseInt(item.beginTime)).format("YYYY-MM-DD"),
                    endTime:moment(parseInt(item.endTime)).format("YYYY-MM-DD"),
                    updateTime:moment(parseInt(item.updateTime)).format("YYYY-MM-DD"),
                    key: index
                }
            })
        })
    }

    handleClick = (item)=>{
        this.setState({
            isVisible:true,
            queryTerms:item
        })

    }


    render() {

        const columns = [
            {
                title: '序号',
                dataIndex: '',
                render:(text, record,index)=>(
                    ${index+1}
                    <a onClick={()=>this.handleClick(record)}>{text}</a>)
            },
            { title: '日期',dataIndex: 'operatorTime'},
            {title: '发送人',dataIndex: 'operator'},
            {title: '来源',dataIndex: 'projectName'},
            {title: '消息内容',dataIndex: 'content'},

        ];
        const data = this.state.data
        return(
            <div>
                <Table dataSource={data} columns={columns} />

                <Modal
                    title={"工作详情"}
                    visible={this.state.isVisible}
                    width={1000}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                    onCancel={()=>{
                        this.setState({
                            isVisible:false,
                            queryTerms:''
                        })
                    }}
                >
                    <UpdateReader
                        queryTerms={this.state.queryTerms||{}}
                    />
                </Modal>

            </div>
        )

    }
}
export default MessageList;