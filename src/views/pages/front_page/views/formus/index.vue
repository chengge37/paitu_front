<!--  -->
<template>
<div class="font-main">
    <!-- 第一栏 -->
    <div class="title-box">
        <div class="main-title">与影像行业共同成长</div>
        <div class="sub-title">我们相信，摄影大众的时代已经到来，我们的口号价值观的副标题呈现在这里</div>
    </div>
    <!-- 第二栏 -->
    <div class="company-profile">
        <div class="profile-textbox">
            <div class="title">珠海市穿山甲科技有限责任公司</div>
            <div class="content">
                珠海穿山甲科技有限责任公司2018年成立于深圳，资本投入1000万，管理团队由影像行业知名人士和国内顶级大学教授组成，公司目前有员工30人左右，70%研发人员为本科以上学历，目前已累计获得发明专利及软件著作权认证数十件。
                <br />穿山甲科技从成立至今，就旨在与影像行业从业者共同成长，为影像行业提供全方位的解决方案，包括全平台的推广和高效、科学的管理工具。
                <br />公司经过一年多的发展，客户已经遍及北、上、广、深一线城市及厦门、三亚、武汉、长沙等等二线城市。我们的客户包括行业顶级的影像器材品牌和影棚及工作室等。
                <br />公司为客户提供的产品和服务包括：全国各大城市的器材和场地的线上租赁；专业的管理软件； 相关推广工具；版权运营及模特经纪等服务；
            </div>
        </div>
        <el-image :src="profileimg" fit="scale-down" class="profile-img"></el-image>
    </div>
    <!-- 第三栏 -->
    <div class="bus-inter">
        <div class="bus-device">
            <div style="display: flex;">
                <div class="device-item" v-for="(item,index) in busList1" :key="index">
                    <el-image fit="scale-down" :class="item.class"></el-image>
                    <span>{{item.title}}</span>
                </div>
            </div>
            <div style="display: flex">
                <div class="device-item" v-for="(item,index) in busList2" :key="index">
                    <el-image fit="scale-down" :class="item.class"></el-image>

                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>
        <div class="bus-text">
            <div class="bus-title">主要业务</div>
            <div class="bus-content">
                <p>珠海穿山甲科技有限责任公司2018年成立于深圳，资本投入1000万，管理团队由影像行业知名人士和国内顶级大学教授组成，公司目前有员工30人左右，70%研发人员为本科以上学历，目前已累计获得发明专利及软件著作权认证数十件。</p>
                <p>珠海穿山甲科技有限责任公司2018年成立于深圳，资本投入1000万，管理团队由影像行业知名人士和国内顶级大学教授组成，公司目前有员工30人左右，70%研发人员为本科以上学历，目前已累计获得发明专利及软件著作权认证数十件。</p>
                <p>珠海穿山甲科技有限责任公司2018年成立于深圳，资本投入1000万，管理团队由影像行业知名人士和国内顶级大学教授组成，公司目前有员工30人左右，70%研发人员为本科以上学历，目前已累计获得发明专利及软件著作权认证数十件。</p>
            </div>
        </div>
    </div>
    <!-- 第四栏 -->
    <div class="explain">
        <router-link to="/hire/index">
            <div class="studio">影棚加盟</div>
        </router-link>
        <div class="studio">市场合作</div>
        <div class="bottom-box">
            <!-- :class="{endbox:item == 3}" -->
            <div class="box" v-for="(item,index) in subList" :key="index" :style="index!=2?'border-right-width: 0px':''" @click="select(index)" :class="item.selected?'select-box':''">
                <el-image fit="scale-down" :class="item.selected?item.classSelectd:item.class"></el-image>
                <div class="box-title">{{item.title}}</div>
                <div class="box-subtitle">{{item.subtitle}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data: () => ({
        profileimg: "",
        busList1: [{
                class: "bg-bus1 item-img",
                title: "器材租赁"
            },
            {
                class: "bg-bus2 item-img",
                title: "场地租赁"
            },
            {
                class: "bg-bus3 item-img",
                title: "版权运营"
            }
        ],
        busList2: [{
                class: "bg-bus4 item-img",
                title: "模特运营"
            },
            {
                class: "bg-bus5 item-img",
                title: "推广工具"
            },
            {
                class: "bg-bus6 item-img",
                title: "软件管理"
            }
        ],
        subList: [{
                class: "box-img bg-sub3",
                classSelectd: "box-img bg-sl_sub3",
                title: "愿景",
                subtitle: "为影像从业者提供一站式解决方案",
                selected: false
            },
            {
                class: "box-img bg-sub2",
                classSelectd: "box-img bg-sl_sub2",
                title: "使命",
                subtitle: "成为全国性的互联网影像服务平台",
                selected: false
            },
            {
                class: "box-img bg-sub1",
                classSelectd: "box-img bg-sl_sub1",
                title: "价值观",
                subtitle: "激情 团队 责任 共赢",
                selected: false
            }
        ],
        selected: false
    }),

    components: {},

    mounted() {},

    methods: {
        select(idx) {
            for (let i in [0, 1, 2]) {
                if (i != idx) {
                    this.subList[i].selected = false;
                } else {
                    this.subList[i].selected = true;
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@css/color.scss";

.font-main {
    .title-box {
        background-color: $Theme-color;
        color: #ffffff;
        padding: 54px 0 54px 228px;

        .main-title {
            font-weight: 600;
            font-size: 60px;
            margin-bottom: 20px;
        }

        .sub-title {
            font-size: 14px;
        }
    }

    .company-profile {
        display: flex;
        justify-content: space-around;
        padding: 50px;
        background-color: #ffffff;

        .profile-textbox {
            width: 722px;

            .title {
                font-size: 24px;
                margin-bottom: 20px;
            }

            .content {
                line-height: 30px;
            }
        }

        .profile-img {}
    }

    .bus-inter {
        margin: 50px;
        display: flex;
        justify-content: center;

        .bus-device {
            margin-right: 30px;
            margin-left: 100px;

            .device-item {
                // padding: 40px 66px 45px 54px;
                background-color: rgba(101, 31, 255, 0.7);
                margin: 40px 5px 5px 5px;
                display: flex;
                flex-direction: column;
                text-align: center;

                width: 122px;
                height: 122px;

                .item-img {
                    margin-top: 15px;
                }

                .bg-bus1 {
                    width: 54px;
                    height: 44px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -156px -256px;
                }

                .bg-bus2 {
                    width: 54px;
                    height: 44px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -210px -256px;
                }

                .bg-bus3 {
                    width: 52px;
                    height: 48px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -52px -256px;
                }

                .bg-bus4 {
                    width: 48px;
                    height: 54px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -315px -0;
                }

                .bg-bus5 {
                    width: 52px;
                    height: 48px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -104px -256px;
                }

                .bg-bus6 {
                    width: 52px;
                    height: 50px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -208px -200px;
                }

                span {
                    color: #ffffff;
                    font-size: 14px;
                    line-height: 36px;
                    margin-bottom: 10px;
                }
            }

            .device-item:hover {
                background-color: rgba(101, 31, 255, 1);
                cursor: pointer;
            }
        }

        .bus-text {
            padding: 40px;
            margin-top: -50px;
            background-color: #ffffff;

            .bus-title {
                font-size: 24px;
                margin-bottom: 14px;
            }

            .bus-content {
                width: 305px;
            }

            .bus-content>p {
                margin-bottom: 40px;
            }
        }
    }

    .explain {
        padding: 50px;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        flex-direction: column;

        .studio {
            width: 1200px;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .bottom-box {
            display: flex;
            text-align: center;
            width: 100%;
            padding: 0 10%;

            .select-box {
                border: 1px solid #7C6AFF !important;
            }

            .box {
                border: 1px solid #ebebeb;
                padding: 39px 0px;
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1;

                .box-img {
                    width: 66px;
                    height: 66px;
                }

                .bg-sl_sub3 {
                    width: 48px;
                    height: 56px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -112px -200px;
                }

                .bg-sl_sub2 {
                    width: 56px;
                    height: 56px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -0 -200px;
                }

                .bg-sl_sub1 {
                    width: 52px;
                    height: 50px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -260px -200px;
                }

                .bg-sub3 {
                    width: 48px;
                    height: 56px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -160px -200px;
                }

                .bg-sub2 {
                    width: 56px;
                    height: 56px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -56px -200px;
                }

                .bg-sub1 {
                    width: 52px;
                    height: 50px;
                    // background: url('http://pic.paitume.com/css_sprites.png') -0 -256px;
                }

                .box-title {
                    color: #333;
                    font-size: 24px;
                    line-height: 30px;
                }

                .box-subtitle {
                    font-size: 14px;
                    line-height: 30px;
                    color: #666;
                }
            }

            .endbox {
                border-right-width: 1px;
            }
        }
    }
}
</style>
