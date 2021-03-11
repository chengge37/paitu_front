<template>
	<div class="info" v-if="detail">
        <div class="name-resttime">
          <span>{{detail.name}}</span>
          <span>{{detail.showStatus}}，剩余{{detail.remainDay}}天</span>
        </div>
        <div class="demander-time">
          <span>发包方</span>
          <span>{{detail.user_nick}}</span>
          <span>{{detail.create_time | time2FullDate}}</span>
          <span>发布</span>
        </div>
        <div class="item-about">
          <div class="item">
            <span>项目类型</span>
            <span>{{detail.showType}}</span>
          </div>
          <div class="item">
            <span>项目预算</span>
            <span>{{detail.price}}元</span>
          </div>
          <div class="item">
            <span>已托管金额</span>
            <span>{{detail.deposit_price}}元</span>
          </div>
          <div class="item">
            <span>预计周期</span>
            <span>{{detail.extend}}天</span>
          </div>
          <div class="item">
            <span>区域范围</span>
            <span>{{detail.showCity}}</span>
          </div>
        </div>
        <div class="item-dec" :class="{fold:isFold}">
          <div>项目内容描述</div>
          <p>{{detail.describe}}</p>
          <span class="fold-btn default-hover" @click="isFold=!isFold">{{isFold?'展开更多':'收起'}}</span>
        </div>
        <div class="skill-label">
          <span>技能标签：</span>
          <span class="skill-item" v-for="(item,index) in detail.skillList" :key="index">{{item}}</span>
          <!--<span class="skill-item">电商摄影</span>-->
        </div>
        <div class="number-end">
          <span>目前竞标人数：</span>
          <span>{{detail.limit_num}}人</span>
          <span>投标截止日期：</span>
          <span>{{detail.end_time | time2Date}}</span>
        </div>
      </div>
</template>

<script>
		/*   	任务需求详情组件
		 * 		  接受参数id,
		 * 	  接受获取详情信息，getInfo
		 */
	export default {
		props: {
			id:{
				type:String,
				default:'',
			}
		},
		data() {
			return {
				detail:null, //详情信息
				isFold:true
			};
		},
		watch: {
			
		},
		components: {},
		created(){
			console.log('demandDetail------------created-------',this.id);
		},

		mounted() {
			this.getDetail();
		},

		methods: {
			//获取需求详情
			getDetail(){
				console.log('this.getDetail----',this.id);
				let params={
					id:this.id
				}
				this.util.getBiddingList(params).then(res=>{
					console.log('getDetail------------',res);
					this.detail=res;
					this.changeData();
					this.$emit('getInfo',res);
				})
				
			},
			//获取相关状态和项目类型
			changeData(){
				let obj=this.detail;
				obj.showType=this.config.projectList[parseInt(obj.type)-1].name;
				obj.showStatus=this.config.projectStatusList[parseInt(obj.status)].name;
				
				
				obj.skillList=[];
				let list=obj.skill.split(',');
				list.forEach((item,index)=>{
					this.config.biddingSkillType.forEach((item2,index2)=>{
						if(item==item2.id){
							obj.skillList.push(item2.name);
						}
					})
				})
				
				let curDay=this.util.getCurDay();
				let endDay=this.util.unix2Time(obj.end_time,"Y");
				obj.remainDay=this.util.datedif(curDay,endDay);
				console.log('remainDay---------',obj.remainDay);
				
				if(obj.city_code==0){
					obj.showCity='全国';
				}else{
					let allCity=this.util.deepcopy(this.config.allCityCode);
					allCity.forEach((item,index)=>{
						if(obj.city_code==item.code){
							obj.showCity=item.city;
						}
					})
				}
			},
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	.info{
      width: 878px;
      min-height: 548px;
      background: #fff;
      padding: 20px 26px;
      .name-resttime{
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        span:first-child{
          font-size: 18px;
          font-weight: 600;
          margin-right: 14px;
        }
        span:last-child{
          border: 1px solid #651fff;
          color: #651fff;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          padding:2px 10px;
        }
      }
      .demander-time{
        font-weight: 600;
        margin-bottom: 22px;
        span:nth-child(2){
          color: #651fff;
          margin-right: 40px;
        }
      }
      .item-about{
        height: 114px;
        border-top: 1px solid #EBEBEB;
        border-bottom: 1px solid #EBEBEB;
        display: flex;
        align-items: center;
        .item{
          display: flex;
          flex-direction: column;
          flex: 1;
          span:first-child{
            color: #666;
            margin-bottom: 14px;
          }
          span:nth-child(2){
            font-size: 24px;
            font-weight: 600;
          }
        }
      }
      .item-dec{
        min-height: 184px;
        border-bottom: 1px solid #EBEBEB;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        & > div:first-child{
          color: #666;
          margin-bottom: 20px;
        }
        .fold-btn{
          font-weight: 600;
          cursor: pointer;
          margin-top: 30px;
          align-self: center;
          color: #651fff;
        }
      }
      .fold{
        height: 184px;
        overflow: hidden;
        box-shadow: 0px -15px 30px #eee inset;
        position: relative;
        // box-shadow: 0 35px 5px -3px orange inset;
        .fold-btn{
          position: absolute;
          bottom:45px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .skill-label{
        height: 78px;
        line-height: 78px;
        border-bottom: 1px solid #EBEBEB;
        font-size: 11px;
        display: flex;
        align-items: center;
        .skill-item{
          width:55px;
          height:24px;
          background:rgba(255,255,255,1);
          border-radius:2px;
          border:1px solid rgba(101,31,255,1);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #651fff;
          margin-right: 8px;
        }
      }
      .number-end{
        margin-top: 25px;
        span:nth-child(odd){
          color: #666;
        }
        span:nth-child(2){
          font-weight: 600;
          color: #651fff;
          margin-right: 46px;
        }
        span:nth-child(4){
          font-weight: 600;
        }
      }
    }
</style>