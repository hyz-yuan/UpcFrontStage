import {Menu} from 'antd';
import { Icon } from '@ant-design/compatible';
import React, {Component} from 'react'
import {createHashHistory} from 'history'
import {fetchPost} from "../../util/fetch";

const {SubMenu} = Menu;

class leftBar extends Component {
    state = {
    };

    componentDidMount() {
        let params = {}
        // fetchPost(global.constants.getAdminType, params)
        //     .then(
        //         res => {
        //             this.setState({
        //                 userType: res
        //             })
        //         }
        //     )
        //     .catch(e => console.log(e))
    }

    goChildren = (e) => {
        sessionStorage.clear()
        createHashHistory().push(e.key)
    }

    render() {
        const {userType} = this.state
        return (
            <div style={{width: 256, height: "100%", position: "fixed", zIndex: 101, paddingTop: 49}}>
                <Menu
                    style={{height: "100%"}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail"/>
                                <span>基础档案</span>
                            </span>
                        }
                    >
                        <Menu.Item key={userType ? "/sys/basic/business" : "/sys/home"}
                                   onClick={this.goChildren}>企业信息</Menu.Item>
                        {userType ? '' : <Menu.Item key="/sys/basic/car" onClick={this.goChildren}>车辆信息</Menu.Item>}
                        {userType ? '' : <Menu.Item key="/sys/basic/driver" onClick={this.goChildren}>驾驶员信息</Menu.Item>}
                        {userType ? '' : <Menu.Item key="/sys/basic/ledgerjiaojing" onClick={this.goChildren}>交警材料生成</Menu.Item>}
                        {userType ? '' : <Menu.Item key="/sys/basic/ledger" onClick={this.goChildren}>交通材料生成</Menu.Item>}
                        {userType ? '' : <Menu.Item key="/sys/basic/ledger2" onClick={this.goChildren}>交通手填表下载</Menu.Item>}
                        {userType ? '' : <Menu.Item key="/sys/basic/SituationTable" onClick={this.goChildren}>情况总览</Menu.Item>}
                    </SubMenu>
                    {userType ?
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                <Icon type="read"/>
                                <span>培训中心</span>
                            </span>
                            }
                        >
                            <Menu.Item key="/sys/train/allocation" onClick={this.goChildren}>培训设置</Menu.Item>
                            <Menu.Item key="/sys/train/audio" onClick={this.goChildren}>教材中心</Menu.Item>
                        </SubMenu> : ''}
                    {userType ?
                        <SubMenu
                            key="sub3"
                            title={
                                <span>
                                <Icon type="form"/>
                                <span>考试中心</span>
                            </span>
                            }
                        >
                            <Menu.Item key="/sys/train/quiz" onClick={this.goChildren}>考试设置</Menu.Item>
                            <Menu.Item key="/sys/train/question" onClick={this.goChildren}>题库设置</Menu.Item>
                        </SubMenu> : ''}

                    {userType ?
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
                                <Icon type="global"/>
                                <span>安全会议</span>
                            </span>
                            }
                        >
                            <Menu.Item key="/sys/train/conference" onClick={this.goChildren}>会议传达</Menu.Item>
                        </SubMenu> : ''}
                </Menu>
            </div>
        );
    }
}

export default leftBar