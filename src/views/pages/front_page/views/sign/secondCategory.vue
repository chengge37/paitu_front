<template>
  <div class="wrap">
    <p>签约入驻</p>
    <p></p>
    <div class="content">
      <p>请选择{{$route.query.select==1?'公司':'个人'}}类型</p>
      <div class="join-role">
        <div class="role-item" v-for="(item,index) in roles" :key="index" @click="selectRole(item)">
          <ali-svg-icon :icon-class="item.icon" :class-name="item.icon"></ali-svg-icon>
          <span class="label-name">{{item.label}}</span>
          <span class="dec">{{item.dec}}</span>
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <span class="back-btn color-area" @click="back">返回</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { apply } from "@config/api";
export default {
  data() {
    return {
      roles: [],
      companyRoles: [
        {
          label: "影棚、器材租赁商",
          url: "/sign/companySign",
          role: 1,
          icon: "yingpengqicai",
          dec: "适合有影棚器材管理、运营、线上销售需求的商家"
        },
        {
          label: "摄影公司",
          url: "/sign/companySign",
          role: 2,
          icon: "sheyinggongsi",
          dec: "适合需要新的运营、盈利模式的摄影商家"
        },
        {
          label: "模特经纪公司",
          url: "/sign/companySign",
          role: 3,
          icon: "motejingji",
          dec: "适合需要扩大宣传、增加盈利的模特经纪商家"
        },
        {
          label: "MCN公司",
          url: "/sign/companySign",
          role: 4,
          icon: "MCN",
          dec: "适合需要提高知名度、增加盈利的MCN商家"
        }
      ],
      personRoles: [
        {
          label: "个人摄影师",
          url: "/sign/personSign",
          role: 1,
          icon: "dulisheyingshi",
          dec: "适合自由摄影师有线上接单需求"
        },
        {
          label: "个人模特",
          url: "/sign/personSign",
          role: 2,
          icon: "dulimote",
          dec: "适合自由职业模特、有接单需求"
        }
      ],
      applyUrl: "",
      detailRole: "",
      roleText: "",
      type: ""
    };
  },
  created() {
    this.roles =
      this.$route.query.select == "1" ? this.companyRoles : this.personRoles;
  },
  computed: {
    ...mapGetters(["city_code", "user_data", "sign_info"])
  },
  methods: {
    selectRole(item) {
      this.getRequest(apply.get).then(res => {
        console.log("res", res);
        let flag=true
        if(res.type){
          if (this.$route.query.select == res.type &&(item.role == res.company_type || item.role == res.personal_type)){//是自己
          //可以进
          flag=true
        }else{
         if (res.type==1&&(res.company_type==1||res.company_type==2)) {//是1,2
        if(this.$route.query.select == 1&&(item.role==1||item.role==2)){//选1,2
          //可以进
          flag=true
        }else{
          //不可以进
          flag=false
        }
        }else{
          if(res.status==2||(res.status==0&&res.progress==1)){//已拒绝或未申请
            //可以进
            flag=true
          }else{
            //不可以进
            flag=false
          }
        }
        }
        }else{
          flag=true
        }
        if(!flag){
          return this.$message.error('非法申请')
        }
          let str = this.$route.query.select == 1 ? "company_type" : "personal_type";
          this.postRequest(apply.get, {
            type: this.$route.query.select,
            [str]: item.role
          })
            .then(res => {
              console.log(res, "res");
              this.type = this.$route.query.select;
              // if(true){
              if (res.progress != 1) {
                if (this.$route.query.select == 1) {
                  this.applyUrl = "/sign/companySign";
                } else if (this.$route.query.select == 2) {
                  this.applyUrl = "/sign/personSign";
                }
                this.$store.commit("SET_SIGN", {
                  type: this.type,
                  role: item.role,
                  progress: res.progress
                });
                this.$router.push(this.applyUrl);
              } else {
                this.util.isUserTrue().then(res => {
                  if (!res) {
                    if (
                      (item.role == 1 || item.role == 2) &&
                      this.$route.query.select == 2
                    ) {
                      this.$confirm(`请先完成实名认证`, "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                      })
                        .then(() => {
                          this.$router.push("/personal/person/certificate");
                        })
                        .catch(() => {});
                    } else {
                      this.$store.commit("SET_SIGN", {
                        type: this.type,
                        role: item.role,
                        progress: 1
                      });
                      this.$router.push(item.url);
                    }
                  } else {
                    this.$store.commit("SET_SIGN", {
                      type: this.type,
                      role: item.role,
                      progress: 1
                    });
                    this.$router.push(item.url);
                  }
                });
              }
            })
            .catch(err => {
              console.error(err);
            });
      });
    },
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  padding-bottom: 50px;
  color: #333;
  p:first-child {
    text-align: center;
    font-size: 64px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  p:nth-child(2) {
    width: 74px;
    height: 6px;
    background: #333;
    margin: 0 auto;
    margin-bottom: 58px;
  }
  .content {
    height: 460px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 18px;
      font-weight: 500;
      color: #999;
      margin-bottom: 50px;
    }
    .join-role {
      display: flex;
      justify-content: center;
      .role-item {
        width: 150px;
        height: 250px;
        padding: 34px 19px 0;
        border: 1px solid #e8e8e8;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .yingpengqicai,
        .sheyinggongsi,
        .motejingji,
        .MCN,
        .dulisheyingshi,
        .dulimote {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          padding: 5px;
          margin-bottom: 12px;
        }
        .yingpengqicai {
          background: #ba2df3;
        }
        .sheyinggongsi {
          background: #18cfa7;
        }
        .motejingji {
          background: #f1ab25;
        }
        .MCN {
          background: #ee5241;
        }
        .dulisheyingshi {
          background: #35a6fd;
        }
        .dulimote {
          background: #18cfa7;
        }
        .label-name {
          font-size: 16px;
          margin-bottom: 16px;
          text-align: center;
        }
        .dec {
          color: #999;
          text-align: center;
        }
      }
      .role-item:first-child {
        .label-name {
          padding: 0 10px;
        }
      }
      .role-item + .role-item {
        margin-left: 20px;
      }
      .role-item {
        &:hover {
          border-color: $Theme-color;
        }
      }
    }
  }
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
    .back-btn {
      width: 100px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #651fff;
      color: #fff;
      margin-top: 50px;
      cursor: pointer;
    }
  }
}
</style>