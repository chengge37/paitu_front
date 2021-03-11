<template>
  <div class="wrap">
    <div class="header">发布项目 - 保证金</div>
    <div class="main">
      <div class="article">
        <div class="title">支付保证金</div>
        <div class="input-wrap">
          <span>保证金</span>
          <input v-model="deposit_price" type="number" placeholder="请输入自定义预算">
        </div>
        <div class="qa">
          <p>保证金是什么？</p>
          <p>答：保证金是用来如何如何</p>
          <p>流标保证金是否退回</p>
          <p>答：是的，流标后保证金退回给您</p>
          <p>保证金作用是什么？</p>
          <p>答：对于投标者来说，在项目中输入保证金能起到诚意的作用</p>
          <p>保证金支付给谁</p>
          <p>答：保证金暂由平台保管，项目完成后会退回给您</p>
          <p>更多帮助 >></p>
        </div>
      </div>
      <div class="aside">
        <div class="progress">
          <div class="title">发布流程</div>
           <el-steps direction="vertical" :active="4" :space="90">
            <el-step title="提交项目基本资料"></el-step>
            <el-step title="支付保证金"></el-step>
            <el-step title="等待审核"></el-step>
            <el-step title="发布成功"></el-step>
          </el-steps>
        </div>
        <div class="customer-service">
          <div class="title">客服</div>
          <div>
            <span>客服电话：</span>
            <span>1888888888</span>
          </div>
          <div>
            <span>客服邮箱：</span>
            <span>636363@qq.com</span>
          </div>
          <div>
            <img src="http://img2.imgtn.bdimg.com/it/u=1671289457,2641565305&fm=26&gp=0.jpg" alt="">
            <div>
              <span>聊天</span>
              <span>人工客服上班时间 AA - BB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="agree">
      <el-checkbox v-model="isAgree">我已阅读《xxx》协议</el-checkbox>
    </div>
    <div class="bottom-btn">
      <span @click="pay">支付</span>
       <span @click="backToList">返回列表</span> 
    </div>
    
    
    <!--竞标卡支付弹窗-->
		<pay-bidding-fee :totalPrice="deposit_price" :openPay.sync="showPayFee" @closed="closePay" v-if="biddingOrderId" :orderId="biddingOrderId"></pay-bidding-fee>
    
  </div>
</template>

<script>
import payBiddingFee from "FrontComponents/payBiddingFee";
  export default {
    data(){
      return{
        isAgree:false,
        deposit_price:0,
        showPayFee: false, //是否显示竞标卡支付窗口
				biddingOrderId:'', //生成的竞标卡年卡id
				biddingId:'', //任务id
      }
    },
    components:{
    	payBiddingFee
    },
    created(){
    	let query=this.$route.query;
    	if(!this.util.isEmpty(query)){
    		this.biddingId=query.id;
    		console.error('deposit----created-------biddingOrderId-----------',this.biddingOrderId);
    	}
    },
    methods:{
    	//关闭支付弹窗方法
    	closePay(){
    		this.showPayFee=false;
    	},
    	//返回任务列表
    	backToList(){
    		
    	},
    	//支付托管金额方法
      pay(){
        if(!this.isAgree){
          this.$message.warning('请勾选阅读协议')
          return
        }
        if(this.deposit_price==0){
          this.$message.warning('保证金不能为0')
          return
        }
        let params={
        	type:'2',
        	price:this.deposit_price,
        	bidding_id:this.biddingId
        }
        this.util.addBiddingOrder(params).then(res=>{
        	this.biddingOrderId=res.id;
					this.showPayFee=true;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  color: #333;
  .header{
    height: 79px;
    line-height: 79px;
    background: #fff;
    font-size: 20px;
    padding-left: 20px;
    margin-bottom: 10px;
  }
  .main{
    display: flex;
    justify-content: space-between;
    height: 612px;
    margin-bottom: 20px;
    .article{
      width: 878px;
      background: #fff;
      padding: 20px;
      .title{
        font-size: 20px;
        margin-bottom: 27px;
      }
      .input-wrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 120px;
        input{
          width: 728px;
          height: 46px;
          background: #E0E0E0;
          border-radius: 4px;
          border:1px solid rgb(224,224,224);
          text-indent: 18px;
        }
        input:focus{
          outline: none;
        }
      }
      .qa{
        padding-left: 110px;
        p:not(:last-child){
          color: #FF641F;
          font-weight: 600;
        }
        p:nth-child(even){
          margin: 8px 0 24px;
        }
        p:last-child{
          color: #666;
          cursor: pointer;
        }
      }
    }
    .aside{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 313px;
      .progress{
        background: #fff;
        margin-bottom: 10px;
        padding: 15px 20px;
        height: 389px;
        .title{
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 32px;
        }
        .el-steps{
          .el-step{
            /deep/{
              .el-step__icon{
                width: 16px;
                height: 16px;
                background: #651fff;
                border: none;
                color: #651fff;
              }
            }
          }
          /deep/{
            .el-step__line{
              background-color: #651fff;
              left: 7px;
            }
            .is-finish{
              color: #333;
              border-color: #651fff;
            }
          }
        }
      }
      .customer-service{
        height: 213px;
        background: #fff;
        padding: 15px 20px;
        .title{
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 32px;
        }
        & > div:nth-child(2),& > div:nth-child(3){
          font-size: 11px;
          margin-bottom: 20px;
        }
        & > div:last-child{
          display: flex;
          img{
            width: 42px;
            height: 42px;
            border-radius: 50%;
            margin-right: 34px;
          }
          & > div{
            flex: 1;
            font-size: 11px;
            span:first-child{
              width: 44px;
              height: 21px;
              border: 1px solid #E0E0E0;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #666;
              margin-bottom: 5px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .agree{
    margin-bottom: 20px;
    .el-checkbox{
      color: #999;
    }
  }
  .bottom-btn{
    display: flex;
    margin-bottom: 80px;
    span:first-child{
      width: 123px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #651FFF;
      font-weight: 600;
      color: #fff;
      margin-right: 24px;
      cursor: pointer;
    }
    span:nth-child(2){
      width: 95px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border:1px solid rgba(224,224,224,1);
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>