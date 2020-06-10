import React,{Component} from 'react';
import {Table,Button,Modal} from 'antd';
import {fetchPost} from "../../util/fetch";
/*import ReportInsert from "./ReportInsert";*/
import moment from "moment";




class ProjectApply extends Component{


    constructor(props){
        super(props);
        this.state = {
            reportList:[],
            visible:false,
            insertData:[],
            conditions:this.props.queryTerms,
            btnVisible:this.props.btnv,
        }
    }
    requestList=()=>{
        let params = {};
        fetchPost(global.constants.userList,params)
            .then( res => this.setReportData(res))
            .catch(e => console.log(e))
            .finally(() => {

            })

    };
    componentDidMount(){
        this.requestList()
    }

    setReportData = (list) => {
        this.setState({
            reportList: list.map((item, index) => {
                return {
                    ...item,
                    date:moment(parseInt(item.date)).format("YYYY-MM-DD"),
                    key: index
                }
            })
        })
    };
    handleOperator = ()=>{
        this.setState({
            visible:true

        })
    };
    handleSubmit = ()=>{
        const { projectId,groupId,userId,projectName,groupName,userName} = this.state.conditions;

        let data = this.state.insertData;
        let s =JSON.stringify(data.document);

        let params = {
            type:data.type,
            content:data.content,
            document:s,
            projectId,
            groupId,
            employeeId: userId,
            projectName,
            groupName,
            employeeName:userName,
            operator:userName
        };
        if(data.type===undefined||data.content===undefined)
        {
            Modal.error({title:"请填写所有带*号的选项"})
            return
        }

        fetchPost(global.constants.insertReport,params)
            .then()
            .finally(() => {
                this.setState({
                    visible:false,
                    insertData:''
                });
                this.requestList()
            })
    };
    handleExport=(name)=>{
        // window.open('http://localhost:9080/test/upload/downloadFileEx?name='+name)
        window.open(global.constants.downloadFile +'?name='+name)
    };

    render() {

        const columns = [
            {
                title: '项目名称',
                dataIndex: 'projectName',
            },
            {
                title: '申请人',
                dataIndex: 'applicant',
            },
            {
                title: '位置',
                dataIndex: 'place',
            },
            {
                title: '申请时间',
                dataIndex: 'creatTime',
            },
            {
                title: '内容',
                dataIndex: 'remark',
            },

        ];
        const data = this.state.reportList||{};
        return(
            <div>
                <Table dataSource={data} columns={columns} />
                <Button type="primary" style={{display:this.state.btnVisible}}  onClick={()=> {this.handleOperator()}}>添加记录</Button>
                <Modal
                    title={"工作汇报"}
                    visible={this.state.visible}
                    width={1000}
                    maskClosable={false}
                    destroyOnClose={true}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.setState({
                            insertData:'',
                            // conditions:'',
                            visible:false,
                        })
                    }}
                >
                    {/*<ReportInsert
                        conditions={this.state.conditions||{}}
                        insertData={this.state.insertData||{}}
                        dispatchData={(data)=>{this.setState({insertData:data})}}

                    />*/}
                </Modal>
            </div>
        )

    }
}
export default ProjectApply;