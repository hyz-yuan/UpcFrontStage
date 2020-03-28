import React, { Component } from  'react'
import './index.css'
import {Button} from 'antd';
import {createHashHistory} from "history";

class CommonBackOperateHeader extends Component {
    state = {
    };

    handleBack = () => {
        sessionStorage.removeItem(this.props.removeItem)
        createHashHistory().goBack()
    }

    render() {
        return (
            <div className='commonBackOperateHeader'>
                <Button type="primary" onClick={this.handleBack}>
                    返回上一页
                </Button>
            </div>
        );
    }
}

export default CommonBackOperateHeader