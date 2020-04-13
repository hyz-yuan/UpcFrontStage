import * as React from "react";
import {Table} from "antd/lib/index";
import {fetchPost} from "../../../static/util/fetch";
import {createHashHistory} from "history";
import RightBodyHeaderBar from '../../../static/component/rightBodyHeaderBar'

class projectList extends React.Component{
    state={
        title:"项目列表",
        columns:[
            { title: '项目名称',dataIndex: 'projectName',
                render:(text,record)=>( <a onClick={(e)=>this.goChildren(record.id)} >{text}</a>)
            }
        ],
        data:[],
        requestLoading:true
    }
    goChildren = (id) => {
        sessionStorage.clear()
        createHashHistory().push("/sys/home/"+id)
    }
    componentDidMount() {
        let params={}
        fetchPost(global.constants.porjectList,params)
            .then(
                res => this.setData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    }
    //赋予表格数据
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


    render(){
        const {data,columns,title}=this.state;
        return (

            <div>
                <RightBodyHeaderBar title={title}/>

                <Table dataSource={data} pagination={{pageSize:8}} columns={columns}/>
            </div>
        )
    }
}
export default projectList