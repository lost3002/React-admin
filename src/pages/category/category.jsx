import React, { Component } from 'react';
import { Card, Table, Button, } from 'antd'

import LinkButton from '../../components/link-button'

class Category extends Component {





    render() {

        const dataSource = [
            {
                "parentId": "0",
                "_id": "5c2ed631f352726338607046",
                "name": "分类001",
                "__v": 0
            },
            {
                "parentId": "0",
                "_id": "5c2ed647f352726338607047",
                "name": "分类2",
                "__v": 0
            },
            {
                "parentId": "0",
                "_id": "5c2ed64cf352726338607048",
                "name": "1分类3",
                "__v": 0
            }
        ]



        const columns = [
            {
                title: '分类',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                dataIndex: '',
                render: () => (
                    <span>
                        <LinkButton>修改</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                )
            },
        ]

        const title = '商品分类'
        const extra = (
            <Button type="primary" shape="round" icon="plus">
                添加分类
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra} >
                    <Table dataSource={dataSource} columns={columns} rowKey='_id' bordered />
                </Card>
            </div>
        );
    }
}

export default Category;