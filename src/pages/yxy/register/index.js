import React from 'react';
import Background from '../../../static/image/login.jpg';
import './index.css'

import {
    Form,
    Input,
    Tooltip,
    // Cascader,
    Select,
    // Checkbox,
    Button,
} from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
        // const url = 'http://127.0.0.1:8081/test/web/register';
        const url = global.constants.register;
        const {userName, password, realName, workPlace, technology, email } = values;
        const data = {userName, password, realName, workPlace, technology, email };
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log(response)
                if (response.code === 0) {
                    alert(response.msg);
                }
            });
        console.log('Received values of form: ', values);
    };


    return (
        <div className='registerPage' style={{backgroundImage: `url("${Background}")`}}>
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            style={{ width: '500px' }}
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="userName"
                label={
                    <span>
                        用户名&nbsp;
                        {/*<Tooltip title="你想让别人怎么称呼您?">*/}
                        {/*    <QuestionCircleOutlined />*/}
                        {/*</Tooltip>*/}
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: '请输入用户名!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>



            <Form.Item
                name="password"
                label="密 码"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请确认你的密码!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('两次输入的密码不匹配!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="realName"
                label={
                    <span>
                        真实姓名&nbsp;
                        {/*<Tooltip title="你的真实姓名?">*/}
                        {/*    <QuestionCircleOutlined />*/}
                        {/*</Tooltip>*/}
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: '请输入你的真实姓名!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="workPlace"
                label="工作地点"
                rules={[
                    {
                        type: 'string',
                        required: true,
                        message: '请选择你的工作地点!',
                    },
                ]}
            >
                <Select>
                    <Option value="1">北京</Option>
                    <Option value="2">东营</Option>
                    <Option value="3">青岛</Option>
                    <Option value="4">沈阳</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="technology"
                label="技术领域"
                rules={[
                    {
                        type: 'string',
                        required: true,
                        message: '请选择你的技术领域!',
                    },
                ]}
            >
                <Select>
                    <Option value="1">技术核心</Option>
                    <Option value="2">大数据</Option>
                    <Option value="3">智能网联</Option>
                    <Option value="4">无人驾驶</Option>
                    <Option value="5">项目管理</Option>
                    <Option value="6">内蒙古</Option>
                    <Option value="7">青岛</Option>
                    <Option value="8">北京</Option>
                    <Option value="9">学术讨论</Option>
                </Select>

            </Form.Item>



            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: '不合法 E-mail!',
                    },
                    {
                        required: true,
                        message: '请输入你的E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            {/* <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="https://www.baidu.com">agreement</a>
                </Checkbox>
            </Form.Item> */}

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
};
export default RegistrationForm;
// ReactDOM.render(<RegistrationForm />, mountNode);