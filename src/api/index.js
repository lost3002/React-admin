import ajax from './ajax'
import {message} from 'antd'
import jsonp from 'jsonp'

export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

// 天气请求
export const reqWeather = (city) => {
    return new Promise((resolve,reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {
            console.log("jsonp()", err, data)
            if (!err && data.status === 'success') {
                const { dayPictureUrl, weather, temperature } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather, temperature })
            } else {
                message.error('天气请求失败')
            }
        })
    })

}
reqWeather('宁波')