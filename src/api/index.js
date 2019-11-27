import ajax from './ajax'
import {message} from 'antd'
import jsonp from 'jsonp'
const BASE = ''
export const reqLogin = (username, password) => ajax(BASE+'/login', { username, password }, 'POST')
//添加用户
export const reqAddUser = (user) => ajax(BASE+'/manage/user/add', user, 'POST')
//获取一级二级分类列表
export const reqCategorys = (parentId) => ajax(BASE+'/manage/category/list',{parentId})
//添加分类
export const reqAddCategory = ({parentId, categoryName}) => ajax(BASE+'/manage/category/add',{parentId, categoryName},'POST')
//更新分类
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE+'/manage/category/update',{categoryId, categoryName},'POST')
//获取分类名称
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info',{categoryId})


//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list',{pageNum, pageSize})
// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus',{productId, status},'POST')
// 搜索条件获取分页
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) => ajax(BASE + '/manage/product/search',{pageNum, pageSize, [searchType]: searchName})

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