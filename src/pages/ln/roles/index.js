import * as React from "react";
import {Input, Checkbox, Row, Col, Button, Modal, Popconfirm, Select, Table} from "antd";
import {Component} from "react";
import {fetchPost} from "../../../static/util/fetch";
import zhCN from 'antd/es/locale/zh_CN';
const { Option } = Select;
export default class roles extends Component{
    state={
        buttonValue:"新增",
        columns:[
            {title:'序号',dataIndex:'Index'},
            {title:'角色名称',dataIndex:'roleName',
                render:(text,record)=>(
                    <span>
               <input
                   value={this.state.data[record.key].roleName}
                   onChange={(e)=>this.handleChange({roleName:e.target.value},record)}
                   onBlur={(e)=>this.inputOnBlur(record)}
               />
               </span>)},
            {title:'权限名',dataIndex:'rights',
                render:(text,record)=>(
                    <span>
               <input
                   value={this.state.data[record.key].rights}
                   onChange={(e)=>this.handleChange({rights:e.target.value},record)}
                   onBlur={(e)=>this.inputOnBlur(record)}
               />
               </span>),
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteRole(record)}>
                        <a>删除</a>
                    </Popconfirm>
                ),
            },
        ],
        data:[],
        newRole:[],
        loading: false,
        visible: false,
    }

    componentDidMount(){
        this.setRole()
    }

    setProjectData =(list)=>{
        this.setState({
                data: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        deleteFlag:item.deleteMark,
                        Index:index+1,
                        key: index,
                        flag: false
                    }
                }),
            }
        )
    }
    setRole=()=>{
        let params={}
        fetchPost(global.constants.setRoleList,params)
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
    render(){
        return (
            <div>
                <Button onClick={this.showModal}>新增</Button>
                <Table dataSource={this.state.data} columns={this.state.columns}/>
                <Modal
                    destroyOnClose={true}
                    visible={this.state.visible}
                    title="新增"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.insertNewRole}>
                            提交
                        </Button>,
                    ]}>
                    <a>角色名称</a>
                    <Input  onChange={(e)=>this.handleInsertName(e.target.value)}/>
                    <a>权限选择（可多选）</a>
                    <Checkbox.Group style={{ width: '100%' }} onChange={(value)=>this.handleInsertRights(value)}>
                        <Col>
                            <Col span={8}>
                                <Checkbox value="项目管理">项目管理</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value=" 任务分配">任务分配</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="工作详情">工作详情</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="工作汇报">工作汇报</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="任务列表">任务列表</Checkbox>
                            </Col>
                        </Col>
                    </Checkbox.Group>
                </Modal>
            </div>
        )
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    insertNewRole = () => {
        this.state.newRole.finRights=this.state.newRole.rights[0]
        for(let i=1;i<this.state.newRole.rights.length;i++)
        {
            this.state.newRole.finRights=this.state.newRole.finRights+"、"+this.state.newRole.rights[i];
            console.log(this.state.newRole.finRights)
        }
        let params={
            roleName:this.state.newRole.roleName,
            rights:this.state.newRole.finRights
        }

        fetchPost(global.constants.insertRole,params)
            .then(
                res => this.setProjectData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false,
                    visible:false,
                    newRole:[],
                })
            })
    };
    deleteRole=(record)=>{
        let params={id:record.id}
        fetchPost(global.constants.deleteRole,params)
            .then(
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
                this.setRole();
            })
    }

    handleChange = (value, record) => {
        for (let i in value) {
            record[i] = value[i];//这一句是必须的，不然状态无法更改
        }
        this.setState({
            roleName:record,
            rights:record,
        })
    }
    handleInsertRights=(checkedValues)=>{
         this.state.newRole.rights=checkedValues;
    }
    handleInsertName=(checkedValues)=>{
        this.state.newRole.roleName=checkedValues;
    }

    inputOnBlur=(record)=>{
        let params={id:record.id,
            roleName:record.roleName,
            rights:record.rights,
        }
        fetchPost(global.constants.updateRole,params)
            .then(
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
                this.setRole();
            })
    }
}