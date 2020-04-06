import * as React from "react";
import {Table, Modal, Popconfirm, Button, Input, Radio} from "antd";
import RightBodyHeaderBar from "../../../static/component/rightBodyHeaderBar";
import {fetchPost} from "../../../static/util/fetch";

class projectListUser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            //项目列表
            visible:false,//人员设定页面控制开关
            membvisible:false,//人员管理页面控制开关
            inputvisible:false,//新增输入框modal控制
            loading: false,
            title:"项目列表",
            id:0,// 点击人员设定按钮传的值，实际获取的是对应项目的id，
            uId:0, //点击删除按钮传的值，实际获取的是小组对应的groupId
            iptValue:"",  //新增小组输入框获取输入框值
            userId:"",//人员管理页面  勾选身份时获取的对应userId
            groupId:"", //人员管理页面  勾选身份时获取所在小组的groupId
            uType:"", //人员管理页面  勾选身份时 赋值UserType
            gid:"",// 人员管理页面 勾选身份时获取对应的groupUserId
            //项目列表页面
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
            //人员设定页面
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
               </Popconfirm>}&nbsp;&nbsp;&nbsp;
                        <button className='commonTableCheckButton'
                    onClick={this.changeState.bind(this, record)}>人员管理</button>
    </span>
                    )

                },
            ],
            //人员管理页面
            membcolumns:[
                { title: '姓名',dataIndex: 'realName',
                    render: text => <a>{text}</a>,},
                { title: '工作地',dataIndex: 'workPlaceName',},
                { title: '技术领域',dataIndex: 'technologyName',},
                { title: '职 位',dataIndex: 'userType',

                    render: (text,record) => (
                        <span>
        <Radio.Group
            onChange={(e)=>this.onChangeuType(e,record)} >
                    <Radio value={2}>取消身份</Radio>
                    <Radio value={1}>组员</Radio>
                    <Radio value={0}>组长</Radio>
                  </Radio.Group>
            </span>
                    ),},
                { title: '工作内容',dataIndex: 'technologyName',},
            ],
            data:[], //存放项目列表页面数据
            personData:[],//存放人员设定页面数据
            membData:[],//存放人员管理页面数据
            requestLoading:true
        }}
    //点击人员设定打开Modal并传项目id值
    checkDetail = (record) => {
        this.setState({
            id:record.id,
            visible:true,
        },()=>{
            this.requestpersonData();
        });
    }

//点击人员管理打开Modal 并传groupUserId值(勾选身份用)
    changeState=(record)=>{
        this.setState({
            gid:record.groupUserId,
            membvisible:true
        },()=>{
            this.requestmembData();
        })}
        //人员管理页面 勾选身份时获取单选框的值，对应userId值
    onChangeuType=(e,record)=>{
        console.log( record.id);
        this.setState({
            userId:record.id,
            uType:e.target.value
        },()=>{
            this.requestGroupMemb(); //  勾选身份所需要的4个值传入setPerson接口
        })
    }
    requestGroupMemb(){
        let params={
               id:this.state.gid,
              userId:this.state.userId,
              groupId:this.state.mid,
              userType:this.state.uType,
           content:"null"}
        console.log("groupUserId"+this.state.gid)
        console.log("userId"+this.state.userId)
        console.log("groupId"+this.state.mid)
        console.log("userType"+this.state.uType)
        fetchPost('http://localhost:9080/test/project1/setPerson',params) //接口在后端 DZW文件夹
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

    //删除按钮 uId为小组id
    deleteGroup=(record)=>{
        this.setState({
            uId:record.id
        },()=>{
            this.requestDelGroup();
        })
    }
    requestDelGroup(){
        let params={id:this.state.uId,
            projectId:this.state.id}
        console.log(this.state.uId)
        fetchPost(global.constants.deleteGroup,params) //在后端xjs文件下 可以删除但返回值不对
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
    //新增小组Modal里的提交按钮
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
                alert("新增小组已成功请刷新页面")
                this.setState({
                    requestLoading: false
                })
            })
    }

    //请求人员列表页面接口
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

        fetchPost('http://localhost:9080/test/project/getGroupPerson',params) //  后端xjs/project下
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

//请求人员管理页面接口
    requestmembData = () => {
        this.setState({
            requestLoading: true
        })
        let params={
            id:1,
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
    //赋予项目列表页面表格数据
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
    //赋予人员设定页面表格数据
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
    //赋予人员管理页面表格数据
    setmembData = (list) => {
        this.setState({
            membData:list.map((item, index) => {
                return {
                    ...item,
                    key: index,

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