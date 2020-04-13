import * as React from "react";
import {Radio, Button, Popconfirm, Select, Table, Input, Modal} from "antd";
import {Component} from "react";
import {fetchPost} from "../../../static/util/fetch";
import RightBodyHeaderBar from "../../../static/component/rightBodyHeaderBar";
const { Option } = Select;
export default class test extends Component{
    state={
        title:"人员管理",
        buttonValue:"查询",
        selectName:"",
        selectTec:0,
        columns:[
            {title:'序号',dataIndex:'Index'},
            {title:'工作地',dataIndex:'workPlace',
                render:(text,record)=>(
                    <span>
                 <Select
                     defaultValue={this.state.data[record.key].workPlaceName}
                     style={{ width: '100%' }}
                     onChange={(value)=>this.handleChange({workPlace:value},record)}
                     onBlur={(e)=>this.inputOnBlur(record)}>
                      {this.state.area.map((item,index) => <Option key={index} value={item.id}>{item.workPlace}</Option>)}
                 </Select>
               </span>)},
            {title:'姓名',dataIndex:'realName'},
            {title:'技术领域',dataIndex:'technology',
                render:(text,record)=>(
                    <span>
              <Select
                  defaultValue={this.state.data[record.key].technologyName}
                  style={{ width: '100%' }}
                  onChange={(value)=>this.handleChange({technology:value},record)}
                  onBlur={(e)=>this.inputOnBlur(record)}>
                      {this.state.technology.map((item,index) => <Option key={index} value={item.id}>{item.technologyName}</Option>)}
                 </Select>
               </span>)},
            {title:'领域定位',dataIndex:'fieldPosition',
                render:(text,record)=>(
                    <span>
                  <Radio.Group
                      onChange={(e)=>this.handleSetField(e.target.value,record)} value={this.state.data[record.key].fieldPosition}>
                    <Radio value={1}>组长</Radio>
                    <Radio value={2}>小组长</Radio>
                    <Radio value={3}>组员</Radio>
                  </Radio.Group>
               </span>)},
            {title:'当前角色',dataIndex:'role',
                render:(text,record)=>(
                    <span>
               <Select
                   defaultValue={this.state.data[record.key].roleName}
                   style={{ width: '100%' }}
                   onChange={(value)=>this.handleChange({role:value},record)}
                   onBlur={(e)=>this.inputOnBlur(record)}>
                      {this.state.role.map((item,index) => <Option key={index} value={item.id}>{item.roleName}</Option>)}
                 </Select>
               </span>)},
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={() => this.changePass(record)}>修改密码</a>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteEmployee(record)}>
                        <a style={{ marginLeft:'3%' }} >删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ],
        data:[],
        area:[],
        role:[],
        technology:[],
        selectEmployee:[],
        id:"",
        password:"",
        visible: false,
        visible1: false,
    }

    componentDidMount(){
        this.setEmployee()
    }

    handleSetField=(checkedValues,record)=>{
       record.fieldPosition=checkedValues
        this.inputOnBlur(record)
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
                    }
                }),
            }
        )
    }
    setRoleData =(list)=>{
        this.setState({
                role: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        deleteFlag:item.delFlag,
                        Index:index+1,
                        key: index,
                    }
                }),
            }
        )
    }
    setTechnologyData =(list)=>{
        this.setState({
            technology: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        deleteFlag:item.delFlag,
                        Index:index+1,
                        key: index,
                    }
                }),
            }
        )
    }
    setWorkPlaceData =(list)=>{
        this.setState({
            area: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        deleteFlag:item.delFlag,
                        Index:index+1,
                        key: index,

                    }
                }),
            }
        )
    }
    setEmployee=()=>{
        let params={}
        fetchPost(global.constants.getEmployee,params)
            .then(
                res => this.setProjectData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })

            })

        fetchPost(global.constants.setRoleList,params)
            .then(
                res => this.setRoleData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
        fetchPost(global.constants.selectWorkPlace,params)
            .then(
                res => this.setWorkPlaceData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })

            })

        fetchPost(global.constants.selectTechnology,params)
            .then(
                res => this.setTechnologyData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
        }
    changePass=(record)=>{
        this.setState({
            id: record.id,
            visible1: true });
    }
    render(){
        return (
            <div>
                <RightBodyHeaderBar title={this.state.title}/>
                <Input  style={{ width: '20%',marginRight:'3%' }} placeholder="员工姓名" onChange={(e)=>this.handleSetName(e.target.value)} />
                <Select
                    style={{ width: '15%',marginRight:'2%' }}
                    onChange={(value)=>this.handleSetRole(value)}>
                    {this.state.technology.map((item,index) => <Option key={index} value={item.id}>{item.technologyName}</Option>)}
                </Select>
                <Button onClick={()=>this.selectEmployee()}>查询</Button>
                <Modal
                    title="查询结果"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                >
                    <p>姓名：{this.state.selectEmployee.realName}</p>
                    <p>工作地：{this.state.selectEmployee.workPlaceName}</p>
                    <p>技术领域：{this.state.selectEmployee.technologyName}</p>
                    <p>领域定位：
                        {this.state.selectEmployee.fieldPosition===1?"组长":""}
                        {this.state.selectEmployee.fieldPosition===2?"小组长":""}
                        {this.state.selectEmployee.fieldPosition===3?"组员":""}</p>
                    <p>当前角色：{this.state.selectEmployee.roleName}</p>
                </Modal>
                <Modal
                    title="修改密码"
                    visible={this.state.visible1}
                    onOk={()=>this.handleOk1()}
                    onCancel={this.handleCancel1}
                >
                    <a>请输入新密码</a>
                    <Input  onChange={(e)=>this.handleInputPass(e.target.value)}/>
                </Modal>
                <Table dataSource={this.state.data} pagination={{pageSize: 7}} columns={this.state.columns}/>
            </div>
        )
    }
    handleOk1=()=>{
        let params={
            id:this.state.id,
            password:this.state.password,
        }
            fetchPost(global.constants.changePassword,params)
                .then(
                    res=>this.setState({
                        visible1: false })
                )
                .catch(e => console.log(e))
                .finally(() => {
                    this.setState({
                        requestLoading: false
                    })
                    console.log(this.state.selectEmployee)
                })
    }
    handleInputPass=(checkedValues)=>{
        this.setState({password:checkedValues})
    }
    handleCancel1 = () => {
        this.setState({ visible1: false });
    };
    handleSetName=(value)=>{
        this.setState({
            selectName:value,
        })
    }
    handleSetRole=(value)=>{
        this.setState({
            selectTec:value,
        })
    }
    selectEmployee=()=>{
        let params={
            input:this.state.selectName,
            technology:this.state.selectTec,
        }
        fetchPost(global.constants.searchEmployee,params)
            .then(
                res=>this.setState({
                    selectEmployee:res,
                    visible: true,
                })
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
                console.log(this.state.selectEmployee)
            })
    }
    deleteEmployee=(record)=>{
        let params={id:record.id}
        fetchPost(global.constants.deleteUser,params)
            .then(
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
                this.setEmployee();
            })
    }
    handleChange = (value, record) => {
        for (let i in value) {
            record[i] = value[i];//这一句是必须的，不然状态无法更改
        }
        this.setState({
            workPlace:record,
        })
    }
    inputOnBlur=(record)=>{
        let params={id:record.id,
            workPlace:record.workPlace,
            technology:record.technology,
            fieldPosition:record.fieldPosition
        }
        fetchPost(global.constants.updateUser,params)
            .then(
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    }
}