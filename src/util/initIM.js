import Vue from '@/main.js'
import AV, { Object } from "leancloud-storage";
import { Realtime,TextMessage,Event } from "leancloud-realtime";
import { TypedMessagesPlugin,ImageMessage } from "leancloud-realtime-plugin-typed-messages";
import { mapGetters } from "vuex";
import { getRequest } from '@/util/httpUtil'
import { store } from "@config/api.js"
import { storage } from '@/util/storage'



// import {AV} from './av'

const initIM=(userId)=>{
  let realtime = new Realtime({
    appId: 'FopplxMIbowedHTR8yseJjGs-gzGzoHsz',
    appKey: '0MWelPMmKtpDIiEJAP871OP1',
    plugins: [TypedMessagesPlugin] // 注册富媒体消息插件
  });
  //  用用户的id作为 clientId 来登录即时通讯服务
  let signatureFactory = function() {
    return getRequest(`/user/getLeancloudSign?name=${userId}`)
    .then(resq => {
      let signature = resq.signature;
      let timestamp = parseInt(resq.timestamp);
      let nonce = resq.nonce;

      return {
        signature: signature,
        timestamp: timestamp,
        nonce: nonce
      };
    })
    .catch(err => {
      return Promise.reject(err);
    });
  };
  realtime.createIMClient(userId, {
    signatureFactory: signatureFactory
  })
  .then(function(obj) {
    // 成功登录后获取到这个client对象,挂载到Vue全局变量
    // 成功登录后才会显示聊天浮窗
    Vue.$children[0].showChat=true
    // 成功登录后查找用户所有的聊天成员列表
    obj.getQuery().find().then(conversations=>{
      console.warn(conversations,'所有的聊天列表')
    })

  }).catch(err=>{console.error(err)})

}
export { initIM }