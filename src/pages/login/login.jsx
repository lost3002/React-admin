import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd'
import {Redirect} from 'react-router-dom'

import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import localstoreUtils from '../../utils/localstoreUtils'

class Login extends Component {



    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {username, password} = values
                // reqLogin(username, password).then((response)=>{
                //     console.log("请求成功",response.data)
                // }).catch((error)=>{
                //     console.log("请求失败",error)
                // })

                // try {
                //     const response = await reqLogin(username, password) 
                //     console.log("请求成功",response.data)
                // } catch (error) {
                //     console.log("请求失败",error)
                // }

                
                const result = await reqLogin(username, password) 
                if(result.status===0){
                    message.success("登录成功")
                    const user = result.data
                    localstoreUtils.saveUser(user)
                    memoryUtils.user = user

                    this.props.history.replace("/")
                }else{
                    message.error(result.msg)
                }

            }else {
                console.log("效验失败")
            }
        });
    }

    validatorPwd = (rule, value, callback) => {
        if(!value){
            callback("请填写密码")
        }else if(value.length < 4){
            callback("密码长度不小于4位")
        }else if(value.length > 12){
            callback("密码长度不大于12位")
        }else if(!/^[a-zA-Z0-9]+$/.test(value)){
            callback("下划线字母数字组合")
        }else{
            callback()
        }
    }

    render() {
        const form = this.props.form
        const { getFieldDecorator } = form

        if(memoryUtils.user && memoryUtils.user._id){
            return <Redirect to="/"/>
        }
        
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
                                    initialValue : "admin"
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
                                getFieldDecorator("password", {
                                    rules: [{ validator: this.validatorPwd}],
                                })(
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
const WrappedLogin = Form.create()(Login);
export default WrappedLogin;