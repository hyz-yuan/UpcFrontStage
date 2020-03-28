import * as React from "react";
import {Table, message, DatePicker} from "antd/lib/index";
import {fetchPost} from "../../../static/util/fetch";
import {createHashHistory} from "history";
import RightBodyHeaderBar from '../../../static/component/rightBodyHeaderBar'
import './index.css'
import TimeLine from "react-gantt-timeline";
import Title from '../../../static/util/title'
import ProgressTable from './progressTable'
class projectProgress extends React.Component{
    state={
        title:"项目列表",
        projectTitle:"项目名称",
        columns:[
            { title: '项目名称',dataIndex: 'projectName',
                render:(text,record)=>( <a onClick={(e)=>this.goChildren(record)} >{text}</a>)
             },
        ],
        data:[],
        gantData:[],
        progressData:[],
        requestLoading:true,
        currentProjectID:1,
    }
    goChildren = (record) => {
        this.setState({
            projectTitle:record.projectName,
            currentProjectID:record.id,
        },()=>{
            this.requestProgress();
            this.ProgressTable.loadData();
        });
    }

    componentDidMount() {
        let params={}
        fetchPost(global.constants.projectListByMid,params)
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

    //赋予表格数据
    setProjectData = (list) => {
        this.setState({
            data: list.map((item, index) => {
                return {
                    ...item,
                    time:new Date(item.beginTime)+"-"+item.endTime,
                    key: index
                }
            }),
            projectTitle:list[0].projectName,
            currentProjectID:list[0].id,
        },()=>{
            this.requestProgress()
        });

    }

    requestProgress =()=>{
        let params={ projectId : this.state.currentProjectID };
        fetchPost(global.constants.progressList,params)
            .then(
                res => this.setGantData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    }
    setGantData = (list) => {

        this.setState({
              gantData: list.map((item, index) => {
                return {
                    id: index,
                    start: item.beginTime,
                    end: item.endTime,
                    name: item.progressName,
                    color:"blue",
                }
            }),
        })
    }
    onRef = (ref) => {
        this.ProgressTable = ref
    }
    render(){
        const {data,gantData,columns,title,currentProjectID,projectTitle}=this.state;
        return (

            <div>
                <RightBodyHeaderBar title={title}/>
                <div>

                    <div className="leftdiv"><Table dataSource={data} pagination={{pageSize:8}} columns={columns}></Table></div>
                    <div className="gantdiv">
                        <div >
                            <Title value={projectTitle}/>
                            <TimeLine  mode="year" data={gantData}  />
                            </div>
                        <div style={{marginTop:'50px'}}>
                            <ProgressTable onRef={this.onRef} pid={currentProjectID} reloadGant={this.requestProgress}/></div>
                    </div>
                </div>

            </div>
        )
    }
}
export default projectProgress