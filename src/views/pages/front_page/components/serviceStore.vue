<template>
	<div>
		<div class="store">
			<div class="storeInfo">
				<div class="autoImg" style="width:64px;height:64px;">
					<img v-if="type==0" class="cursor" :src="info.to_user.avatar?$qiniuHost+info.to_user.avatar:config.defaultStorePic" @click="toShopPage" />
					<img v-if="type==1 || type==4" class="cursor" :src="info.auto_msg_user.avatar?$qiniuHost+info.auto_msg_user.avatar:config.defaultStorePic" @click="toShopPage" />
					<img v-if="type==2" class="cursor" :src="info.user.avatar?$qiniuHost+info.user.avatar:config.defaultStorePic" @click="toShopPage" />
				</div>
				<div>
					<p>
						<span>店名:</span>
						<span v-if="type==0" class="storeName cursor word-hover" @click="toShopPage">
							{{info.to_user.nick?info.to_user.nick:'该商家未填写名称'}}
						</span>
						<span v-if="type==1 || type==4" class="storeName cursor word-hover" @click="toShopPage">
							{{info.auto_msg_user.nick?info.auto_msg_user.nick:'该商家未填写名称'}}
						</span>
						<span v-if="type==2" class="storeName cursor word-hover" @click="toShopPage">
							{{info.user.nick?info.user.nick:'该商家未填写名称'}}
						</span>
					</p>
					<p v-if='type==0'>
						<span>地址:</span> {{info.to_user.address?info.to_user.address:'该商家未填写地址'}}
					</p>
					<p v-if='type==1 || type==4'>
						<span>地址:</span> {{info.auto_msg_user.address?info.auto_msg_user.address:'该商家未填写地址'}}
					</p>
					<p v-if='type==2'>
						<span>地址:</span> {{info.user.address?info.user.address:'该商家未填写地址'}}
					</p>
					<p class="identify">
						<ali-svg-icon icon-class="confirm" class="confirmIcon"></ali-svg-icon>
						<span>已认证</span>
					</p>
				</div>
				
			</div>
			<div class="other">
				<el-button @click="toShopPage">进店逛逛</el-button>
				<el-button class="iconBtn collectBtn" @click="collect(0)">
					<ali-svg-icon icon-class="like" class="likeIcon" v-if="!storeIsCollect"></ali-svg-icon>
					<ali-svg-icon icon-class="liked" class="likedIcon" v-if="storeIsCollect"></ali-svg-icon>
					<span>收藏</span>
				</el-button>
			</div>
		</div>

	</div>
</template>

<script>
	import {collectStore,collectOther,getUserLsObj} from "@util/common.js";
	export default {
		props: {
			//type 0:模特  1:摄影服务  2：团购拼拍  3：红人服务 ,4:助理
			type: {
				type: String,
				default: '0'
			},
			info: {
				type: Object,
				default: null,
			}
		},
		data() {
			return {
				storeIsCollect:false,  //店铺是否收藏
			};
		},
		components: {

		},
		watch: {

		},
		created() {
			if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
			}else{
				//判断该店家是否已经收藏
				getUserLsObj(this.info.uid, "0", "1").then(res => {
					if(res) {
						this.storeIsCollect = true;
					}
				});
			}
			
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			//跳转到店铺页面
			toShopPage() {
				//首先判断是公司，还是个人
				let isPerson = false;
				let role;
				let item = this.info;
				console.log('shootingStore---------', item);
				switch(parseInt(this.type)) {
					case 0:
						role = item.to_user.role;
						break;
					case 1:
						role = item.auto_msg_user.role;
						break;
					case 2:
						role = item.user.role;
						break;
					case 3:
						break;
					case 4:
						break;
				}
				if([64,128].includes(parseInt(role))) {
					isPerson = true;
				}
				if(this.type == 0 && isPerson) {
					this.util.toModelHome(item.id);
				} else if((this.type == 1 || this.type == 2) && isPerson) {
					this.util.toPhotoerHome(item.uid);
				} else {
					let companyType;
					if(this.type == 0) {
						companyType = 3;
					} else {
						companyType = 2;
					}
					this.util.toCompanyHome(item.uid, companyType);
				}
			},
			
			//收藏(取消收藏)，关注(取消关注）方法 type: 0表示店铺本身，1表示影棚，2表示设备，3表示活动 4模特 5拼拍
			collect(type) {
				//判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}
				if(type == 0) {
					collectStore(this.info.uid, "1").then(res => {
						if(res == 1) {
							this.storeIsCollect = true;
						} else if(res == 2) {
							this.storeIsCollect = false;
						}
					});
				}
				
			},
			
			
			
		},
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.store {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80px;
		border: 1px solid #f0f0f0;
		background: #fff;
		padding: 8px 20px;
		margin-bottom: 25px;
		margin-top: 10px;
		p {
			font-size: 13px;
		}
		button {
			background: #fff;
			border: 1px solid #f0f0f0;
			border-radius: 0px;
		}
		.storeInfo {
			display: flex;
			align-items: center;
			.storeName {
				color: #000;
			}
			.autoImg {
				margin-right: 25px;
				border: 1px solid #F0F0F0;
			}
			.identify {
				span {
					font-size: 12px;
				}
			}
			p {
				margin-bottom: 3px;
				&:last-child {
					margin-bottom: 0px;
					margin-top: 8px;
				}
				span {
					color: #999;
					margin-right: 10px;
				}
			}
		}
		.other {
			display: flex;
			align-items: center;
		}
	}
</style>