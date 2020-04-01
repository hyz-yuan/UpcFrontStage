import React, {Component} from 'react';
import RightBodyHeaderBar from '../../../static/component/rightBodyHeaderBar';
import {fetchPost} from "../../../static/util/fetch";
import TimeLine from "react-gantt-timeline";
import './index.css'

export default class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "项目详情",
            projectInfo: {},
            projectTitle: "",
            gantData: [],
            manager: "",
            groupList: [],
            requestLoading: true,
            group: []
        };
    }

    componentDidMount() {
        this.getProjectDetail();
    }

    getProjectDetail = () => {
        let param = {id: 1};
        fetchPost(global.constants.projectDetailSingle, param)
            .then(
                res => {
                    this.setData(res);
                }
            )
            .catch(
                e => console.log(e)
            )
            .finally(() =>
                this.setState({
                    requestLoading: false
                })
            );
    };

    setData = (res) => {
        let group = [];
        //获取所有组id
        res.groupList.map((item) => {
            if (group.indexOf(item.groupId) === -1) {
                group.push(item.groupId);
            }
        });

        this.setState({
            gantData: res.progressList.map((item, index) => {
                return {
                    id: index,
                    start: item.beginTime,
                    end: item.endTime,
                    name: item.progressName,
                    color: "blue",
                }
            }),
            projectInfo: res.projectInfo,
            projectTitle: "——" + res.projectInfo.projectName,
            manager: res.projectInfo.managerName,
            groupList: res.groupList,
            group: group
        })
    };

    /**
     *
     * @param flag 查看类型，0/1/2对应按项目/按小组/按成员
     * @param projectId
     * @param groupId
     * @param employeeId
     */
    jumpToReport = (flag, projectId, groupId, employeeId) => {
        console.log("flag:" + flag);
        console.log("projectId:" + projectId);
        console.log("groupId:" + groupId);
        console.log("employeeId:" + employeeId);
    };

    render() {
        const {title, gantData, projectInfo, projectTitle, manager, groupList, group} = this.state;

        //划分组
        let groupNew = [];
        group.map((item) => {
            console.log(item);
            let groupById = [];
            groupList.map((item1) => {
                if (item1.groupId === item) {
                    groupById.push(item1);
                }
            });
            groupNew.push(groupById);
        });
        console.log(groupNew);

        return (
            <div>
                <RightBodyHeaderBar title={title + projectTitle}/>
                <div className="projectBody" style={{margin: 15, marginBottom: 80}}>
                    <TimeLine mode="year" data={gantData}/>
                    <table className="table" style={{tableLayout: "auto", marginTop: 40}}>
                        <tbody>
                        <td rowSpan={groupList.length + 1}>
                            <a onClick={() => this.jumpToReport(0, projectInfo.id,
                                0, 0)}>{manager}</a>
                        </td>
                        {groupNew.map((item, value) => (
                            <div key={value}>
                                <th colSpan="5">
                                    <a onClick={() => this.jumpToReport(1, item[0].projectId,
                                        item[0].groupId, 0)}>{item[0].groupName}</a>
                                </th>
                                <tr>
                                    <th>姓名</th>
                                    <th>类型</th>
                                    <th>工作内容</th>
                                    <th>最近更新</th>
                                    <th>详细</th>
                                </tr>
                                {item.map((item1, value1) => {
                                    return (
                                        <tr key={value1}>
                                            <td>
                                                <a onClick={() => this.jumpToReport(2, item1.projectId,
                                                    item1.groupId, item1.userId)}>{item1.realName}</a>
                                            </td>
                                            <td>{item1.userType === 0 ? "组长" : "组员"}</td>
                                            <td>{item1.content}</td>
                                            <td>{item1.reportDate === null ? "" : item1.reportDate.substring(0, 10)}</td>
                                            <td>{item1.reportContent}</td>
                                        </tr>
                                    )
                                })}
                            </div>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}
