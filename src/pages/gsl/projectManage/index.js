import React, {Component} from 'react'
import {Form, Button, Input, Select, Modal} from 'antd'
import {DatePicker} from 'antd';
import RightBodyHeaderBar from "../../../static/component/rightBodyHeaderBar";
import {fetchPost} from "../../../static/util/fetch";
import {createHashHistory} from "history";

import moment from 'moment';


class projectManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            projectName: "",
            place: "",
            manager: "",
            beginTime: "",
            endTime: "",
            remark: "",
            workPlaceName: "",
            managerName: "",
            workPlaceList: [],
            managerList:[],
            requestLoading: false,
        };
    }


    componentDidMount() {
        let projectId = this.props.match.params.id;
        console.log("项目id：" + projectId);
        if (projectId !== "0") {
            let params = {id: projectId};
            fetchPost(global.constants.getProject, params)
                .then(res => {
                    console.log(res.id);
                    this.setState({
                        id: res.id,
                        projectName: res.projectName,
                        place: res.place,
                        manager: res.manager,
                        beginTime: res.beginTime,
                        endTime: res.endTime,
                        remark: res.remark,
                        workPlaceName: res.workPlaceName,
                        managerName: res.managerName,
                    })
                });
        }
    };


    //提交项目数据
    postProject = () => {
        console.log(this.state);
        let projectId = this.props.match.params.id;
        //0为新建项目的标志，非0为修改项目的标志
        if (projectId === "0") {
            fetchPost(global.constants.addProject, this.state)
                .catch(e => console.log(e))
                .finally(() => {
                    this.setState({
                        requestLoading: false
                    });
                });
            //提示成功
            this.success("保存成功")
        } else {
            fetchPost(global.constants.changeProject, this.state)
                .catch(e => console.log(e))
                .finally(() => {
                    this.setState({
                        requestLoading: false
                    })
                });
            //提示操作成功
            this.success("修改成功");
        }
    };

    //消息提示框
    success = (msg) => {
        Modal.success({
            content: msg,
        });
    };

    goFather = () => {
        // sessionStorage.clear();
        createHashHistory().push('/sys/projectListNew')
    };

    handleGetInputValue = (event) => {
        this.setState({
            projectName: event.target.value,
        })
    };

    onChangeB = (value, dateString) => {
        this.setState({
            beginTime: dateString,
        })
    };

    onChangeE = (value, dateString) => {
        this.setState({
            endTime: dateString,
        })
    };

    //从后端动态获取workPlace的方法
    getWorkPlaceList() {
        const that = this;
        fetchPost(global.constants.workPlaceList)
            .then(function (res) {
                that.setState({
                    workPlaceList: res
                });
            });
    }

    //从后端获取manager的方法
    getManagerList(){
        const that = this;
        fetchPost(global.constants.managerList)
            .then(function (res) {
                that.setState({
                    managerList:res,
                })
            })
    }

    render() {
        console.log("aaa" + this.state.projectName);
        const layout = {
            labelCol: {span: 5},//设置距离做边框的距离
            wrapperCol: {span: 12},//宽度
        };
        const tailLayout = {
            wrapperCol: {offset: 8, span: 12},
        };


        const {Option} = Select;
        return (
            <div>
                <RightBodyHeaderBar title={"新增/修改项目"}/>
                <Form
                    {...layout}
                    // initialValues={{remember: false}}
                >
                    <Form.Item
                        label="项目名称"
                        rules={[{required: true, message: '请输入项目名称!'}]}
                    >
                        <Input
                            value={this.state.projectName}
                            onChange={this.handleGetInputValue}/>
                    </Form.Item>

                    <Form.Item
                        label="实施地点"
                        rules={[{required: true, message: '请选择项目地点!'}]}
                    >
                        <Select
                            defaultValue={Option.valueOf()}
                            value={this.state.workPlaceName}
                            onChange={value => this.setState({workPlaceName: value})}
                            //当获得焦点时调用
                            onFocus={() => this.getWorkPlaceList()}
                            allowClear
                        >
                            {
                                this.state.workPlaceList.map((item, i) => {
                                        return (
                                            <Option index={i} value={item.workPlace}>{item.workPlace}</Option>
                                        )
                                    }
                                )
                            }
                            {/*<Option value="1">北京</Option>*/}
                            {/*<Option value="2">东营</Option>*/}
                            {/*<Option value="3">青岛</Option>*/}
                            {/*<Option value="4">沈阳</Option>*/}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="项目负责人"
                        // name="manager"
                        rules={[{required: true, message: '请选择项目负责人!'}]}
                    >
                        <Select
                            defaultValue={Option.valueOf()}
                            // value={this.state.manager}
                            value={this.state.managerName}
                            onChange={value => this.setState({managerName: value})}
                            onFocus={()=>this.getManagerList()}
                            allowClear
                        >
                            {/*从祸端获取的动态*/}
                            {
                                this.state.managerList.map((item,index)=>{
                                    return(<Option index={index} value={item.id}>{item.realName}</Option>)
                                })
                            }
                            {/*<Option value="1">张三</Option>*/}
                            {/*<Option value="2">c</Option>*/}
                            {/*<Option value="3">ddd</Option>*/}
                            {/*<Option value="4">cxm</Option>*/}
                        </Select>
                    </Form.Item>
                    <Form.Item label="起止日期"
                               rules={[{required: true, message: '请选择日期!'}]}
                    >
                        <DatePicker
                            showTime
                            format='YYYY-MM-DD HH:mm:ss'
                            value={this.state.beginTime !== "" ? moment(this.state.beginTime) : null}
                            onChange={this.onChangeB}/>
                        —
                        <DatePicker
                            showTime
                            format='YYYY-MM-DD HH:mm:ss'
                            value={this.state.endTime !== "" ? moment(this.state.endTime) : null}
                            onChange={this.onChangeE}/>
                    </Form.Item>
                    <Form.Item label="备注"
                    >
                        <Input value={this.state.remark}
                               onChange={event => {
                                   this.setState({remark: event.target.value})
                               }}/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button onClick={() => this.goFather()}>
                            返回
                        </Button>&nbsp;&nbsp;
                        <Button type="primary" onClick={() => this.postProject()}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    };
}

export default projectManage;