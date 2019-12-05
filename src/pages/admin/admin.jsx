import React, { Component } from 'react';
import { Layout } from 'antd';


import { Redirect, Switch, Route } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home' 
import Category from '../category/category' 
import Product from '../product/product' 
import Role from '../role/role' 
import User from '../user/user' 
import Bar from '../charts/bar' 
import Line from '../charts/line' 
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;


class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if (!user || !user._id) {
            return <Redirect to="/login" />
        }

        return (
            <div style={{ minHeight: '100%' }}>
                <Layout style={{ minHeight: '100%' }} >
                    <Sider>
                        <LeftNav />
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{ background: '#FFF' ,margin : '20px 15px'}}>
                            <Switch>
                                <Route path='/home' component={Home}></Route>
                                <Route path='/products/product' component={Product}></Route>
                                <Route path='/products/category' component={Category}></Route>
                                <Route path='/role' component={Role}></Route>
                                <Route path='/user' component={User}></Route>
                                <Route path='/charts/bar' component={Bar}></Route>
                                <Route path='/charts/line' component={Line}></Route>
                                <Route path='/charts/pie' component={Pie}></Route>
                                <Redirect to='/home'></Redirect>
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center', color: '#ccc' }}>请使用谷歌浏览器以获得更好的体验</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Admin;
