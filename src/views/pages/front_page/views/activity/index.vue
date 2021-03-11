<!--  -->
<template>
<div v-loading.fullscreen="loading" element-loading-text="正在获取数据" element-loading-spinner="el-icon-loading">
    <!--选择结果模块-->
    <div class="front_select">
        <div class="result">
            <p>筛选结果：</p>
            <ul>
                <li v-for="item in tags" :key="item.type" v-if="item.label !==''&&item.label !== '全部'&&item.label !== '全部'">
                    <div >
                        <span>{{item.label}}</span>
                        <i class="el-icon-close cursor" @click="dele_sete(item.type)"></i>
                    </div>
                </li>
            </ul>
            <el-button type="text" v-if="tags[0].label !==''" @click.native="clearall">清空所有筛选</el-button>
        </div>
        <front-searchbox :searchTxt="activeSearch" @search="search_text" v-if="showSearch"></front-searchbox>
    </div>

    <!--选项选择模块-->
    <div class="front_options radio-setting">
        <ul>
            <li>
                <span>活动城市：</span>
                <select-city @changeCity="changeCity"></select-city>
            </li>
            <li>
                <span>活动时间：</span>
                <el-radio-group v-model="activeTime">
                    <el-radio :label="0">全部</el-radio>
                    <el-radio :label="1">今天</el-radio>
                    <el-radio :label="2">明天</el-radio>
                    <el-radio :label="3">本周</el-radio>
                    <el-radio :label="4">本月</el-radio>
                </el-radio-group>
                <div class="custom-time-box">
                    <div class="time-button" v-show="!showtime" @click="sh">按时间区间筛选</div>
                    <el-date-picker v-model="datatime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-show="showtime"></el-date-picker>
                    <div class="time-button" v-show="showtime" @click="sh">取消</div>
                </div>
            </li>
            <li>
                <span>是否收费：</span>
                <el-radio-group v-model="IsFree">
                    <el-radio :label="0">不限</el-radio>
                    <el-radio :label="1">免费</el-radio>
                    <el-radio :label="2">收费</el-radio>
                </el-radio-group>
            </li>
            <li>
                <span>活动类型：</span>
                <el-radio-group v-model="activeType">
                    <el-radio :label="0">不限</el-radio>
                    <el-radio :label="1">线上活动</el-radio>
                    <el-radio :label="2">线下活动</el-radio>
                </el-radio-group>
            </li>
            <li>
                <span>活动状态：</span>
                <el-radio-group v-model="activeStat">
                    <el-radio :label="0">不限</el-radio>
                    <el-radio :label="1">报名中</el-radio>
                    <el-radio :label="2">进行中</el-radio>
                    <el-radio :label="3">已结束</el-radio>
                </el-radio-group>
            </li>
        </ul>
    </div>
    <!-- 活动列表 -->
    <div class="list">
        <!-- 列表头部 -->
        <div class="list-header">
            <div class="tags radio-setting">
                <el-radio-group v-model="activeSort">
                    <!-- <el-radio :label="1">默认</el-radio> -->
                    <el-radio :label="0">最新</el-radio>
                    <el-radio :label="1">最热</el-radio>
                </el-radio-group>
            </div>
            <!-- <div class="paging">
          <div class="pagenum">1/3</div>
          <div class="arrow">
            <span>
              <i class="el-icon-arrow-left"></i>
            </span>
            <span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
        </div>-->
        </div>
        <!-- 列表主体 -->
        <div v-if="city_code !== 0">
            <div class="main-list" v-for="item in activelist" :key="item.id">
                <el-image :src="qiniuHost+item.pic" class="list-image cursor" fit="scale-down" v-if="item.pic !=''" @click="OpenDetails(item)"></el-image>
                <el-image :src="item.info|partnerPicDeal" class="list-image cursor" fit="scale-down" @click="OpenDetails(item)" v-else></el-image>
                <div class="right-content">
                    <div class="title-box" @click="OpenDetails(item)">
                        <div class="title word-hover">{{item.name}}</div>
                        <div class="people">报名人数：{{item.current_person}}/{{item.max_person}}</div>
                    </div>
                    <div class="content" @click="OpenDetails(item)">{{item.brief}}</div>
                    <div class="list-bottom">
                        <div class="tab" @click="OpenDetails(item)">
                            <div class="tab-item">
                                <span class="item-name">费用：</span>
                                <span class="item-content">
                                    <span v-if="item.fee > 0">{{item.fee}}元</span>
                                    <span v-else>免费</span>
                                </span>
                            </div>
                            <div class="tab-item">
                                <span class="item-name">时间：</span>
                                <span class="item-content">{{item.start_time}} 至 {{item.end_time}}</span>
                            </div>
                            <div class="tab-item">
                                <span class="item-name">地点：</span>
                                <span class="item-content">{{item.address}}</span>
                            </div>
                            <div class="tab-item">
                                <span class="item-name">举办方：</span>
                                <span class="item-content">{{item.user_detail.nick}}</span>
                            </div>
                        </div>
                        <div class="signup-box">
                            <el-button type="primary" plain @click="active_confirm(item)" v-if="item.max_person - item.current_person > 0&&item.is_start == 0&&Date.parse(new Date(Nowdate)) < new Date(item.start_time.replace(/-/g, '/'))">立即报名</el-button>
                            <el-button type="primary" plain disabled v-else-if="item.is_start == 1">报名截止</el-button>
                            <el-button type="primary" plain disabled v-else-if="Date.parse(new Date(Nowdate)) > new Date(item.start_time.replace(/-/g, '/'))">已开始</el-button>
                            <el-button type="primary" plain disabled v-else>报名人员已满</el-button>
                            <i class="el-icon-chat-dot-round" title="聊天" @click="chatTo(item.user_detail)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="activelist.length === 0" class="nullactive">
                <ali-svg-icon icon-class="empty" class-name="empty"></ali-svg-icon>
                <div>您当前地区或您选择的条件没有活动可供查看，若自动定位出现偏差还请手动调整活动城市至您当前的城市（或者更改您的筛选条件）</div>
            </div>
        </div>
    </div>
    <div class="page">
        <pagination :total="total" :pagesize="pagesize" @getPageNum="getPageNum" />
    </div>
    <div v-if="openpay">
        <pay-window :openpay="openpay" :paydata="paydata" @closed="closed" />
    </div>
    <Login :reg="is_reg" :openlogin="open" @closed="closed"></Login>
    <!--联系客服模块-->
    <contact></contact>
    <!--登录弹窗模块-->
    <mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>
</div>
</template>

<script>
import frontSearchbox from "FrontComponents/frontSearchBox";
import selectCity from "FrontComponents/selectCity";
import {
    activity
} from "@/config/api";
import pagination from "FrontComponents/pagination";
import {
    mapGetters
} from "vuex";
import payWindow from "./components/pay_dalog";
import Login from "FrontComponents/minilogin";
import contact from "FrontComponents/contact";
import miniLogin from "FrontComponents/minilogin";

export default {
    data() {
        return {
          qiniuHost:this.$qiniuHost,
            activeTime: 0,
            IsFree: 0,
            activeType: 0,
            activeStat: 0,
            activeSort: 0,
            activeSearch:"",
            search: "",
            // 这里的tag对象指的是当要删除某个键值时，在方法中调用
            tags: [
                {
                    type: "search",
                    label: "",
                    tag: "activeSearch"
                },
                {
                    type: "time",
                    label: "",
                    tag: "activeTime"
                },
                {
                    type: "free",
                    label: "",
                    tag: "IsFree"
                },
                {
                    type: "type",
                    label: "",
                    tag: "activeType"
                },
                {
                    type: "stat",
                    label: "",
                    tag: "activeStat"
                },
                {
                    type: "sort",
                    label: "",
                    tag: "activeSort"
                }
            ],
            activelist: [],
            // 总条数
            total: 0,
            // 每页条数
            pagesize: 10,
            // 页面loading
            loading: false,
            // 打开支付页面
            openpay: false,
            paydata: {},
            // 筛选列表
            params: {
                type_time: 0,
                // 当type_time为5时，传入开始和结束时间
                start_time: "",
                end_time: "",
                // 是否免费0不限1免费2收费
                is_fee: 0,
                // 线上线下0不限1线上2线下
                is_manual: 0,
                // 活动状态0不限1报名中2进行中3结束
                status: 0,
                // 筛选0最新1最热
                order_by: 0,
                // 城市代码
                city_code: "",
                // 分页
                page: 1,
                // 搜索
                search: ""
            },
            showtime: false,
            datatime: "",
            is_reg: false,
            open: false,
            Nowdate: new Date(),
            showSearch:true,
            isShowDialog:false
        }
    },

    components: {
        frontSearchbox,
        selectCity,
        pagination,
        payWindow,
        Login,
        contact,
        miniLogin
    },

    created(){
        //如果从首页搜索跳转过来
        if(this.$route.query.searchText){
            this.search_text(this.$route.query.searchText)
        }
    },

    mounted() {
//      this.params.city_code = this.city_code
        this.get_list();
    },

    methods: {
        closeLogin(){
            this.isShowDialog=false
        },
        chatTo(item){
            //判断是否有登录
            if(!this.util.userIsLogin()){
                this.isShowDialog=true;
                return;
            }
            if(this.user_data.id==item.id){
                this.$message.warning('这是你自己的影棚')
                return
            }
            let chatToObj={
                id:item.id,
                name:item.nick,
                avatar:item.avatar?this.$qiniuHost+item.avatar:'https://pic.paitume.com/images/male.png'
            }
            this.$parent.$parent.$refs.chat.chatTo(chatToObj)
        },
        closed() {
            console.log(this.open);
            this.open = false;
            this.openpay = false;
        },
        sh() {
            if (this.showtime) {
                this.showtime = false;
                this.params.type_time = 0;
                this.params.start_time = "";
                this.params.end_time = "";
                this.get_list();
            } else {
                this.showtime = true;
                this.params.type_time = 5;
            }
        },
        getPageNum(data) {
            console.log(data);
            // this.params.city_code = this.city_code;
            this.params.page = data;
            this.get_list();
        },
        active_confirm(item) {
            console.log(item);
            console.log(this.user_data);
            if (
                Date.parse(new Date(this.Nowdate)) < new Date(item.end_time) &&
                item.is_start == 0
            ) {
                if (this.user_data == null) {
                    this.open = true;
                } else {
                    this.openpay = true;
                    this.paydata = item;
                }
            } else {
                this.$message({
                    type: "error",
                    duration: 1000,
                    message: "错误，该活动已过期或已开始，无法报名"
                });
            }

            // this.postRequest(activity.apply_activity, data).then(res =>
            //   console.log(res)
            // );
        },
        clearall() {
            this.tags = [
                {
                    type: "search",
                    label: ""
                },
                {
                    type: "time",
                    label: ""
                },
                {
                    type: "free",
                    label: ""
                },
                {
                    type: "type",
                    label: ""
                },
                {
                    type: "stat",
                    label: ""
                },
                {
                    type: "sort",
                    label: ""
                }
            ];
            this.activeTime = 0;
            this.IsFree = 0;
            this.activeType = 0;
            this.activeStat = 0;
            this.activeSort = 0;
            this.activeSearch = '';
        },
        changeCity(command) {
            console.log("index---changeCity----", command);
            this.params.city_code = command.code;
            this.get_list();
        },
        OpenDetails(data) {
            console.log(data);
            this.$router.push({
                path: "/activity/active_details",
                query: {
                    id: data.id
                }
            });
        },
        dele_sete(data) {
            this.tags.forEach(item => {
                switch (data) {
                    case item.type:
                        item.label = "";
                        this[item.tag] =item.type=="search"?'':0
                        break;

                    default:
                        break;
                }
            });
        },
        get_list() {
            this.getRequest(activity.get_activity_list, this.params).then(res => {
                console.log(res);
                this.total = res.total_count;
                this.pagesize = res.page_size;
                this.activelist = res.rows;
                if(!this.params.search){
                    this.showSearch=false;
                    this.$nextTick(()=>{
                        this.showSearch=true;
                    })
                }
            });
        },
        search_text(e) {
            console.log(e);

            if (e !== "") {
                this.activeSearch = e;
                this.params.search=e
                this.get_list();
            } else if (this.activelist.length === 0) {
                this.activeSearch = "";
                this.params.search=''
            }
        }
    },
    watch: {
        // 为空时重新执行一次获取列表，但是加了300ms的防抖动
        params(val) {
            let is_seach = true;
            if (val === "" && is_seach) {
                is_seach = false;
                this.get_list();
                setTimeout(() => {
                    is_seach = true;
                }, 300);
            }
        },
        activeSearch(data) {
            this.tags.forEach(item => {
                if (item.type === "search") {
                    this.params.page = 1
                    item.label=data
                    this.activeSearch=data
                    this.params.search=data
                }
            });
            this.get_list();
        },
        activeTime(data) {
            this.tags.forEach(item => {
                if (item.type === "time") {
                    this.params.page = 1
                    switch (data) {
                        case 0:
                            item.label = "";
                            this.params.type_time = 0;
                            break;
                        case 1:
                            item.label = "今天";
                            this.params.type_time = 1;
                            break;
                        case 2:
                            item.label = "明天";
                            this.params.type_time = 2;
                            break;
                        case 3:
                            item.label = "本周";
                            this.params.type_time = 3;
                            break;
                        case 4:
                            item.label = "本月";
                            this.params.type_time = 4;
                            break;
                        default:
                            break;
                    }
                }
            });
            this.get_list();
        },
        IsFree(data) {
            this.tags.forEach(item => {
                if (item.type === "free") {
                    this.params.page = 1
                    switch (data) {
                        case 0:
                            item.label = "";
                            this.params.is_fee = 0;
                            break;
                        case 1:
                            item.label = "免费";
                            this.params.is_fee = 1;
                            break;
                        case 2:
                            item.label = "收费";
                            this.params.is_fee = 2;
                            break;
                        default:
                            break;
                    }
                }
            });
            this.get_list();
        },
        activeType(data) {
            this.tags.forEach(item => {
                if (item.type === "type") {
                    this.params.page = 1
                    switch (data) {
                        case 0:
                            item.label = "";
                            this.params.is_manual = 0;
                            break;
                        case 1:
                            item.label = "线上活动";
                            this.params.is_manual = 1;
                            break;
                        case 2:
                            item.label = "线下活动";
                            this.params.is_manual = 2;
                            break;
                        default:
                            break;
                    }
                }
            });
            this.get_list();
        },
        activeStat(data) {
            this.tags.forEach(item => {
                if (item.type === "stat") {
                    this.params.page = 1
                    switch (data) {
                        case 0:
                            item.label = "";
                            this.params.status = 0;
                            break;
                        case 1:
                            item.label = "报名中";
                            this.params.status = 1;
                            break;
                        case 2:
                            item.label = "进行中";
                            this.params.status = 2;
                            break;
                        case 3:
                            item.label = "已结束";
                            this.params.status = 3;
                            break;
                        default:
                            break;
                    }
                }
            });
            this.get_list();
        },
        activeSort(data) {
            this.params.order_by = data;
            this.get_list();
        },
        city_code(data) {
            console.log("城市代码");
            console.log(data);

            if (data == undefined || data === 0) {
                this.get_list();
                this.$Message.error("定位失败,将为您加载全国的活动,请注意地区");
            } else {
//              this.params.city_code = data;
                this.get_list();
            }
        },
        datatime(data) {
            console.log("时间");
            console.log(data);
            // 由于这里取回来的是数组，那么就可以直接这样拿
            this.params.start_time = data[0];
            this.params.end_time = data[1];
            this.get_list();
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
        ...mapGetters(["city_code", "user_data"])
    }
};
</script>

<style lang="scss" scoped>
@import "@front/common/common.scss";
@import "@css/color.scss";

.front_select {
    margin-bottom: 20px;
}

.custom-time-box {
    display: flex;
    align-items: center;

    /deep/.el-date-editor {
        width: auto;
        margin-right: 20px;
    }

    .time-button {
        cursor: pointer;
        color: $Theme-color;
    }
}

.list {
    padding: 0 40px;
    background-color: #ffffff;

    .list-header {
        display: flex;
        justify-content: space-between;
        padding: 14px 0px;
        border-bottom: 1px solid #f0f0f0;

        .tags {
            /deep/ {
                .el-radio {
                    margin-right: 20px;
                }

                .el-radio__label {
                    padding-left: 0px;
                    color: #999999;
                }
                .el-radio__input {
                    display: none;
                }

                .el-radio__input.is-checked+.el-radio__label {
                    color: $Theme-color;

                    .gang {
                        background: $Theme-color;
                    }
                }
            }
        }

        .paging {
            display: flex;

            .pagenum {
                color: #999999;
            }

            .arrow {
                margin-left: 10px;

                span {
                    border: 1px solid rgba(217, 217, 217, 1);
                    color: #d9d9d9;
                }
            }
        }
    }

    .main-list {
        padding: 20px 0;
        display: flex;
        border-bottom: 1px solid #f0f0f0;

        .list-image {
            width: 260px;
            margin-right: 20px;
            height: 195px;
        }

        .right-content {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            width: 100%;

            .title-box {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                cursor: pointer;

                .title {
                    font-size: 18px;
                    color: #333333;
                    font-weight: bold;
                }

                .people {
                    color: #666666;
                    font-size: 10px;
                }
            }

            .content {
                line-height: 23px;
                margin-bottom: 10px;
                cursor: pointer;
            }

            .list-bottom {
                display: flex;
                justify-content: space-between;

                .tab {
                    cursor: pointer;

                    .tab-item {
                        margin-top: 5px;
                        font-size: 12px;
                        color: #333333;

                        .item-name {
                            color: #666;
                        }
                    }
                }

                .signup-box {
                    display: flex;
                    align-items: flex-end;
                    align-self: flex-end;
                    height: fit-content;
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
                    i{
                        font-size: 22px;
                        color: #7C6AFF;
                        margin-left: 15px;
                        cursor: pointer;
                        align-self: center;
                    }
                }
            }
        }
    }

    .nullactive {
        text-align: center;
        padding: 60px 0;
        color: #000;

        .empty {
            width: 80px;
            height: 80px;
        }
    }
}

.page {
    display: flex;
    justify-content: flex-end;
    margin-top:20px;
}
.textcolor {
    color: $Theme-color;
}
</style>
