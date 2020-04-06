import {Menu} from 'antd';
import {message} from "antd/lib/index";

import { Icon } from '@ant-design/compatible';
import React, {Component} from 'react'
import {createHashHistory} from 'history'
import {fetchPost} from "../../util/fetch";

const {SubMenu} = Menu;

class leftBar extends Component {
    state = {
        menus:[],
        icon:["mail","read","form","global","mail","form","global"]
    };
    a=()=>{
        return <a href={""}>hello</a>
    };

    componentDidMount() {
        let params = {}
        fetchPost(global.constants.getRole, params)
            .then(
                res => this.setData(res)
            )
            .catch(e => console.log(e))
    }
    setData = (list) => {

        this.setState({menus:this.sub(list,0)})
    }
    i=0;
     sub =(list,pid)=>{
        return list.map((item, index) => {
                if(item.lastMenus==pid){
                    if(pid==0){
                        return (<SubMenu onClick={this.goChildren}  key={item.urls}
                                          title={
                                              <span>
                                                <Icon type={this.state.icon[this.i++]}/>
                                                <span>{item.rights}</span>
                                            </span>
                                          }
                                >
                            {this.sub(list,item.id)}
                        </SubMenu>)

                    }else{
                        return (<Menu.Item  onClick={this.goChildren} key={item.urls}>{item.rights}</Menu.Item>)
                    }
                }
        })
    }

    goChildren = (e) => {
        sessionStorage.clear()
        createHashHistory().push(e.key)
    }

    render() {
        const {userType,nodes,menus} = this.state

        return (
            <div style={{width: 256, height: "100%", position: "fixed", zIndex: 101, paddingTop: 49}}>
                <Menu
                    style={{height: "100%"}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {menus}
                </Menu>
            </div>
        );
    }
}

export default leftBar