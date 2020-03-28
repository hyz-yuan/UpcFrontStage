import React, {Component} from 'react'
import { Icon } from '@ant-design/compatible';
import {createHashHistory} from "history";
import './index.css'
import {fetchPost} from "../../util/fetch";

class Header extends Component {
    state = {};

    handleLogout = () => {
        let params = {}
        fetchPost(global.constants.logout, params)
            .then(
                res => createHashHistory().push('/')
            )
    }

    render() {
        return (
            <div className='commonHeader'>
                <div className='logout' onClick={this.handleLogout}><Icon type="logout" style={{marginRight: '5px'}}/>注销
                </div>
            </div>
        );
    }
}

export default Header