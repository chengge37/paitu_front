<template>
	<div>
		<div class="content">
				<ali-svg-icon icon-class="succ"></ali-svg-icon>
				<p class="tip">{{biddingType[type]}}成功</p>
				<div v-if="type<=1">
					<span>您的项目已经{{biddingType[type]}}成功，请</span>
					<span class="verity">耐心等待审核</span>
				</div>
				<div v-if="type>1">
					投标资料已经提交给发包人
				</div>
				<p class="check" v-if="type<=1">可在【个人中心-我的项目】中查看</p>
				<button class="default-hover" @click="backToList">返回列表</button>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			
		},
		data() {
			return {
				type:'',  //type:0,添加需求成功,1.修改需求成功，2.投标成功，3.修改投标成功
				biddingType:['发包','修改','投标'],
			}
		},
		created(){
			let query=this.$route.query;
			if(!this.util.isEmpty(query)){
				this.type=query.type;
			}
		},
	    mounted(){
	    	
	    },
		methods: {
			//返回列表方法
			backToList(){
				this.$router.push("/demand/index");
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content{
	width: 100%;
    background: #fff;
    border: 1px solid #F0F0F0;
    text-align: center;
    padding:175px 0px;
    .svg-icon{
    	width:72px;
    	height:72px;
    	margin-bottom:12px;
    }
    .tip{
    	color:$Theme-color;
    	font-weight:600;
    	font-size:20px;
    	margin-bottom:10px;
    }
    div{
    	margin-bottom:65px;
    	.verity{
	    	color:#FF9500;
	    }
    }
    
    .check{
    	margin-bottom:25px;
    }
    button{
    	cursor:pointer;
    	border:none;
    	padding:10px 28px;
    	background:linear-gradient(180deg,rgba(246,246,246,1) 0%,rgba(235,235,235,1) 100%);
    }
}
</style>