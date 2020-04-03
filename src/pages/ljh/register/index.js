import React, {Component} from 'react'
import Background from '../../../static/image/login.jpg';
import LoginCompany from '../../../static/image/loginCompany.png';
import LoginUsername from '../../../static/image/loginUsername.png';
import LoginPassword from '../../../static/image/loginPassword.png';

import './index.css'
import {fetchPost} from "../../../static/util/fetch";
import { Button, Input, Col, message,Select } from 'antd';
import {createHashHistory} from "history";

class ForgetPassword extends Component {
    state = {
        hasChoose: false,
        email: '',
        password: '',
        name: '',
        verification: '',
        workplace:[],
        thenology:[],
    }
    componentDidMount() {

        fetchPost(global.constants.selectWorkPlace, {})
            .then(
                res => this.setWorkplace(res)
            )
            .catch(e => console.log(e))

        fetchPost(global.constants.technologySelect, {})
            .then(
                res => this.setTechnology(res)
            )
            .catch(e => console.log(e))
    }
    setWorkplace = (list) => {
        this.setState({
            workplace: list.map((item, index) => {
                return (<Select value={item.id} selected>{item.workPlace}</Select>)
            })
        })
    }
    setTechnology = (list) => {
        this.setState({
            technology: list.map((item, index) => {
                return (<Select value={item.id} selected>{item.pId==0?item.technologyName:"+--"+item.technologyName}</Select>)
            })
        })
    }

    handleemail = (e) => {
        let value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '')
        this.setState({
            email: value
        })
    }

    handlePassword = (e) => {
        let value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '')
        this.setState({
            password: value
        })
    }


    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }




    //输入验证码
    handleVerification = (e) => {
        this.setState({
            verification: e.target.value
        })
    }

    //重置密码
    resetPassword = () => {
        if(!this.state.password) {
            message.info("新密码不能为空")
        }else if(!this.state.email) {
            message.info("邮箱不能为空")
        }else if(!this.state.verification) {
            message.info("验证码不能为空")
        }else {
            let params = {
                email: this.state.email,
                code: this.state.verification,
                password: this.state.password
            }
            // fetchPost('http://localhost:7080/pages/web/codeMaching', params)
            fetchPost(global.constants.codeMaching, params)
                .then(
                    res => {
                        switch (res) {
                            case '验证成功':
                                message.info('修改成功')
                                createHashHistory().push('/')
                                break
                            case '验证失败':
                                message.info('验证码不正确')
                                break
                            default:
                                message.info("未知错误")
                                break
                        }
                    }
                )
                .catch(e => console.log(e))
        }
    }

    render() {
        const {email, password, name, verification} = this.state
        return (
            <div className='forgetPassword' style={{backgroundImage: `url("${Background}")`}}>
                <div className="login">
                    <div className="title">用  户  注  册</div>
                    <div className="line">
                        <img className="smallImg" src={LoginCompany} alt={'name'}/>
                        <input placeholder="请输入用户名" value={name} type="text" onChange={this.handleName}/>
                    </div>

                    <div className="line">
                        <img className="smallImg" src={LoginPassword} alt={'password'}/>
                        <input placeholder="请输入密码" value={password} type="password" onChange={this.handlePassword}/>
                    </div>
                    <div className="line">
                        <img className="smallImg" src={LoginPassword} alt={'password'}/>
                        <input placeholder="请确认密码" value={password} type="password" onChange={this.handlePassword}/>
                    </div>
                    <div className="line">
                        <img className="smallImg" src={LoginCompany} alt={'name'}/>
                        <input placeholder="请输入真实姓名" value={name} type="text" onChange={this.handleName}/>
                    </div>
                    <div className="line">
                        <img className="smallImg" src={LoginCompany} alt={'name'}/>
                        工作地：
                        <Select  style={{ width: 100}} >
                            {this.state.workplace}
                        </Select>
                    </div>
                    <div className="line">
                        <img className="smallImg" src={LoginCompany} alt={'name'}/>
                        技术领域：
                        <Select  style={{ width: 200}} >
                            {this.state.technology}
                        </Select>
                    </div>

                    <div className="line">
                        <img className="smallImg" src={LoginUsername} alt={'email'}/>
                        <input placeholder="请输入邮箱" value={email} type="text" onChange={this.handleemail}/>
                    </div>


                    <button type="button" className="logBut" onClick={this.register}>注&nbsp;&nbsp;册</button>
                </div>
            </div>
        );
    }
}

export default ForgetPassword