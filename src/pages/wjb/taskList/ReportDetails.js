import React,{Component} from 'react';
import {Table,Button,Modal} from 'antd';
import {fetchPost} from "../../../static/util/fetch";
import ReportInsert from "./ReportInsert";
import moment from "moment";




 class ReportDetails extends Component{

 
  constructor(props){
    super(props);
    this.state = {
        reportList:[],
        visible:false,
        insertData:[],
        conditions:this.props.queryTerms

    }
  }
  requestList=()=>{
    let params = {
      projectId: this.state.conditions.projectId,
      groupId:  this.state.conditions.groupId,
      employeeId:  this.state.conditions.userId
    }
    fetchPost("http://localhost:9080/test/projectReport/getProjectReportList",params)
      .then( res => this.setReportData(res))
      .catch(e => console.log(e))
          .finally(() => {
             
          })

  }
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
    }
    handleOperator = ()=>{
      this.setState({
        visible:true

      })
    }
    handleSubmit = ()=>{
      const { projectId,groupId,userId,projectName,groupName,userName} = this.state.conditions;

      let data = this.state.insertData
      
      
            let params = {
              ...data,
              projectId,
              groupId,
              employeeId: userId,
              projectName,
              groupName,
              employeeName:userName,
              operator:userName
            }
            
            fetchPost("http://localhost:9080/test/projectReport/insertProjectReportList",params)
              .then()
              .finally(() => {
                this.setState({
                  visible:false,
                  insertData:''
                })
                this.requestList()
            })       
    }
    

    render() {
      
        const columns = [
            {
              title: '日期',
              dataIndex: 'date',  
            },
            {
              title: '性质',
              dataIndex: 'type',
            },
            {
              title: '简介',
              dataIndex: 'content',
            },
            {
                title: '附件',
                dataIndex: 'document',
      
            },
             
          ];
        const data = this.state.reportList||{}
        return(
          <div>
            <Table dataSource={data} columns={columns} />
            <Button type="primary"  onClick={()=> {this.handleOperator()}}>添加记录</Button>
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
                       <ReportInsert
                       conditions={this.state.conditions||{}}
                       insertData={this.state.insertData||{}} 
                       dispatchData={(data)=>{this.setState({insertData:data})}}
                       
                       />
                </Modal>
          </div>
        )
        
}
 }
export default ReportDetails;