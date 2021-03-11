<template>
	<div class="container">
		<div class="header" id="freeDownload" v-if="false">
			<div class="content">
				<div class="url">PAITUME.COM</div>
				<div class="title">派图影像管理软件</div>
				<div class="text">影棚租赁行业创导者</div>
				<div class="download" id="download">
					<div class="apple-download">
						<div class="apple-btn">
							<div class="btn-font" @click="download">立即下载</div>
						</div>
					</div>
				</div>
			</div>
			<img src="https://pic.paitume.com/images/product_center3.png" alt="">
		</div>

		<div class="nav" :class="{'fixed':fixed}">
			<div>
				<div class="nav-item" v-for="(item,index) in navList" :key="index" @click="goAnchor('#'+item.point)">
						<span class="active">{{item.title.substring(0,2)}}</span>{{item.title.substring(2)}}
				</div>
			</div>
			<div class="download animated" :class="{fadeInRight:showBtn}" v-if="showBtn">
					<div class="apple-btn">
						<div class="btn-font" @click="download">立即下载</div>
					</div>
			</div>
		</div>

		<div class="sec-title" v-if="false">
			<p>专注解决摄影公司、行业人员的经营管理和销售难题，突破收入瓶颈</p>
			<p>适用于各种规模摄影公司和个人</p>
		</div>

		<div class="top-part" id="top">
			<div class="part-one">
				<div class="part-center">
					<div class="content">
						<div class="title">派图影像管理软件</div>
						<div class="intro">
							<p>为影像从业者提供一站式解决方案的互联网服务平台</p>
							<p>帮您高效、科学地管理影棚和设备，有效控制运维成本。</p>
						</div>
						<div class="btn">
							<ali-svg-icon icon-class="CombinedShape" class-name="CombinedShape"></ali-svg-icon>
							<span @click="download">免费使用</span>
						</div>
					</div>
					<div class="content-img">
						<img :src="$qiniuHost+partOneUrl2" alt="">
					</div>
				</div>
				<img :src="$qiniuHost+partOneUrl1" alt="" class="part-one-line">
			</div>
			<div class="part-two">
				<div class="part-center">
					<div class="content-img">
						<img :src="$qiniuHost+partTwoUrl1" alt="">
					</div>
					<div class="content">
						<p>适合人群</p>
						<p>·影棚公司管理者</p>
						<p>·影棚公司运营者</p>
						<p>·影棚公司财务</p>
						<p>·摄影师</p>
					</div>
				</div>
			</div>
		</div>

		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in slideArr" :key="index">
					<div class="intro">
						<p>{{item.firstLine}}</p>
						<p>{{item.secondLine}}</p>
					</div>
					<div class="person">
						<img class="avatar" :src="$qiniuHost+item.avatar" alt="">
						<span class="name">{{item.name}}</span>
					</div>
					<div class="card">
						<div class="card-left">
							<p class="main-title">{{item.mainTitle}}</p>
							<p class="sub-title">{{item.subTitle}}</p>
							<div class="btn">
								<ali-svg-icon icon-class="CombinedShape" class-name="CombinedShape"></ali-svg-icon>
								<span class="swiper-download">立即下载</span>
							</div>
						</div>
						<img class="card-right" :src="$qiniuHost+item.decImg" alt="">
					</div>
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>

		<div class="section-title">
			<p>量身定制功能</p>
			<p>操作简单便捷</p>
		</div>

		<div class="section" id="productInfo">
			
			<div class="pro-item pro-item1">
				<div class="item-wrap">
					<div class="item-img item1"></div>
					<!-- <img class="item-img" src="./1.png"> -->
					<div class="item-intro">
						<p class="intro-title">日程管理</p>
						<p class="intro-content">工作订单清晰记录，防止产生漏单风险</p>
						<p class="intro-content">每日待办事项提示，及时避免重复排期</p>
					</div>
				</div>
			</div>
			<div class="pro-item reverse pro-item2">
				<div class="item-wrap">
					<div class="item-img item2"></div>
					<div class="item-intro">
						<p class="intro-title">订单管理</p>
						<p class="intro-content">线上订单自动显示，同步日程便于管理</p>
						<p class="intro-content">支持添加线下订单，整合商家门店业务</p>
					</div>
				</div>
			</div>
			<div class="pro-item pro-item3">
				<div class="item-wrap">
					<div class="item-img item3"></div>
					<div class="item-intro">
						<p class="intro-title">指派任务</p>
						<p class="intro-content">员工信息整理录入，员工账号权限分配</p>
						<p class="intro-content">点选员工安排工作，添加账号协助管理</p>
					</div>
				</div>
			</div>
			<div class="pro-item reverse pro-item4">
				<div class="item-wrap">
					<div class="item-img item4"></div>
					<div class="item-intro">
						<p class="intro-title">客户管理</p>
						<p class="intro-content">建立不同客户分组，便于划分营销方向</p>
						<p class="intro-content">系统模块共享信息，活动推广一键添加</p>
					</div>
				</div>
			</div>
			<div class="pro-item col">
				<div class="item-wrap">
					<img class="item-img" src="https://pic.paitume.com/images/pro_item_store.png">
					<div class="item-intro">
						<p class="intro-title">动态库存</p>
						<p class="intro-content">提前添加设备库存，客户下单自动减少</p>
						<p class="intro-content">录入存放仓位信息，提高定位设备速度</p>
					</div>
					<div class="overflow-img">
						<img src="https://pic.paitume.com/images/pro_item_store_hover.png" alt="">
					</div>
				</div>
			</div>
			<div class="pro-item pro-item6">
				<div class="item-wrap">
					<div class="item-img item6"></div>
					<div class="item-intro">
						<p class="intro-title">多账号协同</p>
						<p class="intro-content">多个账号协同工作，不同职能不同权限。</p>
						<p class="intro-content">管理人员分配任务，制定流程提高效率。</p>
					</div>
				</div>
			</div>
			<div class="pro-item reverse pro-item7">
				<div class="item-wrap">
					<div class="item-img item7"></div>
					<div class="item-intro">
						<p class="intro-title">数据安全</p>
						<p class="intro-content">客户信息本地保存，防止交互降低风险。</p>
						<p class="intro-content">管理账号独立操作，安全维护更进一步。</p>
					</div>
				</div>
			</div>
			<div class="pro-item pro-item8">
				<div class="item-wrap">
					<div class="item-img item8"></div>
					<div class="item-intro">
						<p class="intro-title">数据分析</p>
						<p class="intro-content">交易数据后台展示，方便商家查询核对。</p>
						<p class="intro-content">财务管理报表明细，收入支出一目了然。</p>
					</div>
				</div>
			</div>
			<div class="pro-item reverse pro-item9">
				<div class="item-wrap">
					<div class="item-img item9"></div>
					<div class="item-intro">
						<p class="intro-title">独立小程序</p>
						<p class="intro-content">独立的小程序店铺，打通微信推广渠道。</p>
						<p class="intro-content">扩展核心用户范围，提高订单量成交率。</p>
					</div>
				</div>
			</div>
			<div class="pro-item pro-item10">
				<div class="item-wrap">
					<div class="item-img item10"></div>
					<div class="item-intro">
						<p class="intro-title">强大的推广系统</p>
						<p class="intro-content">优惠券助拉新增粉，提高粘性促成订单。</p>
						<p class="intro-content">短信形式促活唤回，活动宣传增加曝光。</p>
					</div>
				</div>
			</div>
			<div class="pro-item pro-item11 reverse">
				<div class="item-wrap">
					<div class="item-img item11"></div>
					<div class="item-intro">
						<p class="intro-title">器材扫码出入库管理</p>
						<p class="intro-content">独立SN码或二维码，扫码一键完成出入库</p>
						<p class="intro-content">大大提高工作效率， 避免工人操作失误。</p>
					</div>
				</div>
			</div>
			<div class="pro-item col2">
				<div class="item-wrap">
					<img class="item-img bg-img" src="https://pic.paitume.com/images/pro_flow_bg.png">
					<!-- <img class="item-img center-img" src="https://pic.paitume.com/images/pro_flow_center.png"> -->
					<img class="item-img center-img" :src="$qiniuHost+flowCenter">
					<div class="item-intro">
						<p class="intro-title">多流量入口</p>
						<p class="intro-content">提前添加设备库存，客户下单自动减少</p>
						<p class="intro-content">录入存放仓位信息，提高定位设备速度</p>
					</div>
				</div>
			</div>
			<div class="count-price" id='freeMode'>
				<div class="count-head">
					<p>灵活计价</p>
					<p>灵活计费方式满足您的个性需求</p>
				</div>
				<div class="count-middle">
					<div class="middle-item">
						<img src="https://pic.paitume.com/images/middle_item1.png" alt="">
						<p>包年包月</p>
					</div>
					<div class="middle-item">
						<img src="https://pic.paitume.com/images/middle_item2.png" alt="">
						<p>按量付费</p>
					</div>
					<div class="middle-item">
						<img src="https://pic.paitume.com/images/middle_item3.png" alt="">
						<p>产品组合定制</p>
					</div>
					<div class="middle-item">
						<img src="https://pic.paitume.com/images/middle_item4.png" alt="">
						<p>计价阶梯，越多越省</p>
					</div>
				</div>
				<div class="count-bottom">
					<img src="https://pic.paitume.com/images/count_bottom.png" alt="">
				</div>
			</div>
		</div>
		<!-- 免费使用，选择适合你的版本 -->
		<div id='buyProduct' class="version-wrap" :class="{'version-bg1':versionIndex==1,'version-bg2':versionIndex==2,'version-bg3':versionIndex==3,'version-bg4':versionIndex==4}">
			<div class="title">免费使用，选择适合你的版本</div>
			<div class="version-item">
				<div class="version-card" :class="{'white-bg':item.isWhite}" v-for="(item,index) in versionArr" :key="index" @mouseenter="changeBg(index)" @mouseleave="initBg">
					<div class="card-title">
						<p class="big-title">{{item.name}}</p>
						<p class="price">
							{{item.price}}
						</p>
						<span v-if="index==1" class="hot">HOT</span>
						<!-- <ali-svg-icon v-if="index==0" icon-class="orange_hot" class-name="orange_hot"></ali-svg-icon> -->
					</div>
					<div class="function-wrap">
						<ul class="function-list">
							<li v-for="(each,j) in item.functionArr" :key="j" :class="{nosupport:!each.support}">
								<i class="el-icon-check"></i>
								<span>{{each.text}}</span>
							</li>
						</ul>
						<div class="function-btn color-area" @click="toBuyDetail(index)">{{item.btnText}}</div>
					</div>
					<div class="addition" v-if="index==2">
						<p>【旗舰版】支持一次买断，终生使用</p>
						<p @click="toBuyDetail(versionArr.length)">￥16800买断</p>
						<p>买断更划算</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 产品功能比价图 -->
		<div class="compare">
			<div class="title">产品功能比价图</div>
			<div class="compare-img">
				<img :src="$qiniuHost+functionCompare" alt="">
			</div>
		</div>
		<!-- 服务器版 -->
		<div class="server-version">
			<div class="version" v-for="(item,index) in twoVersion" :key="index" :class="{'select':item.isChecked}" @click="changeVersion(index)">
				<img :src="item.img" alt="">
				<div class="version-name">
					<div class="main-name">
						<i></i>
						<span>{{item.name}}</span>
						<i></i>
					</div>
					<p>{{item.intro}}</p>
				</div>
			</div>
			<div class="intro">
				“ 为满足部分大规模商家希望开通独立店铺平台的需要，派图租赁特提供个性化的平台及软件定制开发服务，根据商家的需求定制专属的独立后台及小程序商城。同时可以依需求定制管理软件模块及账号功能。服务器版本包含平台及管理软件全部功能，独立存储，数据更安全，使用更方便 ”
			</div>

			<el-form ref="form" :model="form" :rules="rules" label-width="100px" class="form">
				<el-form-item label="您的姓名" prop="name">
					<el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="phone">
					<el-input v-model="form.phone" placeholder="请输入您的联系方式"></el-input>
				</el-form-item>
				<el-form-item label="您的邮箱" prop="email">
					<el-input v-model="form.email" placeholder="请输入您的邮箱"></el-input>
				</el-form-item>
				<el-form-item label="您的公司" prop="company">
					<el-input v-model="form.company" placeholder="请输入您的公司"></el-input>
				</el-form-item>
				<el-form-item label="您的需求" prop="need" class="need">
					<el-input resize="none" type="textarea" v-model="form.need" placeholder="请输入您的需求"></el-input>
				</el-form-item>
				<el-form-item class="submit">
					<el-button @click="submit('form')">提 交</el-button>
				</el-form-item>
			</el-form>

			<!-- <div class="form">
				<div class="form-item">
					<span>您的姓名</span>
					<el-input placeholder="请输入您的姓名" v-model="form.name"></el-input>
				</div>
				<div class="form-item">
					<span>联系方式</span>
					<el-input type="tel" placeholder="请输入您的联系电话" v-model="form.phone"></el-input>
				</div>
				<div class="form-item">
					<span>您的邮箱</span>
					<el-input type="email" placeholder="请输入您的邮箱" v-model="form.email"></el-input>
				</div>
				<div class="form-item">
					<span>您的公司</span>
					<el-input placeholder="请输入您的公司" v-model="form.company"></el-input>
				</div>
				<div class="form-item need">
					<span>您的需求</span>
					<el-input
						resize="none"
						type="textarea"
						:rows="2"
						placeholder="请输入内容"
						v-model="form.need">
					</el-input>
				</div>
				<span class="submit" @click="submit">提交</span>
			</div> -->


		</div>
		<!-- 亮点QA -->
		<div class="bright-qa">
			<div class="center">
				<p class="main-title">产品亮点</p>
				<p class="sub-title">技术加持流量资源</p>
				<p class="detail">·  为商家提供流量、顶级的器材和技术支持避免同质化竞争</p>
				<p class="detail">·  并通过与保险公司合作，推出器材险，有效降低租赁的风险</p>
				<p class="sub-title">量身打造管理系统</p>
				<p class="detail">·  从租赁业务流程出发打造租赁平台管理系统（ERP），协助商家科学化管理影棚</p>
				<p class="detail">·内置推广工具，便于商家进行全平台自主推广</p>
				<p class="sub-title">优质名师系统课程</p>
				<p class="detail">·  与业内知名的大师合作，针对专业的技术需求，提供系统而科学的线上、线下课程</p>
				<p class="sub-title">智能在线租赁平台</p>
				<p class="detail">·  在线预订系统可以帮助商家收获来自网络和移动互联网的海量订单，</p>
				<p class="detail">同时帮助商家通过各种线上和线下的活动进行引流。</p>
				<p class="main-title">Q&A | 商家答疑</p>
				<p class="sub-title">一、派图的产品包括哪些？</p>
				<p class="detail">答：派图租赁的产品包括租赁平台和商家后台管理软件，其中商家管理软件有单机版和服务器版两个版本</p>
				<p class="sub-title">二、派图有哪些功能？</p>
				<p class="detail">答：派图平台有日程管理、订单管理、财务管理、推广中心（包括独立的小程序）、数据分析、多账号协同、客户管理、活动管理、问题管理、设备管理、影棚管理、员工管理和基本设置多个功能，为您量身定制的软件平台，帮助您高效、科学地管理影棚和设备，有效控制运维成本。</p>
				<p class="sub-title">三、客户支付押金怎样收取、租金提现方式？</p>
				<p class="detail">答：客户押金是由在双方确认租赁订单无误后当面收取，客户通过平台支付的租金暂存在商户账户中，商户可以随时提现到绑定的银行卡账户中。</p>
				<p class="sub-title">四、派图平台是如何收费的？</p>
				<p class="detail">答：商家入驻派图网站平台paitume.com是免费的，商家根据自身实际情况开通推广项目和增值服务则需要收费，具体收费可咨询客服。我们也会定期推出优惠套餐，更多活动详情请关注【派图租赁】微信公众号。</p>
				<p class="sub-title">五、派图商户管理软件是如何收费的？</p>
				<p class="detail">答：派图的商家管理软件分为两种，单机版和服务器版。单机版分为免费版、旗舰版和自定义版，免费版不收取费用，旗舰版和自定义版需要收费。服务版本是根据商家实际需求定制开发，根据实际需求进行收费。</p>
			</div>
		</div>
		<!-- 商家扶持计划 -->
		<div class="support">
			<p class="main-title">入驻商铺推广扶持计划</p>
			<p class="sub-title">摄影行业资源共享，品牌共同成长</p>
			<div class="more-btn" @click="toSupport">
				<span>了解更多</span>
				<i class="el-icon-right"></i>
			</div>
		</div>

		<!-- 新的产品购买 -->
		<div class="buy-product" id='buyProduct' v-if="false">
			<div class="buy-title">
				<span>购买产品</span>
				<span>灵活计费方式满足您的个性需求</span>
			</div>
			<div class="buy-version">
				<div class="version" v-for="(item,index) in twoVersion" :key="index" :class="{'select':item.isChecked}" @click="changeVersion(index)">
					<img :src="item.img" alt="">
					<div class="version-name">
						<div class="main-name">
							<i></i>
							<span>{{item.name}}</span>
							<i></i>
						</div>
						<p>{{item.intro}}</p>
					</div>
				</div>
			</div>
			<div class="version-item" v-if="showSingle">
				<div class="version-card" v-for="(item,index) in versionArr" :key="index">
					<div class="card-title">
						<p class="big-title">{{item.name}}</p>
						<p class="price">
							{{item.price}}
						</p>
						<ali-svg-icon v-if="index==0" icon-class="orange_hot" class-name="orange_hot"></ali-svg-icon>
					</div>
					<div class="function-wrap">
						<ul class="function-list">
							<li v-for="(each,j) in item.functionArr" :key="j" :class="{nosupport:!each.support}">
								<i class="el-icon-check"></i>
								<span>{{each.text}}</span>
							</li>
						</ul>
						<div class="function-btn color-area" @click="toBuyDetail(index)">{{item.btnText}}</div>
					</div>
				</div>

			</div>
			<!--服务器版购买模块-->
			<div class='but serve' v-else>
				<div class="content">
					<div class="top">
						<p>云端部署</p>
						<span>一次付费永久拥有</span>
					</div>
					<el-button @click="util.contact()" class="costom color-area">
						<ali-svg-icon icon-class="customer_service_black" class="contactIcon"></ali-svg-icon>
						我要定制
					</el-button>
				</div>
				<div class="img">
					<img :src="$qiniuHost+'images/product_foot.png'"/>
				</div>					
			</div>

		</div>
		
		<!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowLogin" @closed="closeLogin"></mini-login>
		
		<!--联系客服，回到顶部模块-->
		<!--<contact></contact>-->
	</div>
</template>

<script>
	import Swiper from "swiper";
	import contact from "FrontComponents/contact";
	import miniLogin from "FrontComponents/minilogin";
	import { mapGetters } from "vuex";
	import {feedback} from "@config/api.js"
	export default {
		name: "publicity",
		data() {
			return {
				form:{
					name:'',
					phone:'',
					email:'',
					company:'',
					need:''
				},
				rules: {
          name: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' },
          ],
          phone: [
						{ required: true, message: '请输入您的电话或手机号码', trigger: 'blur' },
						{ pattern: /\d{3}-\d{8}|\d{4}-\d{7}|(?:(?:\+|00)86)?1[3-9]\d{9}$/ , message: '电话号码格式不正确',trigger: 'blur' }
          ],
          email: [
						{ required: true, message: '请输入您的邮箱地址', trigger: 'blur' },
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          company: [
            { required: true, message: '请输入您的公司', trigger: 'blur' }
          ],
          // need: [
          //   { required: true, message: '请输入您的需求', trigger: 'blur' }
          // ],
        },
				versionIndex:1,
				functionCompare:'images/function_compare2.jpg',
				flowCenter:'images/flow_center.png',
				accountNum:'', //账号数量
				showAccount:false,
				isShowLogin:false,
				openPay:false,
				payOption:{},
				fixed: false,
				value2: true,
				editionIndex: 0,
				typeIndex:0,   //选择购买产品下标
				navList: [{
						title: "返回顶部",
						point:'top'
					},
					{
						title: "产品介绍",
						point:'productInfo',
					},
					{
						title: "计费模式",
						point:'freeMode'
					},
					{
						title: "购买产品",
						point:'buyProduct'
					}
				],
				detailsList: [{
						img: "",
						title: "多账号协同",
						text: "摄影师、仓管、财务和老板协同的文案云云"
					},
					{
						img: "",
						title: "数据安全",
						text: "摄影师、仓管、财务和老板协同的文案云云"
					},
					{
						img: "",
						title: "数据分析",
						text: "摄影师、仓管、财务和老板协同的文案云云"
					},
					{
						img: "",
						title: "独立小程序",
						text: "摄影师、仓管、财务和老板协同的文案云云"
					},
					{
						img: "",
						title: "平台",
						text: "摄影师、仓管、财务和老板协同的文案云云"
					},
					{
						img: "",
						title: "独立小程序",
						text: "摄影师、仓管、财务和老板协同的文案云云"
					}
				],
				modeList: [{
						img: 'https://pic.paitume.com/images/product_cal1.png',
						title: "包年包月"
					},
					{
						img: 'https://pic.paitume.com/images/product_cal2.png',
						title: "按量付费"
					},
					{
						img: 'https://pic.paitume.com/images/product_cal3.png',
						title: "产品组合定制"
					},
					{
						img: 'https://pic.paitume.com/images/product_cal4.png',
						title: "计价阶梯，越多越省"
					}
				],
				editionType: [
					{
						edtion:"单机版",
						fun:['多账号','数据私有化','多端联动']
					},
					{
						edtion:"服务器版",
						fun:['一次付费，永久使用','数据私有化','多端联动','数据私有化']
					}
				],
				twoVersion:[
					// {
					// 	img:'https://pic.paitume.com/images/single_version.png',
					// 	name:'单机版',
					// 	intro:'派图影像管理软件',
					// 	isChecked:true
					// },
					{
						img:'https://pic.paitume.com/images/server_version.jpg',
						name:'服务器版',
						intro:'派图租赁后台管理系统',
						isChecked:true
					},
				],
				productList: [],
				img1Hover:false,
				img2Hover:false,
				img3Hover:false,
				img4Hover:false,
				img5Hover:false,
				img6Hover:false,
				img1Leave:false,
				img2Leave:false,
				img3Leave:false,
				img4Leave:false,
				img5Leave:false,
				img6Leave:false,
				showBtn:false,
				btnLeave:false,
				showSingle:true,
				versionArr:[
					{
						name:'免费版',
						price:'永久使用 · 部分功能限制',
						functionArr:[
							{
								text:'订单管理',
								support:true
							},
							{
								text:'日程管理',
								support:true
							},
							{
								text:'数据分析',
								support:true
							},
							{
								text:'管理账户',
								support:true
							},
							{
								text:'客服系统',
								support:true
							},
							{
								text:'独立后台',
								support:true
							},
							{
								text:'客户管理',
								support:true
							},
							{
								text:'优惠券',
								support:true
							},
							{
								text:'短信营销',
								support:true
							},
							{
								text:'不支持扫码出入库',
								support:false
							},
							{
								text:'不支持独立小程序',
								support:false
							},
							{
								text:'不支持数据保密',
								support:false
							},
							{
								text:'不支持多个权限账号',
								support:false
							}
						],
						btnText:'免费使用',
						isWhite:true
					},
					{
						name:'专业版',
						price:'300元/月 | 按月按年计算价格',
						functionArr:[
							{
								text:'订单管理',
								support:true
							},
							{
								text:'日程管理',
								support:true
							},
							{
								text:'数据分析',
								support:true
							},
							{
								text:'管理账户',
								support:true
							},
							{
								text:'客服系统',
								support:true
							},
							{
								text:'独立后台',
								support:true
							},
							{
								text:'客户管理',
								support:true
							},
							{
								text:'优惠券',
								support:true
							},
							{
								text:'短信营销',
								support:true
							},
							{
								text:'扫码出入库',
								support:true
							},
							{
								text:'商家独立小程序',
								support:true
							},
							{
								text:'数据保密',
								support:true
							},
							{
								text:'不支持多个账号权限',
								support:false
							},
						],
						btnText:'立即购买',
						isWhite:true
					},
					{
						name:'旗舰版',
						price:'798元/月 | 按月按年计算价格',
						functionArr:[
							{
								text:'订单管理',
								support:true
							},
							{
								text:'日程管理',
								support:true
							},
							{
								text:'数据分析',
								support:true
							},
							{
								text:'管理账户',
								support:true
							},
							{
								text:'客服系统',
								support:true
							},
							{
								text:'独立后台',
								support:true
							},
							{
								text:'客户管理',
								support:true
							},
							{
								text:'优惠券',
								support:true
							},
							{
								text:'短信营销',
								support:true
							},
							{
								text:'扫码出入库',
								support:true
							},
							{
								text:'商家独立小程序',
								support:true
							},
							{
								text:'数据保密',
								support:true
							},
							{
								text:'支持5个权限账号',
								support:true
							},
						],
						btnText:'立即购买',
						isWhite:true
					},
					{
						name:'多账号版',
						price:'9800元 / 年 | 只支持按年付费',
						functionArr:[
							{
								text:'订单管理',
								support:true
							},
							{
								text:'日程管理',
								support:true
							},
							{
								text:'数据分析',
								support:true
							},
							{
								text:'管理账户',
								support:true
							},
							{
								text:'客服系统',
								support:true
							},
							{
								text:'独立后台',
								support:true
							},
							{
								text:'客户管理',
								support:true
							},
							{
								text:'优惠券',
								support:true
							},
							{
								text:'短信营销',
								support:true
							},
							{
								text:'扫码出入库',
								support:true
							},
							{
								text:'商家独立小程序',
								support:true
							},
							{
								text:'数据保密',
								support:true
							},
							{
								text:'支持自定义权限账号（5个以上）',
								support:true
							},
						],
						btnText:'立即购买',
						isWhite:true
					}
				],
				userProduct:null,  //用已经购买的产品信息
				partOneUrl1:'images/top_part_purpleline.png',
				partOneUrl2:'images/top_part_camera.png',
				partTwoUrl1:'images/top_part_parttwo.png',
				slideArr:[
					{
						firstLine:'“ 从租赁业务流程出发打造租赁平台管理系统（ERP）',
						secondLine:'帮助公司管理者科学化管理影棚和摄影器材 ”',
						avatar:'images/swipper_avatar1.png',
						name:'管理者 · 张舒尹',
						mainTitle:'影棚管理·器材管理',
						subTitle:'·管理工作，从未如此简单',
						decImg:'images/swipper_dec1.png'
					},
					{
						firstLine:'“ 摄影从业者、爱好者，通过系统管理工作日程',
						secondLine:'避免日程出错 ”',
						avatar:'images/swipper_avatar2.png',
						name:'摄影师·丁华妍',
						mainTitle:'日程管理·指派任务',
						subTitle:'·摄影师事务繁杂，现在不怕漏办咯',
						decImg:'images/swipper_dec2.png'
					},
					{
						firstLine:'“ 运营人员可根据自身情况，利用系统的推广中心策划推广活动',
						secondLine:'独立的小程序，增加店铺线上流量 ”',
						avatar:'images/swipper_avatar3.png',
						name:'运营者·郜宁露',
						mainTitle:'数据可视化·数据分析',
						subTitle:'·数据可视化一目了然，运营策略拨云见雾',
						decImg:'images/swipper_dec3.png'
					},
					{
						firstLine:'“ 量身定制的财务管理功能',
						secondLine:'一键导出财务列表，准确清晰 ”',
						avatar:'images/swipper_avatar4.png',
						name:'财务部·蔡达明',
						mainTitle:'无纸化办公',
						subTitle:'·支出收入无纸化记账',
						decImg:'images/swipper_dec4.png'
					}
				],
			};
		},
		
		components: {
			miniLogin,
			contact
		},
		watch:{
			
		},
		created() {
			//判断用户是否登录,//获取用户已经购买的产品
			console.log('this.util.userIsLogin()----',this.util.userIsLogin());
			if(this.util.userIsLogin()){
				this.getUserProduct().then(res=>{
					console.log('getUserProduct--------',res);
					this.userProduct=res;
				})
			}
		},
		mounted() {
			this.createSwiper(
				".swiper-container",
				".swiper-pagination"
			);
			window.addEventListener("scroll",this.handleScroll);
		},
		computed: {
		    ...mapGetters(["user_data"])
		},
		methods: {
			// 提交反馈
			submit(formName){
				this.$refs[formName].validate((valid) => {
          if (valid) {
						this.postRequest(feedback.addFeedback,{
							type:'产品购买',
							name:this.form.name,
							mobile:this.form.phone,
							email:this.form.email,
							company:this.form.email,
							content:this.form.need
						}).then(res=>{
							console.warn(res,'意见反馈')
							this.$message.success('提交成功，感谢您的反馈建议')
							this.resetForm('form')
						}).catch(err=>{
							console.error(err)
						})
          } else {
						this.$message.error('您输入的信息有误，请完善后再提交')
            return false;
          }
        });
			},
			// 清空form表单
			resetForm(formName) {
        this.$refs[formName].resetFields();
      },
			// 跳转到商家扶持
			toSupport(){
				this.$router.push('/support/index')
			},
			// 鼠标离开version初始化背景图片为第一张
			initBg(){
				this.versionIndex=1
				this.versionArr.forEach(item=>{
					item.isWhite=true
				})
			},
			//版本hover的时候切换背景图片 
			changeBg(i){
				this.versionIndex=i+1
				this.versionArr.forEach(item=>{
					item.isWhite=false
				})
				this.versionArr[i].isWhite=true
			},
			//获取商家开通的功能列表
			getUserProduct(){
				return new Promise((resolve,reject)=>{
					this.util.userProduct().then(res=>{
						resolve(res);
					})
					
				})
			},
			//下载单机版
			download(){
				this.util.download();
			},
			//下载苹果单机
			downMac(){
				this.$message.info("下载苹果端！");
			},
			//下载window单机
			downWindow(){
				this.$message.info("下载window端！");
			},
			//定位锚点
			goAnchor(selector) {
			 console.log('goAnchon-----------',selector);
			  var anchor = this.$el.querySelector(selector)
			  document.body.scrollTop = anchor.offsetTop-55; // chrome
			  document.documentElement.scrollTop = anchor.offsetTop-55;
			},
			//监听滚动方法
			handleScroll(){
				var scrollTop =
					window.pageYOffset ||
					document.documentElement.scrollTop ||
					document.body.scrollTop;
				if(scrollTop >= 121) {
					this.fixed = true;
				} else {
					this.fixed = false;
				}
				let h=document.getElementById('download').clientHeight
				let b=document.getElementById('download').offsetTop
				// console.warn(scrollTop,b,h,'6666')
				if(scrollTop>=b+h){
					this.showBtn=true
					this.btnLeave=false
				}else{
					// this.btnLeave=true
					this.showBtn=false
				}
			},
			//切换购买产品类型, //单机版，服务器版
			changeEditionType(index){
				console.log('changeEditionType----',index);
				if(this.typeIndex==index) return;
				this.typeIndex=index;
			},
			changeVersion(i){
				return
				this.twoVersion.forEach(item=>{
					item.isChecked=false
				})
				this.twoVersion[i].isChecked=true
				this.showSingle=i==0
			},
			// 跳转到购买详情页面
			toBuyDetail(index){
				console.log('index----',index);
				if(index==0){
					//下载单机版
					this.download();
					return;
				}else{
					//判断用户是否登录
					if(!this.util.userIsLogin()){
						this.isShowLogin=true;
						return;
					}
					console.log('this.userProduct--------',this.userProduct);
					//判断是否已经购买过项目，是否是试用版，如果购买过，则跳转到相对应页面
					if(this.userProduct && this.userProduct.is_temp!=0){
						let id=parseInt(this.userProduct.id);
						let url='';
						if([11,12].includes(id)){
							url="/personal/product/index";
						}else{
							url="/serve/product_set/index";
						}
						let page = this.$router.resolve({path: url});
						window.open(page.href, "_blank");
					}
					let path='/publicity/productList';
					let page = this.$router.resolve({
						path: path,
						query:{type:index}
					});
					window.open(page.href, "_blank");
				}
			},
			//关闭登录框回调方法
			closeLogin(){
				this.isShowLogin=false;
			},
			//封装轮播图方法,外层容器，分页器
			createSwiper(contain, pagination) {
				let _this=this
				let mySwiper = new Swiper(contain, {
					loop: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper
					// 如果需要分页器
					pagination: {
						el: pagination,
						clickable: true,
						bulletActiveClass: "bullet-active"
					},
					autoplay: {
						delay: 3000,
						disableOnInteraction: false
					},
					on: {
						//添加点击事件,按钮点击后冒泡触发slide的点击事件
						click: function(e) {
							const realIndex = this.realIndex;
							_this.handleClickSlide(realIndex, e);
						}
					},
				});
			},
			handleClickSlide(index, eve) {
				if (eve.target.className === "swiper-download") {
					this.download()
				}
			},
			

		},
		destroyed() {
			window.removeEventListener('scroll',this.handleScroll);
		},

	};
</script>

<style lang="scss" scoped>
	/deep/.el-switch__label.is-active {
		color: #ff9500;
	}
	
	.container {
		width: 100%;

		.header {
			box-sizing: border-box;
			text-align: center;
			background: url("https://pic.paitume.com/images/product_purple.png") no-repeat;
			background-size: 100% auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			.content{
				.url {
					height: 84px;
					font-size: 60px;
					font-family: PingFangSC-Semibold, PingFangSC;
					font-weight: 600;
					color: rgba(255, 255, 255, 1);
					line-height: 84px;
					opacity: 0.03;
					margin-top: 10px;
				}
				.title {
					height: 56px;
					font-size: 40px;
					font-family: PingFangSC-Semibold, PingFangSC;
					font-weight: 600;
					color: rgba(255, 255, 255, 1);
					line-height: 56px;
					margin-top: -50px;
				}
				.text {
					height: 22px;
					font-size: 16px;
					font-family: PingFangSC-Regular, PingFangSC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 22px;
					margin-top: 4px;
				}
				.download {
					// width: 300px;
					text-align: center;
					margin: 0 auto;
					margin-top: 52px;
					display: flex;
					justify-content: center;
					align-items: center;
					.apple-download,
					.windows-download {
						width: 145px;
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: center;
						.client {
							font-weight: 400;
							color: #fff;
							margin-top: 5px;
						}
						.apple-btn,
						.windows-btn {
							width: 145px;
							height: 40px;
							background: #fff;
							display: flex;
							flex-direction: row;
							justify-content: space-around;
							align-items: center;
							padding: 0 33px;
							box-sizing: border-box;
							border-radius: 5px;
							cursor: pointer;
							z-index: 9;
							.btn-font {
								color: #5224cd;
								font-weight: bold;
							}
						}
					}
				}
			}
			img {
				margin-top: -50px;
				width: 75%;
				// height: 100%;
			}
		}
		.nav {
			width: 100%;
			height: 66px;
			background: #fff;
			box-sizing: border-box;
			overflow: hidden;
			-moz-box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
			-webkit-box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
			box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			// margin-bottom: 60px;
			.download {
				display: flex;
				.apple-btn,
				.windows-btn {
					width: 145px;
					height: 40px;
					background: #7842ED;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					align-items: center;
					padding: 0 33px;
					box-sizing: border-box;
					border-radius: 5px;
					cursor: pointer;
					z-index: 9;
					margin-right: 10px;
					.btn-font {
						color: #fff;
						font-weight: bold;
					}
					.apple,.win{
						color: #fff;
					}
				}
			}
			.nav-item {
				display: block;
				width: 75px;
				line-height: 57px;
				color: #243041;
				text-align: center;
				float: left;
				font-family: PingFangSC-Semibold, PingFangSC;
				font-weight: 600;
				margin-right: 89px;
				cursor: pointer;
				&:hover {
					.active {
						border-bottom: 2px solid #5224cd;
						padding-bottom: 5px;
					}
				}
			}
		}
		.fixed {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background: #fff;
			z-index: 99;
		}
		.sec-title {
			height: 257px;
			padding-top: 72px;
			box-sizing: border-box;
			text-align: center;
			color: #666;
			p:first-child{
				font-size: 32px;
				margin-bottom: 20px;
			}
			p:last-child{
				font-size: 18px;
			}
		}
		.top-part{
			height: 1080px;
			background:linear-gradient(232deg,rgba(241,248,255,1) 0%,rgba(255,255,255,1) 100%);
			.part-one{
				height: 448px;
				position: relative;
				margin-bottom: 46px;
				.part-center{
					width: 1200px;
					height: 100%;
					display: flex;
					align-items: center;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					z-index: 2;
					.content{
						width: 50%;
						display: flex;
						flex-direction: column;
						.title{
							font-size: 34px;
							font-weight: 600;
							color: #333;
							letter-spacing: 1px;
							margin-bottom: 28px;
						}
						.intro{
							font-size: 16px;
							color: #666;
							letter-spacing: 2px;
							margin-bottom: 48px;
							p:first-child{
								margin-bottom: 5px;
							}
						}
						.btn{
							width: 130px;
							height: 45px;
							border-radius: 25px;
							background: tomato;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 0 15px 0 10px;
							background: linear-gradient(180deg,#b270ff 0%,#7a3dff 100%);
							cursor: pointer;
							.CombinedShape{
								width: 30px;
								height: 30px;
							}
							span{
								font-size: 16px;
								color: #fff;
							}
						}
					}
					.content-img{
						width: 50%;
						text-align: right;
						img{
							margin-top: -20px;
						}
					}
				}
				.part-one-line{
					position: absolute;
					right: 0;
				}
			}
			.part-two{
				height: 590px;
				.part-center{
					width: 1200px;
					height: 100%;
					margin: 0 auto;
					// margin-left: 8%;
					display: flex;
					justify-content: space-between;
					.content-img{
						display: flex;
						align-items: center;
						// position: relative;
						img{
							// position: absolute;
							// left: -203px;
						}
					}
					.content{
						// padding-left: 178px;
						padding-top: 260px;
						padding-right: 100px;
						p:first-child{
							font-size: 34px;
							color: #333;
							font-weight: 600;
							letter-spacing: 1px;
							margin-bottom: 10px;
						}
						p:not(:first-child){
							font-size: 16px;
							letter-spacing: 1px;
							color: #666;
							line-height: 30px;
						}
					}
				}
			}
		}

		.swiper-container{
			background: #fff;
			padding-top: 30px;
			padding-bottom: 180px;
			position: relative;
			// width: 1200px;
			// margin: 0 auto;
			.swiper-wrapper{
				.swiper-slide{
					color: #333;
					display: flex;
					flex-direction: column;
					align-items: center;
					.intro{
						font-size: 34px;
						font-weight: 300;
						line-height: 48px;
						letter-spacing: 1px;
						text-align: center;
						margin-bottom: 26px;
					}
					.person{
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 76px;
						.avatar{
							width: 58px;
							height: 58px;
							margin-right: 15px;
							border-radius: 50%;
						}
						.name{
							font-weight: 600;
						}
					}
					.card{
						width: 1200px;
						height: 350px;
						background:linear-gradient(243deg,rgba(125,74,239,1) 0%,rgba(145,106,247,1) 100%);
						box-shadow:0px 16px 32px 0px rgba(59,21,153,0.1);
						border-radius:8px;
						display: flex;
						justify-content: space-between;
						.card-left{
							padding-top: 66px;
							padding-left: 68px;
							color: #fff;
							.main-title{
								font-size: 32px;
								font-weight: 600;
								letter-spacing: 1px;
								margin-bottom: 20px;
							}
							.sub-title{
								font-size: 16px;
								font-family:STFangsong;
								letter-spacing: 2px;
								margin-bottom: 111px;
							}
							.btn{
								display: flex;
								align-items: center;
								cursor: pointer;
								.CombinedShape{
									margin-right: 5px;
									width: 28px;
									height: 28px;
								}
								span{
									font-size: 18px;
									font-weight: 600;
								}
							}
						}
						.card-right{
							width: 490px;
							height: 289px;
							border-radius: 8px;
							align-self: flex-end;
						}
					}
				}
			}
			/deep/ .swiper-pagination {
				bottom: unset;
				top: 250px;
				.swiper-pagination-bullet {
					background: #d9d9d9;
					opacity: 1;
				}

				.bullet-active {
					background: #7C6AFF;
					opacity: 1;
				}
			}
		}

		.section-title{
			background: #fff;
			text-align: center;
			padding-bottom: 30px;
			p{
				font-size: 34px;
				color: #333;
				font-weight: 600;
				letter-spacing: 2px;
				line-height: 50px;
			}
		}

		.section {
			width: 100%;
			background: #fff;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			overflow: hidden;
			.pro-item:nth-child(1),
			.pro-item:nth-child(3),
			.pro-item:nth-child(6),
			.pro-item:nth-child(8),
			.pro-item:nth-child(10),
			.pro-item:nth-child(11){
				background:linear-gradient(311deg,rgba(237,246,255,1) 0%,rgba(255,255,255,1) 100%);
			}
			
			.pro-item{
				width: 100%;
				height: 598px;
				cursor: pointer;
				.item-wrap{
					width: 1100px;
					// width: 100%;
					height: 100%;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
					// cursor: pointer;					
					.item-img{
						width: 598px;
						height: 598px;
						cursor: pointer;
						position: relative;
					}
					.item-intro{
						color: #333;
						.intro-title{
							font-size: 40px;
							font-weight: 600;
							margin-bottom: 10px;
						}
						.intro-content{
							font-size: 18px;
							margin-bottom: 5px;
						}
					}
					// .item-img + .item-intro{
					// 	margin-left: 200px;
					// }
					// .item-intro + .item-img{
					// 	margin-left: 200px;
					// }
					.item1{
						&:before{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item1.png');
							opacity: 1;
							transition: .8s;
						}
						&:after{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/product_6_hover.png');
							opacity: 0;
							transition: .8s;
						}
						// &:hover:before{
						// 	opacity: 0;
						// }
						// &:hover:after{
						// 	opacity: 1;
						// }
					}
					.item2{
						&:before{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item2.png');
							opacity: 1;
							transition: .8s;
						}
						&:after{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item2_hover.png');
							opacity: 0;
							transition: .8s;
						}
						&:hover:before{
							opacity: 0;
						}
						&:hover:after{
							opacity: 1;
						}
					}
					.item3{
						&:before{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item3.png');
							opacity: 1;
							transition: .8s;
						}
						&:after{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item3_hover.png');
							opacity: 0;
							transition: .8s;
						}
						&:hover:before{
							opacity: 0;
						}
						&:hover:after{
							opacity: 1;
						}
					}
					.item4{
						&:before{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item4.png');
							opacity: 1;
							transition: .8s;
						}
						&:after{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item4_hover.png');
							opacity: 0;
							transition: .8s;
						}
						&:hover:before{
							opacity: 0;
						}
						&:hover:after{
							opacity: 1;
						}
					}
					.item6{
						&:before{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item6.png');
							opacity: 1;
							transition: .8s;
						}
						&:after{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/product_1_hover.png');
							opacity: 0;
							transition: .8s;
						}
						&:hover:before{
							opacity: 0;
						}
						&:hover:after{
							opacity: 1;
						}
					}
					.item7{
						&:before{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item7.png');
							opacity: 1;
							transition: .8s;
						}
						&:after{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/product_2_hover.png');
							opacity: 0;
							transition: .8s;
						}
						&:hover:before{
							opacity: 0;
						}
						&:hover:after{
							opacity: 1;
						}
					}
					.item8{
						&:before{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item8.png');
							opacity: 1;
							transition: .8s;
						}
						&:after{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/product_3_hover.png');
							opacity: 0;
							transition: .8s;
						}
						&:hover:before{
							opacity: 0;
						}
						&:hover:after{
							opacity: 1;
						}
					}
					.item10{
						&:before{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item10.png');
							opacity: 1;
							transition: .8s;
						}
						&:after{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item10_hover.png');
							opacity: 0;
							transition: .8s;
						}
						&:hover:before{
							opacity: 0;
						}
						&:hover:after{
							opacity: 1;
						}
					}
					.item11{
						&:before{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item11.png') no-repeat;
							background-position: right center;
							opacity: 1;
							transition: .8s;
						}
						// &:after{
						// 	content:'';
						// 	position: absolute;
						// 	left: 0;
						// 	top: 0;
						// 	width: 598px;
						// 	height: 598px;
						// 	background: url('https://pic.paitume.com/images/pro_item10_hover.png');
						// 	opacity: 0;
						// 	transition: .8s;
						// }
						// &:hover:before{
						// 	opacity: 0;
						// }
						// &:hover:after{
						// 	opacity: 1;
						// }
					}
					.item9{
						&:before{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/pro_item9.png');
							opacity: 1;
							transition: .8s;
						}
						&:after{
							content:'';
							position: absolute;
							left: 0;
							top: 0;
							width: 598px;
							height: 598px;
							background: url('https://pic.paitume.com/images/product_4_hover.png');
							opacity: 0;
							transition: .8s;
						}
						&:hover:before{
							opacity: 0;
						}
						&:hover:after{
							opacity: 1;
						}
					}
				}
			}
			.reverse{
				.item-wrap{
					flex-direction: row-reverse;
					.item-intro{
						text-align: right;
					}
				}
			}
			.col{
				background:linear-gradient(243deg,rgba(125,74,239,1) 0%,rgba(145,106,247,1) 100%);
				cursor: pointer;
				.item-wrap{
					width: 45%;
					height: 100%;
					display: block;
					position: relative;
					// cursor: pointer;
					.item-img{
						width: 800px;
						height: 350px;
						position: absolute;
						bottom: 5%;
						left: 50%;
						transform: translateX(-50%);
						cursor: unset;
						opacity: 1;
						transition: .8s;
					}
					.item-intro{
						position: absolute;
						left: 50%;
						transform: translate(-50%,80%);
						text-align: center;
						color: #fff;
					}
					.overflow-img{
						position: absolute;
						width: 100%;
						height: 100%;
						left: 50%;
						transform: translateX(-50%);
						text-align: center;
						opacity: 0;
						transition: .8s;
						cursor: pointer;
						img{
							height: 100%;
						}
					}
					// &:hover{
					// 	.overflow-img{
					// 		opacity: 1;
					// 	}
					// 	.item-img{
					// 		opacity: 0;
					// 	}
					// }
				}
			}
			.col:hover{
				.item-wrap{
					.overflow-img{
						opacity: 1;
					}
					.item-img{
						opacity: 0;
					}
				}
			}
			.col2{
				height: 750px;
				// background: #7E4BEF;
				.item-wrap{
					width: 100%;
					height: 100%;
					display: block;
					position: relative;
					.bg-img{
						width: 100%;
						position: absolute;
						left: 0;
						bottom: 0;
					}
					.center-img{
						position: absolute;
						left: 50%;
						top: 24%;
						transform: translateX(-50%);
					}
					.item-intro{
						position: absolute;
						left: 50%;
						transform: translate(-50%,70%);
						text-align: center;
						.intro-title{
							// color: #fff;
						}
						.intro-content{
							// color: #fff;
						}
					}
					.item-img{
						cursor: unset;
					}
				}
			}
			.pro-item1,
			.pro-item2,
			.pro-item3,
			.pro-item4,
			.pro-item6,
			.pro-item7,
			.pro-item8,
			.pro-item9,
			.pro-item10{
				&:hover{
					.item-wrap{
						.item-img:before{
							opacity: 0;
						}
						.item-img:after{
							opacity: 1;
						}
					}
				}
			}
			.count-price{
				padding-top: 76px;
				box-sizing: border-box;
				.count-head{
					color: #243041;
					text-align: center;
					margin-bottom: 64px;
					p:first-child{
						font-size: 40px;
						margin-bottom: 5px;
					}
					p:last-child{
						font-size: 18px;
					}
				}
				.count-middle{
					background: tomato;
					display: flex;
					justify-content: center;
					align-items: center;
					.middle-item{
						width: 360px;
						height: 300px;
						text-align: center;
						position: relative;
						img{
							width: 360px;
							height: 300px;
							position: absolute;
							top: 0;
							left: 0;
						}
						p{
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							bottom: 70px;
							font-size: 20px;
							color: #666;
						}
					}
				}
				.count-bottom{
					text-align: center;
					margin-top: -100px;
				}
			}
		}

		.version-wrap{
			height: 1174px;
			// background: rgba(0,0,0,0.5);
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 70px;
			background: url('https://pic.paitume.com/images/version_bg1.png') no-repeat;
			transition: 0.8s;
			background-size: cover;
			.title{
				font-family:STSongti-SC-Regular,STSongti-SC;
				font-size: 50px;
				letter-spacing: 2px;
				color: #fff;
				margin-bottom: 40px;
			}
			.version-item{
				width: 1260px;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.version-card{
					width: calc((100% - 30px)/4);
					// min-height: 790px;
					height: fit-content;
					border-radius:4px;
					border:1px solid rgb(231,232,234);
					display: flex;
					flex-direction: column;
					// background: rgb(235,235,235);
					background: rgba(255,255,255,0.8);
					transition: 0.5s;
					.card-title{
						height: 100px;
						background:rgb(227,245,255);
						display: flex;
						flex-direction: column;
						justify-content: center;
						padding-left: 30px;
						box-sizing: border-box;
						color: #243041;
						font-family:STSongti-SC-Black,STSongti-SC;
						font-weight:900;
						position: relative;
						.hot{
							background: #7842ED;
							color: #fff;
							width: 44px;
							height: 44px;
							position: absolute;
							right: 8px;
							top: 8px;
							border-radius: 50%;
							display: flex;
							justify-content: center;
							align-items: center;
						}
						.big-title{
							font-size: 24px;
							margin-bottom: 8px;
						}
						.price{
							font-size: 16px;
						}
					}
					.function-wrap{
						flex: 1;
						font-family:PingFangSC-Regular,PingFangSC;
						padding: 26px 0 20px;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						// background: rgb(235,235,235);
						// background: rgba(255,255,255,0.5);
						.function-list{
							color: #243041;
							font-size: 16px;
							margin-bottom: 92px;
							padding-left: 30px;
							box-sizing: border-box;
							li:not(:last-child){
								margin-bottom: 20px;
							}
							li{
								.el-icon-check{
									font-weight: bold;
								}
							}
							.nosupport{
								color:rgba(36,48,65,.3);
							}
						}
						.function-btn{
							width:230px;
							margin: 0 auto;
							height:40px;
							line-height: 40px;
							text-align: center;
							background:rgb(120,66,237);
							border-radius:4px;
							font-size:18px;
							font-weight:600;
							color:#fff;
							cursor: pointer;
						}
					}
					.addition{
						// position: absolute;
						// bottom: 0;
						// left: 50%;
						// transform: translateX(-50%);
						opacity: 0;
						margin-top: -177px;
						transition: margin-top 0.5s linear,opacity 0.6s linear;
						z-index: 3;
						align-self: center;
						width: 230px;
						border-top: 1px solid #E7E8EA;
						padding-top: 30px;
						padding-bottom: 10px;
						color: #243041;
						display: flex;
						flex-direction: column;
						p{
							text-align: center;
							margin-bottom: 10px;
						}
						p:first-child{
							font-size: 18px;
							margin-bottom: 10px;
						}
						p:nth-child(2){
							height:40px;
							border-radius:2px;
							border:1px solid #7842ED;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 18px;
							font-weight: 600;
							color: #7842ED;
							cursor: pointer;
						}
					}
				}
				.white-bg{
					background: rgba(255,255,255,1);
				}
				.version-card:hover{
					box-shadow: 0 12px 32px 0 rgba(22, 9, 49, 0.082);
					background: rgba(255,255,255,1);
					.function-wrap{
						// background: #fff;
						background: rgba(255,255,255,1);
					}
					.addition{
						margin-top: 0;
						opacity: 1;
					}
				}
			}
		}
		.version-bg1{
			background-image: url('https://pic.paitume.com/images/version_bg1.png');
		}
		.version-bg2{
			background-image: url('https://pic.paitume.com/images/version_bg2.png');
		}
		.version-bg3{
			background-image: url('https://pic.paitume.com/images/version_bg3.png');
		}
		.version-bg4{
			background-image: url('https://pic.paitume.com/images/version_bg4.png');
		}

		.compare{
			padding-top: 50px;
			padding-bottom: 170px;
			background: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			.title{
				font-size: 34px;
				color: #333;
				font-weight: 600;
				letter-spacing: 1px;
				margin-bottom: 40px;
			}
		}

		.server-version{
			background: #E3F5FF;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 150px;
			padding-bottom: 150px;
			.version{
				width: 550px;
				height: 150px;
				border-radius:2px;
				border:1px solid rgb(235,243,254);
				display: flex;
				position: relative;
				overflow: hidden;
				cursor: pointer;
				background: #fff;
				margin-bottom: 102px;
				// opacity: 0.8;
				img{
					width: 200px;
					height: 150px;
				}
				.version-name{
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin: 0 auto;
					font-size:24px;
					font-family:STSongti-SC-Black,STSongti-SC;
					color: #333;
					.main-name{
						display: flex;
						font-weight:900;
						margin-bottom: 5px;
						i{
							width: 10px;
							height: 100%;
							border-top: 3px solid #333;
							border-left: 3px solid #333;
						}
						i:last-child{
							transform: rotate(180deg);
						}
						span{
							margin: 0 3px;
						}
					}
					.main-name + p{
						font-weight: 300;
					}
				}
				&:after{
					content:'\670d\52a1\5668\7248\000d\000a';
					position: absolute;
					right: 0;
					top: 0;
					width: 113px;
					height: 113px;
					// border: 1px dashed saddlebrown;
					display: flex;
					justify-content: center;
					align-items: flex-end;
					transform: translate(50%,-50%) rotateZ(45deg);
					font-size: 14px;
					color: #243041;
					font-weight: 600;
					padding-bottom: 10px;
					box-sizing: border-box;
					background: #E3F5FF;
				}	
			}
			.version:last-child:after{
				content:'\670d\52a1\5668\7248\000d\000a';
				padding-bottom: 8px;
			}
			.select{
				// opacity: 1;
				box-shadow:0px 12px 32px 0px rgba(22,9,49,0.1);
			}
			.intro{
				width: 770px;
				color: #333;
				letter-spacing: 1px;
				line-height: 30px;
				margin-bottom: 30px;
			}
			.form{
				width: 770px;
				// height: 764px;
				padding: 50px 50px 50px 25px;
				background: #000;
				background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(255,255,255,1) 100%);
				box-shadow:0px 12px 32px 0px rgba(22,9,49,0.1);
				border-radius:4px;
				.el-form-item{
					margin-bottom: 20px;
					display: flex;
					align-items: center;
					/deep/{
						.el-form-item__label{
							margin-right: 28px;
							font-size: 18px;
							color: #999;
						}
						.el-form-item__content{
							flex: 1;
							margin-left: 0!important;
							.el-input{
								.el-input__inner{
									height: 50px;
									background: #FAFAFA;
									border: none;
								}
							}
						}
					}
				}
				.need{
					margin-bottom: 40px;
					/deep/{
						.el-form-item__label{
							align-self: flex-start;
						}
						.el-form-item__content{
							.el-textarea{
								.el-textarea__inner{
									height: 322px;
									background: #FAFAFA;
									border: none;
								}
							}
						}
					}
				}
				.submit{
					width:120px;
					margin: 0 auto;
					height:38px;
					background:rgba(120,66,237,1);
					border-radius:4px;
					cursor: pointer;
					/deep/{
						.el-form-item__content{
							display: flex;
							justify-content: center;
							align-items: center;
							.el-button{
								width: 120px;
								height: 38px;
								background:rgba(120,66,237,1);
								font-size: 16px;
								font-weight: 600;
								color: #fff;
							}
						}
					}
				}
			}
		}

		.bright-qa{
			background: #fff;
			display: flex;
			justify-content: center;
			.center{
				width: 1200px;
				padding-top: 90px;
				padding-bottom: 130px;
				color: #333;
				p:not(.main-title){
					width: 666px;
				}
				.main-title{
					font-size: 40px;
					font-weight: 600;
					border-bottom: 1px solid #D8D8D8;
					padding-bottom: 10px;
				}
				.sub-title{
					margin-top: 40px;
					margin-bottom: 14px;
					font-size: 18px;
					font-weight: 600;
				}
				.detail{
					color: #666;
				}
				.detail+.detail{
					margin-top: 10px;
				}
				.detail+.main-title{
					margin-top: 130px;
				}
			}
		}

		.support{
			height: 280px;
			background: url('https://pic.paitume.com/images/support_bg_purple.png') no-repeat;
			background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #fff;
			.main-title{
				font-size: 40px;
				font-weight: Semibold;
				margin-bottom: 10px;
				letter-spacing: 2px;
			}
			.sub-title{
				font-size: 24px;
				margin-bottom: 30px;
				letter-spacing: 2px;
			}
			.more-btn{
				width:138px;
				height:46px;
				background:linear-gradient(180deg,rgba(178,112,255,1) 0%,rgba(122,61,255,1) 100%);
				border-radius:23px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 16px;
				font-weight: 600;
				padding-left: 20px;
				padding-right: 10px;
				cursor: pointer;
				.el-icon-right{
					width: 28px;
					height: 28px;
					border-radius: 50%;
					background: #fff;
					color: rgba(122,61,255,0.6);
					text-align: center;
					line-height: 28px;
					font-size: 18px;
					font-weight: 700;
				}
			}
		}

		.buy-product{
			height: 1415px;
			// background: #fff;
			background: #FAFAFA;
			padding-top: 70px;
			box-sizing: border-box;
			.buy-title{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #243041;
				margin-bottom: 40px;
				span{
					font-size: 18px;
				}
				span:first-child{
					font-size: 40px;
					margin-bottom: 10px;
				}
			}
			.buy-version{
				width: 1200px;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				margin-bottom: 48px;
				.version{
					width: 550px;
					height: 150px;
					border-radius:2px;
					border:1px solid rgb(235,243,254);
					display: flex;
					position: relative;
					overflow: hidden;
					cursor: pointer;
					// opacity: 0.8;
					img{
						width: 200px;
						height: 150px;
					}
					.version-name{
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin: 0 auto;
						font-size:24px;
						font-family:STSongti-SC-Black,STSongti-SC;
						color: #333;
						.main-name{
							display: flex;
							font-weight:900;
							margin-bottom: 5px;
							i{
								width: 10px;
								height: 100%;
								border-top: 3px solid #333;
								border-left: 3px solid #333;
							}
							i:last-child{
								transform: rotate(180deg);
							}
							span{
								margin: 0 3px;
							}
						}
						.main-name + p{
							font-weight: 300;
						}
					}
					&:after{
						content:'单机版';
						position: absolute;
						right: 0;
						top: 0;
						width: 113px;
						height: 113px;
						// border: 1px dashed saddlebrown;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						transform: translate(50%,-50%) rotateZ(45deg);
						font-size: 14px;
						color: #243041;
						font-weight: 600;
						padding-bottom: 10px;
						box-sizing: border-box;
						background: #E3F5FF;
					}	
				}
				.version:last-child:after{
					content:'服务器版';
					padding-bottom: 8px;
				}
				.select{
					// opacity: 1;
					box-shadow: 0 12px 32px 0 rgba(22, 9, 49, 0.082);
				}
			}
			.version-item{
				width: 1200px;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.version-card{
					width: 340px;
					height: 790px;
					border-radius:4px;
					border:1px solid rgb(231,232,234);
					display: flex;
					flex-direction: column;
					cursor: pointer;
					&:hover{
						box-shadow: 0 12px 32px 0 rgba(22, 9, 49, 0.082);
					}
					.card-title{
						height: 100px;
						background:rgb(227,245,255);
						display: flex;
						flex-direction: column;
						justify-content: center;
						padding-left: 30px;
						box-sizing: border-box;
						color: #243041;
						font-family:STSongti-SC-Black,STSongti-SC;
						font-weight:900;
						position: relative;
						.orange_hot{
							width: 50px;
							height: 55px;
							position: absolute;
							right: -12px;
							top: -12px;
						}
						.big-title{
							font-size: 24px;
							margin-bottom: 8px;
						}
						.price{
							font-size: 16px;
						}
					}
					.function-wrap{
						flex: 1;
						font-family:PingFangSC-Regular,PingFangSC;
						padding: 26px 0 20px;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.function-list{
							color: #243041;
							font-size: 16px;
							margin-bottom: 42px;
							padding-left: 30px;
							box-sizing: border-box;
							li:not(:last-child){
								margin-bottom: 20px;
							}
							li{
								.el-icon-check{
									font-weight: bold;
								}
							}
							.nosupport{
								color:rgba(36,48,65,.3);
							}
						}
						.function-btn{
							width:300px;
							margin: 0 auto;
							height:40px;
							line-height: 40px;
							text-align: center;
							background:rgb(120,66,237);
							border-radius:4px;
							font-size:18px;
							font-weight:600;
							color:#fff;
							cursor: pointer;
						}
					}
				}
			}
			.serve{
				text-align:center;
				margin-top:50px;
				background:#fff;
				.content{
					margin:0px auto;
					width:267px;
					height:200px;
					padding-top:50px;
					background:url('https://pic.paitume.com/images/product_block.png') no-repeat;
				}
				.top{
					color:#243041;
					p{
						font-size:20px;
					}
					span{
						font-size:14px;
					}
				}
				button{
					background:#7C6AFF;
					color:#fff;
					margin-top:10px;
					svg{
						color:#fff!important;
					}
				}
				.img{
					img{
						width: 100%;
					}
				}
			}
		}
		.buy {
			width: 100%;
			padding: 0 148px;
			overflow: hidden;
			margin-top: 87px;
			.buy-title {
				font-size: 14px;
				color: #333;
				border:2px solid #D9D9D9;
				padding:5px 20px;
			}
			.line {
				width: 100%;
				height: 1px;
				background: #d9d9d9;
			}
			.info {
				width: 100%;
				height: 470px;
				padding: 20px 20px 15px 20px;
				box-sizing: border-box;
				display: flex;
				border:2px solid #D9D9D9;
				border-top:none;
				.info-left {
					width: 374px;
					height: 100%;
					border-right: 1px solid #d9d9d9;
					flex-shrink: 0;
					.info-title {
						font-size: 20px;
						color: #333333;
						height: 28px;
						font-family: PingFangSC-Regular, PingFangSC;
						font-weight: 400;
						line-height: 28px;
						span {
							color: #ff9500;
						}
					}
					.buy-type {
						margin-top: 30px;
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						.buy-item {
							width: 299px;
							height: 88px;
							border: 1px solid #999;
							background: #fff;
							margin-bottom: 20px;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							padding: 0px 20px;
							box-sizing: border-box;
							position: relative;
							cursor: pointer;
							.item-logo {
								width: 48px;
								height: 48px;
								background: #243041;
							}
							.item-info {
								display: flex;
								flex-direction: column;
								justify-content: flex-start;
								align-items: flex-start;
								.info-top {
									height: 28px;
									font-size: 20px;
									font-family: PingFangSC-Regular, PingFangSC;
									font-weight: 400;
									color: #333;
									line-height: 28px;
								}
								.info-bottom {
									height: 20px;
									font-size: 14px;
									font-family: PingFangSC-Regular, PingFangSC;
									font-weight: 400;
									color: #999999;
									line-height: 20px;
								}
							}
							.item-price {
								height: 28px;
								font-size: 20px;
								font-family: PingFangSC-Regular, PingFangSC;
								font-weight: 400;
								color: #ff9500;
								line-height: 28px;
								display:flex;
								align-items:baseline;
								p{
									font-size:12px;
								}
							}
						}
						.triangle {
							width: 0;
							height: 0;
							border-bottom: 12px solid #ff9500;
							border-left: 12px solid transparent;
							position: absolute;
							bottom: 0;
							right: 0;
							display: none;
						}
						.active {
							border: 1px solid #ff9500;
							.triangle {
								display: block;
							}
						}
					}
				}
				.info-right {
					width: 100%;
					margin-left: 20px;
					.account{
						.num{
							.el-input{
								margin-top:10px;
								width:400px;
							}
						}
					}
					.acquire {
						height: 28px;
						font-size: 20px;
						font-family: PingFangSC-Regular, PingFangSC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						line-height: 28px;
						padding-left: 20px;
						margin-bottom: 10px;
					}
					.acquire-item {
						width: 100%;
						display: flex;
						align-items: center;
						margin-bottom: 10px;
						.acquire-img {
							width: 12px;
							height: 9px;
							background: #333;
							display: inline-block;
							margin-right: 6px;
						}
						.acquire-txt {
							height: 20px;
							font-size: 14px;
							font-family: PingFangSC-Regular, PingFangSC;
							font-weight: 400;
							color: #333;
							line-height: 20px;
							margin-left: 5px;
							span {
								color: #ff9500;
							}
						}
					}
				}
			}
		}
		
		.pay {
			width: 100%;
			height: 338px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			box-shadow: 2px 2px 5px rgba(7, 7, 65, 0.21);
			margin-bottom: 100px;
			margin-top: 46px;
			.money {
				margin-bottom: 20px;
				margin-top: 20px;
				height: 28px;
				font-size: 20px;
				font-family: PingFangSC-Regular, PingFangSC;
				font-weight: 400;
				color: #333333;
				line-height: 28px;
				span {
					color: #ff9500;
				}
			}
			.original {
				margin-bottom: 20px;
				height: 20px;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFangSC;
				font-weight: 400;
				color: #999999;
				line-height: 20px;
			}
			.pay-switch {
				width: 226px;
				height: 47px;
				border-radius: 20px;
				background: #fff;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				padding: 0 23px;
				-moz-box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
				-webkit-box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
				box-shadow: 0 2px 5px rgba(7, 7, 65, 0.21);
			}
			.pay-switch {
				margin-bottom: 87px;
				font-family: PingFangSC-Regular, PingFangSC;
				font-weight: 400;
			}
			.payment {
				width: 158px;
				height: 40px;
				line-height: 40px;
				background: linear-gradient( 180deg, rgba(236, 81, 89, 1) 0%, rgba(212, 40, 45, 1) 100%);
				color: #fff;
				text-align: center;
				font-size: 18px;
				font-family: PingFangSC-Semibold, PingFangSC;
				font-weight: 600;
				cursor: pointer;
			}
		}
	}
</style>
