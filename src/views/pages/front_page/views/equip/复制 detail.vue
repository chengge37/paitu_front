<template>
	<div class="main_content">
		<div class="head">
			<div class="bread">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item to="/equip/index">器材</el-breadcrumb-item>
					<el-breadcrumb-item>{{equipStatic.name}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<front-searchbox type="1" @search="search" :searchTxt="searchTxt"></front-searchbox>
		</div>
		<div class="body">
			<!--产品信息模块-->
			<div class="productDetail" v-if="equipInfo">
				<!--图片预览模块-->
				<imglist-view :imgList="equipInfo.pic" v-if="equipInfo" type="1"></imglist-view>
				<!--产品模块-->
				<div class="info">
					<p class="title">{{equipInfo.custom_desc||equipStatic.name}}</p>
					<div class="more">
						<div>
							<span class="first">类型选择：</span>
							<el-button :disabled="index==1 && equipInfo.hour_price.length==0" class="optionBtn" @click="selectOption(index)" v-for="(item,index) in options" :key="index" :class="{'active':optionIndex==index}">{{item}}</el-button>
							<!--<p class="tip">租一天价格较为优惠</p>-->
						</div>
						<div v-if="optionIndex==0">
							<select-time :dateStart="dateStart" :dateEnd="dateEnd"></select-time>
						</div>
						<div v-else>
							<span class="first">开始时间：</span>
							<el-date-picker value-format="yyyy-MM-dd" v-model="curDay" :picker-options="pickerOptionsStart" type="date" placeholder="选择日期"></el-date-picker>
							<el-time-select placeholder="开始时间" v-model="startTime" :picker-options="{start: '00:00',step: '00:30',end: '23:30'}"></el-time-select>
							<span class="first">结束时间：</span>
							<el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{minTime: startTime,start: '00:00',step: '00:30',end: '23:30'}"></el-time-select>
							<span v-show="hours" class='hours'>时长{{hours}}小时(不足1小时按1小时计算)</span>
						</div>
						<div>
							<span class="first">更多器材：</span>
							<el-button icon="el-icon-plus" class="selectBtn" @click="addequip" style="width:95px;">添加器材</el-button>
							<ul class="selected" style="flex:1;">
								<li v-for="(item,index) in numList" :key="index">
									{{item.name}}(x{{item.num}})
									<i @click="delNum(item)">x</i>
								</li>
							</ul>
						</div>
						<div>
							<span class="first">数量：</span>
							<el-input-number v-model="equipNum" controls-position="right" @change="handleCount" :min="1" :max="parseInt(equipInfo.count)"></el-input-number>
							<span class="stock">库存{{equipInfo.count}}件</span>
						</div>
						<div>
							<span class="first">拿取方式：</span>
							<el-button class="optionBtn" @click="selectMode(index)" :disabled="equipInfo.door_to_door!='1'" v-for="(item,index) in modeList" :key="index" :class="{'active':modeIndex==index}">{{item}}</el-button>
							<p class="tip">送货上门费用商议</p>
						</div>
						
						<div>
							<div class="price" v-if="!totalPrice">
								<span class="first">设备租金：</span>
								<p class="money" v-if="optionIndex==0">
									<span class="num">{{equipInfo.price_day_workday_out}}元</span>
									<span>/天</span>
								</p>
								<p class="money" v-if="optionIndex==1">
									<span class="num">{{equipInfo.hour_price[0].price}}元</span>
									<span>/小时</span>
								</p>
							</div>
							<div class="price" v-else>
								<span class="first">总价：</span>
								<p class="money">
									<span class="num">{{totalPrice}}元</span>
								</p>
							</div>
	
							<!--优惠券领取模块-->
							<coupon v-if="equipInfo" :uid="equipInfo.uid"></coupon>
						</div>
						
						<div class="priceDetail" v-if="priceArr.equipPriceArr.length>0">
							<table>
								<tr>
									<td>时间</td>
									<td>类型</td>
									<td v-for="(item,index) in priceArr.equipPriceArr" :key="index">
										{{item.name}}
										<span v-if="item.number>1">(x{{item.number}})</span>
									</td>
								</tr>
								<tr v-for="(item,index) in priceArr.equipPriceArr[0].detail" :key="index">
									<td>{{item.time}}</td>
									<td>
										<span v-if="item.Daytype==3">工作日</span>
										<span v-if="item.Daytype==2">非工作日</span>
										<span v-if="item.Daytype==1">节假日</span>
									</td>
									<td v-for="(subItem,index2) in priceArr.equipPriceArr" :key="index2">
										<!--{{subItem.detail[index].price}}-->
										{{subItem.detail[index].price}}元
									</td>
								</tr>
							</table>
						</div>

						<div class="operate">
							<div class="leftBtn">
								<el-button class="cur color-area" @click="submitOrder">立即租借</el-button>
								<el-button class="iconBtn collectBtn" :class="{'collect':isCollect}" @click="collect(1)">
									<!--<i class="el-icon-star-off"></i>-->
									<ali-svg-icon icon-class="like" class="likeIcon" v-if="!isCollect"></ali-svg-icon>
									<ali-svg-icon icon-class="liked" class="likedIcon" v-if="isCollect"></ali-svg-icon>
									<span>收藏</span>
								</el-button>
							</div>
							<el-button @click="toChat(equipInfo)">
								<ali-svg-icon icon-class="customer_service" class="contactIcon"></ali-svg-icon>
								联系商家
							</el-button>
						</div>
					</div>
					<div class="store" v-if="storeInfo">
						<div class="storeInfo">
							<div class="autoImg" style="width:64px;height:64px;">
								<img class="cursor" :src="storeInfo.avatar?$qiniuHost+storeInfo.avatar:config.defaultStorePic" @click="toShopPage"/>
							</div>
							<div>
								<p>
									<span>店名:</span>
									<span class="storeName cursor word-hover" @click="toShopPage">{{storeInfo.nick}}</span>
								</p>
								<p>
									<span>地址:</span> 
									{{storeInfo.address}}
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
			</div>

			<!--底部模块-->
			<div class="footContent">
				<!--产品参数、评论等模块-->
				<div class="moreDetail" v-if='equipInfo'>
					<div class="tabBar">
						<el-tabs v-model="tabIndex" type="card" @tab-click="handleClick">
							
							<!--基本信息模块-->
							<el-tab-pane label="基本信息" name="0">
								<div class="first">
									<p>配套设施</p>
									<div class="calc">
										<div>
											<i class="el-icon-c-scale-to-original"></i>
											<span>价格计算器</span>
										</div>
										
										<div class="calcContent" v-if="equipInfo">
											<p class="title">按小时价格</p>
											<ul>
												<li>
													<div class="top">
														工作日
														<span>(周1-周5)</span>
													</div>
													<div class="count">
														<div class="prev">
															<p>{{equipInfo.normalWorkStartTime}}-{{equipInfo.normalWorkEndTime}}</p>
															<p class="price">
																<span>￥</span>
																<span class="money" v-if="equipOutPrice.length>0">{{equipOutPrice[0].price}}元</span>
																<span>/小时</span>
															</p>
														</div>
														<div class="next">
															<p>{{equipInfo.normalOpenStartTime}}-{{equipInfo.normalOpenEndTime}}</p>
															<p class="price">
																<span>￥</span>
																<span class="money" v-if="equipOutPrice.length>0">{{equipOutPrice[1].price}}元</span>
																<span>/小时</span>
															</p>
														</div>
													</div>
												</li>
												<li>
													<div class="top">
														周末
														<span>(周6-周日)</span>
													</div>
													<div class="count">
														<div class="prev">
															<p>早上9:00-下午17:50</p>
															<p class="price">
																<span>￥</span>
																<span class="money">15元</span>
																<span>/小时</span>
															</p>
														</div>
														<div class="next">
															<p>下午17:31-晚上11:50</p>
															<p class="price">
																<span>￥</span>
																<span class="money">15元</span>
																<span>/小时</span>
															</p>
														</div>
													</div>
												</li>
												<li>
													<div class="top">
														节假日
														<span>(周1-周5)</span>
													</div>
													<div class="count">
														<div class="prev">
															<p>{{equipInfo.holidayWorkStartTime}}-{{equipInfo.holidayWorkEndTime}}</p>
															<p class="price">
																<span>￥</span>
																<span class="money" v-if="equipOutPrice.length>0">{{equipOutPrice[3].price}}元</span>
																<span>/小时</span>
															</p>
														</div>
														<div class="next">
															<p>{{equipInfo.holidayOpenStartTime}}-{{equipInfo.holidayOpenEndTime}}</p>
															<p class="price">
																<span>￥</span>
																<span class="money" v-if="equipOutPrice.length>0">{{equipOutPrice[4].price}}元</span>
																<span>/小时</span>
															</p>
														</div>
													</div>
												</li>
											</ul>
											<div class="dayInfo">
												<ul class="dayPrice">
													<li>
														<span>价格说明</span>
														<span>按天价格</span>
													</li>
													<li>
														<span>工作日</span>
														<span>{{equipInfo.price_day_workday_out}}元/天</span>
													</li>
													<li>
														<span>周末</span>
														<span>{{equipInfo.price_day_weekend_out}}元/天</span>
													</li>
													<li>
														<span>节假日</span>
														<span>{{equipInfo.price_day_holiday_out}}元/天</span>
													</li>
												</ul>
											</div>
										</div>
										
										
									</div>
								</div>
								<div class="second">
									<p>
										<span>设备类型</span>
										<span>{{equipInfo.static.category_name}}</span>
									</p>
									<p>
										<span>设备品牌</span>
										<span>{{equipInfo.static.brand_name}}</span>
									</p>
									<p>
										<span>设备型号</span>
										<span>{{equipInfo.static.name}}</span>
									</p>
								</div>

								<div class="video">
									<video width="100%" height="480" controls v-if="equipInfo.video">
										<!--<source src="movie.mp4" type="video/mp4">-->
										<source :src="$qiniuHost+equipInfo.video" type="video/mp4" />您的浏览器不支持 HTML5 video 标签。
									</video>
								</div>
								<div class="productInfo">
									<p>产品信息</p>
									<div v-html="equipInfo.intro" class="detail">
									</div>
								</div>
								<div class="location" v-if="storeInfo">
									<p class="title">地理位置</p>
									<span class="address">地址：{{storeInfo.address}}</span>
									<!--地图显示位置-->
									<my-map :lat="lat" :lng="lng" :address="address"  class="myMap"></my-map>
								</div>
								
								<div class="check">
									<p>核验单流程，交易更放心</p>
									<ul>
										<li v-for="(item,index) in checkInfos" :key="index">
											<img :src="$qiniuHost+'images/'+item.pic"/>
											<p>{{item.step}}</p>
											<span>{{item.info}}</span>
											<img v-if="index!=4" class="arrow" src="https://pic.paitume.com/135-1574066481841.png"/>
										</li>
									</ul>
								</div>
							</el-tab-pane>
							
							<!--评论模块-->
							<el-tab-pane :label="'评论('+commentList.length+')'" name="1">
								<div class="secondTab" v-if="commentList.length>0">
									<div class="top">
										<p class="rate">评分：{{equipInfo.score}}分</p>
										<div class="think">
											<div>大家觉得：</div>
											<ul>
												<li>
													<p>好用</p>
													<span>(9)</span>
												</li>
												<li>
													<p>便宜</p>
													<span>(12)</span>
												</li>
											</ul>
										</div>
									</div>

									<div class="tabMenu">
										<ul>
											<li v-for="(item,index) in tabList" :key="index" :class="{'active':tabActive==index}" @click="changeMenu(index)">{{item}}</li>
										</ul>
									</div>

									<!--评论列表模块-->
									<div class="comment">
										<ul class="list">
											<li v-for="(item,index) in commentList" :key="index">
												<div class="user">
													<div calss="avatar">
														<img :src="$qiniuHost+item.user_avatar" alt width="80" height="80" />
													</div>
													<p>{{item.user_nick}}</p>
												</div>
												<div>
													<div class="score">
														<el-rate v-model="item.score" disabled text-color="#ff9900" score-template="{value}"></el-rate>
													</div>
													<div class="content">{{item.content}}</div>
													<ul class="imgList" v-if="item.pic">
														<li v-for="(subItem,index2) in item.pic.split(',')" :key="index2">
															<img :src="$qiniuHost+subItem" alt width="158" height="158" />
														</li>
													</ul>
												</div>
											</li>
										</ul>
										
										<!--分页模块-->
										<pagination :total="commentList.length" @getPageNum="changeCommentPage" class="commentPage"></pagination>
									</div>
								</div>
								<div v-if="commentList.length==0">暂无评论</div>
							</el-tab-pane>
							
							<!--Q&A模块-->
							<!--<el-tab-pane label="Q&A" name="2">-->
							<el-tab-pane :label="'Q&A('+QAlist.length+')'" name="2">
								<div class="thirdTab" v-if="QAlist.length>0">
									<ul>
										<li v-for="(item,index) in QAlist" :key="index">
											<p class="question">
												<ali-svg-icon icon-class="question" class="QIcon"></ali-svg-icon>
												<span>{{item.content}}</span>
											</p>
											<p class="answer" v-if="item.children.length>0" v-for="(item2,index2) in item.children" :key="index2">
												<ali-svg-icon icon-class="answer" class="QIcon"></ali-svg-icon>
												<span>{{item2.content}}</span>
											</p>
											<p class="answer" v-if="item.children.length==0">
												<ali-svg-icon icon-class="answer" class="QIcon"></ali-svg-icon>
												<span>暂无回答</span>
											</p>
										</li>
									</ul>
									<!--分页模块-->
									<pagination :total="QAlist.length" @getPageNum="changeQAPage" class="QAPage"></pagination>
								</div>
								<div v-if="QAlist.length==0">暂无数据</div>
								<div class="askQA">
									<el-input placeholder="请输入你想提问的问题" v-model="askContent"></el-input>
									<el-button type="primary" @click="askQA" class="color-area">提问</el-button>
								</div>
							</el-tab-pane>
							
							<!--常见问题模块-->
							<!--<el-tab-pane label="常见问题" name="3">-->
							<el-tab-pane :label="'常见问题('+FAQlist.length+')'" name="3">
								<div class="thirdTab" v-if="FAQlist.length>0">
									<ul>
										<li v-for="(item,index) in FAQlist" :key="index">
											<p class="question">
												<ali-svg-icon icon-class="question" class="QIcon"></ali-svg-icon>
												<span>{{item.content}}</span>
											</p>
											<p class="answer">
												<ali-svg-icon icon-class="answer" class="QIcon"></ali-svg-icon>
												<span>{{item.relpy}}</span>
											</p>
										</li>
									</ul>
								</div>
								<div v-if="FAQlist.length==0">暂无数据</div>
							</el-tab-pane>
							
						</el-tabs>
					</div>
				</div>
				<!--右侧产品推荐模块-->
				<div class="selectGoods">
					<recommend-good detail="1" type="1"></recommend-good>
				</div>
			</div>
		</div>

		<!--联系客服模块-->
		<contact :cartInfo="orderCart" v-if="showContact"></contact>

		<!--添加素材对话框模块-->
		<el-dialog title="添加器材" :visible.sync="addEquip" @close="resetOption" center>
			<!--选项选择模块-->
			<div class="front_options radio-setting">
				<ul>
					<!--<li>
						<span>器材范围：</span>
						<el-radio-group v-model="is_uid">
							<el-radio :label="index" v-for="(item,index) in storeType" :key="index">{{item}}</el-radio>
						</el-radio-group>
					</li>-->
					<li>
						<span>器材类型：</span>
						<el-radio-group v-model="equipType" class="equip">
							<el-radio v-for="item in equipTypeList" :key="item.id" :label="item.id">{{item.name}}</el-radio>
						</el-radio-group>
					</li>
					<li>
						<span>单价范围：</span>
						<el-radio-group v-model="equipPrice">
							<el-radio :label="0">不限</el-radio>
							<el-radio :label="1">
								<div class="money">
									<span class="prefix">￥</span>
									<span>100</span>
									<span class="nextfix">以下</span>
								</div>
							</el-radio>
							<el-radio :label="2">
								<div class="money">
									<span>￥</span>
									<span>100</span>
									<div class="gang"></div>
									<span class="prefix">￥</span>
									<span>200</span>
								</div>
							</el-radio>
							<el-radio :label="3">
								<div class="money">
									<span class="prefix">￥</span>
									<span>201</span>
									<div class="gang"></div>
									<span class="prefix">￥</span>
									<span>300</span>
								</div>
							</el-radio>
							<el-radio :label="4">
								<div class="money">
									<span class="prefix">￥</span>
									<span>300</span>
									<span class="nextfix">以上</span>
								</div>
							</el-radio>
						</el-radio-group>
					</li>
					<li v-show="showBrand">
						<span>品牌筛选：</span>
						<el-checkbox-group v-model="brand" @change="changeBrand" v-if="brandList.length>0" class="brandOption">
							<el-checkbox :label="item.id" v-for="(item,index) in brandList" :key="index">{{item.name}}</el-checkbox>
						</el-checkbox-group>
						<span v-else>无</span>
					</li>
				</ul>
				<front-searchbox @search="search2"></front-searchbox>
				<div class="showSelect" :class="{'noSelect':numList.length==0}">
					<ul class="selected" v-if="numList.length>0">
						<li v-for="(item,index) in numList" :key="index">
							{{item.name}}(x{{item.num}})
							<i @click="delNum(item)" class="el-icon-close page-hover"></i>
						</li>
					</ul>
					<div class="noSelect" v-else>
						<p>请在下方列表中选择器材添加</p>
						<img :src="$qiniuHost+'images/noSelectEquip.png'"/>
						<span>你还没有选择器材</span>
					</div>
				</div>
			</div>
			<el-table :data="equipList" class="equipTable" :row-class-name="tableRowClassName">
				<el-table-column property="custom_desc" label="自定义标题"></el-table-column>
				<el-table-column label="商品名称">
					<template slot-scope="scope">
						<el-button type="text" @click="toEquipDetail(scope.row.id)">{{scope.row.name}}</el-button>
					</template>
				</el-table-column>
				<el-table-column property="brand_name" label="品牌"></el-table-column>
				<el-table-column property="category_name" label="器材类型"></el-table-column>
				<el-table-column label="范围">
					<template slot-scope="scope">{{scope.row.is_uid==1?'店内':'店外'}}</template>
				</el-table-column>
				<el-table-column property="count" label="库存"></el-table-column>
				<el-table-column property="time_price" label="价格">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-input-number v-model="scope.row.num" @change="changeNum(scope.row)" controls-position="right" :min="0" :max="scope.row.count"></el-input-number>
					</template>
				</el-table-column>
			</el-table>

			<!--分页模块-->
			<div class="tableFoot">
				<pagination  v-if="equipListParams.total_count>0" class="equipPage" :total="equipListParams.total_count" @getPageNum="changePage"></pagination>
				<div class="btns">
					<el-button class="confirmBtn" @click="addEquip=false">确认</el-button>
					<el-button class="cancelBtn" @click="cancelEquip">取消</el-button>
				</div>
			</div>
		</el-dialog>

		<!--底部查找模块-->
		<find @search="footSearch" type="1"></find>

		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>

		<!--提示用户是否要预约订单弹窗模块-->
		<el-dialog title="是否要预约？" :visible.sync="orderDialog"  center class="tipDialog">
			<div slot="footer" class="dialog-footer">
				<el-button @click="orderDialog = false">取 消</el-button>
				<el-button type="primary" @click="appointOrder">预约</el-button>
			</div>
		</el-dialog>

		<!--提示用户是否要预约订单弹窗模块-->
		<el-dialog title="你有未支付的订单，是否跳到支付页面？" :visible.sync="toCartDialog"  center class="tipDialog">
			<div slot="footer" class="dialog-footer">
				<el-button @click="toCartDialog = false">取 消</el-button>
				<el-button type="primary" @click="util.toCartPage(0)">确定</el-button>
			</div>
		</el-dialog>
		
		<!--新增地址-->
		<new-address :showDialog.sync="showAddAddress" @closed="closeAddAdress" @addSuccess="addSuccess"></new-address>
	</div>
</template>

<script>
	import frontSearchbox from "FrontComponents/frontSearchBox";
	import myMap from "ServeComponents/Amap/index.vue";
	import recommendGood from "FrontComponents/recommendGood";
	import pagination from"FrontComponents/pagination";
	import find from "FrontComponents/find";
	import selectTime from "FrontComponents/selectTime";
	import miniLogin from "FrontComponents/minilogin";
	import contact from "FrontComponents/contact";
	import coupon from "FrontComponents/coupon";
	import { storage } from "@util/storage.js";
	import { Schedule } from "@util/schedule.js";
	import {
		getOrderCartNum,
		userIsLogin,
		collectStore,
		collectOther,
		getUserLsObj
	} from "@util/common.js";
	import imglistView from "FrontComponents/imgListView";
	import newAddress from "FrontComponents/newAddress";
	import {
		frontEquip,
		frontStudio,
		frontOrder,
		frontComment,
		frontFollowOrCollect
	} from "@config/api.js";
	import { mapGetters } from "vuex";

	export default {
		data() {
			return {
				pickerOptionsStart: {
					disabledDate: time => {
						return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
					}
				},
				modeList: ["到店自取", "同城配送"],
				modeIndex: 0, //拿取方式下标
				equipNum: 1, //当前设备数量
				equipInfo: null, //设备详情信息
				equipStatic: {}, //设备基本信息
				priceArr: {
					equipPriceArr: []
				}, //详细价格列表
				orderCart: {}, //购物车信息
				isCollect: false, //是否已经收藏
				storeIsCollect: false, //店铺是否已经收藏
				toCartDialog: false,
				cartNum: 0, //购物车订单数量
				orderDialog: false,
				isShowDialog: false,
				serviceConditionArray: [], //配套设施列表
				storeInfo:null, //店家信息
				hours: 0, //用户选择时长
				curDay: "", //当前日期
				startTime: "", //按小时计算开始时间
				endTime: "", //按小时计算结束时间
				totalPrice: 0,
				condition: "", //影棚配备
				showCalander: false, //是否显示日历
				equipId: "", //当前设备id
				is_uid: 1, //选择是否为本店 0/不限 ，1店内，2店外
				storeType: ["不限", "店内", "店外"],
				allDate: [],
				value: "棚内",
				timeOption: "1",
				equipType: 0, //选择的器材类型
				equipTypeList: [], //器材类型列表
				equipPrice: 0,
				brand: [], //选择的品牌
				oldBrand: [], //保存之前选择品牌，
				brandList: [], //品牌列表
				showBrand: false, //是否显示品牌选项
				tabActive: "0",
				tabList: ["默认", "最新"],
				score: 3.7,
				searchTxt: "",
				time: "",
				dateStart: "",
				dateEnd: "",
				num: 123,
				numList: [], //保存用户选择设备的数量
				tabIndex: "0",
				lat: "",
				lng: "",
				addEquip: false,
				address: "",
				optionIndex: 0, //0按天，1按小时
				options: ["按天租", "按小时"],   //租赁模式
				equipList: [],
				commentList: [], //影棚评论列表
				equipListParams: {
					page: 1,
					page_size: 10,
					total_count: 0
				},
				questionIcon: this.$qiniuHost+'svg/question.svg',
				answerIcon: this.$qiniuHost+'svg/answer.svg',
				showAddAddress:false,  //是否显示新增地址弹窗
				showContact:false,   //是否显示联系客服模块
				equipOutPrice:[],
				isAppointOrder:false,  //是否已经预约订单
				FAQlist:[],  //设备关联的问题列表
				checkInfos:[{
					pic:'heyandan_01.png',
					step:'下单',
					info:'顾客付款'
				},{
					pic:'heyandan_02.png',
					step:'核验单',
					info:'商家上传核验单'
				},{
					pic:'heyandan_03.png',
					step:'验货',
					info:'核验单与订单货物一致'
				},{
					pic:'heyandan_04.png',
					step:'确认',
					info:'核验单页面点击确认'
				},{
					pic:'heyandan_05.png',
					step:'完成',
					info:'使用设备和影棚'
				}],
				QAlist:[], //Q&A列表数据
				QApage:1, //Q&A分页下标
				askContent:'', //需要提问的内容
			};
		},
		components: {
			frontSearchbox,
			myMap,
			recommendGood,
			find,
			selectTime,
			imglistView,
			miniLogin,
			pagination,
			newAddress,
			contact,
			coupon
		},
		created() {
			this.submitOrder=this.util.throttle(this.submitOrder)
			this.equipId = parseInt(this.$route.query.id);
			this.getEquipDetailById(this.equipId);

			//获取评论列表，数量
			this.getCommentById(this.equipId);
			console.log("userIsLogin()-----", userIsLogin());
			
			//获取设备关联的问题
			this.getFAQById();
			//获取关联的Q&A列表
			this.getAllQuestion();
		},
		watch: {
			startTime(to,from){
				console.log('startTime-----',this.startTime);
				let prefix=this.util.getCurDay()+' ';
				if(this.endTime){
					this.hours=this.util.calHours(prefix+this.startTime,prefix+this.endTime);
				}
			},
			endTime(to,from){
				let prefix=this.util.getCurDay()+' ';
				if(this.startTime){
					this.hours=this.util.calHours(prefix+this.startTime,prefix+this.endTime);
				}
			},

//			is_uid(to, from) {
//				this.getEquipList();
//			},
			equipType(to, from) {
				if(to != 0) {
					this.showBrand = true;
					this.getBrandByCategory(to);
				} else {
					this.showBrand = false;
				}
				this.equipListParams.page = 1;
				this.brand = [];
				this.getEquipList();
			},
		},
		mounted() {},
		computed: {
      ...mapGetters(["user_data"])
    },
		methods: {
			//获取商家店铺基本信息
			getShopInfo(uid){
				this.util.getShopInfo(uid).then(res=>{
					this.storeInfo=res;
					//如果店铺不展示，则跳出
					if(this.storeInfo.data_lock==2){
						this.util.notFound(this,'设备');
					}
					this.lat=this.storeInfo.lat;
					this.lng=this.storeInfo.lng;
					this.address=this.storeInfo.address;
				})
			},
			//提问方法
			askQA(){
				if(!userIsLogin()) {
					this.isShowDialog = true;
				} else {
					let params={
						to_uid:this.equipInfo.uid,
						content:this.askContent,
						type:2,
						relation_id:this.equipId
					}
					this.util.userAskQA(params).then(res=>{
						this.askContent='';
						this.$alert('您的问题已经提交成功，审核后即可显示！', '提问成功', {
				          confirmButtonText: '确定',
				       });
						console.log('userAskQA---------',res);
					})
				}
			},
			
			//切换Q&A列表分页
			changeQAPage(val){
				this.QApage=val;
				this.getAllQuestion();
			},
			
			//获取前台Q&A列表
			getAllQuestion(){
				let params={
					page:this.QApage,
					page_size:10,
					type:2,
					relation_id:this.equipId
				}
				this.util.getAllQuestion(params).then(res=>{
					console.log('getAllQuestion-------',res);
					this.QAlist=res.rows;
				})
			},
			
			// 点击联系商家，打开即时聊天窗口
			toChat(equip){
				if(this.user_data.id==equip.uid){
					this.$message.warning('这是你自己发布的器材')
					return
				}
				let chatToObj={
					id:equip.uid,
					name:equip.nick,
					avatar:this.$qiniuHost+equip.avatar||'https://pic.paitume.com/images/male.png'
				}
				this.$parent.$parent.$refs.chat.chatTo(chatToObj)
			},
			//获取对应关联的常见问题列表
			getFAQById(){
				this.util.getFAQById(2,this.equipId).then(res=>{
					console.log('getFAQById---------',res);
					console.log('dsfvijdijfvjidsif',res);
					this.FAQlist=res;
				})
			},
			//设置表格某一行样式
			 tableRowClassName({row, rowIndex}) {
		        if (row.id == this.equipId) {
		          return 'notAllow';
		        }
		    },
			//判断用户是否有选择时间，返回true,false
			checkTime(){
				if(
						(this.dateStart && this.dateEnd && this.optionIndex == 0) ||
						(this.curDay && this.startTime && this.endTime && this.optionIndex == 1)
					){
						return true;
					}
				return false;
			},
			//获取该影棚或者店铺是否已经收藏
			getCollect() {
				//判断用户是否已经登录
				if(userIsLogin()) {
					//获取购物车信息
					this.getOrderCart('first');

					//判断该设备是否已经被收藏
					getUserLsObj(this.equipId, "2", "1").then(res => {
						if(res) {
							this.isCollect = true;
						}
					});

					//判断该店家是否已经收藏
					getUserLsObj(this.equipInfo.uid, "0", "1").then(res => {
						if(res) {
							this.storeIsCollect = true;
						}
					});
				}else{
					//没有登录也显示联系客服模块
					this.showContact=true;
				}
			},
			//根据设备id获取评论列表
			getCommentById(id) {
				let params = {
					type: 2,
					equip_id: id
				};
				console.log("params----", params);
				this.getRequest(frontComment.getCommentList, params)
					.then(res => {
						console.log("getCommentList--equip--", res);
						//将字符串分数转换成number
						let list = res.rows;
						this.commentList = list.map((item, index) => {
							item.score = parseInt(item.score);
							return item;
						});
						console.log("commentList----", this.commentList);
					})
					.catch(err => {});
			},
			//根据分类ID获取品牌
			getBrandByCategory(id) {
				let params = {
					category_id: id
				};
				this.getRequest(frontEquip.getBrandByCategory, params)
					.then(res => {
						console.log("getBrandByCategory----", res);
						this.brandList = res;
						if(res.length > 0) {
							this.brandList.splice(0, 0, {
								id: "0",
								name: "不限"
							});
						}
					})
					.catch(err => {});
			},
			//获取所有器材类型
			getAllCategory() {
				this.getRequest(frontEquip.getAllCategory)
					.then(res => {
						console.log("getAllCategory-----", res);
						let tempList = [];
						this.equipTypeList = [{
							id: 0,
							name: "不限"
						}];
						res.forEach((item, index) => {
							tempList.push({
								id: item.id,
								name: item.name
							});
						});
						this.equipTypeList = this.equipTypeList.concat(tempList);
						console.log("this.equipTypeList-----", this.equipTypeList);
					})
					.catch(err => {});
			},
			//获取设备列表
			getEquipList() {
				let params = {
					page: this.equipListParams.page,
					page_size: this.equipListParams.page_size,
					search: this.searchTxt,
					uid:this.equipInfo.uid
				};
				if(this.modeIndex==1){
					params.door_to_door=1;
				}
				if(this.optionIndex==1){
					params.only_rent_day='0';
				}
				if(JSON.stringify(this.orderCart)!="{}"){
					params.order_id=this.orderCart.id;
				}
//				if(this.is_uid == 1) {
//					params.uid = this.equipInfo.uid;
//				} else if(this.is_uid == 2) {
//					params.uid = this.equipInfo.uid;
//					params.is_uid = 1;
//				}
				if(this.equipType != 0) {
					params.category = this.equipType;
				}
				if(this.equipPrice != 0) {
					params.equipPrice = this.equipPrice;
				}
				if(this.brand.length > 0) {
					params.brand = this.getBrandStr();
				}
				if(JSON.stringify(this.orderCart)!="{}"){
					if(this.orderCart.count!=0){
						console.warn('this.orderCart--------------------',this.orderCart);
						params.dateStart=this.orderCart.cart.start_time;
						params.dateEnd=this.orderCart.cart.end_time;
						params.equip_out=1;
					}
				}
				console.log("equiList---------------------++++++++++++params----", params);
				this.getRequest(frontEquip.getEquipList, params)
					.then(res => {
						console.log("getEquipList--------", res);
						console.log("this.numList----", this.numList);
						this.equipList = this.util.deepcopy(res.rows);
						this.equipListParams.total_count = res.total_count;
						//为列表添加选择的数量变量
						this.equipList.forEach((item, index) => {
							if(this.numList.length > 0) {
								this.$set(item, "num", 0);
								for(let i = 0; i < this.numList.length; i++) {
									if(this.numList[i].num > 0 && this.numList[i].id == item.id) {
										this.$set(item, "num", this.numList[i].num);
										continue;
									}
								}
							} else {
								this.$set(item, "num", 0);
							}
							//将count字段转换为number类型
							this.equipList[index].count = parseInt(this.equipList[index].count);
						});
						console.log("this.equipList", this.equipList);
						this.equipAddis_uid();
					})
					.catch(err => {});
			},
			//给设备列表添加是否为店内字段
			equipAddis_uid() {
				console.log("equipInfo---", this.equipInfo);
				this.equipList.forEach((item, index) => {
					if(item.uid == this.equipInfo.uid) {
						this.equipList[index].is_uid = 1;
					} else {
						this.equipList[index].is_uid = 0;
					}
				});
			},
			//根据设备id获取设备详情
			getEquipDetailById(id) {
				let params = {equip_id: id};
				this.getRequest(frontEquip.getEquipById, params).then(res => {
						console.log("getEquipById----", res);
						this.equipInfo = res;
						this.equipStatic = res.static;
						//整理设备外借价格
						this.equipInfo.hour_price.forEach((item,index)=>{
							if(item.is_out==1){
								this.equipOutPrice.push(item);
							}
						})
						console.log('equipOutPrice----------',this.equipOutPrice);
						//获取相关收藏情况
						this.getCollect();
						
						//获取店铺信息
						this.getShopInfo(res.uid);
				}).catch(err => {
					console.log(err.message);
			        if (err.message.includes("不存在"))
			        this.util.notFound(this,'设备');
				});
			},

			//根据选择的品牌，返回对应参数字符串
			getBrandStr() {
				let str = "";
				this.brand.forEach((item, index) => {
					if(item != 0) {
						str += item + ",";
					}
				});
				return str.substring(0, str.length - 1);
			},
			//根据配备id转为显示文字
			getConditionInfo(list) {
				let str = "";
				if(list.length > 0) {
					list.forEach((item, index) => {
						str += item.name + "、";
					});
				}
				return str.substring(0, str.length - 1);
			},
			changeBrand(val) {
				//全选
				console.log("val-----", val, this.brand);
				if(val.indexOf("0") >= 0 && val.length > this.oldBrand.length - 1) {
					this.brand = [];
					this.brandList.forEach((item, index) => {
						this.brand.push(item.id);
					});
				} else {
					//反选
					if(
						val.length == this.oldBrand.length - 1 &&
						this.oldBrand.indexOf("0") >= 0 &&
						val.indexOf("0") < 0
					) {
						this.brand = [];
					} else {
						//判断是添加还是删除
						if(val.length < this.oldBrand.length) {
							//删除
							console.log("删除----", val);
							if(val.length == this.brandList.length - 1) {
								this.brand.splice(0, 1);
							}
						}
					}
				}
				console.log("val----", this.brand);
				this.oldBrand = this.util.deepcopy(this.brand);
				this.equipListParams.page = 1;
				this.getEquipList();
			},
			//重置对话框选项
			resetOption() {
				this.is_uid = 0;
				this.equipType = 0;
				this.brand = [];
				this.equipPrice = 0;
				this.searchTxt = "";
			},
			//添加器材方法，计算器材价格
			changeNum(item) {
				console.log("changeNum------", item);
				console.log("this.orderCart-----", this.orderCart);
				//检测素材是否可以添加或者删除素材，如果不是店内的设备不能添加
				if(item.uid!=this.equipInfo.uid){
					this.$message.warning('不是同一个店，不能添加设备!');
					//将数量减1，
					this.$nextTick(()=>{
						this.$set(item,'num',0);
					})
					return;
				}
				let startTime, endTime, rent_type;
				if(this.optionIndex == 0) {
					startTime = this.dateStart;
					endTime = this.dateEnd;
					rent_type = 2;
				} else if(this.optionIndex == 1) {
					startTime = `${this.curDay} ${this.startTime}:00`;
					endTime = `${this.curDay} ${this.endTime}:00`;
					rent_type = 1;
				}
				let params = {
					order_id: this.orderCart.id,
					rent_type: rent_type,
					start_time: startTime,
					end_time: endTime,
					equip_id: item.id,
					count: item.num,
					price: 1
				};
				console.log("params----", params);
				let list=this.util.deepcopy(this.numList);
				this.util.editRentOrder(params).then(res=>{
					console.log("editRentOrder------", res);
					if(res){
						this.priceArr.studioPriceArr = res.price.studioPriceArr.detail;
						this.priceArr.equipPriceArr = res.price.equipPriceArr;
						this.totalPrice = res.price.order_price;
						console.log("this.priceArr----", this.priceArr);
					}
				})
				.catch(err => {
					console.error('修改设备数量有问题',err);
					//如果出现冲突之类的报错，需要减1
					//如果是当前设备
					let num=item.num-1;
					if(item.id==this.equipId){
						this.equipNum=this.equipNum-1;
					}else{
						list.forEach((obj,index)=>{
							if(item.id==obj.id){
								this.$set(this.numList[index],'num',num);
							}
						})
						
						this.equipList.forEach((obj2, indexe2) => {
							if(obj2.id==item.id){
								this.$set(obj2, "num", num);
							}
						});
						
					}
				});

				//如果是当前设备，不用添加
				if(item.id==this.equipId){
					return;
				}

				//添加数量或减少数量
				let flag=false;
				list.forEach((obj,index)=>{
					if(item.id==obj.id){
						if(item.num==0){
							//删除
							this.numList.splice(index,1);
						}else{
							this.$set(this.numList[index],'num',item.num);
						}
						flag=true;
					}
				})
				if(!flag){
					this.numList.push({
							id: item.id,
							uid: item.uid,
							num: item.num,
							name: item.name,
							priceList: [
								item.price_day_workday_in,
								item.price_day_weekend_in,
								item.price_day_holiday_in
							],
							hourPrice: item.hourPrice
					})
				}
				console.log("this.numList----", this.numList);
			},
			//清空全部器材方法
			delAllEquip() {
				this.numList = [];
			},
			//删除器材方法,如果传值flag为1，即直接删除数量，不用请求修改预约订单操作
			delNum(obj,flag) {
				//重新渲染列表
				this.equipList.forEach((item, index) => {
					if(item.id == obj.id) {
						this.$set(item, "num", 0);
					}
				});
				if(!flag){
					obj.num = 0;
					//重新请求订单
					this.changeNum(obj);
				}
				
			},
			
			//关闭登录对话框
			closeLogin() {
				this.isShowDialog = false;
			},
			//用户提交订单
			submitOrder() {
				//判断用户是否有登录
				if(!userIsLogin()) {
					this.isShowDialog = true;
				} else {
					//如果添加了预约订单，直接跳转到购物车
					if(this.priceArr.equipPriceArr.length>0){
						this.util.toCartPage(0);
						return;
					}
					if(this.checkTime()){
						console.log("this.cartNum----", this.cartNum);
						getOrderCartNum().then(res => {
							if(res == 0) {
								let params=this.getRentOrderParams();
								
								this.util.rentOrder(params).then(res=>{
										console.log("addUserOrder---------", res);
										this.$message.success("提交订单成功！");
										this.cartNum = 1;
										this.util.toCartPage(0);
									})
									.catch(err => {});
							} else {
//								this.toCartDialog = true;
								if(!this.checkCartInfo()) {
									this.toCartDialog = true;
								} else {
									//跳转到购物车页面
									this.util.toCartPage(0);
								}
							}
						});
					} else {
						this.$message.warning("请选择使用时间！");
						return;
					}
				}
			},
			//添加器材方法
			addequip() {
				//判断是否用户是否有登录
				if(!userIsLogin()) {
					this.isShowDialog = true;
					return;
				}
				//先判断是否有选择时间,如果没有选择完时间，提示用户选择时间
				if(this.checkTime()){
					//判断购物车是否有未支付的订单，如果有，提示用户有未支付的订单，
					getOrderCartNum().then(res => {
						this.cartNum = res;
						if(this.cartNum > 0) {
							console.log("this...checkCartInfo----", this.checkCartInfo());
							if(!this.checkCartInfo()) {
								this.toCartDialog = true;
							} else {
								//显示添加素材窗口
								this.showAddEquip();
							}
						} else {
							this.orderDialog = true;
						}
					});
				} else {
					this.$message.warning("请选择使用时间！");
					return;
				}
			},
			//判断购物车信息与当时信息是否一致，如果一致可以直接添加器材
			checkCartInfo() {
				console.log("this.orderCart----", this.orderCart);
				let cart = this.orderCart.cart;
				if(!cart.equip_array) return false;
				//设备id是否一致
				if(cart.equip_array[0].equip_id == this.equipId) {
					//时间类型是否一致
					if(
						(cart.rent_type == 2 && this.optionIndex == 0) ||
						(cart.rent_type == 1 && this.optionIndex == 1)
					) {
						//时间是否一致
						if(cart.rent_type == 2) {
							if(
								cart.start_time.split(" ")[0] == this.dateStart &&
								cart.end_time.split(" ")[0] == this.dateEnd
							) {
								return true;
							}
						} else {
							let minute = this.timeDifference(
								cart.end_time,
								`${this.curDay} ${this.endTime}:00`
							);
							if(
								cart.start_time == `${this.curDay} ${this.startTime}:00` &&
								minute <= 1
							) {
								return true;
							}
						}
					}
				}

				return false;
			},

			//获取预约订单参数
			getRentOrderParams(){
				let params={
					type:2,
					rent_type: this.optionIndex == 0 ? 2 : 1,
					price:1,
					obj_id: this.equipId,
					is_out: this.modeIndex + 2,
					count:this.equipNum
				}
				if(this.optionIndex == 0) {
					params.start_time=this.dateStart;
					params.end_time=this.dateEnd;
				} else {
					params.start_time=`${this.curDay} ${this.startTime}:00`;
					params.end_time=`${this.curDay} ${this.endTime}:00`;
				}
				return params;
			},

			//计算两个时间分钟差,返回相差分钟数
			timeDifference(startTime, endTime) {
				startTime = startTime.split(" ")[1];
				endTime = endTime.split(" ")[1];
				var start1 = startTime.split(":");
				var startAll = parseInt(start1[0] * 60) + parseInt(start1[1]);
				var end1 = endTime.split(":");
				var endAll = parseInt(end1[0] * 60) + parseInt(end1[1]);
				return endAll - startAll;
			},
			//取消添加的设备器材
			cancelEquip() {
				this.addEquip = false;
				this.delAllEquip();
			},
			//预约订单
			appointOrder() {
				let params=this.getRentOrderParams();
				
				console.log("params----", params);
				this.util.rentOrder(params).then(res=>{
						console.log("addUserOrder---------", res);
						this.totalPrice = res.price_array.count;
						this.priceArr.equipPriceArr.push(res.price_array);
						this.$message.success("预约订单成功！");
						this.orderDialog = false;
						this.cartNum = 1;
						//设置已经预约过订单
						this.isAppointOrder=true;
						//获取购物车信息
						this.getOrderCart();
						//显示添加素材窗口
//						this.showAddEquip();
				}).catch(err => {});
			},

			//显示添加素材页面，并加载设备列表
			showAddEquip() {
				console.error('showAddEquip-------------------------------------');
				//显示添加素材窗口
				this.addEquip = true;
				//获取所有器材分类
				this.getAllCategory();
				//获取设备列表
				this.getEquipList();
			},

			//获取购物车订单信息（未支付订单购物车信息）
			getOrderCart(type) {
				this.getRequest(frontOrder.getOrderCart)
					.then(res => {
						console.log("getOrderCart---------", res);
						this.orderCart = res;
						this.cartNum = res.count;
						this.showContact=false;
						if(!type){
							//显示添加素材窗口
							this.showAddEquip();
						}
						this.$nextTick(()=>{
							this.showContact=true;
						})
					})
					.catch(err => {});
			},

			//跳转到设备详情页面
			toEquipDetail(id) {
				this.util.toEquipDetail(id);
			},
			
			//跳转到店铺页面
			toShopPage(){
				this.util.toShopPage(this.equipInfo.uid);
			},

			//收藏(取消收藏)，关注(取消关注）方法 type: 0/为店铺 1/器材
			collect(type) {
				console.log("collect----",type);
				console.log('this.equipId',this.equipId);
				//判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
				}
				if(type == 0) {
					collectStore(this.equipInfo.uid, "1").then(res => {
						if(res == 1) {
							this.storeIsCollect = true;
						} else if(res == 2) {
							this.storeIsCollect = false;
						}
					});
				} else if(type == 1) {
					collectOther(this.equipId, "2", "1", this.equipId).then(
						res => {
							if(res == 1) {
								this.isCollect = true;
							} else {
								this.isCollect = false;
							}
						}
					);
				}
			},

			//改变数量方法
			handleCount(val) {
				console.log("handleCount---", val);
				this.equipNum = val;
				//判断是否已经预约订单
				if(this.isAppointOrder){
					let item = {
						id: this.equipId,
						num: val,
						uid:this.equipInfo.uid
					};
					this.changeNum(item);
				}
				
			},

			selectMode(val) {
				this.modeIndex = val;
				//如果选择的是送货上门,判断用户是否有登录
				if(val==1){
					if(userIsLogin()){
						//判断用户是否有添加预约订单
						if(this.priceArr.equipPriceArr.length>0){
							//判断用户是否有地址
							this.util.getAddressList().then(res=>{
								if(res.length==0){
									//需要用户添加地址
									this.showAddAddress=true;
								}else{
									this.updateOrderOut();	
								}
							})
						}
					}
				}
				
			},
			
			//修改订单外送类型
			updateOrderOut(){
				//修改订单外送类型
				this.util.updateOrderOut(this.orderCart.id,'1').then(res=>{
					console.log('modeIndex-----------------+++++++++',res);
					if(res.equip.length>0){
						console.log('需要删除不能外送的设备');
						//弹出提示那些设备不支持外送，然后弹出框需要删除，或者取消
						let message='订单中存在不支持外送的设备：'
						let equip=res.equip;
						equip.forEach((item,index)=>{
							message+=`'${item.equip_name}',`;
						})
						message+='需要删除吗？';
						//判断有没有选择设备
						this.util.confirm(this,message).then(res2=>{
							this.util.delOrderNoOut(this.orderCart.id).then(res3=>{
								console.log('删除不能外送的器材-----',res3);
								this.priceArr.studioPriceArr = res3.price.studioPriceArr.detail;
								this.priceArr.equipPriceArr = res3.price.equipPriceArr;
								this.totalPrice = res3.price.order_price;
								//清楚删除后设备的选项
								let numList=this.util.deepcopy(this.numList);
								equip.forEach((item,index)=>{
									numList.forEach((subItem,index2)=>{
										if(item.equip_id==subItem.id){
											this.delNum(subItem,1);
										}
									})
								})
							})
						}).catch(()=>{
							console.log('取消删除-------');
							this.modeIndex=0;
						})
						
					}
				})
			},
			
			//新增地址成功回调函数
			addSuccess(data) {
				console.log('car------addSuccess==========',data);
				this.showAddAddress=false;
				this.updateOrderOut();
			},
			//关闭新增地址对话框
			closeAddAdress() {
				console.log('closeAddAdress-----------');
				this.showAddAddress = false;
				//获取地址，如果没有添加地址，即返回自取选项
				this.util.getAddressList().then(res=>{
					console.log('')
					if(res.length==0){
						this.modeIndex=0;
					}
				})
			},
			//切换评论列表分页
			changeCommentPage(val){
				this.commentPage=val;
				this.getCommentList(this.equipId,val);
			},
			
			changeMenu(val) {
				this.tabActive = val;
			},
			search(val) {
				console.log("search11111-----", val);
			},
			search2(val) {
				console.log("search22222-----", val);
				this.searchTxt = val;
				this.getEquipList();
			},
			handleClick() {},
			selectOption(val) {
				this.optionIndex = val;
				console.log("this.optionIndex---", this.optionIndex);
			},
			footSearch(val) {},
			changePage(val) {
				this.equipListParams.page = val;
				this.getEquipList();
			},
			
		}
	};
</script>

<style lang="scss" scoped>
	/*@import "@front/common/common.scss";*/
	.contact {
		position: fixed;
		right: 10px;
		top: 50%;
		width: 35px;
		height: 136px;
		margin-top: -68px;
		color: #fff;
		p {
			padding: 10px;
			background: #7C6AFF;
			margin-bottom: 2px;
		}
	}
	
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25px;
	}
	
	.brandOption {
		flex: 1;
	}
	
	/deep/ {
		.el-tabs--card {
			.el-tabs__header {
				.el-tabs__nav {
					border-radius: 0px;
					border-left: none;
					border-top: none;
					.el-tabs__item {
						width: 116px;
						background: #fafafa;
						border-color: #f0f0f0;
						text-align: center;
						&.is-active {
							color: #fff;
							background: #7C6AFF;
						}
					}
				}
			}
		}
	}
	
	.footContent {
		display: flex;
		margin-bottom: 100px;
		.moreDetail {
			width: 100%;
			margin-right: 10px;
			background: #fff;
			border: 1px solid #f0f0f0;
			flex: 1;
		}
		.selectGoods {
			width: 243px;
			background: #fff;
		}
	}
	
	/deep/ {
		.iconBtn {
			padding: 4px 10px;
			&>span {
				display: flex;
				flex-direction: column;
				align-items:center;
			}
			span {
				margin-left: 0px;
				font-size: 12px;
				margin-top: 1.5px;
			}
		}
	}
	
	.body {
		.productDetail {
			button {
				background: #fff;
				border: 1px solid #f0f0f0;
				border-radius: 0px;
			}
			display: flex;
			.info {
				/*font-family: PingFangSC-Regular;*/
				/*padding-top: 22px;*/
				width: 63%;
				.curDay{
					padding:0px 8px;
				}
				.option {
					display: flex;
					margin-left: 5px;
				}
				.title {
					font-size: 18px;
					margin-bottom: 20px;
				}
				.tip {
					font-size: 12px;
					color: #666666;
					margin-left: 10px;
				}
				.more {
					background: #fafafa;
					border: 1px solid #f0f0f0;
					padding: 20px 20px 10px 20px;
					width:750px;
					&>div {
						display: flex;
						align-items: baseline;
						margin-bottom: 20px;
						.first {
							color: #999999;
							margin-right: 10px;
							width: 70px
						}
						.hours{
							font-size:12px;
							color:#999;
							width:150px;
						}
						p{
							flex:1;
						}
						.selectBtn {
							padding: 5px 8px;
						}
						.optionBtn {
							position: relative;
							overflow: hidden;
							padding: 10px 12px;
							&.active {
								border-color: #7C6AFF;
								color: #333333;
								&::before {
									content: "";
									width: 12px;
									height: 12px;
									background: #7C6AFF;
									position: absolute;
									top: -6px;
									right: -6px;
									transform: rotate(45deg);
								}
							}
						}
						.endTime {
							margin-left: 20px;
							margin-right: 10px;
						}
						.hidden {
							color: transparent;
						}
					}
					/deep/ {
						.el-date-editor {
							width: 118px;
							margin-right:10px;
							.el-input__inner {
								width: 100%;
								padding-right: 10px;
								height: 34px;
								line-height: 34px;
								text-indent: 8px;
							}
							.el-input__icon {
								line-height: 34px;
							}
						}
					}
					.price {
						padding-top: 20px;
						border-top: 1px solid #f0f0f0;
						margin-bottom: 10px;
						display:flex;
						align-items:center;
						.money {
							font-size: 0px;
							span {
								font-size: 12px;
							}
							.num {
								font-size: 24px;
								color: #d4282d;
								font-weight: 600;
							}
						}
					}
					.operate {
						margin-bottom: 0px;
						display: flex;
						justify-content: space-between;
						.leftBtn {
							display: flex;
							align-items: center;
							.cur {
								background: #7C6AFF;
								color: #fff;
							}
						}
					}
				}
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
					.storeInfo {
						display: flex;
						align-items: center;
						.storeName{
							color:#000;
						}
						.autoImg{
							margin-right:25px;
							border:1px solid #F0F0F0; 
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
			}
		}
	}
	
	.selected {
		display: flex;
		margin-left: 10px;
		li {
			position: relative;
			margin-right: 60px;
			margin-bottom: 8px;
			height:25px;
			i{
				width: 20px;
			    height: 20px;
			    line-height: 17px;
			    text-align: center;
			    border: 1px solid #D9D9D9;
			    background: #fff;
			    color: #999999;
			    position: absolute;
			    right: -29px;
			    top: -1px;
			    cursor: pointer;
			}
		}
	}
	
	.showSelect {
		display: flex;
		margin: 20px 0px;
		background: #FAFAFA;
		padding: 15px;
		&>span {
			color: #7C6AFF;
		}
		&.noSelect{
			justify-content:space-around;
		}
		.selected {
			li {
				padding: 0px;
				position: relative;
				background:#7C6AFF;
				padding:3px 5px;
				color:#fff;
				span {
					margin-right: 0px !important;
					top: -5px;
				}
			}
		}
		.noSelect{
			display:flex;
			flex-direction:column;
			align-items:center;
			img{
				width:101px;
				height:81px;
				margin-top:40px;
				margin-bottom:20px;
			}
		}
	}
	
	.priceDetail {
		border: 1px solid #f0f0f0;
		display: inline-block!important;
		text-align: center;
		max-width: 560px;
    	overflow-x: scroll;
		td {
			background:#fff;
			padding:5px 10px;
			&:last-child {
				border-right: none;
			}
		}
		tr {
			&:last-child {
				td {
					border-bottom: none;
				}
			}
		}
	}
	
	/deep/ {
		.el-dialog {
			width: 1200px;
		}
		.tipDialog {
			.el-dialog {
				width: 500px;
			}
			.el-dialog__body {
				display: none;
			}
		}
		.el-input-number {
			width: 100px;
		}
		.stock{
			margin-left:10px;
		}
		.el-breadcrumb {
			border: none;
			margin-bottom: 0px;
			padding-bottom: 0px;
			span {
				font-size: 12px !important;
				color: #999999;
			}
			.el-breadcrumb__separator {
				margin: 0px 12px;
			}
		}
	}
	
	/deep/ {
		.el-tabs__content {
			padding: 0px 40px;
			overflow:visible;
		}
	}
	
	.front_options {
		&>ul {
			margin-bottom: 20px;
		}
	}
	
	.tabBar {
		.first {
			display: flex;
			align-items: center;
			padding-bottom: 10px;
			border-bottom: 1px solid #F5F5F5;
			p {
				font-size: 18px;
				font-family: PingFangSC-Regular;
				margin-right: 10px;
			}
			.calc {
				border: 1px solid #f0f0f0;
				padding: 0px 5px;
				position: relative;
				div:first-child {
					cursor: pointer;
				}
				.calcContent {
					display: none;
					text-align: center;
					position: absolute;
					top: 20px;
					left: -123px;
					z-index: 1;
					width: 945px;
					background: #fff;
					border: 1px solid #7C6AFF;
					padding: 10px 0px 20px 0px;
					/deep/ {
						input {
							width: 64px;
							height: 34px;
							border-radius: 0px;
							padding-left: 10px;
							color: #7C6AFF;
							font-weight: 600;
							padding-right: 0px;
							margin: 0px 8px;
						}
						.el-input__icon {
							line-height: 34px;
						}
					}
					.title {
						font-size: 18px;
						padding-bottom: 7px;
						border-bottom: 1px solid #f5f5f5;
					}
					.calcOption {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 15px;
						margin-bottom: 40px;
					}
					ul {
						display: flex;
						justify-content: space-around;
						li {
							border: 1px solid #d9d9d9;
							background: rgba(29, 122, 210, 0.04);
							width: 288px;
							.top {
								font-size: 18px;
								font-weight: 600;
								padding: 8px 0px;
								border-bottom: 1px solid #d9d9d9;
								span {
									font-size: 12px;
									font-weight: 400;
									margin-left: 7px;
								}
							}
							.money {
								font-size: 18px;
								color: #d4282d;
							}
							.count {
								display: flex;
								padding: 0px 15px 0px 13px;
							}
							.prev {
								border-right: 1px solid #d9d9d9;
								margin-right: 13px;
							}
							.prev,
							.next {
								display: flex;
								flex-direction: column;
								text-align: left;
								padding: 13px 0px;
								p {
									font-size: 12px;
									&:first-child {
										padding-bottom: 10px;
										border-bottom: 1px solid #d9d9d9;
										margin-bottom: 5px;
									}
								}
							}
						}
					}
					
					
					.dayInfo{
						display:flex;
						justify-content:center;
						.dayPrice{
							display:flex;
							flex-direction:column;
							margin-top:20px;
							li{
								text-align:center;
								span{
									display:inline-block;
									width:80px;
									font-size:18px;
								}
								&:first-child{
									span{
										font-weight:600;
									}
								}
							}
						}
					}
					
				}
				&:hover {
					.calcContent {
						display: block;
					}
				}
			}
		}
		.second {
			display: flex;
			justify-content: flex-start;
			margin-top: 10px;
			padding-bottom: 40px;
			border-bottom: 1px solid #f5f5f5;
			margin-bottom: 35px;
			ul {
				display: flex;
				li {
					padding: 4px 13px;
					background: #f2fff4;
					margin-right: 20px;
				}
			}
			&>p {
				display: flex;
				flex-direction: column;
				width: 33.3%;
				span:first-child {
					font-weight: 600;
					margin-bottom: 5px;
				}
			}
		}
		.productInfo {
			margin-top: 80px;
			font-size: 0px;
			p {
				margin-bottom: 10px;
				font-size: 18px;
			}
			div {
				font-size:14px;
				width: 100%;
				/deep/ img {
					width: 100%;
				}
			}
		}
		.check{
			padding:30px 40px;
			background:#F1F7FC;
			border-radius:4px;
			&>p{
				font-size:20px;
				font-weight:600;
				margin-bottom:20px;
				text-align: center;
			}
			ul{
				display:flex;
				justify-content: space-around;
				li{
					display: flex;
				    flex-direction: column;
				    align-items: center;
				    position:relative;
				    width:140px;
					p{
						font-size:18px;
						margin:10px;
					}
					img{
						width:100px;
						height:100px;
					}
					.arrow{
						position:absolute;
						right:-30px;
						top:45px;
						width:40px;
						height:15px;
					}
				}
			}
		}
		.location {
			margin-top: 80px;
			p {
				font-size: 18px;
				padding-bottom: 10px;
				border-bottom: 1px solid #f5f5f5;
				margin-bottom: 10px;
			}
			.myMap {
				margin-top: 10px;
				margin-bottom: 50px;
			}
		}
	}
	
	.secondTab {
		.tabMenu {
			margin-top: 30px;
			ul {
				display: flex;
				li {
					margin-right: 30px;
					font-size: 18px;
					color: #666666;
					cursor: pointer;
					&.active {
						color: #7C6AFF;
					}
				}
			}
		}
		.top {
			display: flex;
			align-items: center;
			padding-bottom: 30px;
			border-bottom: 1px solid #f0f0f0;
			.rate {
				font-size: 18px;
				padding: 26px 30px 30px 0px;
				border-right: 1px solid #f0f0f0;
				margin-right: 35px;
			}
			.think {
				width: 80%;
				&>div {
					font-size: 12px;
					margin-bottom: 10px;
				}
				ul {
					display: flex;
					li {
						display: flex;
						align-items: center;
						padding: 4px 10px;
						background: #ff641f;
						margin-right: 10px;
						color: #fff;
						p {
							margin-right: 8px;
						}
					}
				}
			}
		}
		.comment {
			margin-top: 30px;
			.list {
				&>li {
					display: flex;
					margin-bottom: 70px;
				}
			}
			.user {
				margin-right: 30px;
			}
			.content {
				margin: 10px 0px 30px 0px;
			}
			.user {
				text-align: center;
				.avatar {
					width: 79px;
					height: 79px;
					img {
						width: 100%;
					}
				}
				p {
					font-size: 12px;
					margin-top: 10px;
				}
			}
			.imgList {
				display: flex;
				li {
					width: 158px;
					height: 158px;
					margin-right: 20px;
					img {
						width: 100%;
					}
				}
			}
		}
	}
	
	.thirdTab,
	.fourTab {
		margin-top: 30px;
		ul {
			li {
				margin-bottom: 60px;
				p {
					font-size: 18px;
					margin-bottom: 22px;
					display: flex;
				}
				.svg-icon{
					display:block;
					width:20px;
					height:20px;
					margin-right:10px;
				}
				.AIcon{
					width:27px;
				}
				.answer {
					span {
						font-size: 14px;
					}
				}
			}
		}
	}
	
	.equipTable {
		border: none;
		/*margin-top: 90px;*/
		margin-bottom: 65px;
	}
	
	.tableFoot {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	/deep/ {
		.el-date-editor {
			.el-input__prefix {
				display: block;
			}
		}
	}
	
	ul {
		list-style: none;
	}
	
	.confirmBtn {
		background-color: #7C6AFF;
		border-radius: 0px;
		color: #fff;
	}
	
	.cancelBtn {
		background-color: transparent;
		border-radius: 0px;
		border: 1px solid #d9d9d9;
	}
	.commentPage{
		display:flex;
		justify-content:center;
		margin-bottom:20px;
	}
	/deep/{
		.notAllow{
			background-color:#eee;
			cursor:not-allowed;
			td:last-child{
				.cell{
					display:none;
				}
			}
		}
		
	}
	.askQA{
		display:flex;
		align-items:center;
		margin:30px 0px;
		/deep/ {
			.el-input{
				width:auto;
			}
			.el-input__inner{
				width:250px;
				border-radius:0px;
			}
		}
		button{
			background:$Theme-color;
			border-radius:0px;
		}
	}
</style>
