import * as React from "react";
import {Table, Modal,Popconfirm,Button,Input} from "antd";
import RightBodyHeaderBar from "../../../static/component/rightBodyHeaderBar";
import {fetchPost} from "../../../static/util/fetch";

class projectListUser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            //项目列表
            visible:false,
            membvisible:false,
            inputvisible:false,
            loading: false,
            title:"项目列表",
            id:0,
            mid:0,
            uId:0,
            userType:"",
            groupId:"",
            iptValue:"",
            columns:[
                { title: '序号',dataIndex: 'number',
                    render:(text,record,index)=>`${index+1}`
                },
                { title: '项目名称',dataIndex: 'projectName',},
                { title: '实施地',dataIndex: 'workPlaceName',},
                { title: '起 止 时 间',dataIndex: 'time',},
                { title: '操 作',dataIndex: 'operate',
                    render:(text,record)=>(  <span>
                        <button className='commonTableCheckButton'
                                onClick={this.checkDetail.bind(this, record)}>人员设定</button>
                    </span>)}
            ],
            //人员设定
            column:[
                { title: '序号',dataIndex: 'number',
                    render:(text,record,index)=>`${index+1}`},

                { title: '小组名称',
                    dataIndex: 'groupName',
                },
                { title: '小组人员',dataIndex: 'realName', },
                { title: '操 作',dataIndex: 'operate',
                    render: (text, record) => (
                        <span>
               {<Popconfirm title="确定要删除对应小组吗？" okText="确定" cancelText="取消"
                            onConfirm={this.deleteGroup.bind(this,record)}>
                   <button className='commonTableStopButton'>删 除</button>
               </Popconfirm>}
                    </span>
                    )

                },
            ],
            //人员管理
            membcolumns:[
                { title: '姓名',dataIndex: 'userName',
                    render: text => <a>{text}</a>,},
                { title: '工作地',dataIndex: 'workPlaceName',},
                { title: '技术领域',dataIndex: 'technologyName',},
                { title: '职 位',dataIndex: 'opsition',
                    render: (text,record) => (
                        <span>
              {record.technology === 5 ? "组长" : "组员"}
            </span>
                    ),},
                { title: '工作内容',dataIndex: 'technologyName',},
            ],
            data:[],
            membData:[],
            personData:[],
            requestLoading:true
        }}
    //点击人员设定打开Modal
    checkDetail = (record) => {
        this.setState({
            id:record.id,
            visible:true,
        },()=>{
            this.requestpersonData();
        });
    }

//点击人员管理打开Modal
    changeState=(record)=>{
        this.setState({
            mid:record.groupId,
            membvisible:true
        },()=>{
            this.requestmembData();
        })}
    //删除按钮
    deleteGroup=(record)=>{
        this.setState({
            uId:record.groupId
        },()=>{
            this.requestDelGroup();
        })
    }
    requestDelGroup(){
        let params={id:this.state.uId,
            projectId:this.state.id}
        console.log(this.state.uId)
        fetchPost(global.constants.deleteGroup,params)
            .then(
                res => this.setpersonData(res),
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    }
    //新增按钮
    handleAdd=()=>{
        this.setState({
            inputvisible:true
        })
    }
    //新增小组提交按钮
    handleChangeState=(e)=>{
        this.setState({iptValue:e.target.value})
    }
    handleOk = (e) => {
        this.setState({
                loading: true },
            ()=>{
                this.requestAddData();
            });
        setTimeout(() => {
            this.setState({ loading: false, inputvisible: false });
        }, 1500);

        console.log(this.state.iptValue)
    };
    //新增接口
    requestAddData(){
        let params={groupName:this.state.iptValue,
            projectId:this.state.id}
        console.log(this.state.iptValue)
        fetchPost(global.constants.addGroup,params)
            .then(
                res => this.setpersonData(res),
            )
            .catch(e => console.log(e))
            .finally(() => {
                alert("新增小组已成功添加到数据库中")
                this.setState({
                    requestLoading: false
                })
            })
    }

    //初始表格接口
    componentDidMount() {
        let params={id:1}
        fetchPost(global.constants.projectList,params)
            .then(
                res => this.setData(res),
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    }

    //请求人员设定页面接口
    requestpersonData = () => {
        this.setState({
            requestLoading: true,
        })
        let params = {
            projectId:this.state.id
        }
        console.log("pid"+this.state.id)

        fetchPost(global.constants.getGroupList,params)
            .then(
                res => this.setpersonData(res),
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    }

//请求人员管理数据
    requestmembData = () => {
        this.setState({
            requestLoading: true
        })
        let params={
            id:this.state.mid,
            pageNo:1
        }
        console.log("groupId"+this.state.mid)
        fetchPost(global.constants.getPersonList,params)
            .then(
                res => this.setmembData(res),
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    }
    //赋予项目列表表格数据
    setData = (list) => {
        this.setState({
            data: list.map((item, index) => {
                return {
                    ...item,
                    time:item.beginTime+"-"+item.endTime,
                    key: index
                }
            })
        })
    }
    //赋予人员设定表格数据
    setpersonData = (list) => {
        this.setState({
            personData: list.map((item, index) => {
                return {
                    ...item,
                    key: index
                }
            })
        })
    }
    //赋予人员管理表格数据
    setmembData = (member) => {
        this.setState({
            membData: member.map((item, index) => {
                return {
                    ...item,
                    key: index
                }
            })
        })
    }




    render(){
        const {data,columns,title,personData,column,membData,membcolumns,loading}=this.state;
        return (
            <div>
                <RightBodyHeaderBar title={title}/>
                <Table dataSource={data}  pagination={{pageSize:5}} columns={columns} key="id"/>
                <Modal
                    className='myModal'
                    footer={false}
                    width={1000}
                    destroyOnClose={true}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    keyboard={true}
                    visible={ this.state.visible}
                    maskClosable={true}
                >
                    <RightBodyHeaderBar title={"人员设定"}/>
                    <Button type="dashed" onClick={this.handleAdd} >
                        新增
                    </Button>  &nbsp;&nbsp;
                    <Button type="dashed" onClick={this.changeState.bind()}>人员管理</Button>
                    <Table dataSource={personData} pagination={{pageSize:5}} columns={column}/>
                </Modal>
                <Modal
                    className='myModal'
                    footer={false}
                    width={1000}
                    destroyOnClose={true}
                    onCancel={()=>{
                        this.setState({
                            membvisible:false
                        })
                    }}
                    keyboard={true}
                    visible={ this.state.membvisible}
                    maskClosable={true}
                >
                    <RightBodyHeaderBar title={"人员管理"}/>

                    <Table dataSource={membData} pagination={{pageSize:5}} columns={membcolumns}/>
                </Modal>
                <Modal
                    className='myModal'
                    title="新增小组"
                    footer={[
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            提交
                        </Button>,
                    ]}
                    destroyOnClose={true}
                    onCancel={()=>{
                        this.setState({
                            inputvisible:false
                        })
                    }}
                    keyboard={true}
                    visible={ this.state.inputvisible}
                    maskClosable={true}>
                    <form onSubmit={this.handleOk}>
                        <Input type="text"    value={this.state.iptValue} onChange={this.handleChangeState.bind(this)} placeholder="请输入小组名称" />
                    </form>
                </Modal>
            </div>


        )
    }
}

export default projectListUser