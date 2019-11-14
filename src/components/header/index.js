import React, { Component } from 'react'

import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqWeather} from '../../api'
import './index.less'


export default class Header extends Component {
    state = {
        sysTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: '',
        temperature: ''
    }


    getsysTime = () => {
        setInterval(() => {
            const sysTime = formateDate(Date.now())
            this.setState({sysTime})
        },1000)
    }

    getWeather = async() => {
        const {dayPictureUrl,weather,temperature} = await reqWeather('宁波')
        this.setState({dayPictureUrl,weather,temperature})
    }

    componentDidMount () {
        this.getsysTime()
        this.getWeather()
    }

    render() {
        const user = memoryUtils.user
        const { sysTime, dayPictureUrl, weather, temperature} = this.state
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{user.username}</span>
                    <a href="">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">
                        <span>首页</span>
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
