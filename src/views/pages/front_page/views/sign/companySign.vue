<template>
  <div class="wrap">
    <div class="title">入驻流程</div>
    <join-progress :curStep="curStep-0"></join-progress>
    <!-- <el-steps :active="curStep" align-center finish-status="success">
      <el-step title="签署协议"></el-step>
      <el-step title="上传资料"></el-step>
      <el-step title="缴纳保证金"></el-step>
      <el-step title="平台审核"></el-step>
      <el-step title="申请成功"></el-step>
    </el-steps> -->
    <!-- 第一步 -->
    <div class="first-step" v-show="showStep[0].isShow">
      <div class="agreement">
        协议协议
      </div>
      <el-checkbox v-model="isAgree">
        <span>我已阅读并且同意</span>
        <span>《派图租赁平台入驻协议》</span>
      </el-checkbox>
    </div>
    <!-- 第二步 -->
    <div class="second-step" v-show="showStep[1].isShow">
      <el-form label-position="left" :rules="rules" ref="form" :model="form" label-width="180px">
        <p>一、店铺资料</p>
        <el-form-item label="店铺名称：" prop="nick">
          <el-input v-model="form.nick" placeholder='长度在2到64之间'></el-input>
        </el-form-item>
        <el-form-item label="店铺logo：" class="form-item-logo" prop='logo'>
          <clipper
            border-color="#DCDFE6"
            bg-color="#fff"
            :showPen="true"
            :resultWidth="285"
            :imgList="logoArr"
            @delSuccess="delLogoSuccess"
            @uploadSuccess="uploadLogoSuccess"
            :uploadWidth="148"
            :uploadHeight="148"
            :ratio="1"
          ></clipper>
          <div class="under-logo">请上传店铺logo</div>
        </el-form-item>
        <p class="two-point">二、公司资料</p>
        <el-form-item label="公司名称：" prop="company_name">
          <el-input v-model="form.company_name"></el-input>
        </el-form-item>
        <el-form-item label="公司地址：" prop="company_address">
          <el-input v-model="form.company_address" placeholder='长度在2到256之间'></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码：" prop="company_code">
          <el-input v-model="form.company_code" placeholder='长度在15到18之间'></el-input>
        </el-form-item>
        <el-form-item label="办公电话：" prop="company_phone">
          <el-input v-model="form.company_phone"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名：" prop="legal_persona_name">
          <el-input v-model="form.legal_persona_name" placeholder='长度在2到32之间'></el-input>
        </el-form-item>
        <el-form-item label="法人身份证：" prop="true_card">
          <el-input v-model="form.true_card"></el-input>
        </el-form-item>
        <el-form-item label="联系手机：" prop="contact_phone">
          <el-input v-model="form.contact_phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="上传营业执照：" class="license-upload" prop='company_license_pic_qiniu'>
          <el-upload class="avatar-uploader" :on-success="handleSuccess4" :before-upload="beforeUpload" :data="idToken" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
            <img v-if="form.company_license_pic_qiniu" :src="$qiniuHost+form.company_license_pic_qiniu" class="avatar">
            <div class="layer" v-if="form.company_license_pic_qiniu">
              <div class="layer-left" @click.stop="stopBubble"></div>
              <div class="layer-center">
                <i class="el-icon-view" @click.stop="previewImg(4)"></i>
                <i class="el-icon-edit" @click="changeImg(4)"></i>
                <i class="el-icon-delete" @click.stop="delImg(4)"></i>
              </div>
              <div class="layer-right" @click.stop="stopBubble"></div>
            </div>
            <i v-if="!form.company_license_pic_qiniu" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="under-license">请上传营业执照</div>
          <el-dialog :visible.sync="isPreview4">
            <img width="100%" class="el-img" :src="$qiniuHost+form.company_license_pic_qiniu" alt />
          </el-dialog>
        </el-form-item>  
        
        <el-form-item label="法人身份证（正反面、手持）照片：" label-width="300px" class="id-card" prop='card'>
          <div class="front-id">
            <el-upload class="avatar-uploader" :on-success="handleSuccess1" :before-upload="beforeUpload" :data="idToken" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
              <img v-if="form.id_card_copy_qiniu" :src="$qiniuHost+form.id_card_copy_qiniu" class="avatar">
              <div class="layer" v-if="form.id_card_copy_qiniu">
                <div class="layer-left" @click.stop="stopBubble"></div>
                <div class="layer-center">
                  <i class="el-icon-view" @click.stop="previewImg(1)"></i>
                  <i class="el-icon-edit" @click="changeImg(1)"></i>
                  <i class="el-icon-delete" @click.stop="delImg(1)"></i>
                </div>
                <div class="layer-right" @click.stop="stopBubble"></div>
              </div>
              <img class="init-img" v-if="!form.id_card_copy_qiniu" src="https://pic.paitume.com/images/front_id.png">
              <!-- <i v-if="!form.id_card_copy_qiniu" class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
            <div class="little-label">正面</div>
            <el-dialog :visible.sync="isPreview1">
              <img width="100%" class="el-img" :src="$qiniuHost+form.id_card_copy_qiniu" alt />
            </el-dialog>
          </div>
          <div class="back-id">
            <el-upload class="avatar-uploader" :on-success="handleSuccess2" :before-upload="beforeUpload" :data="idToken" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
              <img v-if="form.id_card_national_qiniu" :src="$qiniuHost+form.id_card_national_qiniu" class="avatar">
              <div class="layer" v-if="form.id_card_national_qiniu">
                <div class="layer-left" @click.stop="stopBubble"></div>
                <div class="layer-center">
                  <i class="el-icon-view" @click.stop="previewImg(2)"></i>
                  <i class="el-icon-edit" @click="changeImg(2)"></i>
                  <i class="el-icon-delete" @click.stop="delImg(2)"></i>
                </div>
                <div class="layer-right" @click.stop="stopBubble"></div>
              </div>
              <img class="init-img" v-if="!form.id_card_national_qiniu" src="https://pic.paitume.com/images/back_id.png">
              <!-- <i v-if="!form.id_card_national_qiniu" class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
            <div class="little-label">反面</div>
            <el-dialog :visible.sync="isPreview2">
              <img width="100%" class="el-img" :src="$qiniuHost+form.id_card_national_qiniu" alt />
            </el-dialog>
          </div>
          <div class="hold-id">
            <el-upload class="avatar-uploader" :on-success="handleSuccess3" :before-upload="beforeUpload" :data="idToken" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
              <img v-if="form.id_card_handle_qiniu" :src="$qiniuHost+form.id_card_handle_qiniu" class="avatar">
              <div class="layer" v-if="form.id_card_handle_qiniu">
                <div class="layer-left" @click.stop="stopBubble"></div>
                <div class="layer-center">
                  <i class="el-icon-view" @click.stop="previewImg(3)"></i>
                  <i class="el-icon-edit" @click="changeImg(3)"></i>
                  <i class="el-icon-delete" @click.stop="delImg(3)"></i>
                </div>
                <div class="layer-right" @click.stop="stopBubble"></div>
              </div>
              <img class="init-img" v-if="!form.id_card_handle_qiniu" src="https://pic.paitume.com/images/hold_id.png">
              <!-- <i v-if="!form.id_card_handle_qiniu" class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
            <div class="little-label">手持正面</div>
            <el-dialog :visible.sync="isPreview3">
              <img width="100%" class="el-img" :src="$qiniuHost+form.id_card_handle_qiniu" alt />
            </el-dialog>
          </div>
        </el-form-item>
        <p class="three-point">三、结算账户</p>
        <el-form-item label="对公账户银行" prop="company_account_bank">
          <el-select v-model="form.company_account_bank" placeholder="请选择">
            <el-option
              v-for="item in banklist"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
<!--         
        <el-form-item label="对公账户银行：" prop="company_account_bank">
          <el-input v-model="form.company_account_bank"></el-input>
        </el-form-item> -->
        <el-form-item label="对公账户银行城市：" prop="company_bank_address_code">
          <!-- <el-input v-model="form.company_bank_address_code"></el-input> -->
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="selectCity">
          </el-cascader>
        </el-form-item>
        <el-form-item label="对公账户银行全称：" prop="company_bank_name">
          <el-input v-model="form.company_bank_name"></el-input>
        </el-form-item>
        <el-form-item label="银行账号：" prop="company_account_number">
          <el-input v-model="form.company_account_number"></el-input>
        </el-form-item>
        <el-form-item label="承诺书：" class="promise-paper" prop='company_paper_qiniu'>
          <div class="promise">
            <el-upload class="avatar-uploader" :on-success="handleSuccess5" :before-upload="beforeUpload" :data="idToken" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
              <img v-if="form.company_paper_qiniu" :src="$qiniuHost+form.company_paper_qiniu" class="avatar">
              <div class="layer" v-if="form.company_paper_qiniu">
                <div class="layer-left" @click.stop="stopBubble"></div>
                <div class="layer-center">
                  <i class="el-icon-view" @click.stop="previewImg(5)"></i>
                  <i class="el-icon-edit" @click="changeImg(5)"></i>
                  <i class="el-icon-delete" @click.stop="delImg(5)"></i>
                </div>
                <div class="layer-right" @click.stop="stopBubble"></div>
              </div>
              <i v-if="!form.company_paper_qiniu" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="download-label">
              <span>点击下载</span>
              <span>《派图租赁商家结算账户声明》</span>
              <span>范本</span>
            </div>
          </div>
          <el-dialog :visible.sync="isPreview5">
            <img width="100%" class="el-img" :src="$qiniuHost+form.company_paper_qiniu" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
    <!-- 第三步 -->
    <div class="third-step" v-if="showStep[2].isShow">
			<p class="role-label">
				<span>您选择签约的账户类型为：</span>
				<span>{{joinRole}}</span>
			</p>
			<p class="price-label">
				<span>请支付保证金：</span>
				<span>1元</span>
			</p>
			<p class="pay-label">请选择支付方式：</p>
			<div class="pay-ways">
				<div :class="{'active':curIndex==(index+1)}" v-for="(item,index) in payList" :key="index" @click="selectPayWay(index+1)">
					<ali-svg-icon :icon-class="item.iconClass" :class-name="item.iconClass"></ali-svg-icon>
					<span>{{item.name}}</span>
				</div>
			</div>

			<div ref="alipay"></div>

			<div clas="qr-code">
				<canvas ref="canvas" class="canvas-size"></canvas>
			</div>
			<div @click="mockPay" v-if="false">模拟支付完成</div>
			<div class="question">
				<p>常见问题：</p>
				<div>
					<p>为什么要缴纳保证金？</p>
					<span>为了规范服务提供者的服务，保护客户的权益及样品安全，入驻平台提供服务的相关服务者都需要缴纳保证金。 什么时候可以退还？在您决定不使用我们派图提供的服务时，保证金在一个工作日内退还到您的指定账户。</span>
				</div>
				<p>什么时候保证金可以退还？</p>
			</div>
		</div>
    <!-- 第四步 -->
    <div class="fouth-step" v-if="showStep[3].isShow">
      <ali-svg-icon icon-class="dengdais" class-name="dengdais"></ali-svg-icon>
      <p class="first-line">您的资料已经提交，平台正在审核中...</p>
      <p class="second-line">预计需要1-3个工作日</p>
      <p class="third-line">审核结果，我们将通过<span class="purple-text">短信、邮件</span>进行通知，请您注意查收~</p>
    </div>
    <!-- 第五步 -->
    <div class="fifth-step" v-if="showStep[4].isShow">
      <ali-svg-icon icon-class="succ" class-name="succ"></ali-svg-icon>
      <p class="first-line">恭喜您！</p>
      <p class="second-line">您的审核已经通过！</p>
      <p class="add-server" @click="toAddModel">返回主页</p>
    </div>
    <div class="footer">
      <el-button class="prev" type="primary" @click="prev" v-if="showStep[1].isShow">上一步</el-button>
      <el-button class="next" type="primary" :disabled="showStep[0].isShow&&!isAgree" @click="next" v-if="showStep[0].isShow||showStep[1].isShow">下一步</el-button>
      <span class="back-btn" v-if="showStep[0].isShow" @click="back">返回</span>
    </div>
  </div>
</template>

<script>
import clipper from "FrontComponents/photoClipper";
import JoinProgress from "FrontComponents/joinProgress";
import { checkPic } from '@util/picUtil.js'
import {apply} from '@config/api.js'
import QRcode from "qrcode";
import { provinceAndCityData } from 'element-china-area-data'
import { mapGetters } from "vuex";
import { city,banklist } from '../../../serve_page/views/msm/smallpro/components/Agreement'


  export default {
    data(){
      var checkLogo = (rule, value, callback) => {
      if (!this.form.logo) {
        return callback(new Error("logo不能为空"));
      } else {
        callback();
      }
      };
      var checkCompany_license_pic_qiniu = (rule, value, callback) => {
      if (!this.form.company_license_pic_qiniu) {
          return callback(new Error("营业执照图片不能为空"));
        } else {
          callback();
        }
      };
      var checkCard = (rule, value, callback) => {
      if (!this.form.id_card_copy_qiniu||!this.form.id_card_national_qiniu||!this.form.id_card_handle_qiniu) {
          return callback(new Error("身份证照片不可缺少"));
        } else {
          callback();
        }
      };
      var checkCompany_paper_qiniu = (rule, value, callback) => {
      if (!this.form.company_paper_qiniu) {
          return callback(new Error("承诺书不能为空"));
        } else {
          callback();
        }
      };
      return{
        banklist,
        options: [],
        selectedOptions: [],
        curStep:1,
        isAgree:false,
        showStep:[
          {
            isShow:true,
          },
          {
            isShow:false,
          },
          {
            isShow:false,
          },
          {
            isShow:false,
          },
          {
            isShow:false,
          },
        ],
        form: {
          type:1,
          company_type:0,
          nick:'',
          logo:'',
          company_name:'',
          company_address:'',
          company_code:'',
          company_license_pic_qiniu:'',
          legal_persona_name:'',
          id_card_copy_qiniu:'',
          id_card_national_qiniu:'',
          id_card_handle_qiniu:'',
          contact_phone:'',
          company_phone:'',
          company_account_bank:'',
          company_bank_address_code:'',
          company_bank_name:'',
          company_account_number:'',
          company_paper_qiniu:'',
          true_card:'',
          email:'',
        },
        rules: {
          nick: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          logo:[
            {required: true,
            validator: checkLogo,
            trigger: "blur"}
          ],
          company_license_pic_qiniu:[
            {required: true,
            validator: checkCompany_license_pic_qiniu,
            trigger: "blur"}
          ],
          card:[
            {required: true,
            validator: checkCard,
            trigger: "blur"}
          ],
          company_paper_qiniu:[
            {required: true,
            validator: checkCompany_paper_qiniu,
            trigger: "blur"}
          ],
          company_name: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
          ],
          company_address: [
            { required: true, message: '请输入企业地址', trigger: 'blur' },
          ],
          company_code: [
            { required: true, message: '请输入营业执照号码', trigger: 'blur' },
          ],
          legal_persona_name: [
            { required: true, message: '请输入法人姓名', trigger: 'blur' },
          ],
          contact_phone: [
            { required: true, message: '请输入法人电话', trigger: 'blur' },
          ],
          company_phone: [
            { required: true, message: '请输入公司电话', trigger: 'blur' },
          ],
          company_account_bank: [
            { required: true, message: '请输入对公账户银行', trigger: 'blur' },
          ],
          company_bank_address_code: [
            { required: true, message: '请输入对公账户银行城市编码', trigger: 'change' },
          ],
          company_bank_name: [
            { required: true, message: '请输入对公户银行全称含支行', trigger: 'blur' },
          ],
          company_account_number: [
            { required: true, message: '请输入对公账号', trigger: 'blur' },
          ],
          true_card: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ ,  message: '身份证号码不正确', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email',message: '请输入正确的邮箱地址',trigger: 'blur'}
          ],
        },
        idToken:{},
        isPreview1:false,
        isPreview2:false,
        isPreview3:false,
        isPreview4:false,
        isPreview5:false,
        logoArr:[{key:''}],
        joinRole:'',
        // radio: 1,
        pay_data: {
          id: "",
          pay_way: "",
          price: ""
        },
        curIndex: 1, //当前选择的支付方式 1/微信，2/支付宝,3/银联支付
        payList: [{
						iconClass: 'weixin',
						name: '微信支付'
					},
					{
						iconClass: 'aliApy_round',
						name: '支付宝支付'
					},
					{
						iconClass: 'yinlian',
						name: '银联支付'
					},
				],
      }
    },
    components:{
      clipper,
      JoinProgress
    },
    computed: {
      ...mapGetters(["sign_info", "user_data","joinPayStatus"])
    },
    watch:{
      joinPayStatus(val){
				console.log('保证金支付状态-------------',val);
        this.next()
      }
    },
    created(){
      console.warn(this.$staticAllCityArray,'所有城市')
      // console.warn(city(this),'城市22')
      this.options=city(this)
      console.warn(this.sign_info,'sign数据持久')
      switch(this.sign_info.role){
        case 1:
          this.joinRole='租赁商'
          this.form.company_type=1
          break
        case 2:
          this.joinRole='摄影公司'
          this.form.company_type=2
          break
        case 3:
          this.joinRole='模特经纪公司'
          this.form.company_type=3
          break
        case 4:
          this.joinRole='MCN公司'
          this.form.company_type=4
          break
      }

      this.postRequest(apply.get, {
        type: 1,
        company_type: this.form.company_type
      }).then(res=>{
        this.$store.commit("SET_SIGN", {
          type: 1,
          role: this.sign_info.role,
          progress: res.progress
        });
      }).catch(err=>{
        console.error(err)
      })

      this.curStep=this.sign_info.progress
      this.showStep.forEach(item=>{
        item.isShow=false
      })
      this.showStep[this.curStep-1].isShow=true
      if(this.curStep==3||this.sign_info.progress==3){
        this.selectPayWay(1)
      }
    },
    methods:{
    	//跳转到商家后台服务管理
		toAddService() {
			this.util.toAddService();
		},
		//跳转到后台模特管理
		toAddModel(){
      this.$router.push('/')
		},
      back(){
        this.$router.back()
      },
      selectCity (value) {
        console.warn(value,'选择城市')
        this.form.company_bank_address_code=value[1]
      },
      prev(){
        if(this.curStep==1){
          this.$router.back()
        }else{
          this.curStep--
          this.showStep.forEach(item=>{
            item.isShow=false
          })
          this.showStep[this.curStep-1].isShow=true
        }
      },
      next(){
        if(this.curStep==1){
          this.toNextStep()
        }else if(this.curStep==2){
          console.warn(this.form,'提交的表单')
          let hasNull=Object.keys(this.form).some(item=>{
            return this.form[item].length==0
          })
          if(hasNull){
            // this.$message.error('请填写完所有信息再进行下一步')
            // return
          }
          this.postRequest(apply.apply,{...this.form}).then(res=>{
            this.toNextStep()
            this.selectPayWay(1)
          }).catch(err=>{
            console.error(err,'出错了')
          })
        }else if(this.curStep==3){
          this.toNextStep()
        }
      },
      toNextStep(){
        this.curStep++
        this.$store.commit('SET_SIGN',{type:1,role:this.sign_info.role,progress:this.curStep})
        this.showStep.forEach(item=>{
          item.isShow=false
        })
        this.showStep[this.curStep-1].isShow=true
      },
      delLogoSuccess(data){
        this.form.logo=''
      },
      uploadLogoSuccess(data){
        this.form.logo=data
      },
      beforeUpload(file) {
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
                this.idToken = token;
                this.idToken.uid = file.uid;
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
      handleSuccess1(file) {
        this.form.id_card_copy_qiniu=file.key
      },
      handleSuccess2(file) {
        this.form.id_card_national_qiniu=file.key
      },
      handleSuccess3(file) {
        this.form.id_card_handle_qiniu=file.key
      },
      handleSuccess4(file) {
        this.form.company_license_pic_qiniu=file.key
      },
      handleSuccess5(file) {
        this.form.company_paper_qiniu=file.key
      },
      stopBubble() {
				return
      },
      previewImg(i) {
        switch(i){
          case 1:
            this.isPreview1=true;
            this.isPreview2=false;
            this.isPreview3=false;
            this.isPreview4=false;
            this.isPreview5=false;
            break;
          case 2:
            this.isPreview1=false;
            this.isPreview2=true;
            this.isPreview3=false;
            this.isPreview4=false;
            this.isPreview5=false;
            break;
          case 3:
            this.isPreview1=false;
            this.isPreview2=false;
            this.isPreview3=true;
            this.isPreview4=false;
            this.isPreview5=false;
            break;
          case 4:
            this.isPreview1=false;
            this.isPreview2=false;
            this.isPreview3=false;
            this.isPreview4=true;
            this.isPreview5=false;
            break;
          case 5:
            this.isPreview1=false;
            this.isPreview2=false;
            this.isPreview3=false;
            this.isPreview4=false;
            this.isPreview5=true;
            break;
        }
      },
      changeImg() {
      },
      delImg(i) {
        this.idToken = {}
        switch(i){
          case 1:
            this.form.id_card_copy_qiniu=''
            break;
          case 2:
            this.form.id_card_national_qiniu=''
            break;
          case 3:
            this.form.id_card_handle_qiniu=''
            break;
          case 4:
            this.form.company_license_pic_qiniu=''
            break;
          case 5:
            this.form.company_paper_qiniu=''
            break;
        }
      },
      selectPayWay(val){
      	this.curIndex = val;
        this.postRequest(apply.pay,{
          pay_way:val,
          type:1,
          company_type:this.form.company_type,
          personal_type:0
          }).then(res=>{
          if (val==1) {
            let canvas = this.$refs.canvas;
            QRcode.toCanvas(
                  canvas, res, {
                      errorCorrectionLevel: "H"
                  },
                  error => {
                      if (error) {
                          this.$message({
                              type: "info",
                              message: "微信支付码生成失败"
                          });
                      }
                  }
              );
          } else if(val==2) {
              //支付宝
              this.$refs.alipay.innerHTML = res;
              document.forms["alipay_submit"].submit();
          }
        }).catch(err=>{
          console.error(err)
        })
      },
      getApplyProgress(){
        this.getRequest(apply.get,{type:2}).then(res=>{
        }).catch(err=>{
          console.error(err)
        })
      },
      addServer(){

      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
  color: #333;
  .title{
    font-size: 40px;
    text-align: center;
    margin-bottom: 50px;
  }
  .el-steps{
    margin-bottom: 80px;
  }
  .first-step{
    margin-top: 30px;
    .agreement{
      height: 250px;
      overflow-y: auto;
      padding: 20px;
      background: #fff;
    }
    .el-checkbox{
      margin: 30px 0;
      font-size: 16px;
      color: #333;
      span:nth-child(2){
        color: #651fff;
      }
    }
  }
  .second-step{
    background: #fff;
    margin-top: 23px;
    padding: 60px;
    .el-form{
      .id-card,.license-upload,.promise-paper{
        /deep/ {
          .el-upload {
            line-height: 139px;
            background: rgb(250, 250, 250, );
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            border-radius: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .avatar {
              // width: 98px;
              width: 100%;
              height: 100%;
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
              }
            }
          }
          .el-upload:hover {
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
      }
      .id-card{
        display: flex;
        flex-direction: column;
        /deep/ {
          .el-form-item__label{
            margin-bottom: 30px;
          }
          .el-form-item__content{
            margin-left: 180px!important;
            width: fit-content;
            display: flex;
            .front-id,.back-id{
              margin-right: 30px;
            }
            .little-label{
              font-size: 10px;
              color: #999;
              // margin-top: 10px;
              text-align: center;
            }
          }
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
            width: 200px;
            height: 126px;
            line-height: 139px;
            background: rgb(250, 250, 250, );
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            border-radius: 0;
            display: flex;
            justify-content: center;
            align-items: center;
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
              }
            }
          }
          .init-img{
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
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
      }
      .license-upload{
        margin-bottom: 30px;
        /deep/{
          .el-form-item__content{
            width: fit-content;
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
              width: 108px;
              height: 144px;
              line-height: 144px;
              background: rgb(250, 250, 250, );
              border: none;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              border-radius: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              .avatar {
                // width: 98px;
                width: 108px;
                height: 144px;
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
        }
        .under-license{
          font-size: 10px;
          color: #999;
          text-align: center;
        }
      }
      .promise-paper{
        /deep/{
          .el-upload{
            width: 112px;
            height: 112px;
            line-height: 112px;
            background: #F0F0F0;
            border-radius: 0;
            border: 1px solid #F0F0F0;
          }
        }
        .promise{
          display: flex;
          align-items: center;
          .download-label{
            margin-left: 20px;
            span:nth-child(2){
              color: #FF641F;
              cursor: pointer;
            }
          }
        }
      }
      p{
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-bottom: 30px;
      }
      .two-point,.three-point{
        border-top: 1px solid #F0F0F0;
        padding-top: 30px;
      }
      .form-item-logo{
        margin-bottom: 30px;
        /deep/{
          .el-form-item__content{
            width: fit-content;
          }
        }
        .under-logo{
          font-size: 10px;
          color: #999;
          margin-top: 8px;
          text-align: center;
        }
      }
    }
  }
  .third-step{
    background: #fff;
    margin-top: 28px;
    padding: 82px 52px 91px 42px;
    p{
      font-size: 20px;
      margin-bottom: 30px;
      span:first-child{
        color: #999;
      }
    }
    .role-label{
      span:nth-child(2){
        color: #333;
        font-weight: 500;
      }
    }
    .price-label{
      span:nth-child(2){
        color: #FF641F;
      }
    }
    .pay-label{
      color: #999;
      padding-top: 29px;
      border-top: 1px solid #F0F0F0;
    }
    .pay-ways {
		display: flex;
		margin-bottom: 50px;
		div {
			width: 180px;
			height: 52px;
			border: 1px solid #ddd;
			font-size: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 4px;
			cursor: pointer;
			margin-right: 15px;
			&:hover,
			&.active {
				border-color: $Theme-color;
			}
		}
		.svg-default {
			width: 27px;
			height: 27px;
			margin-right: 10px;
		}
	}
	.question {
		margin-top: 100px;
		color: #333;
		font-size: 16px;
		p:first-child {
			font-size: 20px;
			font-weight: 500;
		}
		p {
			margin: 0px;
			margin-bottom: 10px;
		}
		div {
			margin: 20px 0px;
			span {
				font-size: 14px;
				color: #bbb;
			}
		}
	}
  }
  .fouth-step{
    background: #fff;
    margin-top: 35px;
    padding: 160px 0 200px;
    text-align: center;
    .dengdais{
      width: 49px;
      height: 57px;
      margin-bottom: 21px;
    }
    .first-line{
      font-size: 20px;
      font-weight: 600;
      color: #651fff;
      margin-bottom: 20px;
    }
    .second-line{
      color: #333;
      margin-bottom: 10px;
    }
    .third-line{
      color: #333;
      .purple-text{
        color: #651fff;
      }
    }
  }
  .fifth-step{
    background: #fff;
    margin-top: 35px;
    padding: 179px 0 359px;
    text-align: center;
    .succ{
      width: 48px;
      height: 48px;
      margin-bottom: 12px;
    }
    .first-line{
      font-size: 18px;
      font-weight: 500;
      color: #651fff;
      margin-bottom: 10px;
    }
    .second-line{
      font-size: 18px;
      font-weight: 500;
      color: #651fff;
      margin-bottom: 30px;
    }
    .third-line{
      color: #333;
      margin-bottom: 10px;
    }
    .add-server{
      width: 98px;
      height: 32px;
      background: #F0F0F0;
      color: #651fff;
      border: 1px solid #651fff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  .footer{
    margin-top: 30px;
    .el-button.prev{
      width: 100px;
      height: 40px;
      background: #999;
      border-radius: 0;
      margin-right: 40px;
    }
    .el-button.next{
      width: 100px;
      height: 40px;
      background: #651fff;
      border-radius: 0;
      margin-right: 20px;
    }
    span{
      color: #999;
      font-weight: 500;
      cursor: pointer;
    }
  }
}
</style>