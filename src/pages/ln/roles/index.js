import * as React from "react";
import {Input, Checkbox, Row, Col, Button, Modal, Popconfirm, Select, Table, List, Menu} from "antd";
import {Component} from "react";
import {fetchPost} from "../../../static/util/fetch";
import zhCN from 'antd/es/locale/zh_CN';
import {Icon} from "@ant-design/compatible";
import {createHashHistory} from "history";
import RightBodyHeaderBar from "../../../static/component/rightBodyHeaderBar";
const { Option } = Select;
const {SubMenu} = Menu;

export default class roles extends Component{
    state={
        buttonValue:"新增",
        title:"角色管理",
        columns:[
            {title:'序号',dataIndex:'Index'},
            {title:'角色名称',dataIndex:'roleName'},
            {title:'权限名',dataIndex:'rightsName',width:500},
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                    <a onClick={() => this.updateRecord(record)}>修改</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteRole(record)}>
                        <a style={{ marginLeft:'3%' }}>删除</a>
                    </Popconfirm>
                    </span>
                ),
            },
        ],
        data:[],
        newRole:[],
        right:[],
        itemId:0,
        itemList:[],
        updateList:[],
        menus:[],
        flag: false,
        visible: false,
    }

    componentDidMount(){
        this.setRole()
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

        fetchPost(global.constants.setRightList,params)
            .then(
                res => this.setData(res)
            )
            .catch(e => console.log(e))
    }
    setProjectData =(list)=>{
        this.setState({
                data: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        deleteFlag:item.delFlag,
                        Index:index+1,
                        key: index,
                        flag: false
                    }
                }),
            }
        )
    }
    setData = (list) => {
        this.setState({menus:this.sub(list,0)})
    }
    i=0;
    sub =(list,pid)=>{
        return list.map((item, index) => {
            if(item.lastMenus==pid){
                if(pid==0){
                    return (<SubMenu   key={item.urls}
                                     title={
                                         <span>
                                             <Checkbox value={item.id}>{item.rights}</Checkbox>
                                         </span>
                                     }
                    >
                        {this.sub(list,item.id)}
                    </SubMenu>)
                }else{
                    return (<Menu.Item key={item.urls}>
                        <span>
                            <Checkbox value={item.id}>{item.rights}</Checkbox>
                        </span></Menu.Item>)
                }
            }
        })
    }

    render(){
        const {title,menus} = this.state
        return (
            <div>
                <RightBodyHeaderBar title={title}/>
                <Button onClick={this.showModal}>新增</Button>
                <Table dataSource={this.state.data}  pagination={{pageSize: 7}} columns={this.state.columns}/>
                <div  style={{height:"200px"}}>
                <Modal
                    destroyOnClose={true}
                    visible={this.state.visible}
                    title="新增/修改"
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
                    <Input defaultValue={this.state.newRole.roleName} onChange={(e)=>this.handleInsertName(e.target.value)}/>
                    <a>权限选择（可多选）</a>
                    <div style={{height:"250px" ,overflow:"auto"}}>
                        <Checkbox.Group defaultValue={this.state.newRole.rightsList} style={{ width: '100%' }} onChange={(value)=>this.handleInsertRights(value)}>
                            <Menu
                                style={{height: "250px"}}
                                multiple={"true"}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                            >
                                {menus}
                            </Menu>
                        </Checkbox.Group>
                    </div>
                </Modal>
                </div>
            </div>
        )
    }

    showModal = () => {
        this.setState({
            visible: true
        });

    };
    handleCancel = () => {
        this.setState({
            visible: false,
            flag:false,
            updateList:[],
            newRole:[],
            itemId:0
        });
    };
    insertNewRole = () => {
        if(this.state.flag) {
            let param = {
                roleId: this.state.itemId,
                roleName:this.state.newRole.roleName,
                rightsList: this.state.newRole.rightsList
            }
            fetchPost(global.constants.updateRole, param)
                .then(
                )
                .catch(e => console.log(e))
                .finally(() => {
                    this.setState({
                        requestLoading: false,
                        visible: false,
                        itemId:0,
                        flag:false,
                        updateList:[],
                        newRole: [],
                    })
                    this.setRole()
                })
        }
        else{
            let params = {
                roleName: this.state.newRole.roleName,
                rightsList: this.state.newRole.rightsList
            }
            fetchPost(global.constants.insertRole, params)
                .then(
                )
                .catch(e => console.log(e))
                .finally(() => {
                    this.setState({
                        requestLoading: false,
                        visible: false,
                        newRole: [],
                    })
                    this.setRole()
                })
        }
    };
    deleteRole=(record)=>{
        let params={id:record.roleId}
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
    setItemListData =(list)=>{
        this.setState({
            itemList: list.map((item, index) => {
                return {
                    ...item,
                    id:item.id,
                    deleteFlag:item.delFlag,
                    Index:index+1,
                    key: index,
                    flag: false
                }
            }),
        })
    }
    updateRecord=(record)=>{
        this.state.newRole.roleName=record.roleName;
        this.state.itemId=record.roleId;
        let params={id:record.roleId}
        fetchPost(global.constants.selectItem,params)
            .then(
                res => this.setItemListData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.state.updateList=[];
                for(let i=0;i<this.state.itemList.length;i++)
                {
                    this.state.updateList.push(this.state.itemList[i].rightId)
                }
                this.state.newRole.rightsList=this.state.updateList
                this.setState({
                    requestLoading: false,
                    visible: true,
                    flag:true
                })
            })
    }
    handleInsertName=(checkedValues)=>{
        this.state.newRole.roleName=checkedValues;
    }
    handleInsertRights=(checkedValues)=>{
        this.state.newRole.rightsList=checkedValues;
        console.log(this.state.newRole.rightsList)
    }
}

