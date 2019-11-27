import React, { Component } from 'react';
import { Card, Icon, List } from 'antd'

import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategory } from '../../api'
import { Promise } from 'core-js';

const { Item } = List
class ProductDetail extends Component {

    state = {
        cname1: '',
        cname2: ''
    }

    async componentDidMount() {
        const { pCategoryId, categoryId } = this.props.location.state.product
        if (pCategoryId === 0) {
            const result = await reqCategory(categoryId)
            const cname1 = result.data.name
            this.setState({ cname1 })
        } else {
            // const result1 = await reqCategory(pCategoryId)
            // const result2 = await reqCategory(categoryId)
            // const cname1 = result1.data.name
            // const cname2 = result2.data.name
            const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
            const cname1 = results[0].data.name
            const cname2 = results[1].data.name
            this.setState({ cname1, cname2 })
        }
    }


    render() {


        const { name, desc, price, detail, imgs } = this.props.location.state.product
        const { cname1, cname2 } = this.state

        const title = (
            <span>
                <LinkButton>
                    <Icon type='arrow-left' style={{ marginRight: 10, fontSize: 20 }} onClick={() => { this.props.history.goBack() }}></Icon>
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <div className='product-detail'>
                <Card title={title}>
                    <List>
                        <Item>
                            <span className='product-detail-left'>商品名称:</span>
                            <span>{name}</span>
                        </Item>
                        <Item>
                            <span className='product-detail-left'>商品描述:</span>
                            <span>{desc}</span>
                        </Item>
                        <Item>
                            <span className='product-detail-left'>商品价格:</span>
                            <span>{price}元</span>
                        </Item>
                        <Item>
                            <span className='product-detail-left'>所属分类:</span>
                            <span>{cname1} {cname2 ? '-->' + cname2 : ''}</span>
                        </Item>
                        <Item>
                            <span className='product-detail-left'>商品图片:</span>
                            <span>
                                {imgs.map(img => <img className='product-detail-img' key={img} src={BASE_IMG_URL + img} alt="img" />)}
                            </span>
                        </Item>
                        <Item>
                            <span className='product-detail-left'>商品详情:</span>
                            <div dangerouslySetInnerHTML={{ __html: detail }}></div>
                        </Item>
                    </List>
                </Card>
            </div>
        );
    }
}

export default ProductDetail