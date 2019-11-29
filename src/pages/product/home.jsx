import React, { Component } from 'react';
import { Card, Button, Input, Select, Table, Icon, message } from 'antd'

import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const { Option } = Select

class ProductHome extends Component {

    state = {
        products: [],
        total: 0,
        loading: false,
        searchType: 'productName',
        searchName: ''
    }
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                width: 100,
                title: '状态',
                render: (product) => {
                    const { status, _id } = product
                    return (
                        <span>
                            <Button
                                type='primary'
                                onClick={() => this.updateStatus(status===1 ? 2:1, _id)}
                            >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <LinkButton onClick={() => { this.props.history.push('/products/product/detail', { product }) }}>详情</LinkButton>
                            <LinkButton onClick={() => { this.props.history.push('/products/product/addupdate',product)}}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ]
    }


    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        this.setState({ loading: true })
        const { searchName, searchType } = this.state
        let result
        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName })
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        this.setState({ loading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({
                total,
                products: list
            })
        }
    }


    updateStatus = async (status1, productId1) => {
        const result = await reqUpdateStatus(productId1, status1)
        if(result.status === 0){
            message.success('更新商品状态成功')
            this.getProducts(this.pageNum)
        }
    }

    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
        // this.mounted = false
    }
    render() {
        const { products, loading, total, searchName, searchType } = this.state

        /**
         * 不能在render中直接使用外部的函数来进行state的改变。
         * 但是可以使用比如button的点击事件那样的方式来使用外部的函数对state进行进一步的改变。
         * 这里的button必须要指向this，用箭头函数
         */
        const title = (
            <span>
                <Select value={searchType} style={{ width: 130 }} onChange={value => this.setState({ searchType: value })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='请输入搜索内容' style={{ width: 150, margin: '0 15px' }} value={searchName}
                    onChange={e => this.setState({ searchName: e.target.value })} />
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={ () => this.props.history.push('/products/product/addupdate')}>
                <Icon type='plus' />
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    rowKey='_id'
                    bordered
                    loading={loading}
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        defaultCurrent: 1,
                        defaultPageSize: PAGE_SIZE,
                        total,
                        showQuickJumper: true,
                        onChange: this.getProducts
                        // onChange: (pageNum) => {this.getProducts(pageNum)}
                    }}
                />
            </Card>
        );
    }
}

export default ProductHome;