import React, {Component} from 'react'
import Background from '../../static/image/login.jpg';
import LoginCompany from '../../static/image/loginCompany.png';
import LoginUsername from '../../static/image/loginUsername.png';
import LoginPassword from '../../static/image/loginPassword.png';

import './index.css'
import {fetchPost} from "../../static/util/fetch";
import { Button, Input, Col, message } from 'antd';
import {createHashHistory} from "history";

class ForgetPassword extends Component {
    state = {
        hasChoose: false,
        email: '',
        password: '',
        name: '',
        verification: ''
    }

    //

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



    //发送验证码
    handleSendPhoneMsg = () => {
        let params = {
            email: this.state.email,
            realName: this.state.name
        }
        // fetchPost('http://localhost:7080/pages/web/sendCode', params)
        fetchPost(global.constants.sendCode, params)
            .then(
                res => {
                    switch (res) {

                        case "真实姓名不正确":
                            message.info("真实姓名不正确")
                            break
                        case "发送成功":
                            message.info("发送成功")
                            break
                        case "邮箱没有注册":
                            message.info("邮箱没有注册")
                            break
                        default:
                            message.info("未知错误")
                            break
                    }
                }
            )
            .catch(e => console.log(e))
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
                    <div className="title">注册邮箱密码找回</div>
                    <div className="line">
                        <img className="smallImg" src={LoginCompany} alt={'name'}/>
                        <input placeholder="请输入真实姓名" value={name} type="text" onChange={this.handleName}/>
                    </div>

                    <div className="line">
                        <img className="smallImg" src={LoginPassword} alt={'password'}/>
                        <input placeholder="请输入新密码" value={password} type="password" onChange={this.handlePassword}/>
                    </div>

                    <div className="line">
                        <img className="smallImg" src={LoginUsername} alt={'email'}/>
                        <input placeholder="请输入注册邮箱" value={email} type="text" onChange={this.handleemail}/>
                    </div>

                    <div className="verification">
                        <Col span={23}>
                            <Input placeholder={'请输入验证码'} style={{width:'60%',float:'left'}}  value={verification} onChange={this.handleVerification}/>
                            {/*<Button style={{width:'30%',float:'right'}} >test</Button>*/}
                            <Button style={{width:'35%',float:'right'}} type="primary" onClick={this.handleSendPhoneMsg}>获取验证码</Button>
                        </Col>
                        <Col span={2}/>
                        {/*<Col span={6}><Button style={{float:'right'}} type="primary" onClick={this.handleSendPhoneMsg}>获取验证码</Button></Col>*/}
                    </div>
                    {/*}*/}
                    <button type="button" className="logBut" onClick={this.resetPassword}>重&nbsp;&nbsp;置</button>
                </div>
            </div>
        );
    }
}

export default ForgetPassword