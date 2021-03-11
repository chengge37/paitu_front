<template>
	<div class="content">
		<div class="top">
			<span class="title">大家都在搜</span>
			<div class='time'>
	          <el-date-picker
	            value-format="yyyy-MM-dd"
	            v-model="dateStart"
	            type="date"
	            placeholder="请选择开始时间"
	          ></el-date-picker>
	          <p class="crossLine"></p>
	          <el-date-picker
	            value-format="yyyy-MM-dd"
	            v-model="dateEnd"
	            type="date"
	            placeholder="请选择结束时间"
	          ></el-date-picker>
          </div>
		</div>
		
		<!--搜索历史列表-->
		<ul class="list" v-if="list.length>0">
			<li v-for="(item,index) in list" :key="index">
				<el-image style="width:224px;height:298px;" fit="contain" :src="util.picExplode(item.pic)" :onerror="util.errorPic"/>
				<p>{{item.timeShow}}</p>
			</li>
			<li class="remainList" v-for="item in (row-list.length%row)" v-if="list.length%row > 0"></li>
		</ul>
		<div class="noData" v-else>
			没找到相关数据
		</div>
		<!--分页模块-->
		<pagination :total="listParams.total" :page="parseInt(listParams.page)" :pagesize="listParams.page_size" @getPageNum="changePage" class="pagination"></pagination>
		
	</div>
</template>

<script>
	import pagination from "FrontComponents/pagination";
	export default {
		data() {
			return {
				dateStart:'', //开始时间
				dateEnd:'',  //结束时间
      			listParams:{
      				page:1,
      				page_size:20,
      				total:0
      			},
      			row:5, //一行显示多少列
      			list:[], //列表数据
			};
		},
		components: {
			pagination
		},
		watch:{
			dateStart: function(to, from) {
		      this.listParams.page = 1;
		      this.getList();
		    },
		    dateEnd: function(to, from) {
		      this.listParams.page = 1;
		      this.getList();
		    },
		},
		created() {
			//获取列表
			this.getList();
		},
		computed: {
			
		},
		mounted() {
			
		},
		methods: {
			//获取模特搜索历史列表
			getList(){
				let params={
					page:this.listParams.page,
					page_size:this.listParams.page_size
				}
				if(this.dateStart){
					params.st_time=this.dateStart;
				}
				if(this.dateEnd){
					params.et_time=this.dateEnd;
				}
				this.util.ModelSearchHistory(params).then(res=>{
					console.log('getList----',res);
					res.rows.forEach((item,index)=>{
						item.timeShow=this.calcTime(item.update_time);
					})
					this.list=res.rows;
					this.listParams.total=res.total_count;
					console.log('list-------------',this.list);
				})
			},
			//传入unix时间戳，计算与当前时间时间差，返回str,如'2小时前','20分钟前'，如果超过1天，不用处理
			calcTime(time){
				let begintime=time;
			    var startTime = begintime*1000;
			    var date3 = new Date().getTime()-startTime;   //时间差的毫秒数        
		
			    //计算出相差天数  
			    var days=Math.floor(date3/(24*3600*1000))  
			  
			    //计算出小时数  
			    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数  
			    var hours=Math.floor(leave1/(3600*1000))  
			    //计算相差分钟数  
			    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数  
			    var minutes=Math.floor(leave2/(60*1000))  
			    //计算相差秒数  
			    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数  
			    var seconds=Math.round(leave3/1000)  
			    let str;
			    if(days==0){
			    	if(hours>0){
			    		str=hours+'小时前';
			    	}else{
			    		str=minutes+'分种前';
			    	}
			    }else{
			    	str=this.util.unix2Time(time,'S');
			    }
			    return str;
			},
			changePage(val) {
				this.listParams.page = val;
				this.getList();
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import "@front/common/common.scss";
	.content{
		background:#fff;
		padding:12px 0px;
	}
	.top{
		display:flex;
		align-items: center;
		font-size:18px;
		padding-bottom:13px;
		border-bottom:1px solid #E0E0E0;
		margin-bottom:10px;
		.title{
			display:inline-block;
			padding:0px 30px;
		}
		.crossLine{
			width:20px;
			height:1px;
			background:#E0E0E0;
			margin:0px 10px;
		}
		.time{
			display:flex;
			align-items:center;
			&>div{
				width:150px;
				height:40px;
				/deep/ .el-input__inner{
					width:100%;
					height:100%;
					text-indent:25px;
					border: 1px solid #E0E0E0;
    				border-radius: 4px;
				}
			}
		}
	}
	
	.list{
		padding: 0px 10px;
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: space-between;
	    li{
	    	margin-bottom:10px;
	    	border:1px solid #E0E0E0;
	    	color:#999999;
	    	p{
	    		padding:10px;
	    	}
	    }
	    .remainList{
	    	content: '';
		    width: 224px;
		    border:1px solid transparent;
		    overflow: hidden;
		    margin-bottom:10px;
	    }
	}
	.noData{
		display: flex;
	    justify-content: center;
	    padding: 30px;
	    font-size: 18px;
	}
	.pagination{
		padding: 20px;
	    display: flex;
	    justify-content: flex-end;
	}
</style>