<template>
  <div class="phone-wrap">
    <div class="tab-head">
      <el-button type="text" @click="toSecurityPage">安全设置</el-button>
      <span class="el-icon-arrow-right"></span>
      <span>邮箱修改</span>
    </div>
    <div class="content">
      <div class="content-head">
        <div class="tab" :class="{active:item.isActive}" v-for="(item,index) in textArr" :key="index">
          <span>{{index+1}}</span>
          <span>{{item.word}}</span>
        </div>
      </div>
      <div class="first-step" v-if="textArr[0].isActive">
        <div class="phone">
          <span>验证手机：</span>
          <span>{{user_data.mobile}}</span>
        </div>
        <div class="code">
          <span>验证码：</span>
          <div class="input-code">
            <el-input v-model="phoneCode" placeholder="请输入手机验证码"></el-input>
            <el-button type="text" :disabled="hasCode" @click="getCode">
							<span class="get-code-text word-hover" v-show="!hasCode">获取短信验证码</span>
							<span class="wait-text" v-show="hasCode">{{wait}}秒重试</span>
						</el-button>
          </div>
        </div>
        <div class="next-btn" @click="firstNext">下一步</div>
      </div>

      <div class="second-step" v-if="textArr[1].isActive">
        <div class="new-phone">
          <span>邮箱：</span>
          <el-input v-model="newEmail" placeholder="请输入需要绑定的邮箱" @blur="checkEmail"></el-input>          
        </div>
        <div class="code">
          <span>验证码：</span>
          <div class="input-code">
            <el-input v-model="emailCode" placeholder="请输入邮箱验证码"></el-input>
            <el-button type="text" :disabled="hasEmailCode" @click="getEmailCode">
							<span class="get-code-text word-hover" v-show="!hasEmailCode">获取邮箱验证码</span>
							<span class="wait-text" v-show="hasEmailCode">{{waitEmail}}秒重试</span>
						</el-button>
            <!-- <span>获取邮箱验证码</span> -->
          </div>
        </div>
        <div class="next-btn" @click="secondNext">下一步</div>
      </div>

      <div class="third-step" v-if="textArr[2].isActive">
        <p class="top">恭喜您，绑定邮箱成功！</p>
        <p class="middle">
          <span class="time">{{waitBackSeconds}}</span>
          <span> 秒后将自动返回安全设置页面</span>
        </p>
        <div class="foot">
          <router-link to="/">派图首页</router-link>
          <router-link to="/personal/index">个人中心</router-link>
          <router-link to="/personal/person/security">安全设置</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setting } from "@/config/api.js";
  export default {
    data(){
      return{
        textArr:[
          {
            word:'验证身份',
            isActive:true
          },
          {
            word:'绑定新邮箱',
            isActive:false
          },
          {
            word:'绑定成功',
            isActive:false
          }
        ],
        phoneCode:'',
        emailCode:'',
        newEmail:'',
        hasCode: false,
        wait: 60,
        hasEmailCode:false,
        waitEmail:60,
        waitBackSeconds:5,
        timer:null,
        timer2:null
      }
    },
    created(){
      console.warn(this.user_data,'666')
    },
    computed: {
			...mapGetters(["user_data"])
		},
    methods:{
      //获取手机验证码
			getCode() {
				console.log('getCode-----');
				let mobile=this.user_data.mobile;
				if(/^1[3456789]\d{9}$/.test(mobile)) {
          this.getRequest(setting.getGeetGt).then(res => {
            this.$initGeet({
              gt: res.gt,
								challenge: res.challenge,
								product: "bind",
								offline: !res.success,
								new_captcha: true
							},
							geetres => {
                geetres
									.onReady(() => {
                    geetres.verify();
									})
									.onSuccess(() => {
										let geetdata = geetres.getValidate();
										let params = {
                      mobile: mobile,
											type: '1',
											geetest_challenge: geetdata.geetest_challenge,
											geetest_validate: geetdata.geetest_validate,
											geetest_seccode: geetdata.geetest_seccode
										};
										console.log(params);
										this.getRequest(setting.getMobilCode, params).then(res => {
                      this.$message.warning("请求已发送");
                      this.startTime();
											console.log('getMobileCode-----',res);
										});
									})
									.onError(err => {
										console.error("失败" + err.msg);
									});
							}
						);
					});
				}
      },
      startTime() {
				this.hasCode = true;
				this.setTime();
			},
			setTime() {
				if(this.wait == 0) {
					this.hasCode = false;
					this.wait = 60;
					return;
				} else {
					this.wait--;
				}
				setTimeout(() => {
					this.setTime();
				}, 1000);
      },
      getEmailCode(){
        if(this.newEmail.length==0){
          this.$message.warn('邮箱不能为空')
        }
        if(this.util.checkEmail(this.newEmail)){
          console.warn('123')
          	this.getRequest(setting.getEmail,{email:this.newEmail}).then(res=>{
            this.$message.success('获取验证码成功，请注意查看您的邮箱')
            this.hasEmailCode=!this.hasEmailCode
            this.timer2=setInterval(()=>{
              if(this.waitEmail==0){
                this.hasEmailCode=!this.hasEmailCode
                this.waitEmail=60
                clearInterval(this.timer2)
              }
              this.waitEmail--
            },1000)
          }).catch(err=>{})
        }
      },
    	toSecurityPage(){
    		this.$router.push({path:'/personal/person/security'});
    	},
      firstNext(){
        if(!this.phoneCode){
					this.$message.warning('验证码不能为空');
					return;
				}
				this.util.checkValidCode(this.phoneCode).then(res=>{
					if(res){
            // console.warn(res,'888')
            this.changeTab(1)
					}
				})
      },
      checkEmail(){
      	if(this.util.checkEmail(this.newEmail)){
      		console.log('邮箱合法-----------');
      	}
        
      },
      secondNext(){
        console.warn('执行')
        if(this.emailCode.length==0){
          this.$message.warning('验证码不能为空')
        }else{
          this.getRequest(setting.editEmail,{email:this.newEmail,code:this.emailCode}).then(res=>{
            console.warn(res,'888')
            if(res){
              this.changeTab(2)
              //重新更新用户信息
              this.$store.dispatch('GetUserInfo')
            }
          }).catch(err=>{})
        }
      },
      changeTab(i){
        this.textArr.forEach(item=>{
          item.isActive=false
        })
        this.textArr[i].isActive=true
        if(this.textArr[2].isActive){
          this.timer = setInterval(() => {
            if(this.waitBackSeconds==0){
              this.$router.push('/personal/person/security')
              clearInterval(this.timer);
            }
            this.waitBackSeconds--
          }, 1000);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.phone-wrap{
  .tab-head{
    height: 67px;
    line-height: 67px;
    background: #fff;
    font-size: 18px;
    color: #666;
    padding-left: 20px;
    box-sizing: border-box;
    margin-bottom: 26px;
  }
  .content{
    min-height: 530px;
    background: #fff;
    .content-head{
      height: 67px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 2px solid #D9D9D9;
      .tab{
        height: 67px;
        width: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        span:first-child{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #7C6AFF;
          background: #999999;
          color: #fff;
          margin-right: 17px;
        }
        span:last-child{
          font-size: 18px;
        }
      }
      .active{
        border-bottom: 2px solid #7C6AFF;
        color: #7C6AFF;
        span:first-child{

          background: #7C6AFF;
          color: #fff;
        }
      }
    }
    .first-step{
      padding: 70px 116px 0;
      box-sizing: border-box;
      .phone{
        margin-bottom: 37px;
      }
      .code{
        width: 418px;
        display: flex;
        align-items: center;
        height: 44px;
        margin-bottom: 37px;
        span:first-child{
          width: 70px;
        }
        .input-code{
          flex:1;
          display: flex;
          align-items: center;
          border:1px solid rgb(217,217,217);
          .el-button{
            padding: 0 20px;
            box-sizing: border-box;
            width: 138px;
            background: #D9D9D9;
            border-radius: 0;
            .get-code-text{
              background: unset;
              color: #333;
            }
          }
          /deep/{
            .el-input__inner{
              height: 44px;
              border-radius: 0;
              border: none;
            }
          }
          span{
            height: 44px;
            line-height: 44px;
            width: 200px;
            text-align: center;
            background:rgb(235,235,235);
            border-left:1px solid rgb(217,217,217);
            cursor: pointer;
          }
        }
      }
      .next-btn{
        width: 418px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        color: #fff;
        background: #7C6AFF;
      }
    }
    .second-step{
      padding: 60px 102px 0;
      box-sizing: border-box;
      .new-phone{
        width: 418px;
        display: flex;
        align-items: center;
        height: 44px;
        margin-bottom: 37px;
        span:first-child{
          width: 80px;
        }
        .el-input{
          flex: 1;
          height: 44px;
          /deep/ .el-input__inner{
            height: 44px;
            border-radius: 0;
          }
        }
      }
      .code{
        width: 418px;
        display: flex;
        align-items: center;
        height: 44px;
        margin-bottom: 37px;
        span:first-child{
          width: 80px;
        }
        .input-code{
          flex: 1;
          display: flex;
          align-items: center;
          border:1px solid rgb(217,217,217);
          .el-button{
            padding: 0 20px;
            box-sizing: border-box;
            width: 138px;
            background: #D9D9D9;
            border-radius: 0;
            .get-code-text{
              background: unset;
              color: #333;
            }
          }
          /deep/{
            .el-input__inner{
              height: 44px;
              border-radius: 0;
              border: none;
            }
          }
          span{
            height: 44px;
            line-height: 44px;
            width: 200px;
            text-align: center;
            background:rgb(235,235,235);
            border-left:1px solid rgb(217,217,217);
            cursor: pointer;
          }
        }
      }
      .next-btn{
        width: 418px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        color: #fff;
        background: #7C6AFF;
      }
    }
    .third-step{
      padding-top: 70px;
      box-sizing: border-box;
      text-align: center;
      .top{
        font-size: 18px;
        color: #333;
        margin-bottom: 28px;
      }
      .middle{
        font-size: 12px;
        color: #999;
        margin-bottom: 20px;
        .time{
          color: #EA001F;
        }
      }
      .foot{
        a{
          color: #007AD9;
          padding: 0 12px;
          border-right: 1px solid #333;
        }
        a:last-child{
          border: none;
        }
      }
    }
  }
}

.tab-head{
		button{
			font-size:18px;
		}
	}
</style>