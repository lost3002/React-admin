import React, { Component } from 'react';
import { Layout } from 'antd';


import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

const {  Footer, Sider, Content } = Layout;


class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if (!user || !user._id) {
            return <Redirect to="/login" />
        }

        return (
            <div style ={{ height : '100%'}}>
                <Layout style ={{ height : '100%'}} >
                    <Sider>
                        <LeftNav />
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style = {{background : '#FFF'}}>Content</Content>
                        <Footer style = {{ textAlign : 'center', color : '#ccc'}}>请使用谷歌浏览器以获得更好的体验</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Admin;
