<template>
  <div class="foot">
    <div class="left-foot">
      <div class="logo-text">
        <ali-svg-icon icon-class="ic_banner_logo" class-name="ic_banner_logo"></ali-svg-icon>
        <span>派图租赁</span>
      </div>
      <div class="phone">0756-3666414</div>
      <div class="three-tab">
        <!-- <div>
          <router-link to="formus" class="word-hover">关于我们</router-link>
        </div>-->
        <!-- <div class="shot-line"></div> -->
        <!-- <div v-if="!user_data||user_data.role==0">
          <router-link to="/gosetstore" class="word-hover">成为租赁商</router-link>
        </div>
        <div class="shot-line" v-if="!user_data||user_data.role==0"></div> -->
        <!-- <div>
          <router-link to="/propaganda/index" class="word-hover">产品特色</router-link>
        </div>
        <div class="shot-line"></div>-->
        <div>
          <span class="word-hover" style="cursor:pointer" @click="toSign">签约入驻</span>
        </div>
        <div class="shot-line"></div>
        <div>
          <router-link to="/opman/index" class="word-hover">帮助中心</router-link>
        </div>
        <div class="shot-line"></div>
        <div>
          <router-link to="/feedback/index" class="word-hover">意见反馈</router-link>
        </div>
        <div class="shot-line"></div>
        <div>
          <router-link to="/support/index" class="word-hover">商家扶持计划</router-link>
        </div>
      </div>
      <div class="down-slot">
        <div class="solt">
            <a
            target="_blank"
            href="http://www.beian.miit.gov.cn/"
          >粤ICP备18005878号</a></div>
        <div class="solt">
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44049102496452"
          >粤公网安备 44049102496452号</a>
        </div>
        <div class="solt">珠海穿山甲科技有限责任公司版权所有 © 2019-2020</div>
      </div>
    </div>
    <div class="right-foot">
      <div class="flex">
        <el-image
          :src="$qiniuHost + 'images/wechat_small_procedures.jpg?v=1'"
          fit="scale-down"
          class="qrcode"
        ></el-image>
        <div>欢迎使用小程序</div>
      </div>

      <div class="flex margin-box">
        <el-image
          :src="$qiniuHost +'images/wechat_official_account.jpg'"
          fit="scale-down"
          class="qrcode"
        ></el-image>
        <div>微信扫一扫，进入公众号</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(["is_login_in", "user_data"])
  },
  methods:{
    toSign(){
      if(!this.user_data){
        this.$message.warning('请先登录')
        this.$router.push({path:'/login',query:{to:'sign'}})
        return
      }
      this.$router.push('/sign/firstCategory')
    }
  }
};
</script>
<style lang="scss" scoped>
.foot {
  background-color: #fff;
  color: #333;
  display: flex;
  justify-content: space-between;
  padding-top: 62px;
  padding-bottom: 56px;
  width: 1200px;
  margin: 0 auto;
  .left-foot {
    font-size: 10px;
    .logo-text {
      font-size: 24px;
      margin-bottom: 39px;
      .ic_banner_logo {
        width: 25px;
        height: 35px;
        position: relative;
        top: 5px;
      }
    }
    .phone {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 30px;
    }
    .three-tab {
      display: flex;
      align-items: center;
      font-size: 18px;
      margin-bottom: 30px;
      .shot-line {
        background-color: rgba($color: #333, $alpha: 0.2);
        width: 1px;
        height: 9px;
        margin: 0 20px;
      }
    }
    .down-slot {
      .solt {
        height: 20px;
      }
    }
  }
  .right-foot {
    display: flex;
    font-size: 8px;
    justify-content: center;
    text-align: center;
    .flex {
      display: flex;
      flex-direction: column;
      .qrcode {
        width: 129px;
      }
    }
    .margin-box {
      margin-left: 10px;
    }
  }
}
</style>


