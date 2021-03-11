<template>
  <div>
 			<div class="step">
 				<ul>
 					<li v-for="(item,index) in stepList" :key="index" :class="{'active':stepIndex==(index+1)}">
 						<span>{{index+1}}</span>
 						<div class="stepLine"></div>
 						<p>{{index+1}}.{{item}}</p>
 					</li>
 				</ul>
 			</div>
  </div>
</template>

<script>
export default {
	props:{
		stepIndex:{
			type:Number,
			default:1
		}
	},
  data: () => ({
  	stepList:['商品列表','填写核对订单信息','成功提交订单'],
  }),

  components: {},

  mounted() {},

  methods: {
  	
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.step{
	display:flex;
	justify-content:center;
	ul{
		display:flex;
		width:508px;
		height:68px;
		padding-top:30px;
		li{
			position:relative;
			flex:1;
			text-align:center;
			.stepLine{
				height:10px;
				background:gray;
				margin-bottom:5px;
			}
			span{
				position:absolute;
				top:-14%;
				left:50%;
				margin-left:-10px;
				width:20px;
				height:20px;
				text-align:center;
				line-height:20px;
				color:#fff;
				font-size:14px;
				background:red;
				border-radius:10px;
			}
			&.active{
				.stepLine{
					background:green;
				}
			}
		}
	}
}
</style>