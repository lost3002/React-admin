import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Select
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/*
添加分类的form组件
 */
class UserForm extends PureComponent {

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { roles, user } = this.props
    const { getFieldDecorator } = this.props.form
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 18 }, // 右侧包裹的宽度
    }

    return (
      <Form {...formItemLayout}>
        <Item label='用户名' >
          {
            getFieldDecorator('username', {
              initialValue: user.username,
              rules: [
                { required: true, message: '必须输入' }
              ]
            })(
              <Input placeholder='请输入' />
            )
          }
        </Item>
        {
          user._id ? null : (
            <Item label='密码' >
              {
                getFieldDecorator('password', {
                  initialValue: user.password,
                  rules: [
                    { required: true, message: '必须输入' }
                  ]
                })(
                  <Input type='password' placeholder='请输入' />
                )
              }
            </Item>
          )
        }
        <Item label='手机号' >
          {
            getFieldDecorator('phone', {
              initialValue: user.phone,
              rules: [
                { required: true, message: '必须输入' }
              ]
            })(
              <Input type='number' placeholder='请输入' />
            )
          }
        </Item>
        <Item label='邮箱' >
          {
            getFieldDecorator('email', {
              initialValue: user.email,
              rules: [
                { required: true, message: '必须输入' }
              ]
            })(
              <Input placeholder='请输入' />
            )
          }
        </Item>
        <Item label='角色' >
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id,
              rules: [
                { required: true, message: '必须输入' }
              ]
            })(
              <Select>
                {
                  roles.map(role => <Option value={role._id} key={role._id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </Item>


      </Form>
    )
  }
}

export default Form.create()(UserForm)