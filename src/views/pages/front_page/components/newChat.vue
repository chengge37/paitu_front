<template>
<div>
    <div class="chat-wrap" v-if="showIM">
        <!-- 聊天入口小浮窗 -->
        <div class="enter" @click="openConversation" v-if="!isShowList">
            <!-- <span></span> -->
            <i class="el-icon-chat-dot-round animated" :class="[{ flash: hasNew, new: hasNew }]"></i>
        </div>
        <!-- 聊天好友列表 -->
        <div class="menbers-list-wrap" v-show="isShowList">
            <div class="person-info">
                <div class="first-row">
                    <!-- <span class="my-name">{{user_data.nick}}</span> -->
                    <span class="my-name">聊天列表</span>
                    <i class="el-icon-circle-close" @click="closeConversation"></i>
                </div>
            </div>
            <div class="menbers-list">
                <div class="menber-wrap" v-if="conversationList.length > 0">
                    <div class="menber" @click="clickCoversationList(item)" v-for="(item, index) in conversationList" :key="index">
                        <div class="menber-left">
                            <img :src="picDeal(item)" alt="" />
                        </div>
                        <div class="menber-right">
                            <span class="menber-name">{{ nameDeal(item) }}</span>
                            <span class="last-msg">{{
                  item.lastMsg == null ? "" : item.lastMsg.content
                }}</span>
                        </div>
                        <div class="new-count" v-show="unReadCount(item) > 0">
                            {{ unReadCount(item) }}
                        </div>
                    </div>
                </div>
                <div class="no-menber" v-else>暂无对话</div>
            </div>
        </div>
        <!-- 聊天对话消息窗口 -->
        <!-- <div class="chat-window" draggable="true" @drag="dragging" @dragstart="startDrag" @dragend="endDrag" v-if="isShowChat" :class="{'max-window':isMaxWindow}"> -->
        <div class="chat-window" v-if="isShowChat" :class="{ 'max-window': isMaxWindow }" @click="clickChatWindow">
            <!-- 左边的发起聊天成员列表 -->
            <div class="window-left" v-if="chattingMenbers.length > 1">
                <div class="chat-menber" @click="clickCoversationList(item)" v-for="(item, index) in chattingMenbers" :key="index" :class="{ 'chat-menber-checked': item.id == curChatId }">
                    <img :src="picDeal(item)" alt="" />
                    <span class="menber-name">{{ nameDeal(item) }}</span>
                    <i class="el-icon-error" @click.stop="delChatting(item, index)"></i>
                </div>
            </div>
            <!-- 右边的聊天窗口主体 -->
            <div class="window-right">
                <div class="chat-top" @mousedown="boxMove($event)">
                    <!-- 聊天对象的头像名字 -->
                    <div class="menber-info">
                        <!-- <img src="http://img1.imgtn.bdimg.com/it/u=2357912857,682090914&fm=26&gp=0.jpg" alt=""> -->
                        <img :src="
                  chatObj.avatar
                    ? chatObj.avatar.indexOf('http') == -1
                      ? $qiniuHost + chatObj.avatar
                      : chatObj.avatar
                    : 'https://pic.paitume.com/images/male.png'
                " alt="" />
                        <span class="menber-name">{{ chatObj.nick }}</span>
                    </div>
                    <!-- 控制窗口大小关闭的按钮 -->
                    <div class="window-operation">
                        <i v-if="!isMaxWindow" class="el-icon-minus" @click.stop="minWindow"></i>
                        <i v-if="!isMaxWindow" class="el-icon-full-screen" @click="maxWindow"></i>
                        <i v-else class="el-icon-copy-document" @click="cancelMaxWindow"></i>
                        <i class="el-icon-circle-close" @click="closeChatWindow"></i>
                    </div>
                </div>
                <!-- 消息展示框 -->
                <div class="message-box" :class="{ 'max-message-box': isMaxWindow }" ref="msgBox">
                    <div class="message" v-for="(item, index) in msgList" :key="index" :class="{ 'my-message': item.creatorId == user_data.id }">
                        <!-- <img :src="picDeal(item)" alt=""> -->
                        <img class="avatar" :src="myAvatar" alt="" v-if="item.creatorId == user_data.id" />
                        <img class="avatar" :src="hisAvatar" alt="" v-else />
                        <div class="msg-body">
                            <div class="name-time">
                                <span class="name">{{
                    item.creatorId == user_data.id
                      ? creatorObj.name
                      : chatObj.name
                  }}</span>
                                <span class="time">{{item.createTime | time2FullDate }}</span>
                            </div>
                            <div class="content">
                                <span class="text" v-if="item.type == 1">{{
                    item.content
                  }}</span>
                                <div class="file" v-else>
                                    <div class="file-link">
                                        <!-- 图片类型消息 -->
                                        <img v-if="item.type == -2" @click="openUrl" :src="item._lcfile.url" alt="" />
                                        <!-- 视频类型消息 -->
                                        <video controls v-if="item.type == -4" :src="item._lcfile.url"></video>
                                        <!-- 音频类型消息 -->
                                        <audio controls v-if="item.type == -3" :src="item._lcfile.url"></audio>
                                        <!-- word，excel，ppt，txt等文件 -->
                                        <i v-if="item.type == -6" class="el-icon-document"></i>
                                        <a target="_blank" :href="item._lcfile.url">{{
                        item._file.attributes.name
                      }}</a>
                                    </div>
                                    <span class="decription">{{ item.text }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 发送文件，聊天记录等操作按钮 -->
                <div class="send-operation">
                    <span class="send-file">
                        <i class="el-icon-folder-opened"></i>
                        <input ref="inputFile" type="file" @change="selectFile" />
                    </span>
                    <div class="emoji-wrap" @click.stop="clickEmojiBox">
                        <span @click="openEmoji">😄</span>
                        <div class="emoji-box" v-if="showEmoji">
                            <div class="emoji-group" v-for="(item, index) in emojiArr" :key="index">
                                <p class="emoji-class">{{ item.name }}</p>
                                <div class="emoji-list">
                                    <span class="emoji-item" v-for="(each, j) in item.emojis" :key="j" @click="selectEmoji(each)">{{ each }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="file-info" v-if="fileObj">
                        <span class="file-name">{{ fileObj.name }}</span>
                        <span class="cancel-btn" @click="cancelFile">取消该文件</span>
                        <!-- <i class="el-icon-close" @click="cancelFile"></i> -->
                    </div>
                    <!-- <el-upload
              class="upload-demo"
              :on-change="handleChange"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload> -->

                    <span class="history-label" @click="toggleHistory"><i class="el-icon-time"></i> 聊天记录</span>
                </div>
                <!-- 消息输入区域 -->
                <div class="input-area">
                    <el-input type="textarea" placeholder="请输入内容,可按【 Enter 】发送" @keydown.enter.native="preventChangeRow($event)" @keyup.enter.native="sendMessage()" v-model="inputContent">
                    </el-input>
                </div>
                <!-- 关闭发送按钮 -->
                <div class="bottom-btn">
                    <span @click.stop="closeChatWindow">关闭</span>
                    <span @click.stop="sendMessage">发送</span>
                </div>
            </div>
        </div>
        <!-- 聊天窗口最小化后的图标 -->
        <div class="small-chat" v-if="isMinWindow" @click="returnChat">
            <img :src="chatObj.avatar" alt="" />
            <span class="menber-name">{{ chatObj.name }}</span>
        </div>
        <!-- 聊天记录窗口 -->
        <div class="history-box animated" v-if="isShowHistory" :class="[{ 'max-history': isMaxHistory, fadeInUpBig: isShowHistory }]">
            <div class="history-top">
                <span>与 {{ chatObj.name }} 的聊天记录</span>
                <div class="history-box-operation">
                    <i v-if="!isMaxHistory" class="el-icon-minus" @click="minHistory"></i>
                    <i v-if="!isMaxHistory" class="el-icon-full-screen" @click="maxHistory"></i>
                    <i v-else class="el-icon-copy-document" @click="cancelMaxHistory"></i>
                    <i class="el-icon-circle-close" @click="toggleHistory"></i>
                </div>
            </div>
            <div class="history-message-box" ref="historyMsg">
                <p class="tip">温馨提醒：目前只能查询到最近半年的消息记录</p>
                <div class="message" v-for="(item, index) in historyMsgList" :key="index" :class="{ 'my-message': item.creatorId == user_data.id }">
                    <!-- <img :src="picDeal(item)" alt=""> -->
                    <img class="avatar" :src="myAvatar" alt="" v-if="item.creatorId == user_data.id" />
                    <img class="avatar" :src="hisAvatar" alt="" v-else />
                    <div class="msg-body">
                        <div class="name-time">
                            <span class="name">{{
                  item.creatorId == user_data.id ? creatorObj.name : chatObj.name
                }}</span>
                            <!-- <span class="time">{{dealTime(item.from==user_data.id?item.timestamp:item.deliveredAt)}}</span> -->
                            <span class="time">{{ item.timestamp | time2FullDate }}</span>
                        </div>
                        <div class="content">
                            <span class="text" v-if="item.type == 1">{{
                  item.content
                }}</span>
                            <div class="file" v-else>
                                <div class="file-link">
                                    <!-- 图片类型消息 -->
                                    <img v-if="item.type == -2" @click="openUrl" :src="item._lcfile.url" alt="" />
                                    <!-- 视频类型消息 -->
                                    <video controls v-if="item.type == -4" :src="item._lcfile.url"></video>
                                    <!-- 音频类型消息 -->
                                    <audio controls v-if="item.type == -3" :src="item._lcfile.url"></audio>
                                    <!-- word，excel，ppt，txt等文件 -->
                                    <i v-if="item.type == -6" class="el-icon-document"></i>
                                    <a target="_blank" :href="item._lcfile.url">{{
                      item._file.attributes.name
                    }}</a>
                                </div>
                                <span class="decription">{{ item.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 历史聊天记录最小化后的图标 -->
        <div class="small-history" v-if="isMinHistory">
            <span>聊天记录</span>
            <i class="el-icon-copy-document" @click="toggleHistory"></i>
            <i class="el-icon-close" @click="closeMinHistory"></i>
        </div>
    </div>
    <!-- 迷你登录 -->
    <login :reg="true" :openlogin="showLogin" @closed="closeLogin"></login>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import {
    getRequest
} from "@/util/httpUtil";
import {
    store
} from "@config/api.js";
import {
    storage
} from "@/util/storage";
import {
    async
} from "q";
import Login from "./minilogin";
import Emoji from "./emoji/emojiData";

export default {
    data() {
        return {
            showIM: true,
            isShowList: false,
            isShowChat: false,
            isMaxWindow: false,
            isMinWindow: false,
            inputContent: "",
            chattingMenbers: [], //聊天窗体左侧发起的聊天成员
            menberList: [], //成员列表
            conversationList: [], //会话列表
            curItem: null,
            isShowHistory: false,
            isMinHistory: false,
            isMaxHistory: false,
            initX: null,
            initY: null,
            fileObj: null,
            fileName: null,
            initObj: null,
            creatorObj: {
                id: null,
                name: null,
                avatar: null,
            },
            chatObj: {},
            historyMsgList: [],
            conversationObj: null,
            sentFile: null,
            curChatId: null,
            hasNew: false,
            showLogin: false,
            // textMsgObj:null,
            // fileMsgObj:null,
            emojiArr: [],
            showEmoji: false,
            myAvatar: "",
            hisAvatar: "",
        };
    },
    components: {
        Login,
    },
    created() {
        this.emojiArr = Emoji;
        console.warn(this.user_data, "聊天用到登录用户信息");
        if (this.user_data) {
            // this.showIM=true
            this.creatorObj.id = this.user_data.id;
            this.creatorObj.name = this.user_data.nick;
            this.creatorObj.avatar = this.user_data.avatar;
            if (!this.creatorObj.avatar) {
                this.creatorObj.avatar = "https://pic.paitume.com/images/male.png";
            }
        }
    },
    mounted() {
        console.warn("mounted执行", Emoji);
    },

    updated() {
        // this.$refs.msgBox.scrollTo(0,this.$refs.msgBox.scrollHeight);
    },

    computed: {
        ...mapGetters([
            "is_login_in",
            "user_data",
            "loginOver",
            "socket_isConnected",
            "conversation_list",
            "active_conversation_index",
            "message_map",
            "new_msg_obj",
        ]),
        msgList(){
            if(this.active_conversation_index>-1){
                let conversation = this.conversation_list[this.active_conversation_index];
                let conversationId=  conversation.id;
                if(this.message_map[conversationId] == undefined){
                    return [];
                } else {
                    return this.message_map[conversationId];
                }
            } 
            return [];
        }
    },
    watch: {
        socket_isConnected(val) {
            console.log("socket_isConnected 变化 " + val);
            this.showIM = val;
        },
        user_data(val) {
            console.warn("userdata有变化", val);
            if (val) {
                this.showIM = true;
            } else {
                this.showIM = false;
                this.isShowList = false;
                this.isShowChat = false;
                this.isMaxWindow = false;
                this.isMinWindow = false;
                this.isShowHistory = false;
                this.isMinHistory = false;
                this.isMaxHistory = false;
            }
        },
        "user_data.id": {
            handler: function (newval, oldval) {
                if (newval) {
                    
                } else {
                    this.showIM = false;
                    this.isShowList = false;
                    this.isShowChat = false;
                    this.isMaxWindow = false;
                    this.isMinWindow = false;
                    this.isShowHistory = false;
                    this.isMinHistory = false;
                    this.isMaxHistory = false;
                }
            },
        },
        active_conversation_index(val) {
            console.log("active_conversation_index = " + val);

            let activeConversation = this.conversation_list[val];
            if (activeConversation != undefined) {
                this.curChatId = activeConversation.id;
                //获取消息列表
                this.$store.dispatch("get_message", activeConversation.id);
            }
        },
        new_msg_obj(val) {
            //接受到新的消息 单个消息
            //有新消息 socket层会更新conversation_list和message_map，这里不需要要处理
            console.log('接受到新消息',val);
            this.sendRead();
            this.scrollToBottom();
        },
        conversation_list: {
            handler(val, oldVal) {
                console.log("conversation_list 有变化", val);
                this.conversationList = val;
                console.log("现在的 active_conversation_index = " + this.active_conversation_index);
                console.log("现在的 message_map = " , this.message_map);
                this.scrollToBottom();
                this.sendRead();
                this.hasNewMsg();
                // if(this.active_conversation_index > -1){
                //     let activeConversation = this.conversationList[this.active_conversation_index];
                //     this.curChatId = activeConversation.id;
                //     this.$store.dispatch("get_message", activeConversation.id);
                // }
            },
            deep: true,
        },
        isShowChat(val){
            if(val){
                this.scrollToBottom();
            }
        }
    },
    filters: {},
    methods: {
        // 点击聊天窗口的时候打开的表情包盒子要关闭
        clickChatWindow() {
            console.warn("点击了");
            this.showEmoji = false;
        },
        // 点击表情包盒子
        clickEmojiBox() {
            this.showEmoji = true;
        },
        // 打开表情包盒子
        openEmoji() {
            this.showEmoji = true;
        },
        // 选择表情
        selectEmoji(item) {
            this.inputContent += item;
        },
        // 关闭迷你登录
        closeLogin() {
            this.showLogin = false;
        },
        
        unReadCount(conversation){
            if(this.user_data.id == conversation.creatorObj.id){
                //会话是我发起的
                return conversation.unreadCountCreator;
            } else {
                return conversation.unreadCountChatTo;
            }
        },
        // 聊天图标是否闪烁提醒用户有新的消息
        hasNewMsg() {
            console.warn("判断是否有新消息",this.conversationList);
            this.hasNew = this.conversationList.some((conversation) => {
                if(this.user_data.id == conversation.creatorObj.id){
                    //会话是我发起的
                    return conversation.unreadCountCreator != 0;
                } else {
                    return conversation.unreadCountChatTo != 0;
                }
            });
        },
        // 点击聊天浮窗打开聊天好友列表
        openConversation() {
            console.warn("打开会话列表");
            this.$nextTick(() => {
                this.isShowList = true;
            });
            this.$store.dispatch('get_conversation');
        },
        // 关闭聊天好友列表
        closeConversation() {
            this.isShowList = false;
            console.warn(
                "触发关闭ui文案就几块腹肌咖啡大师金克拉分量接口的撒666",
                this.isShowList
            );
        },
        // 最小化聊天对话框成小浮窗
        minWindow() {
            this.showEmoji = false;
            this.isShowChat = false;
            this.isMinWindow = true;
            this.$nextTick(() => {
                document.getElementsByClassName("small-chat")[0].style.top = null;
                document.getElementsByClassName("small-chat")[0].style.left = null;
            });
        },
        // 最大化聊天对话框
        maxWindow() {
            this.isMaxWindow = true;
            document.querySelector("body").setAttribute("style", "overflow:hidden");
            this.$nextTick(() => {
                document.getElementsByClassName("max-window")[0].style.top = null;
                document.getElementsByClassName("max-window")[0].style.left = null;
            });
        },
        // 取消最大化聊天对话框
        cancelMaxWindow() {
            this.isMaxWindow = false;
            document.querySelector("body").setAttribute("style", "overflow-y:scroll");
        },
        // 点击聊天好友列表中的某个人发起聊天
        clickCoversationList(conversation) {
            this.chatObj =
                conversation.creatorObj.id == this.user_data.id ?
                conversation.chatToObj :
                conversation.creatorObj

            this.curChatId = conversation.id;
            this.chatTo(this.chatObj);
        },
        // 发起和某人的聊天
        chatTo(chatObj) {
            console.log("发起和某人的聊天", chatObj);
            if (!this.user_data) {
                // this.$message.warning('请先登录')
                // this.$router.push('/login')
                this.showLogin = true;
                return;
            }
            if (!chatObj.id) {
                this.$message.error("出错了，聊天对象缺少id");
                return;
            }
            this.chatObj = {
                ...chatObj
            };
            if (!this.chatObj.avatar) {
                this.chatObj.avatar = "https://pic.paitume.com/images/male.png";
            }
            this.myAvatar = this.user_data.avatar;
            this.hisAvatar = this.chatObj.avatar;

            if (this.myAvatar) {
                if (this.myAvatar.indexOf("http") == -1) {
                    this.myAvatar = this.$qiniuHost + this.myAvatar;
                }
            } else {
                this.myAvatar = "https://pic.paitume.com/images/male.png";
            }
            if (this.hisAvatar) {
                if (this.hisAvatar.indexOf("http") == -1) {
                    this.hisAvatar = this.$qiniuHost + this.hisAvatar;
                }
            } else {
                this.hisAvatar = "https://pic.paitume.com/images/male.png";
            }
            this.$store.dispatch("create_conversation", chatObj.id);
            this.isShowChat = true;
            this.isMaxWindow = false;
            this.isMinWindow = false;
            //  this.curChatId=conversation.id
        },
        sendRead(){
            //聊天对话框打开 发送已读
            if(this.active_conversation_index > -1 && this.isShowChat){
                let activeConversation = this.conversationList[this.active_conversation_index];
                let unReadCount = this.unReadCount(activeConversation);
                console.log('自己的未读 = ' + unReadCount);
                if(unReadCount > 0 ){
                    this.curChatId = activeConversation.id;
                    this.$store.dispatch("read_conversation", activeConversation.id);
                }
            }
        },
        // 阻止回车换行必须在回车键按下keydown的时候阻止
        preventChangeRow(e) {
            e.preventDefault();
        },
        // 发送消息
        sendMessage() {
            this.showEmoji = false;
            var _this = this;
            // 发送文件类型消息
            if (this.fileObj) {
                console.warn(this.fileObj, "要发送的文件");
                var file = new AV.File(this.fileObj.name, this.fileObj);
                console.warn(file, "AV初始化File");
                file
                    .save()
                    .then(function () {
                        if (_this.fileObj.type.indexOf("image") != -1) {
                            // 发送图片
                            var message = new ImageMessage(file);
                        } else if (_this.fileObj.type.indexOf("video") != -1) {
                            // 发送视频
                            var message = new VideoMessage(file);
                        } else if (_this.fileObj.type.indexOf("audio") != -1) {
                            // 发送音频
                            var message = new AudioMessage(file);
                        } else {
                            // 发送其他文件类型
                            var message = new FileMessage(file);
                        }
                        if (_this.inputContent) {
                            message.setText(_this.inputContent);
                        }
                        return _this.conversationObj.send(message);
                    })
                    .then(function (msg) {
                        console.log("文件发送成功", msg);
                        _this.decription = msg.text;
                        // 如果成员列表一开始还没有数据
                        if (_this.msgList.length == 0) {
                            _this.menberList.push(_this.conversationObj);
                        }
                        // 把消息推入messageList
                        _this.msgList.push(msg);
                        // 更新成员列表中的最后一条消息
                        _this.menberList.forEach((item, index) => {
                            if (item.id == _this.conversationObj.id) {
                                _this.$set(item, "lastMsg", msg);
                                console.warn(item, "文件类型最后一条消息");
                            }
                        });
                        console.warn(_this.msgList, "所有消息888");
                        // _this.conversationObj.queryMessages({
                        //     limit: 1000,
                        // }).then((messages)=> {
                        //   console.warn(messages[messages.length-1],'最后一条文件消息')
                        //   _this.menberList.forEach((item,index)=>{
                        //     if(item.id==_this.conversationObj.id){
                        //       _this.$set(item,'lastMsg',messages[messages.length-1])
                        //     }
                        //   })
                        // }).catch(console.error.bind(console));
                        // _this.getThousandNews(_this.conversationObj)
                        // 消息框滚到最底部
                        _this.scrollToBottom();
                        // _this.getConversations(_this.initObj)
                        // 清空文件框以及输入框数据
                        _this.$refs.inputFile.value = null; //清楚文件上传的value解决重复上传同一个文件失效问题
                        _this.fileObj = null;
                        _this.inputContent = "";
                    })
                    .catch(console.error.bind(console));
            }
            // 发送文本类型消息
            if (this.inputContent.length > 0 && !this.fileObj) {
                console.log("发送文本消息", this.inputContent, this.chatObj);
                let sendMsgData = {
                    conversation_id: this.curChatId,
                    msg_type: 1,
                    msg_content: this.inputContent,
                };
                this.$store.dispatch("send_message", sendMsgData);
                this.inputContent = "";
            }
        },
        // 点击最小化后的聊天小图标重新打开聊天窗口
        returnChat() {
            this.isShowChat = true;
            this.isMinWindow = false;
            // 聊天窗体一打开，那里面的消息就全都标记为已读
            this.conversationObj
                .read()
                .then((res) => {
                    console.info(res, "标为已读");
                })
                .catch((err) => {
                    console.error(err);
                });
            this.scrollToBottom();
        },
        // 关闭聊天对话框
        closeChatWindow() {
            this.showEmoji = false;
            this.isShowChat = false;
            this.isMinWindow = false;
            document.querySelector("body").setAttribute("style", "overflow-y:scroll");
            this.chattingMenbers = [];
        },
        // 删除正在聊天的好友列表中的某一个成员
        delChatting(each, j) {
            this.chattingMenbers.splice(j, 1);
            if (each.id == this.curChatId) {
                if (j == 0) {
                    this.clickCoversationList(this.chattingMenbers[0]);
                } else {
                    this.clickCoversationList(this.chattingMenbers[j - 1]);
                }
                // this.chatTo(undefined,this.chattingMenbers[j-1])
            }
            console.warn(
                each,
                "某一项",
                j,
                "要删除的下标",
                this.chattingMenbers,
                "正在聊天的成员数组"
            );
        },
        // 打开或者关闭聊天历史记录框
        toggleHistory() {
            this.isShowHistory = !this.isShowHistory;
            if (this.isShowHistory) {
                this.isMinHistory = false;
                // 获取历史聊天记录
                var messageIterator = this.conversationObj.createMessagesIterator({
                    limit: 1000,
                });
                this.historyMsgList = [];
                this.historyIterator(messageIterator, this.conversationObj);

                // this.conversationObj.queryMessages({
                //   limit:1000
                // }).then((messages)=> {
                //   this.historyMsgList=[...messages]
                //   // 滚动到最底部
                //   this.$nextTick(()=>{
                //     this.$refs.historyMsg.scrollTo(0,this.$refs.historyMsg.scrollHeight)
                //   })
                // }).catch(console.error.bind(console));
            }
        },
        // 最小化历史聊天记录框成小浮窗
        minHistory() {
            this.isShowHistory = false;
            this.isMinHistory = true;
        },
        // 最大化历史聊天记录框
        maxHistory() {
            this.isMaxHistory = true;
            document.querySelector("body").setAttribute("style", "overflow:hidden");
        },
        // 取消最大化聊天对话框
        cancelMaxHistory() {
            this.isMaxHistory = false;
            document.querySelector("body").setAttribute("style", "overflow-y:scroll");
        },
        //关闭历史记录最小化浮窗
        closeMinHistory() {
            this.isMinHistory = false;
        },
        // 窗口拖动
        boxMove(ev) {
            if (this.isMaxWindow) {
                return;
            }
            var Odiv = document.getElementsByClassName("chat-window")[0];
            console.log("按下鼠标", ev, "左边", Odiv.offsetLeft);
            var disX = 0;
            var disY = 0;
            // 因为fixed定位的时候用了translate(-50%,-50%),所以要注意这一部分的值
            var initX = Odiv.clientWidth / 2;
            var initY = Odiv.clientHeight / 2;
            // //鼠标事件对象
            var oEvent = ev || event;
            disX = oEvent.clientX - Odiv.offsetLeft;
            disY = oEvent.clientY - Odiv.offsetTop;

            var _this = this;

            document.onmousemove = function (ev) {
                // console.log('鼠标拖动',ev)
                //鼠标事件对象
                var oEvent = ev || event;
                var l = oEvent.clientX - disX;
                var t = oEvent.clientY - disY;

                if (l < initX) {
                    l = initX;
                } else if (
                    l >
                    document.documentElement.clientWidth - Odiv.offsetWidth + initX
                ) {
                    l = document.documentElement.clientWidth - Odiv.offsetWidth + initX;
                }
                if (t < initY) {
                    t = initY;
                } else if (
                    t >
                    document.documentElement.clientHeight - Odiv.offsetHeight + initY
                ) {
                    t = document.documentElement.clientHeight - Odiv.offsetHeight + initY;
                }
                Odiv.style.left = l + "px";
                Odiv.style.top = t + "px";
                // 阻止拖拽时候选中文字
                // Odiv.setCapture&&Odiv.setCapture()
            };
            document.onmouseup = function (ev) {
                console.log("鼠标松开", ev);
                document.onmousemove = null;
                document.onmouseup = null;
                // 取消阻止拖拽选中文字
                // Odiv.releaseCapture&&Odiv.releaseCapture()
            };
            //阻止默认事件
            return false;
        },
        // 元素开始被拖动
        startDrag(e) {
            return;
            console.warn(e, "开始拖拽");
            e.dataTransfer.setData("Text", e.target.id); //浏览器兼容
            this.initX = e.offsetX;
            this.initY = e.offsetY;
        },
        // 松开鼠标元素拖放结束
        endDrag(e) {
            return;
            let x = e.offsetX - this.initX;
            let y = e.offsetY - this.initY;
            e.target.style.left = e.target.offsetLeft + x + "px";
            e.target.style.top = e.target.offsetTop + y + "px";
            console.warn(e.target.style.left, e, e.target.offsetLeft, "ll");
        },
        // 元素正在被拖动
        dragging(e) {
            return;
            let x = e.offsetX - this.initX;
            let y = e.offsetY - this.initY;
            e.target.style.left = e.target.offsetLeft + x + "px";
            e.target.style.top = e.target.offsetTop + y + "px";
            // console.warn(e,'拖拽中')
        },
        // 点击文件消息主体在另外窗口打开文件
        openUrl() {
            // window.open('http://img1.imgtn.bdimg.com/it/u=2357912857,682090914&fm=26&gp=0.jpg')
        },
        // 选择文件
        selectFile(e) {
            console.warn(e.target.files, "文件", this.fileValue, "input的值");
            this.fileObj = e.target.files[0];
        },
        // 删除选中的文件
        cancelFile() {
            this.fileObj = null;
            this.$refs.inputFile.value = null; //清楚文件上传的value解决重复上传同一个文件失效问题
        },

        // menberList排序规则
        orderRule(a, b) {
            if (a.unreadMessagesCount == b.unreadMessagesCount) {
                return (
                    new Date(a._updateAt).getTime() - new Date(b._updateAt).getTime()
                );
            }
            return a.unreadMessagesCount - b.unreadMessagesCount;
        },
        // 头像返回有些带http有些不带我也很无奈
        picDeal(item) {
            console.warn(item, "picDeal item");
            let showAvater = "";
            if (item.creatorObj.id == this.user_data.id) {
                // 对话是自己创建的
                showAvater = item.chatToObj.avatar;
            } else {
                showAvater = item.creatorObj.avatar;
            }
            if (showAvater) {
                if (showAvater.indexOf("http") == -1) {
                    return this.util.qiniuAddress + showAvater;
                } else {
                    return showAvater;
                }
            } else {
                return "http://pic.paitume.com/images/male.png";
            }
        },
        nameDeal(item) {
            if (item.creatorObj.id == this.user_data.id) {
                // 对话是自己创建的
                return item.chatToObj.nick;
            } else {
                return item.creatorObj.nick;
            }
        },
        // 操作消息框滚动条滚动到底部
        scrollToBottom() {
            console.log('scrollToBottom this.isShowChat = '+ this.isShowChat);
            if (this.isShowChat || this.isShowHistory) {
                this.$nextTick(() => {
                    let scrollEle = document.getElementsByClassName("message-box")[0]; // 获取对象
                    scrollEle.scrollTop = scrollEle.scrollHeight; // 滚动高度
                });
            }
            // this.$nextTick(()=>{
            //   this.$refs.msgBox.scrollTo(0,this.$refs.msgBox.scrollHeight)
            // })
        },
        
         
    }
};
</script>

<style lang="scss" scoped>
.chat-wrap {
    .enter {
        position: fixed;
        bottom: 5px;
        right: 5px;
        width: 40px;
        height: 40px;
        // line-height: 50px;
        // text-align: center;
        border-radius: 2px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
        z-index: 990;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.5s;
        background: #7c6aff;

        i {
            font-size: 25px;
            animation-duration: 3s;
            animation-iteration-count: infinite;
            color: #fff;
            position: relative;

            &:after {
                visibility: hidden;
                content: "";
                background: red;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                position: absolute;
                right: 0;
            }
        }

        .new {
            &:after {
                visibility: visible;
            }
        }

        &:hover {
            width: 100px;
            height: 50px;

            i {
                visibility: visible;
                font-size: 35px;
            }
        }
    }

    .menbers-list-wrap {
        background: red;
        width: 260px;
        height: 520px;
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 991;
        border-radius: 2px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;

        .person-info {
            height: 110px;
            height: 70px;
            background: rgb(214, 214, 214);
            padding: 20px;
            box-sizing: border-box;
            background: #7c6aff;
            color: #fff;

            .first-row {
                display: flex;
                justify-content: space-between;

                .my-name {
                    font-size: 18px;
                    // color: #7C6AFF;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .el-icon-circle-close {
                    font-size: 26px;
                    cursor: pointer;

                    &:hover {
                        // color: #7C6AFF;
                        color: red;
                    }
                }
            }
        }

        .menbers-list {
            flex: 1;
            padding-left: 20px;
            padding-top: 10px;
            padding: 10px 0 20px 0;
            box-sizing: border-box;
            overflow-y: auto;
            background: #fff;

            /*修改滚动条样式*/
            &::-webkit-scrollbar {
                width: 10px;
                height: 10px;
                /**/
            }

            &::-webkit-scrollbar-track {
                background: rgb(239, 239, 239);
                border-radius: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background: rgb(214, 214, 214);
                // background: #bfbfbf;
                border-radius: 10px;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: rgb(124, 106, 255);
            }

            &::-webkit-scrollbar-corner {
                background: #179a16;
            }

            .menber-wrap {
                .menber {
                    padding: 0 20px;
                    box-sizing: border-box;
                    height: 52px;
                    display: flex;
                    cursor: pointer;

                    &:hover {
                        background: #eee;
                    }

                    &+.menber {
                        margin-top: 8px;
                    }

                    .menber-left {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        margin-right: 20px;

                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            border: 1px solid #7c6aff;
                        }
                    }

                    .menber-right {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        overflow: hidden;
                        margin-right: auto;

                        .last-msg {
                            color: #777;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .new-count {
                        align-self: center;
                        background: red;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                    }
                }
            }

            .no-menber {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                color: #7c6aff;
            }
        }
    }

    .chat-window {
        min-width: 700px;
        min-height: 626px;
        border: 1px solid #d9d9d9;
        border-color: rgba(0, 0, 0, 0.05);
        // background-color: #F6F6F6;
        background: rgb(251, 251, 251);
        color: #333;
        border-radius: 2px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
        // position: absolute;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        display: flex;
        // flex-direction: column;

        .window-left {
            width: 200px;
            background: rgb(217, 217, 217);
            padding: 8px;
            box-sizing: border-box;
            overflow-y: auto;

            .chat-menber {
                display: flex;
                align-items: center;
                cursor: pointer;
                height: 50px;
                padding: 0 8px;
                box-sizing: border-box;
                border-radius: 4px;
                margin-bottom: 8px;

                &:hover {
                    background: rgb(226, 226, 226);

                    i {
                        display: block;
                    }
                }

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 16px;
                }

                .menber-name {
                    font-size: 16px;
                    margin-right: auto;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                i {
                    font-size: 18px;
                    display: none;
                }
            }

            .chat-menber-checked {
                background: rgb(243, 243, 243);

                &:hover {
                    background: rgb(243, 243, 243);
                }
            }
        }

        .window-right {
            min-width: 700px;
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-bottom: 12px;
            box-sizing: border-box;

            .chat-top {
                height: 80px;
                background: rgb(236, 236, 236);
                padding: 15px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                cursor: move;

                .menber-info {
                    display: flex;

                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        margin-right: 20px;
                    }

                    .menber-name {
                        font-size: 20px;
                        padding-top: 6px;
                        box-sizing: border-box;
                    }
                }

                .window-operation {
                    i {
                        font-size: 20px;
                        cursor: pointer;
                    }

                    i:not(:last-child) {
                        margin-right: 10px;
                    }
                }
            }

            .message-box {
                // height: 375px;
                height: 420px;
                padding: 20px;
                box-sizing: border-box;
                overflow-y: auto;

                // background: rgb(251,251,251);
                .message {
                    display: flex;
                    margin-bottom: 10px;

                    .avatar {
                        width: 40px;
                        height: 40px;
                        margin-right: 20px;
                        border-radius: 50%;
                    }

                    .msg-body {

                        // display: flex;
                        // flex-direction: column;
                        .name-time {
                            // display: flex;
                            // justify-content: space-between;
                            margin-bottom: 6px;
                            color: #999;

                            .name {
                                margin-right: 14px;
                            }
                        }

                        .content {
                            padding: 8px 16px;
                            box-sizing: border-box;
                            background: #e2e2e2;
                            color: #333;
                            display: inline-block;
                            border-radius: 4px;
                            position: relative;
                            max-width: 500px;
                            word-wrap: break-word;
                            text-align: left;
                            line-height: 22px;
                            font-size: 16px;
                            letter-spacing: 2px;

                            &:before {
                                content: "";
                                width: 0;
                                height: 0;
                                position: absolute;
                                left: 0;
                                top: 10px;
                                transform: translateX(-50%);
                                border-bottom: 10px transparent dashed;
                                border-left: 10px transparent dashed;
                                border-right: 10px transparent dashed;
                                border-top: 10px solid rgb(95, 184, 120);
                                border-top: 10px solid #e2e2e2;
                            }

                            .file {
                                display: flex;
                                flex-direction: column;

                                .file-link {
                                    text-align: center;

                                    img {
                                        width: 160px;
                                        height: 120px;
                                        cursor: pointer;
                                    }

                                    video {
                                        min-width: 300px;
                                        height: 200px;
                                    }

                                    .el-icon-document {
                                        font-size: 40px;
                                        margin: 0 auto;
                                    }

                                    a {
                                        display: block;
                                        margin: 5px auto;
                                        width: 200px;
                                        overflow: hidden;
                                    }
                                }

                                .decription {}
                            }
                        }
                    }
                }

                .my-message {
                    flex-direction: row-reverse;

                    .avatar {
                        margin-left: 20px;
                    }

                    .msg-body {
                        text-align: right;

                        .name-time {
                            display: flex;
                            flex-direction: row-reverse;

                            .name {
                                margin-left: 14px;
                                margin-right: 0;
                            }

                            .time {
                                display: flex;
                                align-items: flex-end;
                            }
                        }

                        .content {
                            // background: rgb(95,184,120);
                            background: #7c6aff;
                            color: #fff;

                            &:after {
                                content: "";
                                width: 0;
                                height: 0;
                                position: absolute;
                                right: 0;
                                top: 10px;
                                transform: translateX(50%);
                                border-bottom: 10px transparent dashed;
                                border-left: 10px transparent dashed;
                                border-right: 10px transparent dashed;
                                // border-top: 10px solid rgb(95,184,120);
                                border-top: 10px solid #7c6aff;
                            }

                            &:before {
                                all: unset;
                            }
                        }
                    }
                }
            }

            .max-message-box {
                height: calc(100% - 260px);
            }

            .send-operation {
                height: 40px;
                border-top: 1px solid #d9d9d9;
                display: flex;
                // justify-content: space-between;
                align-items: center;
                padding: 0 26px;
                box-sizing: border-box;
                background: rgb(251, 251, 251);

                .send-file {
                    position: relative;
                    display: inline-block;
                    overflow: hidden;
                    margin-right: 30px;

                    input {
                        position: absolute;
                        right: 0px;
                        top: 0px;
                        opacity: 0;
                        cursor: pointer;
                        // -ms-filter: 'alpha(opacity=0)';
                    }

                    .el-icon-folder-opened {
                        font-size: 24px;
                    }
                }

                .emoji-wrap {
                    position: relative;

                    &>span {
                        cursor: pointer;
                    }

                    .emoji-box {
                        background: #fff;
                        position: absolute;
                        width: 350px;
                        height: 200px;
                        z-index: 9999;
                        transform: translate(-10%, -123%);
                        overflow-y: auto;
                        padding: 10px;
                        box-sizing: border-box;
                        box-shadow: 0px 0px 5px 3px #ddd;

                        .emoji-group {
                            margin-bottom: 15px;

                            .emoji-class {
                                margin-bottom: 10px;
                            }

                            .emoji-list {
                                display: flex;
                                flex-wrap: wrap;

                                .emoji-item {
                                    cursor: pointer;
                                    width: 30px;
                                    height: 30px;
                                    // border: 1px solid #000;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;

                                    &:hover {
                                        background: #ddd;
                                    }
                                }
                            }
                        }
                    }
                }

                .history-label {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    margin-left: auto;

                    .el-icon-time {
                        font-size: 22px;
                        margin-right: 6px;
                        cursor: pointer;
                    }
                }

                .file-info {
                    display: flex;
                    align-items: center;

                    .file-name {
                        margin-right: 16px;
                        color: #7c6aff;
                    }

                    .cancel-btn {
                        padding: 5px 10px;
                        background: #7c6aff;
                        color: #fff;
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    i {
                        font-size: 16px;
                        cursor: pointer;
                    }
                }
            }

            .input-area {
                // flex: 1;
                padding-bottom: 6px;
                box-sizing: border-box;

                /deep/ {
                    .el-textarea {
                        height: 100%;

                        .el-textarea__inner {
                            resize: none;
                            border-radius: 0;
                            height: 100px;
                            border: none;
                            background: rgb(251, 251, 251);
                        }
                    }
                }
            }

            .bottom-btn {
                height: 40px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding-right: 20px;
                box-sizing: border-box;

                // background: rgb(251,251,251);
                span {
                    margin-left: 15px;
                    padding: 10px 20px;
                    // background-color: #69BC80;
                    background: #7c6aff;
                    border-radius: 3px;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
    }

    .max-window {
        width: 100%;
        height: 100%;
    }

    .small-chat {
        width: 184px;
        height: 52px;
        border-radius: 2px;
        background: #fff;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        padding: 0 13px;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .menber-name {
            font-size: 18px;
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .history-box {
        width: 550px;
        height: 100%;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 99999;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
        background: #fff;
        animation-duration: 0.5s;

        // animation-delay: 2s;
        .history-top {
            height: 46px;
            background: rgb(248, 248, 248);
            display: flex;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;

            span {
                margin-right: auto;
                font-size: 16px;
            }

            i {
                font-size: 20px;
                cursor: pointer;
            }

            i+i {
                margin-left: 12px;
            }
        }

        .history-message-box {
            // height: 375px;
            height: calc(100% - 46px);
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;

            // background: rgb(251,251,251);
            /*修改滚动条样式*/
            &::-webkit-scrollbar {
                width: 10px;
                height: 10px;
                /**/
            }

            &::-webkit-scrollbar-track {
                background: rgb(239, 239, 239);
                border-radius: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background: rgb(214, 214, 214);
                // background: #bfbfbf;
                border-radius: 10px;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: #333;
            }

            &::-webkit-scrollbar-corner {
                background: #179a16;
            }

            .tip {
                text-align: center;
                margin-bottom: 20px;
                font-size: 16px;
                color: #7c6aff;
            }

            .message {
                display: flex;
                margin-bottom: 10px;

                .avatar {
                    width: 40px;
                    height: 40px;
                    margin-right: 20px;
                }

                .msg-body {

                    // display: flex;
                    // flex-direction: column;
                    .name-time {
                        // display: flex;
                        // justify-content: space-between;
                        margin-bottom: 6px;
                        color: #999;

                        .name {
                            margin-right: 14px;
                        }
                    }

                    .content {
                        padding: 8px 16px;
                        box-sizing: border-box;
                        background: #e2e2e2;
                        color: #333;
                        display: inline-block;
                        border-radius: 4px;
                        position: relative;
                        max-width: 500px;
                        word-wrap: break-word;
                        text-align: left;
                        line-height: 22px;
                        font-size: 16px;
                        letter-spacing: 2px;

                        &:before {
                            content: "";
                            width: 0;
                            height: 0;
                            position: absolute;
                            left: 0;
                            top: 10px;
                            transform: translateX(-50%);
                            border-bottom: 10px transparent dashed;
                            border-left: 10px transparent dashed;
                            border-right: 10px transparent dashed;
                            border-top: 10px solid rgb(95, 184, 120);
                            border-top: 10px solid #e2e2e2;
                        }

                        .file {
                            display: flex;
                            flex-direction: column;

                            .file-link {
                                text-align: center;

                                img {
                                    width: 160px;
                                    height: 120px;
                                    cursor: pointer;
                                }

                                video {
                                    width: 200px;
                                    height: 130px;
                                }

                                audio {
                                    width: 300px;
                                    height: 60px;
                                }

                                .el-icon-document {
                                    font-size: 40px;
                                    margin: 0 auto;
                                }

                                a {
                                    // display: flex;
                                    // justify-content: center;
                                    display: block;
                                    margin: 5px auto;
                                    width: 200px;
                                }
                            }

                            .decription {}
                        }
                    }
                }
            }

            .my-message {
                flex-direction: row-reverse;

                .avatar {
                    margin-left: 20px;
                }

                .msg-body {
                    text-align: right;

                    .name-time {
                        display: flex;
                        flex-direction: row-reverse;

                        .name {
                            margin-left: 14px;
                            margin-right: 0;
                        }

                        .time {
                            display: flex;
                            align-items: flex-end;
                        }
                    }

                    .content {
                        // background: rgb(95,184,120);
                        background: #7c6aff;
                        color: #fff;

                        &:after {
                            content: "";
                            width: 0;
                            height: 0;
                            position: absolute;
                            right: 0;
                            top: 10px;
                            transform: translateX(50%);
                            border-bottom: 10px transparent dashed;
                            border-left: 10px transparent dashed;
                            border-right: 10px transparent dashed;
                            // border-top: 10px solid rgb(95,184,120);
                            border-top: 10px solid #7c6aff;
                        }

                        &:before {
                            all: unset;
                        }
                    }
                }
            }
        }
    }

    .max-history {
        width: 100%;
        height: 100%;
    }

    .small-history {
        width: 180px;
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999999;
        display: flex;
        align-items: center;
        background: #f8f8f8;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 2px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);

        span {
            margin-right: auto;
            font-size: 16px;
        }

        i {
            cursor: pointer;
            font-size: 18px;
        }

        .el-icon-copy-document {
            margin-right: 12px;
        }
    }
}
</style>
