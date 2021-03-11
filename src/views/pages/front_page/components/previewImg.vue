<template>
	<!-- 全屏看图 -->
	<div v-if="isAllView" class="all-screen" ref="allScreen" id="allScreen">
		<div class="content">
			<div class="content-left">
				<i class="el-icon-arrow-left" @click="toggleImg('prev')"></i>
			</div>
			<div class="content-center">
				<!-- 中间大图 -->
				<!-- <img @click="toggleImg('next')" class="allScreenImg" :src="util.picExplode(bigImg,config.defaultEquipPic)"  :onerror="util.errorPic" :class="{'cursor':vrList&&type==1}"/> -->
				<div class="all-wrap">
					<img @click="toggleImg('next')" class="allScreenImg" :src="$qiniuHost+bigImg" :onerror="util.errorPic" :class="{'cursor':vrList&&type==1}" />
				</div>
				<div ref="bottomList" class="bottom-list" :class="{'img-list-hidden':!imgListShow}">
					<div class="list-top">
						<div class="top-left">
							<span>{{imgIndex+1}}</span>
							<span>/</span>
							<span>{{detailImgs.length}}</span>
						</div>
						<div class="top-right">
							<span @click="showImgList" v-if="imgListShow">隐藏照片列表</span>
							<span @click="showImgList" v-else>显示照片列表</span>
							<i class="el-icon-arrow-down" v-if="imgListShow"></i>
							<i class="el-icon-arrow-up" v-else></i>
						</div>
					</div>
					<!-- 列表小图 -->
					<div class="img-list" ref="list">
						<!-- <div class="img-wrap" @click="selectImg(item,index)" :class="{'img-checked':imgIndex==index}" v-for="(item,index) in [newImgList,...newImgList,...newImgList]" :key="index"> -->
						<div class="img-wrap" @click="selectImg(index)" :class="{'img-checked':imgIndex==index}" v-for="(item,index) in detailImgs" :key="index">
							<!-- <img v-if="type==1" :src="util.picExplode(item,config.defaultEquipPic)" :onerror="util.errorPic"/> -->
							<img :src="$qiniuHost+item" :onerror="util.errorPic" />
						</div>
					</div>
				</div>
			</div>
			<div class="content-right">
				<i class="el-icon-close" @click="closeViewPic"></i>
				<i class="el-icon-arrow-right" @click="toggleImg('next')"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "previewImg",
		props: {
			// 是否打开全屏预览
			isShow: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: 'studio'
			},
			// 列表小图
			detailImgList: {
				type: Array,
				default: []
			},
			// 是否显示底部小图列表
			imgListShow: {
				type: Boolean,
				default: true
			},
			// 开始显示第几张，默认第一张
			imageIndex:{
				type:[Number,String],
				default:0
			},
			// vr数组
			vrList: {
				type: [Object, Array],
				default: () => {}
			},
		},
		data() {
			return {
				bigImg: "",
				isAllView: false,
				imgIndex: 0,
				detailImgs: []
			};
		},
		watch: {
			isShow(val) {
				console.log(val)
				this.isAllView = val;
			},
			detailImgList(val) {
				this.detailImgs = val
				this.bigImg = this.detailImgs[0]
			},
			imageIndex(val){
				this.changeImg(val);
			}
		},
		mounted(){
			console.log('previceImg-------',this.imageIndex);
		},
		methods: {
			//打开vr全景图
			openVrView() {
				this.openVr = true;
			},
			changeImg(index) {
				console.log("-------------------changeImg---------------------", index)
				if(this.imgIndex == index) return;
				this.imgIndex = index;
				this.bigImg = this.detailImgs[index];
				console.log('changeImg---',index);
			},
			// 关闭看图
			closeViewPic() {
				this.imgIndex = 0;
				this.$emit("closeViewPic", false)
			},
			// 选中列表小图中的某一张
			selectImg(index) {
				this.imgIndex = index
				this.bigImg = this.detailImgs[index];
			},

			// 左右切换图片
			toggleImg(operation) {
				if(operation === 'prev') {
					if(this.imgIndex == 0) {
						this.imgIndex = this.detailImgs.length
						// this.$message.warning('已经是天地之初')
						// return
					}
					this.imgIndex--;
					this.bigImg = this.detailImgs[this.imgIndex];
					this.selectImg(this.imgIndex)
				} else {
					if(this.imgIndex == this.detailImgs.length - 1) {
						this.imgIndex = -1
						// this.$message.warning('已经到达世界的尽头')
						// return
					}
					this.imgIndex++;
					this.bigImg = this.detailImgs[this.imgIndex];
					this.selectImg(this.imgIndex)
				}
			},
			// 显示隐藏小图列表
			showImgList() {
				this.imgListShow = !this.imgListShow;
			}
		},

	};
</script>

<style lang="scss" scoped>
	// 全屏看图区块
	.all-screen {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgb(38, 38, 38);
		// position:absolute;
		// top:0;
		// left:0;
		height: 100%;
		width: 100%;
		z-index: 9999999999;
		.content {
			display: flex;
			height: 100%;
			.content-left {
				flex: 1;
				display: flex;
				align-items: center;
				.el-icon-arrow-left {
					font-size: 120px;
					color: #fff;
					cursor: pointer;
				}
			}
			.content-center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex: 2;
				.all-wrap {
					width: 986px;
					height: 660px;
					background: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					.allScreenImg {
						max-width: 986px;
						max-height: 660px;
						width: auto;
						height: auto;
						cursor: pointer;
					}
				}
				.bottom-list {
					width: 986px;
					height: 100px;
					display: flex;
					flex-direction: column;
					position: relative;
					top: 0;
					transition: top 0.5s linear;
					overflow: hidden;
					.list-top {
						height: 30px;
						display: flex;
						justify-content: space-between;
						color: #fff;
						.top-right {
							span {
								cursor: pointer;
							}
						}
					}
					.img-list {
						// width: 986px;
						flex: 1;
						display: flex;
						opacity: 1;
						transition: opacity 0.4s linear;
						// overflow: hidden;
						margin-left: 0;
						transition: margin-left 0.3s linear;
						// position: relative;
						// left: 0;
						// justify-content: space-between;
						.img-wrap {
							height: 70px;
							img {
								width: 100px;
								height: 70px;
								margin-right: calc((986px - 900px) / 8);
								opacity: 0.5;
								cursor: pointer;
							}
						}
						.img-checked {
							img {
								opacity: 1;
							}
						}
					}
				}
				.img-list-hidden {
					position: relative;
					top: 70px;
					transition: top 0.5s linear;
					.img-list {
						// display: none;
						opacity: 0;
						transition: opacity 0.4s linear;
						// visibility: hidden;
					}
				}
			}
			.content-right {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: center;
				position: relative;
				.el-icon-arrow-right {
					font-size: 120px;
					color: #fff;
					cursor: pointer;
				}
				.el-icon-close {
					position: absolute;
					top: 10px;
					right: 20px;
					font-size: 50px;
					color: #fff;
					cursor: pointer;
				}
			}
		}
	}
</style>