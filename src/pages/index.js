import React, { Component } from  'react'
import { Route } from 'react-router-dom'
import './index.css'
import '../static/css/index.css'
import loadable from "../static/util/loadbale";
import LeftBar from '../static/component/leftBar'
import Header from '../static/component/header'

const projectList = loadable(()=>import('./projectList'));
const organizationChart = loadable(()=>import('./organizationChart'));
const projectProgress = loadable(()=>import('./projectProgress'));
const technologyManage = loadable(()=>import('./technologyManage'));

const  projectListUser = loadable(()=>import('./projectListUser'));

//wjb
const taskList = loadable(()=>import('./taskList'));

//gsl
const projectListNew = loadable(()=>import('./projectList'));
const projectManage = loadable(()=>import('./projectManage'));

const projectDetail = loadable(() => import('./projectDetail'));
const workPlace = loadable(()=>import('./workPlace'));
//ln
const rights=loadable(()=>import('./rights'));
const roles=loadable(()=>import('./roles'));
const Employees=loadable(()=>import('./Employees'));
//zy
const MessageList=loadable(()=>import('./messageList/index'));
// const messageList=loadable(()=>import('./zy/messageList'));
class MainFrame extends Component{
    state = {
    };

    render() {
        return(
            <div>
                <Header/>
                <LeftBar/>
                <div className='rightBodyUnfold'>
                    <Route path="/sys/organizationChart" component={organizationChart}/>
                    <Route path="/sys/projectList" component={projectList}/>
                    <Route path="/sys/projectListNew" component={projectListNew}/>
                    <Route path="/sys/projectProgress" component={projectProgress}/>
                    <Route path="/sys/technologyManage" component={technologyManage}/>

                    <Route path="/sys/projectListUser" component= {projectListUser}/>

                    <Route path="/sys/taskList" component= {taskList}/>
                    <Route path="/sys/projectManage/:id" component={projectManage}/>

                    <Route path ="/sys/projectDetail" component={projectDetail}/>
                    <Route path="/sys/workPlace" component={workPlace}/>
                    <Route path="/sys/rights" component={rights}/>
                    <Route path="/sys/roles" component={roles}/>
                    <Route path="/sys/Employees" component={Employees}/>

                    <Route path="/sys/messageList" component={MessageList}/>
                    {/* <Route path="/sys/messageList" component={messageList}/> */}
                </div>
            </div>
        )
    }
}

export default MainFrame
