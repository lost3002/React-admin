import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'

import LinkButton from '../link-button'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils1 from '../../utils/memoryUtils'
import localstoreUtils from '../../utils/localstoreUtils'
import { reqWeather } from '../../api'
import menu from '../../config/menuConfig'
import './index.less'


class Header extends Component {
    state = {
        sysTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: '',
        temperature: ''
    }


    getsysTime = () => {
        this.getsysTimeId = setInterval(() => {
            const sysTime = formateDate(Date.now())
            this.setState({ sysTime })
        }, 1000)
    }

    getWeather = async () => {
        const { dayPictureUrl, weather, temperature } = await reqWeather('宁波')
        this.setState({ dayPictureUrl, weather, temperature })
    }

    getTitle = (path) => {
        let title
        menu.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                // item.children.forEach(item => {
                //     if (path.indexOf(item.key) === 0) {
                //         title = item.title
                //     }
                // })
               const cItem = item.children.find(citem => citem.key === path)
               if(cItem){
                    title = cItem.title
               }
            }
        })
        return title
    }
    

    logOut = () => {
        Modal.confirm({
            title: '你确定想要退出系统吗?',
            onOk: () => {
                console.log('OK');
                localstoreUtils.removeUser()
                memoryUtils1.user = {}
                this.props.history.replace('/')
            }
        })
    }

    componentDidMount() {
        this.getsysTime()
        this.getWeather()
        
    }

    componentWillUnmount () {
        clearInterval(this.getsysTimeId)
    }

    render() {
        const user = memoryUtils1.user
        const { sysTime, dayPictureUrl, weather, temperature } = this.state
        const path = this.props.location.pathname

        const title = this.getTitle(path)


        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{user.username}</span>
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">
                        <span>{title}</span>
                    </div>
                    <div className="header-bottom-right">
                        <span>{sysTime}</span>
                        <img src={dayPictureUrl} alt="tupian" />
                        <span>{weather}</span>
                        <span>{temperature}</span>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(Header)
