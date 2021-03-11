<template>
	<div>
		<div class="body">
			<div class="activity">
				<ul>
					<li v-for="(item,index) in list" :key="index" class="cursor" @click="toActivityDetail(item)">
						<div class="image">
							<img :src="item.info|getPic" alt="" />
						</div>
						<div class="detail">
							<div class="title-person">
								<span class="title">{{item.name}}</span>
								<!-- <div class="person">
									<span>报名人数：</span>
									<span class="person">{{item.person}}</span>
								</div> -->
							</div>
							<div class="content">
								{{item.content}}
							</div>
							<!-- <p class="charge">
								<span>费用：</span>
								<span>免费</span>
							</p> -->
							<p class="time">
								<span>时间：</span>
								<span>{{item.start_time}}</span>
								<span>至</span>
								<span>{{item.end_time}}</span>
							</p>
							<p class="address">
								<span>地点：</span>
								<span>{{item.address}}</span>
							</p>
							<div class="style-wrap">
								<div class="style">
									<span>举办方：</span>
									<span>{{item.user_detail.nick}}</span>
								</div>
								<span class="statu">已结束</span>
							</div>

						</div>
					</li>
					<!--分页模块-->
					<div class="page">
						<el-pagination background layout="prev, pager, next" :total="50">
						</el-pagination>
					</div>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {frontActivity} from '@config/api.js'
	export default {
		data: () => ({
			activeIndex: '1',
			search_text: '',
			list:[{
				imageUrl:'https://pic.paitume.com/1-1561710814412.png',
				title:'2019校园摄影大赛正式征稿',
				content:'大赛分摄像组于摄影两个小组，同事都以我的趣味大学生活为题。内容要求积极向上，照片与视频要具代表意义，看照片与视频要让人看出里面蕴藏的故事。内容要求积极向上，照片与同事都以我的学生...',
				startDate:'2019-06-11',
				endDate:'',
				address:'深圳',
				type:'线上活动',
				price:'￥299/人',
				status:'进行中',
				person:'29/100人'
			},{
				imageUrl:'https://pic.paitume.com/1-1561710814412.png',
				title:'2019校园摄影大赛正式征稿',
				content:'大赛分摄像组于摄影两个小组，同事都以我的趣味大学生活为题。内容要求积极向上，照片与视频要具代表意义，看照片与视频要让人看出里面蕴藏的故事。内容要求积极向上，照片与同事都以我的学生...',
				startDate:'2019-06-11',
				endDate:'2019-06-30',
				address:'',
				type:'线上活动',
				price:'￥299/人',
				status:'已结束',
				person:'29/100人'
			}
			]
		}),

		mounted() {
			this.getJoinActivity()
		},

		methods: {
			getJoinActivity(){
				this.getRequest(frontActivity.getActivity).then(res=>{
					console.log(res,'获取参与的活动')
					this.list=res.rows

				}).catch(err=>{})
			},
			search() {

			},
			handleSelect() {

			},
			//跳转到活动详情页面
			toActivityDetail(item){
				console.log('toActivityDetail-----',item);
				let Qdata = {
			        state: 1,
			        data: encodeURIComponent(JSON.stringify(item))
			      };
			      let path = "/personal/myActivity/activityDetail";
			      this.util.openPage(this,path, Qdata);
			},
		},
		filters:{
			getPic(val){
				let sub1=val.slice(val.indexOf('src'))
				let sub2=sub1.slice(sub1.indexOf('\"')+1)
				let sub3=sub2.slice(0,sub2.indexOf('\"'))
				return sub3
			}
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	@import "../common/index.scss";
	.body {
		.top_search {
			display: flex;
			justify-content: space-between;
			.btn {
				width: 84px;
				height: 36px;
				border: 1px solid #ccc;
				border-radius: 5px;
				text-align: center;
				padding: 0px;
			}
		}
		.activity{
			background: #fff;
			padding: 20px 20px 69px;
			box-sizing: border-box;
			ul{
				li{
					height: 216px;
					border:1px solid #eee;
					border-radius:2px;
					display:flex;
					margin-bottom:20px;
					.image{
						width:384px;
						img{
							width:384px;
							height:100%;
						}
					}					
					.detail{
						flex: 1;
						padding: 16px 23px 20px 33px;
						box-sizing: border-box;
						// line-height:20px;
						font-size:14px;
						.title-person{
							font-size:18px;
							// margin-bottom:15px;
							display: flex;
							margin-bottom: 15px;
							.title{
								font-size: 18px;
								font-weight: bold;
								color: #333;
								margin-right: auto;
							}
							.person{
								font-size: 12px;
								color: #666;
								align-self: flex-end;
							}
						}
						.content{
							margin-bottom:15px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.charge,.time,.address,.style-wrap{
							font-size: 12px;
							color: #666;
							margin-bottom: 8px;
						}
						.style-wrap{
							font-size: 12px;
							margin-bottom: 0;
							display: flex;
							.style{
								margin-right: auto;
							}
							.statu{
								font-size: 14px;
								color: #EA001F;
							}
						}
						// .foot{
						// 	display: flex;
						// 	justify-content: space-between;
						// 	color:#666;
						// 	span{
						// 		// margin-right:25px;
						// 		&.red{
						// 			color:#F93333;
						// 		}
						// 	}
						// }
					}
					
				}
			}
		}
	}
</style>