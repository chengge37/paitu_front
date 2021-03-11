<template>
<div class="container">
    <div class="menu">
        <div class="top-nav">
            <div class="nav" :class="{'nav-active':item.isActive}" v-for="(item,index) in navArr" :key="index" @click="selectNav(item)">
                <span v-text="item.word[0]"></span>
                <span v-text="item.word.slice(1)"></span>
            </div>
            <!-- <div class="manage">批量管理</div> -->
            <div class="top-search">
                <el-input placeholder="请输入活动名称" @keyup.enter.native="searchGetOrder(text)" v-model="text"></el-input>
                <div class="search-icon" @click="searchGetOrder(text)">
                    <ali-svg-icon icon-class="search-border-copy" class-name="search-border-copy"></ali-svg-icon>                
                </div>
                <!-- <div class="icon" @click="searchGetOrder(text)">
                    <img class="bg-search" alt="">
                </div> -->
            </div>
        </div>

        <!-- <JoinActivity v-if="navArr[0].isActive"></JoinActivity> -->
        <ActivityOrder :searchList="searchList" v-if="navArr[0].isActive"></ActivityOrder>
    </div>
</div>
</template>

<script>
// import JoinActivity from './join'
import {
    frontActivity
} from '@config/api.js'
import ActivityOrder from './order'
export default {
    data() {
        return {
            navArr: [
                // {
                //   word:'参与活动',
                //   path:'/personal/myActivity/join',
                //   isActive:true
                // },
                {
                    word: '活动订单',
                    path: '/personal/myActivity/order',
                    isActive: false
                }
            ],
            text: '',
            searchList: []
        }
    },
    components: {
        // JoinActivity,
        ActivityOrder,
    },
    created() {
        this.showPageByRoute()
    },
    methods: {
        selectNav(nav) {
            // this.navArr.forEach(item=>{
            //   item.isActive=false
            // })
            // nav.isActive=true
            this.$router.push(nav.path)
        },
        //根据路由判断显示那个模块方法
        showPageByRoute() {
            this.navArr.forEach(item => {
                item.isActive = false
            })
            //获取路由地址
            let path = this.$route.name;
            switch (path) {
                // case 'JoinActivity':
                //   this.navArr[0].isActive=true;
                //   break;
                case 'ActivityOrder':
                    this.navArr[0].isActive = true;
                    break;
            }
        },
        searchGetOrder(searchText) {
            this.getOrder(1, 5, null, searchText)
        },
        // 获取全部订单
        getOrder(page, page_size, pay_status, search) {
            this.getRequest(frontActivity.getActivityOrder, {
                page,
                page_size,
                pay_status,
                search
            }).then(res => {
                console.log(res, '所有活动订单')
                this.searchList = res.rows
                this.orderCount = res.total_count
                console.log(this.list, '55555555555555555')
            }).catch(err => {})
        },
    },
    watch: {
        '$route': function (to, from) {
            this.showPageByRoute();
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    .menu {
        .top-nav {
            padding: 0 20px;
            box-sizing: border-box;
            height: 60px;
            background: #fff;
            margin-bottom: 29px;

            .nav {
                font-size: 0;
                box-sizing: border-box;
                margin-right: 30px;

                // cursor: pointer;
                span {
                    // background: #987;
                    font-size: 16px;
                    padding: 8px 0;
                    box-sizing: border-box;
                }
            }

            // .nav-active{
            //   color: $Theme-color;
            //   span:first-child{
            //     border-bottom: 2px solid $Theme-color; 
            //   }
            // }
            // .manage{
            //   margin-left: auto;
            //   margin-right: 20px;
            //   padding: 9px 14px;
            //   box-sizing: border-box;
            //   border:1px solid rgb(217,217,217);
            //   color: #999;
            //   cursor: pointer;
            // }
            .top-search {
                margin-left: auto;
                display: flex;
                border: 1px solid rgb(217, 217, 217);

                /deep/ .el-input__inner {
                    border: none;
                    border-radius: 0;
                }

                .search-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 74px;
                    border-left: 1px solid rgb(217, 217, 217);
                    background: rgb(250, 250, 250);
                    cursor: pointer;
                    .search-border-copy{
                        width: 22px;
                        height: 22px;
                    }
                }
            }
        }
    }
}
</style>
