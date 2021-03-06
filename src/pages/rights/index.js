import * as React from "react";
import {Button, Popconfirm, Select, Table} from "antd";
import {Component} from "react";
import {fetchPost} from "../../util/fetch";
import RightBodyHeaderBar from "../../component/rightBodyHeaderBar";
const { Option } = Select;
export default class test extends Component{
   state={
      buttonValue:"新增",
       title:"权限管理",
       columns:[
           {title:'序号',dataIndex:'Index'},
           {title:'上级菜单',dataIndex:'lastMenus',
               render:(text,record)=>(
                   <span>
                 <Select
                     defaultValue={()=>{
                         if(this.state.data[record.key].pRights!=null)
                             return this.state.data[record.key].pRights;
                         else
                             return '上级菜单';
                     }}
                     style={{ width: '100%' }}
                     onChange={(value)=>this.handleChange({lastMenus:value},record)}
                     onBlur={(e)=>this.inputOnBlur(record)}>
                     {this.state.data.map((item,index) => <Option key={index} value={item.id}>{item.rights}</Option>)}
                 </Select>
               </span>)},
           {title:'权限名',dataIndex:'rights',
           render:(text,record)=>(
               <span>
               <input
                   value={this.state.data[record.key].rights}
                   onChange={(e)=>this.handleChange({rights:e.target.value},record)}
                   onBlur={(e)=>this.inputOnBlur(record)}
                   />
               </span>),
           },
           {title:'链接',dataIndex:'urls',
               render:(text,record)=>(
                   <span>
               <input
                   value={this.state.data[record.key].urls}
                   onChange={(e)=>this.handleChange({urls:e.target.value},record)}
                   onBlur={(e)=>this.inputOnBlur(record)}
               />
               </span>)},
           {title:'备注',dataIndex:'notes',
               render:(text,record)=>(
                   <span>
               <input
                   value={this.state.data[record.key].notes}
                   onChange={(e)=>this.handleChange({notes:e.target.value},record)}
                   onBlur={(e)=>this.inputOnBlur(record)}
               />
               </span>)},
           {
               title: '操作',
               key: 'action',
               render: (text, record) => (
                   <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteRight(record)}>
                      <a>删除</a>
                  </Popconfirm>
               ),
           },
           ],
       data:[],

   };

   componentDidMount(){
      this.setRight()
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
               })},console.log(this.state.data))
   };
    setRight=()=>{
        let params={};
        fetchPost(global.constants.setRightList,params)
            .then(
                res => this.setProjectData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })

    };
    render(){
        return (
            <div style={{width:'100%'}}>
                <RightBodyHeaderBar title={this.state.title}/>
                <Table dataSource={this.state.data} pagination={{pageSize: 7}} columns={this.state.columns} onRow={console.log(this.state.data)}/>
                <Button type="primary" onClick={()=>this.insertRight()}>新增</Button>
            </div>
                )
    }

    insertRight=()=>{
        let params={};
        fetchPost(global.constants.insertRight,params)
            .then(
                res => this.setProjectData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    };
    deleteRight=(record)=>{
        let params={id:record.id};
        fetchPost(global.constants.deleteRight,params)
            .then(
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                });
                this.setRight();
            })
    };

    handleChange = (value, record) => {
        for (let i in value) {
            record[i] = value[i];//这一句是必须的，不然状态无法更改
        }
        this.setState({
            lastMenus:record,
            rights:record,
            urls:record,
            notes:record
        })
    };

    inputOnBlur=(record)=>{
        let params={id:record.id,
            lastMenus:record.lastMenus,
            rights:record.rights,
            urls:record.urls,
            notes:record.notes,
        };
        fetchPost(global.constants.updateRight,params)
            .then(
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                });
                this.setRight();
            })
    }
}