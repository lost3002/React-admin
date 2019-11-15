/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function formateDate(time) {
  if (!time) return ''
  let date = new Date(time)
  let year = date.getFullYear()
  let month = (date.getMonth() + 1)
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  let today = date.getDay()
  let apm = "AM"
  if(hours > 12){
    hours = hours - 12
    apm = "PM"
  }
  month = month < 10 ? "0" + month : month
  day = day < 10 ? "0" + day : day
  hours = hours < 10 ? "0" + hours : hours
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds
  let weekday
  switch (today) {
    case 0:
      weekday = "星期日"
      break;
    case 1:
      weekday = "星期一"
      break;
    case 2:
      weekday = "星期二"
      break;
    case 3:
      weekday = "星期三"
      break;
    case 4:
      weekday = "星期四"
      break;
    case 5:
      weekday = "星期五"
      break;
    case 6:
      weekday = "星期六"
      break;
    default:
      break;
  }
  return year + '-' + month + '-' + day
    + ' ' + hours + ':' + minutes + ':' + seconds +' '+ apm + ' ' + weekday
}