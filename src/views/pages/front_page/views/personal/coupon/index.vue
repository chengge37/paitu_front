<template>
  <div class="container">
    <div class="menu">
      <!--头部模块-->
      <div class="top-nav">
        <div
          class="nav"
          :class="{'nav-active':item.isActive}"
          v-for="(item,index) in navArr"
          :key="index"
        >
          <span v-text="item.word[0]"></span>
          <span v-text="item.word.slice(1)"></span>
        </div>
      </div>

      <!--列表模块-->
      <div class="order-content">
        <div class="order-bread">
          <div
            @click="selectBread(item)"
            :class="{'bread-active':item.isActive}"
            class="bread-item"
            v-for="(item,index) in breadArr"
            :key="index"
          >
            <span v-text="item.word[0]"></span>
            <span>{{item.word.slice(1)}} ({{item.num}})</span>
          </div>
        </div>
        <ul class="couponList">
          <li
            v-for="(item,index) in couponList"
            :key="index"
            :class="{'isUsed':item.order_id>0,'overDay':item.status==2}"
          >
            <div class="top" :class="{topImg:item.order_id>0 || item.status==2}">
              <p class="moneyInfo" v-if="item.coupon_type==1">
                <span class="pre">￥</span>
                <span class="money">{{parseInt(item.money)}}</span>
              </p>
              <p class="moneyInfo" v-else>
                <span class="money">{{parseInt(item.money)}}折</span>
              </p>
              <div class="canUse" v-if="item.limit_money!=0">满{{item.limit_money}}使用</div>
              <div class="canUse" v-else>无门槛</div>
              <div class="time">{{handleTime(item.st_time)}}-{{handleTime(item.end_time)}}</div>
            </div>
            <div class="bottom">
              <div class="scope">
                <span>适用范围：</span>
                {{item.to_uid==0?'全平台':item.to_uid_name}}
              </div>
              <div class="rule">使用规则：{{item.content}}</div>
              	<div class="detail">
	              	<el-button type="text" @click="couponDetail(item)">详情>></el-button>
	              </div>
	              
	              <button class="use" @click="toShopPage(item.to_uid)" v-if="(!item.order_id || item.order_id==0) && item.status!=2">立即使用</button>
              <div class="notUse" v-else>
                <div class="circle"></div>
                <span v-if="item.order_id">已使用</span>
                <span v-if="item.status==2">已过期</span>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="couponList.length==0" class="nodata">暂无数据</div>
      </div>
      
      
      <!--优惠券详情模态框-->
      <el-dialog class="couponDialog" title="优惠券详情" :visible.sync="showCouponDetail" width="30%"  center>	
			
				<div class='top'>
					<span>店铺券</span>
					<span>￥{{parseInt(selectCoupon.money)}}</span>
				</div>
				<ul class="info">
					<li>
						<p>适用范围：</p>
						<span>{{selectCoupon.to_uid==0?'全平台':selectCoupon.to_uid_name}}</span>
					</li>
					<li>
						<p>有效期 ：</p>
						<span>{{handleTime(selectCoupon.st_time)}} 至 {{handleTime(selectCoupon.end_time)}}</span>
					</li>
					<li>
						<p>使用规则：</p>
						<span>{{selectCoupon.content}}</span>
					</li>
				</ul>
				<div class="foot">
					<el-button type="primary" class="color-area" @click="showCouponDetail=false">关闭</el-button>
				</div>
		</el-dialog>
      
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
export default {
  data: () => ({
    couponList: [], //优惠券列表信息
    navArr: [
      {
        word: "优惠券",
        isActive: false
      }
    ],
    breadArr: [
      {
        word: "全部优惠券",
        isActive: true,
        value: null,
        num: ""
      },
      {
        word: "可使用",
        isActive: false,
        value: "1",
        num: 0
      },
      {
        word: "已使用",
        isActive: false,
        value: "2",
        num: 0
      },
      {
        word: "已过期",
        isActive: false,
        value: "3",
        num: 0
      }
    ],
    order_use: -1,
    status: null,
    selectCoupon:{},  //选择查看的优惠券
    showCouponDetail:false, //是否显示优惠券对话框
  }),

  mounted() {
    this.userGetCoupon();
    this.getCount();
  },

  methods: {
  	//显示优惠券详情方法
  	couponDetail(item){
  		console.log('couponDetail---------',item);
  		this.selectCoupon=item;
  		this.showCouponDetail=true;
  	},
    //处理时间
    handleTime(time) {
			return format(time,"YYYY-M-D")
    },
    //获取数量
    getCount(){
    	this.util.userGetCoupon().then(res=>{
        this.breadArr[0].num=res.total_count;
      })
      this.util.userGetCoupon({order_use:0,status:1}).then(res=>{
        this.breadArr[1].num=res.total_count;
      })
      this.util.userGetCoupon({order_use:1}).then(res=>{
        this.breadArr[2].num=res.total_count;
      })
      this.util.userGetCoupon({status:2}).then(res=>{
        this.breadArr[3].num=res.total_count;
      })
    },
    //用户获取自己的优惠券列表
    userGetCoupon() {
      let params = {};
      if (this.order_use != -1) {
        params.order_use = this.order_use;
      }
      if (this.status) {
        params.status = this.status;
      }
      console.log("params----------", params);
      this.util.userGetCoupon(params).then(res => {
        this.couponList = res.rows;
        console.log("userGetCoupon---------", res);
      });
    },
    //切换菜单方法
    selectBread(obj) {
      console.log("obj================", obj);
      this.breadArr.forEach(item => {
        item.isActive = false;
      });
      obj.isActive = true;
      this.resetOption();
      switch (parseInt(obj.value)) {
        case 0:
          break;
        case 1:
          this.order_use = "0";
          break;
        case 2:
          this.order_use = "1";
          break;
        case 3:
          this.status = "2";
          break;
      }
      this.userGetCoupon();
    },

    //清空选项
    resetOption() {
      this.order_use = -1;
      this.status = null;
    },
    //跳转到店铺页面
    toShopPage(id) {
      this.util.toShopPage(id);
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
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
        span {
          font-size: 16px;
          padding: 8px 0;
          box-sizing: border-box;
        }
      }
    }
  }
}

.order-content {
  background: #fff;
  padding: 0 20px 10px;
  box-sizing: border-box;
  .order-bread {
    height: 60px;
    display: flex;
    .bread-item {
      padding: 16px 0;
      box-sizing: border-box;
      display: flex;
      margin-right: 37px;
      cursor: pointer;
      &:hover{
        color: $Theme-color;
      span:first-child {
        border-bottom: 2px solid $Theme-color;
      }
      }
    }
    .bread-active {
      color: $Theme-color;
      span:first-child {
        border-bottom: 2px solid $Theme-color;
      }
    }
  }
}
.couponList {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  li {
    color: #fff;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 205px;
    border: none;
    text-align: center;
    position: relative;
    &:nth-child(4n) {
      margin-right: 0px;
    }
    .top {
      padding-top: 20px;
      height: 184px;
      background-image: url("https://pic.paitume.com/3-1574404107591.png");
      .moneyInfo {
        font-weight: 600;
        margin-bottom: 10px;
        .pre {
          font-size: 24px;
        }
        .money {
          font-size: 48px;
        }
      }
      .canUse {
        font-size: 18px;
        color: #fff;
      }
      .time {
        color: #d1d1d1;
        font-size: 16px;
        margin-top: 20px;
      }
    }
    .topImg {
      background-image: url("https://pic.paitume.com/3-1574404179289.png");
    }
    .bottom {
      height: 210px;
      border: 1px solid rgb(235, 235, 235);
      border-top: none;
      position: relative;
    }
    .scope {
      font-size: 16px;
      color: #999;
      // margin: 20px 0px;
      padding-top: 30px;
    }
    .rule {
      font-size: 16px;
			color: #999;
			margin-top: 10px;
			padding:0px 15px;
			height:45px;
			overflow: hidden;
			text-overflow: ellipsis;
			display:-webkit-box;
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2;
    }
    .detail{
    	display:flex;
    	justify-content:center;
    }
    button.use {
      color: $Theme-color;
      width: 140px;
      padding: 12px 20px;
      border: 1px solid $Theme-color;
      border-radius: 20px;
      background: transparent;
      bottom: 20px;
      left: 33px;
      cursor: pointer;
      &:hover{
        background-color: $Theme-color;
        color:#fff;
      }
    }

    &.isUsed,
    &.overDay {
      color: #fff;
      border-color: #aaaaaa;
      .canUse {
        color: #fff;
      }
      .time {
        color: #999999;
      }
    }
    .notUse {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid #d9d9d9;
      position: absolute;
      right: 20px;
      bottom: 20px;
      text-align: center;
      line-height: 62px;
      color: #d9d9d9;
      transform: rotate(-30deg);
      font-size: 13px;
      .circle {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #d9d9d9;
        position: absolute;
        top: 15px;
        left: 15px;
      }
      span {
        background: #fff;
        position: absolute;
        width: 40px;
        height: 20px;
        top: 21px;
        left: 10px;
        line-height: 20px;
      }
    }
  }
}

.couponDialog{
	/deep/{
		.el-dialog__body{
			padding:0px 30px;
		}
	}
	.top{
		font-size:18px;
		color:#333;
		padding-bottom:20px;
		border-bottom:1px solid #D9D9D9;
		margin-bottom:30px;
		span:first-child{
			margin-right:15px;
		}
	}
	.info{
		li{
			display:flex;
			margin-bottom:20px;
			p{
				width:80px;
				margin-right:15px;
				color:#999;
			}
		}
	}
	.foot{
		display:flex;
		justify-content:center;
		padding-bottom:30px;
		button{
			background-color:$Theme-color;
		}
	}
}

</style>