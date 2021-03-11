<!--  -->
<template>
<div>
    <div class="container-title" v-if="$route.query.showTab">
        <span @click="$router.back()">发起活动</span>
        <i class="el-icon-arrow-right"></i>
        <span>活动详情</span>
    </div>
    <div class="active-box">
        <div class="left-item">
            <div class="title-box">
                <div class="img-box" v-if="details_data.info">
                    <el-image :src="$qiniuHost+details_data.pic" class="list-image" fit="scale-down" v-if="details_data.pic !=''"></el-image>
                    <el-image :src="details_data.info|partnerPicDeal" class="list-image" fit="scale-down" v-else></el-image>
                    <div class="img-botton">
                        <div class="botton-left">
                            <div class="border" @click="follow">
                                <ali-svg-icon icon-class="liked" class-name="size" v-if="isFollow"></ali-svg-icon>
                                <ali-svg-icon icon-class="like" class-name="size" v-else></ali-svg-icon>
                                <span class="word-hover">收藏</span>
                            </div>
                            <div class="border copyurl" :data-clipboard-text="url" @click="copyurl">
                                <ali-svg-icon icon-class="share" class-name="size"></ali-svg-icon>
                                <span class="word-hover">分享</span>
                            </div>
                        </div>

                        <div class="botton-right">
                            <span class="border" @click="toChat(details_data)">
                                <ali-svg-icon icon-class="customer_service" class-name="size color"></ali-svg-icon>
                                <span class="word-hover">联系举办方</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="conte-box">
                    <div class="title">{{details_data.name}}</div>
                    <div class="text-info" v-if="details_data.user_detail">
                        <div>费用：{{details_data.fee}}元</div>
                        <div>时间：{{details_data.start_time}} 至 {{details_data.end_time}}</div>
                        <div>地点：{{details_data.address}}</div>
                        <div>举办方：{{details_data.user_detail.nick}}</div>
                        <div class="last">报名人数: {{details_data.current_person}}/{{details_data.max_person}}</div>
                    </div>
                </div>
            </div>

            <div class="pay-box">
                <div>立刻参加</div>
                <div class="pay-right" v-if='JSON.stringify(details_data)!="{}"'>
                    <div>费用: {{details_data.fee}}元/人</div>
                    <el-button type="primary" plain @click="active_confirm" v-if="details_data.max_person - details_data.current_person > 0&&details_data.is_start == 0&&Date.parse(new Date(Nowdate)) < new Date(details_data.start_time.replace(/-/g, '/'))">立即报名</el-button>
                    <el-button type="primary" plain disabled v-else-if="details_data.is_start == 1">报名截止</el-button>
                    <el-button type="primary" plain disabled v-else-if="Date.parse(new Date(Nowdate)) > new Date(details_data.start_time.replace(/-/g, '/'))">已开始</el-button>
                    <el-button type="primary" plain disabled v-else>报名人员已满</el-button>
                </div>
            </div>

            <div v-html="details_data.info" class="img-cont"></div>
            <div class="address">
                <div class="address-title">地理位置</div>
                <div class="address-content">地址：{{details_data.address}}</div>
                <div id="container" style="width:100%;height: 453px;"></div>
            </div>
            <div class="comment-box">
                <div>活动讨论区</div>
                <div class="line"></div>
                <comment :data="active_data" />
            </div>
        </div>
        <div class="right-item">
            <div class="tip-box">
                <div class="tip-title">温馨提示</div>
                <div class="tip-conten">本活动信息由发起人自行发布，仅代表其个人意志，与派图租赁无关，且活动的后续事项由发起人独立安排及负责。派图租赁仅提供信息展示空间。不能保证活动的真实性、有效性、安全性，请在参加活动前与发起人具体确认核实相关情况。</div>
            </div>
            <div class="people-box" v-if="user_data">
                <div class="people">
                    <span class="gcolor">已报名的小伙伴</span>
                    <span class="hcolor">（已报名：{{details_data.current_person}} 总名额：{{details_data.max_person}}）</span>
                </div>
                <div class="photo-wall">
                    <div class="image-box" v-for="item in signUser" :key="item.avatar">
                        <el-image class="image-size" :src="$qiniuHost+item.avatar" v-if="item.avatar"></el-image>
                        <el-image class="image-size" v-else :src="defaultImg"></el-image>
                    </div>
                </div>
            </div>
            <div class="people-box" v-else>
                <div class="people">
                    <span class="gcolor">已报名的小伙伴</span>
                    <span class="hcolor">（登录才可以看到哦）</span>
                </div>
            </div>
        </div>
        <div v-if="openpay">
            <pay-window :openpay="openpay" :paydata="paydata" @closed="closed" />
        </div>

        <Login :reg="is_reg" :openlogin="open" @closed="closed"></Login>
    </div>
</div>
</template>

<script>
import {
    lazyAMapApiLoaderInstance
} from "vue-amap";
import {
    activity,
    frontFollowOrCollect
} from "@/config/api";
import payWindow from "./components/pay_dalog";
import comment from "./components/comment";
import {
    mapGetters
} from "vuex";
import Login from "FrontComponents/minilogin";
import Clipboard from "clipboard";

export default {
    data(){
    	return{
    		defaultImg: this.config.male_pic,
	        details_data: {},
	        center: [],
	        isFollow: false,
	        // 打开支付页面
	        openpay: false,
	        paydata: {},
	        signUser: [],
	        active_data: {
	            id: "",
	            type: 3,
	            to_uid: ""
	        },
	        is_reg: false,
	        open: false,
	        url: window.location.href,
	        Nowdate: new Date()
    	}
        
    },

    components: {
        payWindow,
        comment,
        Login
    },
    created() {
        this.active_data.id = this.$route.query.id;
    },
    mounted() {
        this.getRequest(activity.get_activity_details, this.active_data)
            .then(res => {
                console.log(res);
                this.details_data = res;
                this.active_data.to_uid = res.user_detail.id;
                if (this.center.length !== 0) {
                    this.center = [];
                    this.center[0] = res.lng;
                    this.center[1] = res.lat;
                } else {
                    this.center[0] = res.lng;
                    this.center[1] = res.lat;
                }
                console.log(this.center);

                this.usemap();
                let params = {
                    relation_id: this.$route.query.id,
                    type: 3,
                    obj: 1
                };
                if (this.user_data !== null) {
                    this.getRequest(frontFollowOrCollect.getLsObjById, params).then(
                        res => {
                            console.log(res);
                            if (res === 1) {
                                this.isFollow = true;
                            }
                        }
                    );
                }
                this.getRequest(activity.get_activity_user, this.active_data).then(
                    res => (this.signUser = res)
                );
            })
            .catch(err => {
                console.log(err.message);
                if (err.message.includes("不存在"))
                    this.$router.push({
                        path: "*",
                        query: {
                            title: "活动"
                        }
                    });
            });
    },

    methods: {
        // 点击联系商家，打开即时聊天窗口
        toChat(activity){
            if(this.user_data.id==activity.uid){
                this.$message.warning('这是你自己发布的活动')
                return
            }
            let chatToObj={
                id:activity.uid,
                name:activity.user_detail.nick,
                avatar:this.$qiniuHost+activity.user_detail.avatar||'https://pic.paitume.com/images/male.png'
            }
            this.$parent.$parent.$refs.chat.chatTo(chatToObj)
        },
        closed() {
            this.openpay = false;
            this.open = false;
        },
        follow() {
            if (this.isFollow) {
                let data = {
                    type: 3,
                    obj: 1,
                    relation_id: this.details_data.id
                };
                this.postRequest(frontFollowOrCollect.unFollowOrUnCollect, data).then(
                    res => {
                        this.$message({
                            type: "success",
                            duration: 1000,
                            message: "取消成功"
                        });
                        this.isFollow = false;
                    }
                );
            } else {
                let data = {
                    to_uid: this.details_data.user_detail.id,
                    type: 3,
                    obj: 1,
                    relation_id: this.details_data.id
                };
                this.postRequest(frontFollowOrCollect.followOrCollect, data).then(
                    res => {
                        this.$message({
                            type: "success",
                            duration: 1000,
                            message: "关注成功"
                        });
                        this.isFollow = true;
                    }
                );
            }
        },
        usemap() {
            let _loadApiPromise = lazyAMapApiLoaderInstance.load();
            _loadApiPromise.then(() => {
                this.mapinit();
            });
        },
        mapinit() {
            let map = new AMap.Map("container", {
                resizeEnable: true,
                center: this.center
            });
            let marker = new AMap.Marker({
                map: map,
                position: this.center,
                label: {
                    offset: new AMap.Pixel(-50, -38), //修改label相对于maker的位置
                    content: `<div class='markerTip'>${this.details_data.address}</div>`
                }
            });
        },
        active_confirm() {
            console.log(this.details_data);
            if (
                Date.parse(new Date(this.Nowdate)) <
                new Date(this.details_data.end_time) &&
                this.details_data.is_start == 0
            ) {
                if (this.user_data == null) {
                    this.open = true;
                } else {
                    this.paydata = this.details_data;
                    this.openpay = true;
                }
            } else {
                this.$message({
                    type: "error",
                    duration: 1000,
                    message: "错误，该活动已过期或已开始，无法报名"
                });
            }
        },
        copyurl() {
            let clipboard = new Clipboard(".copyurl");
            clipboard.on("success", e => {
                this.$message({
                    type: "success",
                    duration: 1000,
                    message: "已复制进系统剪切板，快去分享给其他人吧！"
                });
            });
            clipboard.on("error", e => {
                console.log(e);
                this.$message({
                    type: "error",
                    duration: 1000,
                    message: "Oops!粗了点小问题，还请您手动复制网址给您的小伙伴呢"
                });
            });
        }
    },
    filters: {
        partnerPicDeal(val) {
            let sub = val.slice(val.indexOf("src"));
            let sub1 = sub.slice(sub.indexOf('"') + 1);
            let sub2 = sub1.slice(0, sub1.indexOf('"'));
            return sub2;
        }
    },
    computed: {
        ...mapGetters(["user_data"])
    }
};
</script>

<style lang="scss" scoped>
@import "@css/color.scss";

.container-title {
    background: #fff;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
    margin-bottom: 24px;

    span:first-child {
        cursor: pointer;
    }
}

.active-box {
    display: flex;
    justify-content: space-around;

    .left-item {
        .title-box {
            display: flex;

            .img-box {
                .list-image {
                    width: 260px;
                    height: 195px;
                }

                .img-botton {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10px;

                    .botton-left {
                        display: flex;
                        font-size: 12px;

                        .border {
                            width: 45px;
                            height: 45px;
                            border: 1px solid #f0f0f0;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            margin-right: 20px;
                            cursor: pointer;
                            padding: 5px;
                        }
                    }

                    .botton-right {
                        height: 45px;

                        .border {
                            padding: 10px 9px 10px 16px;
                            border: 1px solid #f0f0f0;
                            display: flex;
                            cursor: pointer;
                        }
                    }

                    .size {
                        width: 20px;
                        height: 20px;
                    }

                    .color {
                        margin-right: 5px;
                        color: $Theme-color;
                    }
                }
            }

            .conte-box {
                margin-left: 20px;
                line-height: 27px;

                .title {
                    color: #333333;
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }

                .text-info {
                    .last {
                        margin-top: 10px;
                    }
                }
            }
        }

        .pay-box {
            display: flex;
            justify-content: space-between;
            border-top: 5px solid #fafafa;
            border-bottom: 5px solid #fafafa;
            margin: 50px 0;
            padding: 15px 0;
            align-items: center;

            .pay-right {
                display: flex;
                align-items: center;

                /deep/ .el-button--primary.is-plain {
                    color: $Theme-color;
                    background: #fafafa;
                    border-color: #f0f0f0;
                }

                /deep/ .el-button--primary.is-plain:hover {
                    color: $Theme-color;
                    background: rgba(50, 42, 70, 0.103);
                    border-color: $Theme-color;
                }
            }
        }

        .img-cont {
            /deep/ img {
                max-width: 800px;
                object-fit: scale-down;
            }
        }

        .address {
            margin-top: 50px;

            .address-title {
                padding-bottom: 10px;
                border-bottom: 1px solid #f5f5f5;
                margin-bottom: 10px;
            }

            .address-content {
                margin-bottom: 20px;
            }
        }

        .comment-box {
            margin-top: 80px;
        }
    }

    .right-item {
        .tip-box {
            width: 320px;
            border: 1px solid rgba(250, 250, 250, 1);
            padding: 20px 20px;
            margin-bottom: 100px;

            .tip-title {
                color: #54ad17;
                font-size: 14px;
                margin-bottom: 10px;
            }

            .tip-conten {
                color: #999999;
                line-height: 21px;
            }
        }

        .people-box {
            padding-left: 19px;

            .people {
                .gcolor {
                    color: #54ad17;
                }

                .hcolor {
                    color: #999999;
                }
            }
        }

        .photo-wall {
            width: 320px;
            display: flex;
            flex-wrap: wrap;

            .image-size {
                width: 50px;
                height: 50px;
            }

            .image-box {
                margin-right: 3px;
            }
        }
    }
}

/deep/ {
    .amap-marker-label {
        border: none;
        background: transparent;
    }

    .markerTip {
        border-radius: 5px;
        border-width: 0;
        background-color: #fff;
        padding: 10px;
        box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
    }
}
</style>
