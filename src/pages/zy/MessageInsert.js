import React,{Component} from 'react';
import {Col,Row,Select,Input} from 'antd';




const { Option } = Select;
const { TextArea } = Input;

class MessageInsert extends Component{

   
    changeInput=(value,option)=>{
        let data=this.props.insertData;
        data[option]=value;
        this.props.dispatchData(data);
    }
    render() {
       
        return(
            <div>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{lineHeight:'32px'}}>发送类型<span style={{color:'#FF3300'}}>*</span></Col>
                    <Col> <Select style={{width:200}}   onChange={(value)=>this.changeInput(value,'type')}>
                        <Option value={'2'}>项目组</Option>
                        <Option value={'1'}>小组</Option>
                        <Option value={'0'}>个人</Option>
                    </Select>
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{lineHeight:'32px'}}>接收者</Col>
                    {/* 此处应弹窗出所有员工信息，选中一个人时，一并将他的projectId,projectName 传给后端*/}
                    <Col> <Input style={{width:200}} onChange={(e)=>this.changeInput(e.target.value,'receiver')}/></Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{lineHeight:'73px'}}>内容<span style={{color:'#FF3300'}}>*</span></Col>
                    <Col span={20}><TextArea style={{height:73}}  onChange={(e)=>this.changeInput(e.target.value,'content')}/></Col>
                </Row>

            </div>
        )

    }
}
export default MessageInsert;