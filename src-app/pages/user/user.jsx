import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'

import {formateDate} from "../../utils/dateUtils"
import LinkButton from "../../components/link-button/index"
import {reqUsers, reqDeleteUser, reqAddOrUpdateUser} from '../../api'
import UserForm from './user-form'

const { confirm } = Modal

class User extends Component {

    state = {
        users: [],   // 所有用户列表
        roles: [], // 所有角色列表
        isShow: false, // 是否显示确认框
    }

    initColumns = () => {
        this.columns = [
          {
            title: '用户名',
            dataIndex: 'username'
          },
          {
            title: '邮箱',
            dataIndex: 'email'
          },
    
          {
            title: '电话',
            dataIndex: 'phone'
          },
          {
            title: '注册时间',
            dataIndex: 'create_time',
            render: formateDate
          },
          {
            title: '所属角色',
            dataIndex: 'role_id',
            render: (role_id) => this.roleNames[role_id],
            // render:(role_id) => this.state.roles.find(role => role._id === role_id).name //有bug，且性能低
          },
          {
            title: '操作',
            render: (user) => (
              <span>
                <LinkButton onClick = {() => this.showUpdate(user)}>修改</LinkButton>
                <LinkButton onClick = {() => this.deleteUser(user)}>删除</LinkButton>
              </span>
            )
          },
        ]
      }

    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        },{})
        this.roleNames = roleNames
    }

    showUpdate = (user) => {
      this.user = user
      this.setState({isShow: true})
    }
    showaAdd = () => {
      this.user = {}
      this.setState({isShow: true})
    }

    deleteUser = (user) => {
        confirm({
            title: `确定要删除${user.username}吗？`,
            onOk: async () => {
             const result = await reqDeleteUser(user._id)
             if(result.status === 0){
                 this.getUsers()
                 message.success('删除成功！')
             }
            },
          
          })
    }

      addOrUpdateUser = async () => {
        this.setState({isShow: false})
        const user = this.form.getFieldsValue()
        this.form.resetFields()
        if(this.user && this.user._id){
          user._id = this.user._id
        }
        const result = await reqAddOrUpdateUser(user)
        if(result.status === 0){
          message.success(`${user._id ? '修改' : '添加'}用户成功`)
          this.getUsers()
        }else{
          message.error(`${user._id ? '修改' : '添加'}用户失败,${result.msg}`)
        }

      }

      getUsers = async () => {
          const result = await reqUsers()
          if(result.status === 0){
              const {users, roles} = result.data
              this.initRoleNames(roles)
              this.setState({users, roles})
          }
      }

      componentWillMount () {
        this.initColumns()
      }
      componentDidMount () {
          this.getUsers()
      }
    render() {
        const { users, isShow, roles } = this.state
        const user = this.user || {}
        const title = <Button type='primary' onClick={this.showaAdd}>创建用户</Button>
            
        return (
            <div>
                <Card title={title}>
                    <Table
                        bordered
                        rowKey='_id'
                        dataSource={users}
                        columns={this.columns}
                        pagination={{ defaultPageSize: 2 }}
                    />

                    <Modal
                        title={user._id ? '修改用户' : '添加用户'}
                        visible={isShow}
                        onOk={this.addOrUpdateUser}
                        onCancel={() => {
                            this.setState({ isShow: false })
                            this.form.resetFields()
                        }}
                    >
                        <UserForm setForm={ form => this.form = form} roles={roles} user={user}/>
                    </Modal>
                </Card>
            </div>
        );
    }
}

export default User;