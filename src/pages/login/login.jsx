import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd'

import './login.less'
import logo from '../../assets/images/logo.png'

class Login extends Component {



    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const form = this.props.form
        const { getFieldDecorator } = form
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator("username", {
                                    rules: [
                                        { required: true, whitespace: true, message: '不能为空' },
                                        { min: 4, message: '最小4位' },
                                        { max: 12, message: '最大12位' },
                                        { pattern: /^[a-zA-Z0-9]+$/, message: '下划线字母数字组合' }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password", {})(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;