import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu, Icon } from 'antd';



import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {

    menuList_map = (menuList) => {
        return menuList.map((item, index) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.menuList_map(item.children)}
                    </SubMenu>
                )
            }

        })
    }
    menuList_reduce = (menuList) => {
        const path = this.props.location.pathname
       
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {

                //    const openKeys = item.children.find(citem => citem.key === path )
                const openKeys = item.children.find(citem => path.indexOf(citem.key) === 0)
                if (openKeys) {
                    this.openKeys = item.key
                    console.log(this)
                }


                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.menuList_map(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }

    componentWillMount() {
        this.menuNodes = this.menuList_reduce(menuList)
    }


    render() {




        let path = this.props.location.pathname
        if (path.indexOf('/products/product') === 0) {
            path = '/products/product'
        }
        const openKey = this.openKeys


        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo" />
                    <h2>后台管理</h2>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                // inlineCollapsed={this.state.collapsed}
                >
                    {this.menuNodes}

                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)
