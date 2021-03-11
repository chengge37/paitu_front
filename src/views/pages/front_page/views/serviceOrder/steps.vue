<template>
	<div class="hire-wrap">
		<div class="hire-progress">
			<div class="progress-center">
				<div class="progress-item" :class="{'progress-active':stepInfo.one}">
					<div>1</div>
					<p>提交订单</p>
				</div>
				<div class="line"></div>
				<div class="progress-item" :class="{'progress-active':stepInfo.two}">
					<div>2</div>
					<p>选择支付方式，付款</p>
				</div>
				<div class="line"></div>
				<div class="progress-item" :class="{'progress-active':stepInfo.three}">
					<div>3</div>
					<p>支付状态</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
		    stepIndex: {
		      type: [String,Number],
		      default: '1'
		    },
		  },
		data() {
			return {
				step:this.stepIndex,
				stepInfo:{
					'one':true,
					'two':false,
					'three':false
				}
			}
		},
		created() {
			
		},
		watch:{
			stepIndex(to) {
		      this.step = to;
		      this.changeStep();
		    },
		},
		
		mounted() {
			this.changeStep();
		},
		components: {
			
		},
		methods: {
			changeStep(){
				switch(parseInt(this.step)){
					case 1:
						this.stepInfo['one']=true;
						break;
					case 2:
						this.stepInfo['one']=true;
						this.stepInfo['two']=true;
						break;
					case 3:
						this.stepInfo['one']=true;
						this.stepInfo['two']=true;
						this.stepInfo['three']=true;
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hire-wrap {
		.hire-head {
			width: 100%;
			height: 230px;
			background: linear-gradient(270deg, rgba(85, 26, 215, 1) 0%, rgba(96, 29, 242, 1) 41%, rgba(86, 26, 217, 1) 50%, rgba(96, 29, 242, 1) 60%, rgba(85, 26, 214, 1) 100%);
			text-align: center;
			p {
				font-size: 60px;
				font-weight: 600;
				color: #fff;
				letter-spacing: 5px;
			}
		}
		.hire-progress {
			height: 100px;
			background: #FAFAFA;
			margin-bottom: 40px;
			.progress-center {
				width: 1200px;
				margin: 0 auto;
				display: flex;
				.progress-item {
					padding-top: 20px;
					box-sizing: border-box;
					height: 100%;
					text-align: center;
					div {
						width: 36px;
						margin: 0 auto;
						height: 36px;
						line-height: 36px;
						background: rgba(101, 31, 255, .5);
						border: 1px solid #D9D9D9;
						color: #fff;
						border-radius: 50%;
						text-align: center;
						margin-bottom: 6px;
					}
				}
				.progress-active {
					div {
						background: #7C6AFF;
					}
				}
				.line {
					height: 37px;
					flex: 1;
					background: none;
					margin: 0;
					border-bottom: 2px dashed rgba(101,31,255,.5);
				}
			}
		}
		
	}
</style>
