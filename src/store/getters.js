const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  user_data: state => state.user.user_data,
  loginOver: state => state.user.loginOver,
  is_login_in: state => state.user.user_data != null && state.user.user_data != undefined && state.user.user_data != false,
  no_login_notice_time: state => state.user.no_login_notice_time,
  city_code: state => state.city.city_code,
  errorLogs: state => state.errorLog.logs,
  initChatObj: state=>state.im.initChatObj,
  socketStatus: state=>state.socket.socketStatus,
  payStatus: state=>state.socket.payStatus,
  sign_info: state=>state.sign.sign_info,
  socket: state=>state.socket.socket,
}
export default getters
