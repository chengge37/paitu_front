import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import shortid from 'shortid';
var _ = require('lodash/core');
const socket={
  // state:{
  //   socketStatus:-1,
  //   frontSocketStatus:-1,
  //   payStatus:-1,
  //   applyPayStatus:-1,//申请支付
  // },
  // mutations:{
  //   setSocketStatus(state,status){
  //     state.socketStatus=status+'+'+Date.now();
  //   },
  //   setFrontSocketStatus(state,status){
  //     state.frontSocketStatus=status+'+'+Date.now();
  //   },
  //   setPayStatus(state,status){
  //     state.payStatus=status+'+'+Date.now();
  //   },
  //   setApplyPayStatus(state,status){
  //     state.applyPayStatus=status+'+'+Date.now();
  //   },
  // },
  // getters:{
  //   applyPayStatus: state => state.applyPayStatus,
  // }

  state: {
    socket: {
      isConnected: false,
      reconnectError: false,
      applyPayMsg: false,
      conversationList: [],
      activeConversationIndex: -1,
      msgMap:{},//结构为{conversationId1:[msg1,msg2..],conversationId2:[msg3...],...}
      newMsgObj:null
    }
  },
  mutations:{
    SOCKET_ONOPEN (state, event)  {
      console.error('SOCKET_ONOPEN');
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
      let uuid = shortid.generate();
      let queryData = {
        uuid: uuid,
        'class': 'Conversation',
        action: 'get',
      }
      console.log('连接成功后获取会话列表');
      Vue.prototype.$socket.send(JSON.stringify(queryData));
    },
    SOCKET_ONCLOSE (state, event)  {
      console.error('SOCKET_ONCLOSE');
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event)  {
      console.error('SOCKET_ONERROR',state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      console.error('SOCKET_ONMESSAGE',message.data);
      let dataStr = message.data;
      function strIsJSON(str) {
          if (typeof str == 'string') {
              try {
                  var obj = JSON.parse(str);
                  if (typeof obj == 'object' && obj) {
                      return true;
                  } else {
                      return false;
                  }

              } catch (e) {
                  console.log('error：' + str + '!!!' + e);
                  return false;
              }
          }
          return false;
      };
      let isJSON = strIsJSON(dataStr);
      if(!isJSON){
        console.error('不是JSON字符串');
        return;
      }
      let dataObj = JSON.parse(dataStr);
      console.log('消息字符串转obj',dataObj);
      //IM 消息和通知结构不一样。
      if(dataObj.type !== undefined){
        //IM系统消息
        if(dataObj.type == 'CONVERSATION_LIST'){
          //会话列表
          let convList = dataObj.data;
          convList = _.sortBy(convList, function(o) { return -1*o.createTime; });
          state.socket.conversationList = convList;
          
        } else if (dataObj.type == 'CONVERSATION_DETAIL'){
          //创建会话
          let newConversation = dataObj.data;
          let existList = state.socket.conversationList;
          let existIndex = -1;
          for(let i = 0, n = existList.length; i<n;i++){
            let existItem = existList[i];
            if(existItem.id == newConversation.id){
              existIndex = i;
              break;
            }
          }
          if(existIndex == -1){
            console.log('list没有 新加');
            state.socket.conversationList.push(newConversation);
            state.socket.activeConversationIndex = 0;
          } else {
            console.log('list中有本会话了 替换为 '+existIndex);
            Vue.set(state.socket.conversationList,existIndex,newConversation)
            state.socket.activeConversationIndex = existIndex;
          }
        } else if (dataObj.type == 'MESSAGE_LIST'){
          //消息列表
          let newMsgListData = dataObj.data;
          console.log("消息列表",newMsgListData);
          let conversationId = newMsgListData.conversation_id;
          console.log("conversationId" + conversationId);
          let msgList = newMsgListData.list;
          msgList = _.sortBy(msgList, function(o) { return o.createTime; });
          state.socket.msgMap[conversationId] = msgList;
          let temp = state.socket.msgMap;
          state.socket.msgMap = {};
          state.socket.msgMap = temp;
          
          //下面只是为了触发刷新UI watch conversation_list
          let tempConversationList = state.socket.conversationList;
          state.socket.conversationList = [];
          state.socket.conversationList = tempConversationList;

        } else if (dataObj.type == 'MESSAGE_DETAIL'){
          //单条消息
          let newMsgObj = dataObj.data;
          state.socket.newMsgObj = newMsgObj;
          let conversationId = newMsgObj.conversation.id;
          //处理会话列表
          let existList = state.socket.conversationList;
          let existIndex = -1;
          for(let i = 0, n = existList.length; i<n;i++){
            let existItem = existList[i];
            if(existItem.id == conversationId){
              existIndex = i;
              break;
            }
          }
          if(existIndex == -1){
            state.socket.conversationList.push(newMsgObj.conversation);
          } else {
            state.socket.conversationList[existIndex] = newMsgObj.conversation;
          }

          let msgMap = state.socket.msgMap;
          if(msgMap[conversationId] == undefined){
            console.log('插入消息1');
            
            state.socket.msgMap = {};
            state.socket.msgMap[conversationId] = [newMsgObj];
            //Vue.set(state.socket.msgMap,0,{conversationId:[newMsgObj]})
          } else {
            let existMsgList = msgMap[conversationId];
            let existIndex = false;
            for(let i = 0, n = existMsgList.length; i<n;i++){
            let existMsgItem = existMsgList[i];
              if(existMsgItem.id == newMsgObj.id){
                existIndex = true;
                break;
              }
            }
            if(!existIndex){
              //不存在就插入
              console.log('插入消息2');
              existMsgList.push(newMsgObj);
              console.log('插入消息2',existMsgList);
              //state.socket.msgMap[conversationId] = existMsgList;
              Vue.set(state.socket.msgMap,conversationId,existMsgList);
              console.log('插入消息2',state.socket.msgMap);
              let temp = state.socket.msgMap;
              state.socket.msgMap = {};
              state.socket.msgMap = temp;
            }
          }
          console.log('新的消息MAP ',state.socket.msgMap);
        }
      } else {
        //通知消息
        if(dataObj.json.data.type == "userApplyPayStatus"){
        //申请支付
          state.socket.applyPayMsg = dataObj.json.data;
        }
      }
      
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    remove_apply_pay_msg(state){
      state.socket.applyPayMsg = false;
    }
  },
  getters:{
    socket_isConnected: (state)=>{
      return state.socket.isConnected
    },
    conversation_list: (state)=>{
      return state.socket.conversationList
    },
    active_conversation_index:(state)=>{
      return state.socket.activeConversationIndex
    },
    message_map:(state)=>{
      return state.socket.msgMap
    },
    new_msg_obj:(state)=>{
      return state.socket.newMsgObj;
    }
  },
   actions: {
      get_conversation({ commit }, data) {
          console.log('get_conversation in store');
          let uuid = shortid.generate();
            		let queryData = {
                  uuid: uuid,
                  'class': 'Conversation',
                  action: 'get',
                }
            Vue.prototype.$socket.send(JSON.stringify(queryData));
      },
      create_conversation({commit},data){
        console.log('创建会话Action In Store');
        let uuid = shortid.generate();
        let queryData = {
          uuid: uuid,
          'class': 'Conversation',
          action: 'create',
          content: {
            to_uid: data
          }
        }
        Vue.prototype.$socket.send(JSON.stringify(queryData));
      },
      read_conversation({commit},data){
        console.log('标记会话已读Action In Store');
        let uuid = shortid.generate();
        let queryData = {
          uuid: uuid,
          'class': 'Conversation',
          action: 'read',
          content: {
            conversation_id: data
          }
        }
        Vue.prototype.$socket.send(JSON.stringify(queryData));
      },
      get_message({commit},data){
        console.log('查询消息 In Store');
          let uuid = shortid.generate();
          let queryData = {
            uuid: uuid,
            'class': 'Message',
            action: 'get',
            content: {
              conversation_id: data
            }
          }
          Vue.prototype.$socket.send(JSON.stringify(queryData));
      },
      send_message({commit},data){
        let uuid = shortid.generate();
          let queryData = {
            uuid: uuid,
            'class': 'Message',
            action: 'send',
            content: {
              conversation_id: data.conversation_id,
              msg_type: data.msg_type,
              msg_content: data.msg_content,
            }
          }
          Vue.prototype.$socket.send(JSON.stringify(queryData));
      }
   },
   

}
export default socket