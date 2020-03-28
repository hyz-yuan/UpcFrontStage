import React from 'react';
import { Spin } from 'antd';
import { Icon } from '@ant-design/compatible';
import Loadable from 'react-loadable';
//通用的过场组件
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const loadingComponent =()=>{
    return (
        <Spin indicator={antIcon} tip="正在加载..."/>
    )
};
//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = loadingComponent)=>{
    return Loadable({
        loader,
        loading
    });
}