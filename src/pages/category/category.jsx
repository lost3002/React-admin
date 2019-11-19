import React, { Component } from 'react';
import { Card, Table, Button, message, Icon, Modal } from 'antd'

import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api'
import AddFrom from './add-form' 

class Category extends Component {

    state = {
        loading: false,
        categorys: [],
        subCategorys: [],
        parentId: '0',
        parentName: '',
        visible: 0
    }

    initColumns = () => {
        this.columns = [
            {
                title: '分类',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                dataIndex: '',
                render: (category) => (
                    <span>
                        <LinkButton onClick={this.showUpdate}>修改</LinkButton>
                        {
                            this.state.parentId === '0'
                                ?
                                <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
                                :
                                null
                        }
                    </span>
                )
            },
        ]
    }



    getCategorys = async () => {
        this.setState({ loading: true })
        const { parentId } = this.state
        const result = await reqCategorys(parentId)
        this.setState({ loading: false })
        console.log('cc', result)
        if (result.status === 0) {
            const categorys = result.data

            parentId === '0' ? this.setState({ categorys }) : this.setState({ subCategorys: categorys })
        } else {
            message.error('categorys请求错误')
        }
    }

    showSubCategorys = (category) => {
        this.setState({ parentId: category._id, parentName: category.name }, () => {
            this.getCategorys()
        })
    }
    showCategorys = () => {
        this.setState({
            subCategorys: [],
            parentId: '0',
            parentName: ''
        })
    }

    handleCancel = () => {
        this.setState({visible : 0})
    }
    addCategory = () => {

    }
    showAdd = () => {
        this.setState({visible: 1})
    }
    updateCategory = () => {

    }
    showUpdate = () => {
        this.setState({visible: 2})
    }

    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategorys()
    }


    render() {
        const { categorys, loading, parentId, subCategorys, parentName, visible } = this.state

        const title = parentId === '0' ? '一级商品分类' : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级商品分类</LinkButton>
                <Icon type='arrow-right'></Icon>
                <span>{parentName}</span>
            </span>
        )

        const extra = (
            <Button type="primary" shape="round" icon="plus" onClick={this.showAdd}>
                添加分类
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra} >
                    <Table
                        dataSource={parentId === '0' ? categorys : subCategorys}
                        columns={this.columns}
                        rowKey='_id'
                        bordered
                        loading={loading}
                        pagination={{ defaultPageSize: 5, showQuickJumper: true }} />

                    <Modal
                        title="添加分类"
                        visible={visible === 1}
                        onOk={this.addCategory}
                        onCancel={this.handleCancel}
                    >
                        <AddFrom />

                    </Modal>
                    <Modal
                        title="修改分类"
                        visible={visible === 2}
                        onOk={this.updateCategory}
                        onCancel={this.handleCancel}
                    >
                        <p>Some contents...</p>

                    </Modal>
                </Card>
            </div>
        );
    }
}

export default Category;