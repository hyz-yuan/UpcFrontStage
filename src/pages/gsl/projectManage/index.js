import React, {Component} from 'react'
import {Form, Button, Input, Select, Modal} from 'antd'
import {DatePicker,message} from 'antd';
import RightBodyHeaderBar from "../../../static/component/rightBodyHeaderBar";
import {fetchPost} from "../../../static/util/fetch";
import {createHashHistory} from "history";

import moment from 'moment';


class projectManage extends Component {

    //注意：此代码里共有三个关于【项目地点】的变量
    //place:指project表里的数字id，
    //workPlace:指work_place表映射到mapper里的
    //workPlaceName:后端返回的名称
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            projectName: "",
            place: null,
            manager: null,
            beginTime: "",
            endTime: "",
            remark: "",
            workPlaceName: "",
            managerName: "",
            workPlaceList: [],
            managerList: [],
            requestLoading: false,
        };
    }


    componentDidMount() {
        let projectId = this.props.match.params.id;
        console.log("项目id：" + projectId);
        //非0为修改项目的标志
        if (projectId !== "0") {
            let params = {id: projectId};
            fetchPost(global.constants.getProject, params)
                .then(res => {
                    this.setState({
                        id: res.id,
                        projectName: res.projectName,
                        place: res.workPlaceName,
                        manager: res.managerName,
                        beginTime: moment(res.beginTime).format("YYYY-MM-DD"),
                        endTime: moment(res.endTime).format("YYYY-MM-DD"),
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
        let params={
            id: this.state.id,
            projectName: this.state.projectName,
            place: this.state.place,
            manager: this.state.manager,
            beginTime: this.state.beginTime + ' 00:00:00',
            endTime: this.state.endTime + ' 00:00:00',
            remark: this.state.remark,
        };
        //0为新建项目的标志，非0为修改项目的标志
        if (projectId === "0") {
            fetchPost(global.constants.addProject, params)
                .catch(e => console.log(e))
                .finally(() => {
                    this.setState({
                        requestLoading: false
                    });
                });
            //提示成功
            this.success("保存成功")
        } else {
            fetchPost(global.constants.changeProject, params)
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

    //消息提示框方法
    success = (msg) => {
        Modal.success({
            content: msg,
            onOk:this.goFather
        });
    };

    goFather = () => {
        sessionStorage.clear();
        createHashHistory().push('/sys/projectListNew')
    };

    handleGetInputValue = (event) => {
        this.setState({
            projectName: event.target.value,
        })
    };

    //时间选择框改变的回调函数,默认时间：日期当天的0点
    onChangeBeginTime = (value, dateString) => {
        this.setState({
            beginTime: dateString,
        })
    };

    onChangeEndTime = (value,dateString) => {
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
    getManagerList() {
        const that = this;
        fetchPost(global.constants.managerList)
            .then(function (res) {
                that.setState({
                    managerList: res,
                })
            })
    }

    render() {
        // console.log("打印项目名称" + this.state.projectName);
        const layout = {
            labelCol: {span: 5},//设置距离做边框的距离
            wrapperCol: {span: 9},//宽度
        };
        const tailLayout = {
            wrapperCol: {offset: 8, span: 9},
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
                        rules={[{required: true, message: '请选择项目地点!'}]}>
                        <Select
                            defaultValue={Option.valueOf()}
                            value={this.state.place}
                            onChange={value => this.setState({place: value})}
                            //当获得焦点时调用
                            onFocus={() => this.getWorkPlaceList()}
                            allowClear
                        >
                            {
                                this.state.workPlaceList.map((item, index) => {
                                        return (
                                            <Option index={index} value={item.id}>{item.workPlace}</Option>
                                        )
                                    }
                                )
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="项目负责人"
                        // name="manager"
                        rules={[{required: true, message: '请选择项目负责人!'}]}
                    >
                        <Select
                            defaultValue={Option.valueOf()}
                            value={this.state.manager}
                            // value={this.state.managerName}
                            // value={Option.valueOf()}
                            onChange={value => this.setState({manager: value})}
                            onFocus={() => this.getManagerList()}
                            allowClear
                        >
                            {/*从后端获取的动态*/}
                            {
                                this.state.managerList.map((item, index) => {
                                    return (<Option index={index} value={item.id}>{item.realName}</Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="起止日期"
                               rules={[{required: true, message: '请选择日期!'}]}
                    >
                        <DatePicker
                            // showTime
                            format='YYYY-MM-DD'
                            value={this.state.beginTime !== "" ? moment(this.state.beginTime) : null}
                            onChange={this.onChangeBeginTime}/>
                        ——
                        <DatePicker
                            // showTime
                            format='YYYY-MM-DD'
                            value={this.state.endTime !== "" ? moment(this.state.endTime) : null}
                            onChange={this.onChangeEndTime}/>
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