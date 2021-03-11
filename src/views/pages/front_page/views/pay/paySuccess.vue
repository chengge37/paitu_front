<template>
	<div class="third-step">
			<div class="third-center">
					<ali-svg-icon icon-class="succ" class="bg-third_step"></ali-svg-icon>
					<!-- <img class="bg-third_stepp
					margin-bottom: 20px;" alt=""> -->
					<p class="tip">支付成功</p>
					<!-- <p class="row-info">
						<span class="info-label">购买昵称</span>
						<span class="info-value">Giao哥</span>
					</p>
					<p class="row-info">
						<span class="info-label">购买商品</span>
						<span class="info-value">基础版</span>
					</p>
					<p class="row-info">
						<span class="info-label">有效期至</span>
						<span class="info-value">2020-06-06</span>
					</p>
					<p class="row-info">
						<span class="info-label minus">减</span>
						<span class="info-value">￥50</span>
					</p> -->
					<!-- <span class="msg" v-if="true">您已成功购买<span>基础版</span></p>
					<p class="msg" v-else>您已成功购买<span>旗舰版</span></p> -->
					<div class="bottom-btn">
						<span class="btn color-area" @click="$router.push('/publicity/index')">返回</span>
						<span class="btn color-area" @click="$router.push('/personal/index')">去个人中心</span>
					</div>
			</div>
	</div>
</template>

<script>
	import {sms} from "@/config/api.js";
	import QRCode from "qrcode";
	import { mapGetters } from "vuex";
	export default {
		props:{
			
		},
		data() {
			return {
				
			}
		},
		watch: {
		    
	    },
	    destroyed() {
			//清除定支付轮询定时器
		  this.clearPayInterval();
		},
	    mounted(){
	    	
	    },
		methods: {
			
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.third-step {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	// width: 1200px;
	// margin: 0 auto;
	// padding-bottom: 49px;
	// box-sizing: border-box;
	
	.third-center {
			background: #fff;
			// border: 1px solid rgb(240, 240, 240);
			height: 706px;
			padding-top: 188px;
			text-align: center;

			.bg-third_step{
				margin-bottom: 20px;
				width: 72px;
				height: 72px;
			}

			.tip {
					font-size: 20px;
					color: #5F1DEE;
					font-weight: 600;
					margin-bottom: 30px;
			}

			.row-info{
				min-width: 200px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				&:not(:last-child){
					margin-bottom: 30px;
				}
				.minus{
					// color: #888;
					padding: 3px;
					box-sizing: border-box;
					background: rgb(97,218,43);
					color: #fff;
				}
				.info-value{
					color: #7C6AFF;
					font-weight: bold;
				}
			}
			// .msg {
			// 		margin-bottom: 10px;

			// 		span {
			// 				color: #5F1DEE;
			// 		}
			// }
			.bottom-btn{
				.btn {
						display: inline-block;
						width: 100px;
						height: 34px;
						line-height: 34px;
						background: linear-gradient(180deg, rgba(246, 246, 246, 1) 0%, rgba(235, 235, 235, 1) 100%);
						// background: #7C6AFF;
						// color: #fff;
						cursor: pointer;
						border-radius: 4px;
						&:first-child{
							margin-right: 20px;
						}
				}
			}
	}
}
</style>