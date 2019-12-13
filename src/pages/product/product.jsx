import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductUpdate from './add-update'
import ProductDetail from './detail'
import ProductHome from './home'

import './detail.less'

class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/products/product' component={ProductHome} exact></Route>
                <Route path='/products/product/detail' component={ProductDetail}></Route>
                <Route path='/products/product/addupdate' component={ProductUpdate}></Route>
                <Redirect to='/products/product'></Redirect>
            </Switch>
        );
    }
}

export default Product;