<template>
<div>
    <div class="security-wrap">
        <div class="base-info">
            <div class="avatar">
                <img :src="util.qiniuAddress+userInfo.avatar" :onerror="util.maleAvatar" alt="">
            </div>
            <div class="phone-level">
                <div class="phone">{{userInfo.mobile | toTel}}</div>
                <div class="level">
                    <span>安全级别：</span>
                    <span class="level-value">{{levelList[level]}}</span>
                    <div class="level-progress">
                        <span class="low" :class="{'level':level>=0}"></span>
                        <span class="medium" :class="{'level':level>1}"></span>
                        <span class="high" :class="{'level':level>2}"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="password-wrap">
            <ali-svg-icon icon-class="suo" class="lockIcon"></ali-svg-icon>
            <span class="label">登录密码</span>
            <span class="btn" @click="toPassword">{{userInfo.pwd?'修改密码':'设置密码'}}</span>
        </div>
        <div class="phone-wrap">
            <ali-svg-icon icon-class="shouji" class="phoneIcon"></ali-svg-icon>
            <span class="label">绑定手机</span>
            <span class="btn" @click="toPhone">修改</span>
        </div>
        <div class="email-wrap">
            <ali-svg-icon icon-class="youxiang" class="emailIcon"></ali-svg-icon>
            <span class="label">绑定邮箱</span>
            <span class="btn" @click="toEmail">{{userInfo.email?'修改邮箱':'绑定邮箱'}}</span>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    data() {
        return {
            userInfo: {},
            level: 0,
            levelList: ['低', '低', '中', '高'],
        }
    },
    computed: {
        ...mapGetters(["user_data"])
    },
    created() {
        this.userInfo = this.user_data;
        console.log('this.userInfo--------', this.userInfo);
        if (this.userInfo.pwd) {
            this.level++;
        }
        if (this.userInfo.mobile) {
            this.level++;
        }
        if(this.userInfo.email){
        	this.level++;
        }
        console.log('this.level-----', this.level);
    },
    methods: {
        toPassword() {
            this.$router.push('/personal/person/security/password')
        },
        toPhone() {
            this.$router.push('/personal/person/security/phone')
        },
        toEmail() {
            this.$router.push('/personal/person/security/email')
        }
    }
}
</script>

<style lang="scss" scoped>
.security-wrap {
    flex: 1;
    width: 970px;
    padding-bottom: 168px;
    background: #fff;

    .base-info {
        display: flex;
        align-items: center;
        padding: 30px 0 30px 30px;
        box-sizing: border-box;
        border-bottom: 1px solid #EBEBEB;

        .avatar {
            width: 88px;
            height: 88px;
            margin-right: 20px;

            img {
                width: 88px;
                height: 88px;
            }
        }

        .phone-level {
            .phone {
                margin-bottom: 20px;
            }

            .level {
                display: flex;
                align-items: center;

                .level-value {
                    margin-left: 10px;
                    margin-right: 38px;
                    color: #ff5500;
                }

                .level-progress {
                    display: flex;
                    width: 400px;
                    height: 15px;
                    background: #D9D9D9;

                    span {
                        display: block;
                        flex: 1;
                    }

                    .low.level {
                        background: #E8CDFF;
                    }

                    .medium.level {
                        background: #B666FE;
                    }

                    .high.level {
                        background: #9013FE;
                    }
                }
            }
        }
    }

    .password-wrap,
    .phone-wrap,
    .email-wrap {
        height: 68px;
        border-bottom: 1px solid #EBEBEB;
        display: flex;
        align-items: center;
        padding: 0 58px 0 29px;
        box-sizing: border-box;

        .label {
            margin-left:16px;
            margin-right: auto;
            font-size: 18px;
        }

        .el-icon-bell {
            font-size: 26px;
            color: #7C6AFF;
        }

        .btn {
            width: 88px;
            text-align: center;
            height: 40px;
            line-height: 40px;
            color:#999999;
            cursor: pointer;
            border:1px solid #999999;
            &:hover{
            	border-color:#7C6AFF;
            	color:#7C6AFF;
            }
        }
        .emailIcon{
        	width:28px;
        	height:20px;
        }
        .phoneIcon{
        	width:26px;
        	height:30px;
        }
        .lockIcon{
        	width:26px;
        	height:30px;
        }
    }
}
</style>
