<template>
	<div class="hire-wrap">
		<div class="hire-head">
			<img class="bg-hire_head" alt="" src="https://pic.paitume.com/images/dunpai.png">
			<p>租赁商进驻认证</p>
		</div>
		<div class="hire-progress">
			<div class="progress-center">
				<div class="progress-item" :class="{'progress-active':onFirst}">
					<div>1</div>
					<p>《派图租赁平台服务协议》</p>
				</div>
				<div class="line"></div>
				<div class="progress-item" :class="{'progress-active':onSecond}">
					<div>2</div>
					<p>填写资料,下载合同盖印并且上传</p>
				</div>
				<div class="line"></div>
				<div class="progress-item" :class="{'progress-active':onThird}">
					<div>3</div>
					<p>缴纳保证金</p>
				</div>
				<div class="line"></div>
				<div class="progress-item" :class="{'progress-active':onFour}">
					<div>4</div>
					<p>审核阶段</p>
				</div>
			</div>
		</div>
		<div class="first-step" v-if="onFirst&&!onSecond">
			<div class="first-center">
				<div class="agreement-wrap" ref="agreement" id="top">
					<h1>派图租赁平台服务协议</h1>
					<p class="no-indent">派图租赁（paitume.com）平台依据以下条件和条款为您提供所享有的服务,请仔细阅读并遵守。</p>
					<h3>一、总则</h3>
					<p>1.1 本《派图租赁平台服务协议》（以下简称本协议）为您（即商户）与深圳市派图租赁科技有限公司（以下简称派图租赁）就派图租赁平台服务达成的协议。派图租赁在此特别提醒您认真阅读、充分理解本协议。商户应认真阅读、充分理解本协议中各条款，特别涉及免除或者限制派图租赁责任的免责条款，对商户的权利限制的条款，法律适用、争议解决方式的条款。</p>
					<p>1.2 请您审慎阅读并选择同意或不同意本协议，除非您接受本协议所有条款，否则您无权使用本协议项下相关服务。您的申请、使用、帐号获取和登录等行为表明您自愿接受本协议的全部内容并受其约束，不得以任何理由包括但不限于未能认真阅读本协议等作为纠纷抗辩理由。</p>
					<p>1.3 本协议可由派图租赁随时更新，更新后的协议条款一旦公布即代替原来的协议条款，不再另行个别通知。您可在网站查阅最新版协议条款。在派图租赁修改本协议条款后，如果您不接受修改后的条款，请立即停止使用派图租赁提供的服务，您继续使用派图租赁提供的服务将被视为已接受了修改后的协议。</p>
					<h3>二、定义</h3>
					<p>2.1 派图租赁平台：是搭建、提供及维护网上租赁影棚、器材租赁等相关服务的信息发布的平台，用户和商户通过派图租赁平台对影棚租赁及器材租赁等服务达成合意。</p>
					<p>2.2 用户：是指在派图租赁平台上购买器材租赁、器材租赁等相关服务的具有完全民事权利能力和行为能力的自然人。</p>
					<p>2.3 商户：即本协议中的“您”，是指通过派图租赁平台自主发布影棚租赁、器材租赁等服务信息、完成任务事项的依据中国法律合法成立并有效存续的法人或其他商事主体。</p>
					<h3>三、商户的权利义务：</h3>
					<p>3.1 商户应保证其为一家依据中国法律合法成立并有效存续的法人或其他商事主体，能够独立承担法律责任，并具有履行本合同所需一切权利及能力；同时商户应当提供盖章的资质证明复印件，如涉及特殊行业需要特定的资质或许可证等的，商户也应予以提供。前述资料包括但不限于商户营业执照、前置许可证件、租赁商品说明、页面信息文案所需资料（包括图片、商家介绍）等。商户保证提供的文件内容真实有效，不侵犯任何第三方的合法权益，由于信息虚假或不准确造成的一切后果与损失均由商户承担。商户的名称、地址和有效联系方式、许可证等信息发生变化的，商户应在一个工作日内书面或邮件通知派图租赁（邮件地址：vip@paitume.com）。由于商户未及时通知，给商户自身及派图租赁造成的一切损失均由商户承担。</p>
					<p>3.2 商户应向派图租赁提供相关租赁服务的具体信息和详细说明。商户应保证自身具备提供本合同项下商品及履行本合同项下商户提供租赁服务活动所有必要的资质批文。</p>
					<p>3.3 商户提供的租赁服务或其他服务或者销售商品等，应符合国家法律、法规、规章的规定。如因商户提供的服务或销售的商品质量或安全问题造成派图租赁用户投诉、索赔、经济损失等相关后果均由商户承担，如派图租赁基于前述情况向消费者先行赔付的，派图租赁有权向商户追偿，追偿方式包括但不限于在结算给商户的相关款项中直接扣除该赔付金额。</p>
					<p>3.4 商户为派图租赁开辟绿色通道，具体事宜如：商户在接收到派图租赁用户的订单后，应优先处理派图租赁用户的订单。</p>
					<p>3.5 商户不应就在线标注价格之外向派图租赁用户收取任何线下费用。如派图租赁用户所订购租赁服务或者商品售罄，经商户与派图租赁用户沟通后，商户可就替代服务或商品线下向用户收取差价部分。</p>
					<p>3.6 如派图租赁用户要求服务发票，由商户负责全额提供，派图租赁系统通知商户用户下单信息后，如商户因租赁服务或商品售罄等原因，不能提供的，商户应立即电话通知下单信息的用户和派图租赁，并做好合理的安抚和处理措施，如因此造成派图租赁用户投诉、经济损失等相关后果均由商户承担。</p>
					<p>3.7 商户应严格按照双方协商签订的活动方案为派图租赁用户提供相应的优惠价格或赠品，不允许出现故意拒不提供的行为，否则由此产生的用户投诉和损失均由商户承担。</p>
					<p>3.8 商户承诺自己在使用派图租赁时不会出现以下违规行为，如因出现以下违规行为导致任何法律后果的发生，由商户自行承担所有法律责任：</p>
					<p>3.8.1 违反国家法律、法规要求以及各种社会公共利益或公共道德的行为；</p>
					<p>3.8.2 违反派图租赁相关规定的行为（包括但不限于制造虚假订单、利用系统漏洞获取利润、违规套现、对用户消费欺诈、无故取消订单、无故拒绝配送等）；</p>
					<p>3.8.3 其他损害派图租赁平台、用户和其他商户利益的行为。</p>
					<p>3.9 商户可以通过用户名和密码登录派图租赁网上平台商家后台，商户应对密码安全及通知实施的行为负责，商户不得以任何形式将用户名和密码转让或泄露给第三方。</p>
					<p>3.10 商户提供的银行账户信息须准确，如发生变更应立即通知派图租赁，否则，由此造成的款项延误等后果均由商户承担。</p>
					<p>3.11 商户保证经营场所内实际销售价格不得低于商品在线标注价格，且不得唆使或引导派图租赁用户放弃在派图租赁网上平台服务，改为其他形式的商户和派图租赁用户直接交易，否则派图租赁有权立即终止合作并要求商户按照协议第六条承担违约责任。</p>
					<p>3.12 商户同意派图租赁可能会与第三方合作向商户提供相关的网络服务，在此情况下，如该第三方同意承担与派图租赁同等的保护用户隐私的责任，则派图租赁有权将用户的信息资料等提供给该第三方。另外，在不透露单个商户隐私资料的前提下，派图租赁有权对整个商户数据库进行分析并对商户数据库进行商业上的利用。</p>
					<p>3.13 商户同意派图租赁拥有通过信息推送、平台公示、短信、电话、邮件等形式向您通知告知信息的权利，商户允许平台向其发送商业性电子信息。</p>
					<h3>四、派图租赁权利与义务</h3>
					<p>4.1 派图租赁为商户提供本协议项下约定的派图租赁网上服务平台的网络展示，并按照派图租赁平台约定向商户收取服务费。</p>
					<p>4.2 派图租赁为商户在消费群体中做相关宣传介绍并进行相关推荐，以提升商户的知名度。商户同意授权派图租赁使用其品牌、LOGO、名称、商标等知识产权。</p>
					<p>4.3 派图租赁有权对商户拟在派图租赁发布的内容、信息进行审核，必要时可删改。派图租赁有权对不符合法律法规、政策规定的内容或任何侵犯第三方合法权益的内容予以删改或拒绝发布，但甲乙双方确认，派图租赁的前述审核、删改不为派图租赁设置任何义务，也不免除商户根据本协议应承担的责任。</p>
					<p>4.4 如任何第三方向派图租赁投诉，派图租赁经核实后，有权要求商户配合解决该投诉。如出现不符合法律法规、政策规定或侵犯第三方合法权益的内容的，派图租赁有权在不通知商户的情况下做下线处理。</p>
					<p>4.5 商户店铺内所售品类如有违反派图租赁平台经营范围的相关规定或有向消费者私自售卖违禁品的行为，派图租赁平台有权按照相关规定对商户进行处罚，并举报至相关行政主管部门。</p>
					<p>4.6 如活动方案中涉及派图租赁承担相应成本费用的内容，则派图租赁应按合同中双方约定的结算方式，定期由派图租赁系统自动结算的方式为商户支付活动期间产生的成本费用。</p>
					<p>4.7 派图租赁用户退订情形，派图租赁应在收到退订申请后告知商户取消对应租赁服务项目。商户应根据派图租赁通知做相应的调整。</p>
					<p>4.8 如商户违反本协议第三条项下约定的义务，派图租赁有权随时停止提供服务，并操作商户商品信息下线。</p>
					<p>4.9 本协议项下服务终止时，派图租赁有权删除派图租赁网上服务平台上的商户已发布的商品租赁信息或者服务信息，且有权拒绝向商户提供相关信息；派图租赁有权保存商户资质信息、商品信息、交易记录等相关资料。</p>
					<h3>五、知识产权</h3>
					<p>5.1 双方的品牌归各自所有。双方均不可在对方未经授权的情况下使用对方名称、Logo以及涉及相关内容的销售、促销宣传材料及广告、报纸、杂志、宣传单等，如因此产生的所有不良后果及损失违约方全部承担。本协议第4.2条有约定的除外。</p>
					<h3>六、安全保障</h3>
					<p>6.1 商户提供的资质应符合国家相关法律的规定，并且符合发布相关商品的要求，当平台要求提供时可以在24小时内提供资质完成备案，如果因无法提供相关资质导致平台的损失需要由商户承担。</p>
					<p>6.2 商户提供的租赁服务或其他服务应符合国家法律、法规、规章的规定。如因商户提供的租赁服务在服务质量或安全问题造成派图租赁用户投诉、索赔、经济损失等相关后果均由商户承担，如派图租赁基于前述情况向消费者先行赔付的，派图租赁有权向商户追偿，追偿方式包括但不限于在结算给商户的相关款项中直接扣除该赔付金额。</p>
					<h3>七、违约责任</h3>
					<p>7.1 任何一方违反本协议所规定的义务导致另一方受到包括但不限于投诉、举报、诉讼或处罚、赔偿等损失，违约方在收到守约方要求纠正其违约行为的书面通知之日，应立即停止其违约的行为，并在10日内赔偿守约方因此受到的所有损失。</p>
					<p>7.2 本协议任何一方均应对其获得的对方的业务、经营、财务状况和其他保密资料予以严格保密，不得以任何形式向任何第三方披露。如因任何一方未能履行保密义务而给其他方造成任何损失的，应承担赔偿责任。</p>
					<h3>八、免责条款</h3>
					<p>8.1 不论在何种情况下，派图租赁均不对由于互联网正常的设备维护，互联网络连接故障，电脑、通讯或其他系统的故障，电力故障，黑客攻击、病毒侵袭、罢工，劳动争议，暴乱，起义，骚乱，生产力或生产资料不足，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令或第三方的不作为而造成的不能服务或延迟服务承担责任。</p>
					<p>8.2 商户同意自行承担使用网络服务的风险，派图租赁不作任何类型的担保，包括但不限于：不担保服务一定能满足商户的要求；不担保服务不会受中断，对服务的及时性，安全性，出错发生不担保；对在派图租赁上以及第三方合作得到的任何服务或交易进程，不作担保；对派图租赁服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、稳定性、完整性和及时性不作出任何承诺和保证；不担保派图租赁服务的适用性没有错误或疏漏。</p>
					<h3>九、争议解决</h3>
					<p>9.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>
					<p>9.2 就本协议内容或执行发生任何争议，应友好协商解决。协商不成时，均可向被告所在地的有管辖权的法院诉讼解决。</p>
				</div>
				<div class="i-agree" :class="{already:alreadyRead}">
					<el-checkbox v-model="isAgree">
						<span>我已经阅读并且同意</span>
					</el-checkbox>
					<a class="agree-what" href="new/hire/index#top">《派图租赁平台服务协议》</a>
				</div>
				<div class="next-cancel" :class="{already:alreadyRead}">
					<el-button type="primary" @click="next('1')">下一步</el-button>
					<el-button @click="back('1')">返回</el-button>
				</div>
			</div>
		</div>

		<!--第二步-->
		<div class="second-step" v-if="onFirst&&onSecond&&!onThird">
			<el-form :model="hireForm" label-width="120px" ref="ruleForm" :rules="rules">
				<el-form-item label="商家姓名：" prop="shop_name">
					<el-input v-model="hireForm.shop_name" placeholder="请输入4-32个字符"></el-input>
				</el-form-item>
				<el-form-item label="公司电话：" prop="shop_mobile">
					<el-input @blur="testShopPhone" v-model="hireForm.shop_mobile" placeholder="请输入符合格式的座机号码，带区号则区号后面需要加 -"></el-input>
				</el-form-item>
				<el-form-item class="address" label="办公室地址：" required>
					<el-form-item prop="selectAddress" class="selectAddress">
						<el-cascader size="large" :options="cityOptions" v-model="hireForm.selectAddress" @change="cityChange" placeholder="请选择省份/城市/地区">
						</el-cascader>
					</el-form-item>
					<el-form-item prop="addressDetail" class="inputAddress">
						<el-input v-model="hireForm.addressDetail" placeholder="请输入详细地址"></el-input>
					</el-form-item>
				</el-form-item>
				<el-form-item label="电子邮箱：" prop="email">
					<el-input @blur="testEmail" v-model="hireForm.email" placeholder="请输入正确的邮箱地址"></el-input>
				</el-form-item>
				<el-form-item label="联系人：" class="people" prop="contact_name">
					<el-input v-model="hireForm.contact_name" placeholder="请输入您的称呼"></el-input>
					<el-radio v-model="sex" label="1">先生</el-radio>
					<el-radio v-model="sex" label="2">女士</el-radio>
				</el-form-item>
				<el-form-item label="联系人手机：" prop="contact_mobile">
					<el-input @blur="testContactPhone" v-model="hireForm.contact_mobile" placeholder="请输入手机号码"></el-input>
				</el-form-item>
				<div class="grey-line"></div>
				<el-form-item class="upload-agreement" label="上传合同：" prop="contract">
					<div class="upload-wrap">
						<el-upload class="avatar-uploader" :on-success="handleAgreementSuccess" :before-upload="beforeAgreementUpload" :data="picAgreement" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
							<img v-if="agreementUrl" :src="agreementUrl" class="avatar">
							<!-- <div class="layer" v-if="agreementUrl" @click.stop="handleLayer"> -->
							<div class="layer" v-if="agreementUrl">
								<div class="layer-left" @click.stop="stopBubble"></div>
								<div class="layer-center">
									<i class="el-icon-view" @click.stop="previewAgreement"></i>
									<i class="el-icon-edit" @click="changeAgreement"></i>
									<i class="el-icon-delete" @click.stop="delAgreement"></i>
								</div>
								<div class="layer-right" @click.stop="stopBubble"></div>
							</div>
							<i v-if="!agreementUrl" class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<p>请上传《商家入驻协议》</p>
						<el-dialog :visible.sync="agreementBig">
							<img width="100%" class="el-img" :src="agreementUrl" alt />
						</el-dialog>

					</div>
					<div class="message-tip">
						<p>
							<span>1、下载《商家入驻协议》</span>
							<span class="color-word">签名盖印公章</span>
						</p>
						<p>
							<span>2、上传</span>
							<span class="color-word">已签名、已盖印公章的《商家入驻协议》</span>
						</p>
						<p>
							<span @click="previewWord">预览</span>
							<span @click="downLoad">下载</span>
						</p>
					</div>
					<!-- <el-dialog :visible.sync="agreementBig">
            <img width="100%" :src="agreementUrl" alt="">
          </el-dialog> -->
				</el-form-item>
				<el-form-item class="upload-license" label="上传营业执照：" prop="license">
					<div class="upload-wrap">
						<el-upload class="avatar-uploader" :on-success="handleLicenseSuccess" :before-upload="beforeLicenseUpload" :data="picLicense" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
							<img v-if="licenseUrl" :src="licenseUrl" class="avatar">
							<!-- <div class="layer" v-if="agreementUrl" @click.stop="handleLayer"> -->
							<div class="layer" v-if="licenseUrl">
								<div class="layer-left" @click.stop="stopBubble"></div>
								<div class="layer-center">
									<i class="el-icon-view" @click.stop="previewLicense"></i>
									<i class="el-icon-edit" @click="changeLicense"></i>
									<i class="el-icon-delete" @click.stop="delLicense"></i>
								</div>
								<div class="layer-right" @click.stop="stopBubble"></div>
							</div>
							<i v-if="!licenseUrl" class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<p>请上传营业执照</p>
						<el-dialog :visible.sync="licenseBig">
							<img width="100%" class="el-img" :src="licenseUrl" alt />
						</el-dialog>

					</div>
				</el-form-item>
				<!-- <a href="./1.pdf" target="_blank" download="1.pdf">下载该文件</a> -->
				<!-- <el-form-item class="i-agree">
          <el-checkbox v-model="hireForm.isAgree">
            <span>我已经阅读并且同意</span>
          </el-checkbox>
          <span class="agree-word" @click.stop="readAgreement">《平台协议》</span>
        </el-form-item> -->
				<div class="bottom-btn">
					<el-button type="primary" @click="next('2','ruleForm')">下一步</el-button>
					<el-button @click="back('2')">返回</el-button>
				</div>
			</el-form>
		</div>

		<!--第三步-->
		<div class="third-step" v-if="onThird&&!onFour">
			<div class="third-center">
				<p class="tip">缴纳保证金</p>
				<div>
					<p>您选择签约的账户类型为：</p>
					<span>场地及器材租赁商</span>
				</div>
				<div>
					<p>请支付保证金：</p>
					<span>5000元</span>
				</div>
				<div>
					<p>请选择支付方法：</p>
				</div>
				<button class="buttonpay" v-for="(item, index) in pays" :key="index" :class="{ 'focuspay':index==currentpay}" @click="payevent(index,$event)">
                <ali-svg-icon :icon-class="item.icon" class-name="iconpay"></ali-svg-icon>
                <span class="paytext">{{item.text}}</span>
            </button>
				<div class="text">
					支付金额：￥
					<span class="money red">{{paymoney}}</span>
				</div>
				<div class="code">
					<canvas class="codepay" id="canvas"></canvas>
					<p class="codetext">{{codetext}}</p>
					<div id="aliForm"></div>
				</div>
				<span class="btn" @click="back('3')">上一步</span>
				<span class="btn" @click="next('3')">下一步</span>
			</div>
		</div>

		<!--第四步-->
		<div class="third-step" v-if="onFour">
			<div class="third-center">
				<ali-svg-icon icon-class="succ" class-name="succ"></ali-svg-icon>
				<p class="tip">信息提交成功</p>
				<p class="msg">我们会在3个工作日内以<span>电话</span>和<span>邮件</span>形式通知您，请您耐心等待</p>
				<span class="btn" @click="$router.push('/')">好的</span>
			</div>
		</div>

	</div>
</template>

<script>
	import {regionData} from 'element-china-area-data'
	import {applyHire,apply} from '@config/api.js'
	import QRCode from "qrcode";
	import { sms } from "@/config/api.js";
	import { checkPic } from '@util/picUtil.js'
	import { mapGetters } from "vuex";

	export default {
		data() {
			return {
				currentpay: 0, //支付方式
				codetext: '', //显示的内容
				paymoney:5000, //保证金金额
				pays: [
			      {
			        text: "微信支付",
			        icon: "weixinPay"
			      },{
			        text: "支付宝支付",
			        icon: "aliApy_round"
			      },{
			        text: "银联",
			        icon: "aliApy_round"
			      }
			    ],
				sex: '1',
				cityOptions: regionData,
				isAgree: false,
				hireForm: {
					type: 1,
					shop_name: '',
					shop_mobile: '',
					address: '',
					selectAddress: [],
					addressDetail: '',
					email: '',
					contact_name: '',
					contact_mobile: '',
					license: '',
					contract: ''
				},
				onFirst: true,
				onSecond: false,
				onThird: false,
				onFour:false,
				agreementUrl: '',
				agreementBig: false,
				licenseUrl: '',
				licenseBig: false,
				alreadyRead: false,
				picAgreement: {},
				picLicense: {},
				// 图片预览
				rules: {
					shop_name: [{
							required: true,
							message: '请输入商店名称',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 32,
							message: '长度在 4 到 32 个字符',
							trigger: 'blur'
						}
					],
					shop_mobile: [{
							required: true,
							message: '请输入公司电话',
							trigger: 'blur'
						},
						// { pattern: /^400[0-9]{7}|^1[34578]\d{9}$|^0[0-9]{2,3}[0-9]{8}/, message: '电话号码格式不正确',trigger: 'blur' }
						{
							pattern: /\d{3}-\d{8}|\d{4}-\d{7}|(?:(?:\+|00)86)?1[3-9]\d{9}$/ ,
							message: '电话号码格式不正确',
							trigger: 'blur'
						}
					],
					selectAddress: [{
						type: 'array',
						required: true,
						message: '请选择地址',
						trigger: 'change'
					}, ],
					addressDetail: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}, ],
					email: [{
							required: true,
							message: '请输入电子邮箱',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: 'blur'
						}
					],
					contact_name: [{
						required: true,
						message: '请输入联系人',
						trigger: 'blur'
					}, ],
					contact_mobile: [{
							required: true,
							message: '请输入联系电话',
							trigger: 'blur'
						},
						// { pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/, message: '电话号码格式不正确',trigger: 'blur' }
						{
							pattern: /^400[0-9]{7}|^1[34578]\d{9}$|^0[0-9]{2,3}[0-9]{8}/,
							message: '电话号码格式不正确',
							trigger: 'blur'
						}
					],
					contract: [{
						required: true,
						message: '请上传合同',
						trigger: 'blur'
					}, ],
					license: [{
						required: true,
						message: '请上传营业执照',
						trigger: 'blur'
					}, ]
				}

			}
		},
		created() {
			console.warn(this.user_data, '[[[[[')
			if(this.user_data.role == 0) {
				this.getRequest(apply.rule, {
					type: 1
				}).then(res => {
					console.warn(res, '获取审核状态')
					if(res.status == 0) {
						this.$alert('您之前的申请正在审核中请耐心等待', '提示', {
							confirmButtonText: '确定',
							callback: action => {
								this.$router.go(-1)
							}
						});
					} else if(res.status == 1) {
						this.$message.warning('您已经是租赁商')
						this.$router.push('/serve/day_set/index')
					} else if(res.status == 2) {
						console.warn(res.status, '8888')
						this.$message.warning('抱歉，审核未通过，请重新申请')
					}
				}).catch(err => {
					console.error(err)
				})
			} else if(this.user_data.role == 1) {
				this.$alert('您已经是商家', '提示', {
					confirmButtonText: '确定',
					callback: action => {
						this.$router.push('/serve/day_set/index')
					}
				});
			} else {
				this.$router.push('/serve/day_set/index')
			}
		},
		computed: {
			...mapGetters(["user_data"])
		},
		
		components:{
			QRCode
		},

		mounted() {
			this.$refs.agreement.addEventListener('scroll', () => {
				if(this.$refs.agreement.scrollHeight - parseInt(this.$refs.agreement.scrollTop) === this.$refs.agreement.clientHeight) {
					this.alreadyRead = true
				}
			})
		},
		methods: {
			payevent: function(index, event) {
				this.currentpay = index;
				this.payOrder();
			},
			payOrder() {
				if(this.currentpay === 0) {
					this.codetext = "正在生成微信二维码";
				} else if(this.currentpay === 1) {
					this.codetext = "正在创建支付宝订单";
				}
				this.postRequest(sms.pay, {
						pay_way: this.currentpay + 1,
						money: this.paymoney
					})
					.then(res => {
						console.log("payOrder", res, this.currentpay);
						if(this.currentpay == 0) {
							//微信
							this.codetext =
								"请用微信扫描支付,支付完成后请点击余额后面的刷新按钮查看余额,网络可能有少许延时,如支付成功后1小时余额仍未增加,请联系我们";
							let canvas = document.getElementById("canvas");
							QRCode.toCanvas(
								canvas,
								res, {
									errorCorrectionLevel: "H"
								},
								error => {
									if(error) {
										this.$message({
											type: "info",
											message: "微信支付码生成失败"
										});
									}
								}
							);
						} else {
							this.codetext = "创建支付宝订单成功,跳转支付宝支付";
							//支付宝
							let aliForm = document.getElementById("aliForm");
							aliForm.innerHTML = res;
							document.forms["alipay_submit"].submit();
						}
					})
					.catch(err => {});
			},
			stopBubble() {
				console.log('不用上传图片')
				return
			},
			previewAgreement() {
				console.log('预览图片')
				this.agreementBig = true;
			},
			previewLicense() {
				console.log('预览图片')
				this.licenseBig = true;
			},
			changeAgreement() {
				console.log('切换图片')
			},
			changeLicense() {
				console.log('切换图片')
			},
			delAgreement() {
				console.log('删除图片')
				this.picAgreement = {}
				this.agreementUrl = ''
			},
			delLicense() {
				console.log('删除图片')
				this.picLicense = {}
				this.licenseUrl = ''
			},
			beforeAgreementUpload(file) {
				console.log('图片上传之前')
				const _self = this;
				const _URL = window.URL || window.webkitURL;
				const fileName = file.uid;
				return new Promise((resolve, reject) => {
					let Sync = async() => {
						try {
							let picKey = await checkPic(file);
							if(picKey) {
								let token = await this.getRequest(
									"/qiniu/userGetQiniuUpToken?key=" + picKey
								);
								this.picAgreement = token;
								this.picAgreement.uid = file.uid;
								resolve(true);
							} else {
								reject(false);
							}
						} catch(error) {
							reject(false);
						}
					};
					Sync();
				});
			},
			beforeLicenseUpload(file) {
				console.log('图片上传之前')
				const _self = this;
				const _URL = window.URL || window.webkitURL;
				const fileName = file.uid;
				return new Promise((resolve, reject) => {
					let Sync = async() => {
						try {
							let picKey = await checkPic(file);
							if(picKey) {
								let token = await this.getRequest(
									"/qiniu/userGetQiniuUpToken?key=" + picKey
								);
								this.picLicense = token;
								this.picLicense.uid = file.uid;
								resolve(true);
							} else {
								reject(false);
							}
						} catch(error) {
							reject(false);
						}
					};
					Sync();
				});
			},
			handleAgreementSuccess(file) {
				console.log('图片上传成功', file)
				this.agreementUrl = this.$qiniuHost + file.key
				this.hireForm.contract = file.key
			},
			handleLicenseSuccess(file) {
				console.log('图片上传成功', file)
				this.licenseUrl = this.$qiniuHost + file.key
				this.hireForm.license = file.key
			},
			handleSubmit() {

			},
			next(index, formName) {
				if(index == 1) {
					if(this.isAgree) {
						this.onSecond = true
						document.body.scrollTop = 0
						document.documentElement.scrollTop = 0
					} else {
						this.$message.error('需同意平台协议才能进行下一步操作')
						return
					}
				} else if(index == 2) {
					this.onThird = true
//					this.hireForm.address = this.hireForm.selectAddress + this.hireForm.addressDetail
//					this.$refs[formName].validate((valid) => {
//						if(valid) {
//							this.postRequest(applyHire.applyHire, this.hireForm).then(res => {
//								console.log(res, '请求返回')
//								this.onThird = true
//								document.body.scrollTop = 0
//								document.documentElement.scrollTop = 0
//							}).catch(err => {})
//						} else {
//							this.$message.error('请填写完整所有信息')
//							return false;
//						}
//					});
				} else if(index == 3) {
					this.onThird = false;
					this.onFour = true;
				}
			},
			back(index) {
				if(index==1){
					this.onSecond = false
					this.$router.back()
				}
				else if(index==2){
					this.onSecond = false;
					document.body.scrollTop = 0;
					document.documentElement.scrollTop = 0;
				}
				else if(index==3){
					this.onThird=false;
				}
			},
			readAgreement() {

			},
			testShopPhone() {

			},
			testContactPhone() {

			},
			testEmail() {

			},
			readDoc() {
				window.location.href = './1.doc'
			},
			handleAvatarSuccess(res, file) {
				this.agreementUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				// const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2M;
			},
			cityChange(val) {
				console.log(val, '选择的城市')
			},
			previewWord() {
				// window.open('http://view.officeapps.live.com/op/view.aspx?src=https://pic.paitume.com/%E5%90%88%E5%90%8C.docx')
				window.open('https://docs.google.com/gview?url=https://pic.paitume.com/%E5%90%88%E5%90%8C.docx&embedded=true')
			},
			downLoad() {
				window.open('https://pic.paitume.com/%E5%90%88%E5%90%8C.docx?' + (new Date()).valueOf())
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
			.bg-hire_head {}
		}
		.hire-progress {
			height: 100px;
			background: #FAFAFA;
			// justify-content: space-between;
			.progress-center {
				width: 1200px;
				margin: 0 auto;
				display: flex;
				.progress-item {
					padding-top: 20px;
					box-sizing: border-box;
					// width: 144px;
					height: 100%;
					// background: pink;
					text-align: center;
					div {
						width: 36px;
						margin: 0 auto;
						height: 36px;
						line-height: 36px;
						// background: #789987;
						background: rgb(255, 255, 255);
						border: 1px solid #D9D9D9;
						color: #D9D9D9;
						border-radius: 50%;
						text-align: center;
						margin-bottom: 6px;
					}
				}
				.progress-active {
					div {
						border: 1px solid rgb(101, 31, 255);
						color: rgb(101, 31, 255);
					}
				}
				.line {
					height: 37px;
					flex: 1;
					background: none;
					margin: 0;
					border-bottom: 2px dashed #D9D9D9;
				}
			}
		}
		.first-step {
			// padding: 20px 360px 0;
			box-sizing: border-box;
			.first-center {
				width: 1200px;
				margin: 0 auto;
				.agreement-wrap {
					height: 500px;
					overflow: auto;
					background: #fff;
					padding: 40px 30px 30px;
					margin-bottom: 30px;
					h3 {
						margin-top: 50px;
					}
					p:not(.no-indent) {
						text-indent: 3em;
					}
					p {
						line-height: 40px;
					}
				}
				/*修改滚动条样式*/
				.agreement-wrap::-webkit-scrollbar {
					width: 10px;
					height: 10px;
					/**/
				}
				.agreement-wrap::-webkit-scrollbar-track {
					background: rgb(239, 239, 239);
					border-radius: 2px;
				}
				.agreement-wrap::-webkit-scrollbar-thumb {
					background: #bfbfbf;
					border-radius: 10px;
				}
				.agreement-wrap::-webkit-scrollbar-thumb:hover {
					background: #333;
				}
				.agreement-wrap::-webkit-scrollbar-corner {
					background: #179a16;
				}
				.i-agree {
					margin-bottom: 30px;
					padding-left: 30px;
					box-sizing: border-box;
					opacity: 0;
					.el-checkbox {
						margin-right: 0;
					}
					.agree-what {
						color: #5A1CE3;
					}
				}
				.next-cancel {
					margin-bottom: 30px;
					padding-left: 30px;
					box-sizing: border-box;
					opacity: 0;
					.el-button:first-child {
						background: #5A1BE5;
						color: #fff;
						border-radius: 0;
					}
					.el-button:last-child {
						color: #999;
						background: #fafafa;
					}
				}
				.already {
					opacity: 1;
				}
			}
		}
		.second-step {
			width: 1200px;
			margin: 0 auto;
			padding-bottom: 49px;
			box-sizing: border-box;
			.el-form {
				// height: 606px;
				border: 1px solid rgb(240, 240, 240);
				padding: 30px 0;
				box-sizing: border-box;
				background: #fff;
				.el-form-item {
					padding: 0 30px;
					box-sizing: border-box;
				}
				.address {
					/deep/ .el-form-item__content {
						display: flex;
					}
					.selectAddress {
						margin-right: 50px;
						padding: 0;
						/deep/ {
							.el-form-item__content {
								margin-left: 0!important;
							}
							.el-input__inner {
								width: 300px;
							}
						}
					}
					.inputAddress {
						flex: 1;
						padding: 0;
						/deep/ {
							.el-form-item__content {
								margin-left: 0!important;
							}
						}
					}
				}
				.people {
					margin-bottom: 30px;
					/deep/ {
						.el-input {
							width: 180px;
							margin-right: 20px;
						}
					}
				}
				.grey-line {
					height: 8px;
					background: rgb(250, 250, 250);
					margin-bottom: 29px;
				}
				.upload-license,
				.upload-agreement {
					.upload-wrap {
						margin-right: 10px;
						p {
							font-size: 8px;
							color: #999999;
						}
					}
					/deep/ {
						.el-upload--picture-card {
							// width: 98px;
							width: 139px;
							height: 139px;
							width: 100%;
							height: 100%;
							background: rgba(250, 250, 250, 1);
							border: 1px solid rgba(240, 240, 240, 1);
						}
						.avatar-uploader .el-upload {
							// width: 98px;
							width: 139px;
							height: 139px;
							line-height: 139px;
							background: rgb(250, 250, 250, );
							border: 1px solid rgb(240, 240, 240);
							// border-radius: 6px;
							cursor: pointer;
							position: relative;
							overflow: hidden;
							.avatar {
								// width: 98px;
								width: 139px;
								height: 139px;
								display: block;
								z-index: 998;
							}
							.layer {
								width: 100%;
								height: 100%;
								background: #000;
								opacity: 0.7;
								display: flex;
								visibility: hidden;
								position: absolute;
								left: 0;
								top: 0;
								z-index: 999;
								.layer-left {
									// background: #123789;
									flex: 1;
								}
								.layer-right {
									// background: #789456;
									flex: 1;
								}
								.layer-center {
									flex: 1;
									display: flex;
									flex-direction: column;
									// background: #852569;
									.el-icon-view,
									.el-icon-edit,
									.el-icon-delete {
										font-size: 20px;
										color: #fff;
										flex: 1;
										display: flex;
										justify-content: center;
										align-items: center;
									}
									.el-icon-view:hover,
									.el-icon-edit:hover,
									.el-icon-delete:hover {
										// background: #FF641F;
									}
								}
							}
						}
						.avatar-uploader .el-upload:hover {
							// border-color: #409EFF;
							.layer {
								visibility: visible;
							}
						}
						.avatar-uploader+p {
							font-size: 14px;
						}
						.avatar-uploader-icon {
							font-size: 28px;
							color: #8c939d;
							width: 32px;
							height: 32px;
							text-align: center;
						}
					}
					.message-tip {
						p {
							line-height: 25px;
							.color-word {
								// color: #FF641F;
							}
						}
						p:nth-child(2) {
							margin-bottom: 29px;
						}
						p:last-child {
							color: #1D7AD2;
							span {
								margin-right: 10px;
								cursor: pointer;
							}
						}
					}
				}
				.upload-license {
					margin-bottom: 62px;
					/deep/ {
						.el-form-item__label {
							padding-right: 0;
						}
					}
				}
				.bottom-btn {
					padding-left: 36px;
					box-sizing: border-box;
					.el-button:first-child {
						background: #5A1BE5;
						color: #fff;
						border-radius: 0;
					}
					.el-button:last-child {
						color: #999;
					}
				}
				/deep/ {
					.el-form-item {
						.el-form-item__label {
							width: 120px !important;
							text-align: left;
						}
						.el-form-item__content {
							margin-left: 100px !important;
							display: flex;
							.el-radio {
								display: flex;
								align-items: center;
							}
						}
					}
					.el-input__inner {
						background: #F0F0F0;
					}
				}
				// .i-agree{
				//   .el-checkbox{
				//     margin-right: 0;
				//   }
				//   .agree-word{
				//     color: #5A1CE3;
				//     cursor: pointer;
				//   }
				// }
			}
		}
		// .second-step{
		//   padding: 20px 360px 30px;
		//   .el-form{
		//     height: 706px;
		//     border:1px solid rgb(240,240,240);
		//   }
		// }
		.third-step {
			width: 1200px;
			margin: 0 auto;
			padding-bottom: 49px;
			box-sizing: border-box;
			.third-center {
				background: #fff;
				border: 1px solid rgb(240, 240, 240);
				height: 706px;
				padding-top: 188px;
				text-align: center;
				.succ {
					width: 72px;
					height: 72px;
					margin-bottom: 12px;
				}
				.bg-third_step {
					width: 72px;
					height: 72px;
					// background: url('http://pic.paitume.com/css_sprites.png') -202px -120px;
				}
				.tip {
					font-size: 20px;
					color: #5F1DEE;
					font-weight: 600;
					margin-bottom: 10px;
				}
				.msg {
					margin-bottom: 10px;
					span {
						color: #5F1DEE;
					}
				}
				.btn {
					display: inline-block;
					width: 80px;
					height: 34px;
					line-height: 34px;
					background: linear-gradient(180deg, rgba(246, 246, 246, 1) 0%, rgba(235, 235, 235, 1) 100%);
					cursor: pointer;
				}
			}
		}
	}
</style>