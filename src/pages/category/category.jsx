import React, { Component } from 'react';
import { Card, Table, Button, message, Icon, Modal } from 'antd'

import LinkButton from '../../components/link-button'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'

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
                        <LinkButton onClick={() => this.showUpdate(category)}>修改</LinkButton>
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



    getCategorys = async (parentId) => {
        this.setState({ loading: true })
        //parentId: 如果没有指定根据状态中的parentId请求, 如果指定了根据指定的请求
        parentId = parentId || this.state.parentId
        const result = await reqCategorys(parentId)
        this.setState({ loading: false })
        // console.log('cc', result)
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

    // handleCancel = () => {
    //     this.form.resetFields()
    //     this.setState({ visible: 0 })
    // }
    addCategory = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({ visible: 0 })
                const { categoryName, parentId } = this.form.getFieldsValue()
                // const { categoryName, parentId } = values
                console.log('↓', categoryName, parentId)
                this.form.resetFields()
                console.log('↓↓', categoryName, parentId)
                const result = await reqAddCategory({ parentId, categoryName })
                if (result.status === 0) {
                    message.success('添加分类成功')
                    // this.getCategorys()
                    // 添加的一级分类
                    if (parentId === '0' || parentId === undefined) {
                        this.getCategorys('0')
                        //添加当前的二级分类
                    } else if (parentId === this.state.parentId) {
                        this.getCategorys()
                    }
                }
            }
        })

    }
    showAdd = () => {
        this.setState({ visible: 1 })
    }
    updateCategory = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({ visible: 0 })

                const categoryName = this.form.getFieldValue('categoryName')
                // const { categoryName } = values
                this.form.resetFields()
                const categoryId = this.category._id
                const result = await reqUpdateCategory(categoryId, categoryName)
                if (result.status === 0) {
                    message.success('更新分类成功')
                    this.getCategorys()
                }
            }
        })

    }
    showUpdate = (category) => {
        this.category = category
        this.setState({ visible: 2 })
    }

    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategorys()
    }


    render() {
        const { categorys, loading, parentId, subCategorys, parentName, visible } = this.state
        const category = this.category || {}
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
                        onCancel={
                            () => {
                                this.form.resetFields()
                                this.setState({ visible: 0 })
                            }
                        }
                    >
                        <AddForm
                            categorys={categorys}
                            parentId={parentId}
                            setForm={(form) => { this.form = form }}
                        />

                    </Modal>
                    <Modal
                        title="修改分类"
                        visible={visible === 2}
                        onOk={this.updateCategory}
                        onCancel={
                            () => {
                                this.form.resetFields()
                                this.setState({ visible: 0 })
                            }
                        }
                    >
                        <UpdateForm categoryName={category.name} setForm={(form) => this.form = form} />

                    </Modal>
                </Card>
            </div>
        );
    }
}

export default Category;