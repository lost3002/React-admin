import ajax from './ajax'

export const reqLogin = (username, password) => ajax('/login2',{username, password},'POST')

export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')