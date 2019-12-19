import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER
  } from './action-types'

  import {reqLogin} from '../api'
  import storageUtils from '../utils/storageUtils'
  
  /*
  设置头部标题的同步action
   */
  export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})
  export const receiveUser = (user) => ({type: RECEIVE_USER, user})
  export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})
  export const loginOut = () => {
    storageUtils.removeUser()
    return {type: RESET_USER}
  }

  export const login = (username, password) => {
    return async dispatch => {
      const result = await reqLogin(username, password)
      if(result.status === 0){
        // 保存在内存中
        storageUtils.saveUser(result.data)
        dispatch(receiveUser(result.data))
      }else{
        dispatch(showErrorMsg(result.msg))
      }
    }
  }