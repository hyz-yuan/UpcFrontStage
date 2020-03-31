import * as React from "react";
import {Table, Input, Button, Modal, Form} from "antd";
import {fetchPost} from "../../../static/util/fetch";
import {createHashHistory} from "history";
import RightBodyHeaderBar from '../../../static/component/rightBodyHeaderBar'
import moment from "moment";


class projectList extends React.Component {

    state = {
        projectId: null,
        title: "项目列表",
        searchValue: '',
        columns: [
            {title: '序号', dataIndex: '', render: (text, record, index) => `${index + 1}`},
            {
                title: '项目名称', dataIndex: 'projectName',
                //点击项目名称后，进行跳转
                render: (text, record) => (<a onClick={(e) => this.goChildren(record.id)}>{text}</a>)
            },
            {title: '实施地', dataIndex: 'placeName',},
            {title: '负责人', dataIndex: 'managerName',},
            {title: '开始时间', dataIndex: 'beginTime',},
            {title: '结束时间', dataIndex: 'endTime',},
            {
                title: '操作', dataIndex: 'action',
                render: (text, record) => <span>
        <a name={"changeProject"} onClick={() => this.handleProjectManage(record.id)}>修改{record.name}</a>&nbsp;&nbsp;
                    <a onClick={() => this.showModal(record.id)}>删除</a>
      </span>
            }
        ],
        data: [],
        requestLoading: true,
        visible: false
    };
    //修改项目
    handleProjectManage = (id) => {
        createHashHistory().push('/sys/projectManage/'+id)
    };

    goChildren = (id) => {
        sessionStorage.clear();
        createHashHistory().push('/sys/projectDetail'+id)
    };


    componentDidMount = (value) => {
        let params = {projectName: value};
        fetchPost(global.constants.projectList, params)
            .then(
                res => this.setData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    };

    //赋予表格数据
    setData = (list) => {
        this.setState({
            data: list.map((item, index) => {
                return {
                    ...item,
                    beginTime: moment(item.beginTime).format("YYYY-MM-DD"),
                    endTime: moment(item.endTime).format("YYYY-MM-DD"),
                    key: index
                }
            })
        })
    };

    showModal = (id) => {
        this.setState({
            visible: true, projectId: id
        });
    };


    //删除的弹出框的确认按钮,执行删除操作
    handleOk = e => {
        console.log(e);
        let params = {id: this.state.projectId};
        fetchPost(global.constants.deleteProject, params).then(
            res => this.setData(res)
        )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            });
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    render() {
        const {data, columns, title} = this.state;
        const {Search} = Input;
        return (
            <div>
                <RightBodyHeaderBar title={title}/>
                <Search addonBefore={"项目查询"} placeholder="请输入项目名称" enterButton="查询"
                        style={{width: 400}}
                        onSearch={value => this.componentDidMount(value)}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" name={"addProject"} onClick={()=>this.handleProjectManage(0)}>新增项目</Button>
                <Table dataSource={data} pagination={{pageSize: 5}} columns={columns}/>
                <Modal
                    title={"提示!"}
                     visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <p>确认要删除这条记录吗</p>
                </Modal>
            </div>
        )
    }
}

export default projectList

