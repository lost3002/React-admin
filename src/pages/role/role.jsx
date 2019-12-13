import React, { Component } from 'react';
import { Card, Table, Button, Modal, message } from 'antd'

import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-from';
import AuthForm from './auth-form';
import memoryUtils from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dateUtils'
import storageUtils from "../../utils/localstoreUtils"

import './role.less'

class Role extends Component {

  state = {
    roles: [],
    role: {},
    isShowAdd: false,
    isShowAuth: false
  }

  constructor(props) {
    super(props);
    this.auth = React.createRef()
  }
  

  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (time) => formateDate(time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
    ]
  }

  onRow = role => {
    return {
      onClick: event => {
        console.log('onrow()', role)
        this.setState({ role })
      }

    }
  }

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({ isShowAdd: false })
        this.form.resetFields()
        const { roleName } = values
        const result = await reqAddRole(roleName)
        if (result.status === 0) {
          message.success('添加角色成功')
          const role = result.data
          this.setState((state) => ({
            roles: [...state.roles, role]
          }))
        } else {
          message.error('添加角色失败')
        }
      }
    })
  }

  updateRole = async () => {
    this.setState({isShowAuth: false})

    const role = this.state.role
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username

    const result =await reqUpdateRole(role)

    if(result.status === 0){
      // this.getRoles()
      // 如果当前更新的是自己角色的权限, 强制退出
      if (role._id === memoryUtils.user.role_id) {
        memoryUtils.user = {}
        storageUtils.removeUser()
        this.props.history.replace('/login')
        message.success('当前用户角色权限成功，请重新登录')
      } else {
        message.success('设置角色权限成功')
        this.setState({
          roles: [...this.state.roles]
        })
      }
    }else{
      message.error('更新角色失败！')
    }
  }

  componentWillMount() {
    this.initColumn()
  }
  componentDidMount() {
    this.getRoles()
  }

  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state
    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button>
        {"  "}
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({ isShowAuth: true })} >设置角色权限</Button>
      </span>
    )
    return (
      <div>
        <Card title={title}>
          <Table
            bordered
            rowKey='_id'
            dataSource={roles}
            columns={this.columns}
            pagination={{ defaultPageSize: PAGE_SIZE }}
            rowSelection={{
              type: 'radio',
              selectedRowKeys: [role._id],
              onSelect: (role) => { // 选择某个radio时回调
                this.setState({
                  role
                })
              }

            }}
            onRow={this.onRow}//点击一行
          />

          <Modal
            title="添加角色"
            visible={isShowAdd}
            onOk={this.addRole}
            onCancel={() => {
              this.setState({ isShowAdd: false })
              this.form.resetFields()
            }}
          >
            <AddForm
              setForm={(form) => this.form = form}
            />
          </Modal>
          <Modal
            title="设置角色权限"
            visible={isShowAuth}
            onOk={this.updateRole}
            onCancel={() => {
              this.setState({ isShowAuth: false })
            }}
          >
            <AuthForm role={role} ref={this.auth} />
          </Modal>

        </Card>
      </div>
    );
  }
}

export default Role;