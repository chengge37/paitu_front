<template>
  <div class="wrap">
    <div class="header">发布项目</div>
    <div class="content">
      <div class="content-left">
        <el-form :model="form" :rules="formRules" ref="formRef" label-width="80px" label-position="left">
          <div class="basic-info">
            <div class="title">项目基本信息</div>
            <el-form-item label="项目名称" prop="name">
              <el-input :disabled="snType==1" placeholder="请输入" v-model="form.name"></el-input>
            </el-form-item>
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="项目类型" prop="type" required>
                  <el-select :disabled="snType==1" v-model="form.type" placeholder="请选择">
                    <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预计周期" prop="extend">
                  <el-input :disabled="snType==1" placeholder="请输入" v-model="form.extend">
                    <span slot="suffix">[天]</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="区域限制" prop="city_code" required>
                  <el-cascader
                   :disabled="snType==1"
                    :options="cityOptions"
                    v-model="form.city_code"
                    filterable
                    @change="changeCity"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="项目报价" prop="price" required>
              <div class="box-wrap">
                <!-- <el-input  type="range" id="range1" min="0" max="100" step="5"></el-input> -->
                <div class="line-part">
                  <input  :disabled="snType==1" type="range" id="range1" min="0" max="50000" step="1" v-model.number="form.price" @input="movePrice" @change="changePrice">
                  <div class="money-account" :style="`left:${moveLeft}px`">￥{{parseInt(form.price)}}</div>
                </div>
                <!-- <div class="line-part">
                  <span class="point" ref="point"></span>
                  <div class="money-account">￥{{account}}</div>
                </div> -->
                <el-input  :disabled="snType==1" v-model="form.price" prop="price" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="5">
                  <span slot="prefix">￥</span>
                </el-input>
                <!-- <el-input placeholder="请输入您的预算" v-model="account">
                  <span slot="prefix">￥</span>
                </el-input> -->
              </div>
            </el-form-item>
            <el-form-item label="技能标签" required>
              <el-select :disabled="snType==1" v-model="form.skill" multiple placeholder="请选择" @change="changeSkill">
                <el-option
                  v-for="item in skillOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>  
            </el-form-item>
            <el-form-item label="竞标限制" prop="limit_num">
              <el-input :disabled="snType==1" placeholder="请输入" v-model="form.limit_num" suffix="人" class="limit-people">
                 <span slot="suffix">人</span>
              </el-input>
            </el-form-item>
            <el-form-item label="截止日期" required>
              <el-date-picker
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                :disabled="snType==1"
                v-model="form.end_time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="need-detail">
            <div class="title">项目详情</div>
            <el-form-item label="项目描述" prop="describe">
              <el-input
               :disabled="snType==1"
                type="textarea"
                :autosize="{ minRows: 10}"
                :placeholder="placeText"
                v-model="form.describe">
              </el-input>
            </el-form-item>
            <div class="toggle-btn" @click="isFold=!isFold">{{isFold?'展开范例':'收起范例'}}</div>
            <div class="example" :class="{'toggle-fold':isFold}">
              <div>一、项目简介</div>

                <div>需要设计并开发一个项目信息在线发布与交易的web平台，包含移动端和pc端前台页面及后台管理系统。该项目致力于软件行业的项目外包、众包、项目承接、经验分享和求职招聘等信息的提供，为有IT相关需求的企事业单位、软件公司和各类软件开发人才提供一个方便快捷的网上信息交流、项目交易的平台。</div>

                <div>二、功能需求</div>

                <div>具备项目交易平台基本功能，包括项目发布、项目管理、参与竞标、在线交易、个人中心、登录注册等功能。 我方会提供网站原型，需要根据原型进行UI设计和前后端开发。 要求前台UI使用bootstrap3为基础的任意前端框架和thinkphp5框架，开发环境为php5.6+mysql</div>

                <div>三、人员要求</div>

                <div>有网上商城、在线交易相关产品开发经验，精通 Java 或 PHP，熟悉 jQuery、 JavaScript、Maven、Redis 等技术，熟练使用 MySQL、Oracle、SQLServer 等关系型数据库，熟悉 NoSQL 数据库如 mongo、redis 等。 具有良好的沟通能力和契约精神。</div>

                <div>四、参考产品</div>

                <div>https://www.sxsoft.com/</div>

                <div>五、验收标准</div>

                <div>不拖延项目进度，能保持实时交流，按时交付。 平台功能可正常使用，无明显bug。 提供项目源码。</div>
            </div>
          </div>
          <!-- <div class="next-btn" @click="nextStep">发包并</div> -->
          <div class="bottom-btn">
            <span v-if="!$route.query.snId" @click="publish(1)">发布并托管押金</span>
            <span v-if="!$route.query.snId" @click="publish(0)">直接发布</span>
            <el-button type="primary" v-if="snId&&snType==1" @click="handleEdit">修改</el-button>
            <el-button type="primary" v-if="snId&&snType==2" @click="confirmEdit">保存</el-button>
            <el-button type="primary" v-if="snId&&snType==2" @click="handleCancel">取消</el-button>
          </div>
        </el-form>
      </div>
      <div class="content-right">
        <div class="progress">
          <div class="title">发布流程</div>
           <el-steps direction="vertical" :active="4" :space="90">
            <el-step title="提交项目基本资料"></el-step>
            <el-step title="支付保证金"></el-step>
            <el-step title="等待审核"></el-step>
            <el-step title="发布成功"></el-step>
          </el-steps>
        </div>
        <div class="customer-service">
          <div class="title">客服</div>
          <div>
            <span>客服电话：</span>
            <span>1888888888</span>
          </div>
          <div>
            <span>客服邮箱：</span>
            <span>636363@qq.com</span>
          </div>
          <div>
            <img src="http://img2.imgtn.bdimg.com/it/u=1671289457,2641565305&fm=26&gp=0.jpg" alt="">
            <div>
              <span>聊天</span>
              <span>人工客服上班时间 AA - BB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bidding } from '@config/api.js'
import {projectList,biddingSkillType,budgetList,projectStatusList} from '@config/config.js'
import { mapGetters } from "vuex";

  export default {
    data(){
      return {
        form:{
          name:'',
          content:'',
          describe:'',
          type:'',
          min_price:0,
          price:0,
          max_price:0,
          deposit_price:0,
          num:'',
          limit_num:'',
          city_code:'0',
          skill:'',
          end_time:'',
          remark:'',
          extend:''
        },
        formRules:{
          name:[
            {required:true,message: '请输入项目名称', trigger: 'blur'},
            {min:2,max:20,message: '名称长度应为2-20位', trigger: 'blur'}
          ],
          extend:[
            {required:true,message: '请输入预计周期', trigger: 'blur'},
            {min:1,max:5,message: '周期长度应为1-5位', trigger: 'blur'},
            {pattern:/^[1-9]\d*$/,message:'请输入正整数',trigger:'blur'}
          ],
          limit_num:[
            {required:true,message: '请输入人数', trigger: 'blur'},
            {min:1,max:5,message: '人数长度应为1-5位', trigger: 'blur'},
            {pattern:/^[1-9]\d*$/,message:'请输入正整数',trigger:'blur'}
          ],
          describe:[
            {required:true,message: '请输入项目描述', trigger: 'blur'},
          ],

        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          }, 
          {
            value: '选项3',
            label: '蚵仔煎'
          }, 
          {
            value: '选项4',
            label: '龙须面'
          }, 
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        value1:'',
        value2:'',
        placeText:`请输入

例子：
一、项目简介
二、功能需求
三、人员要求
四、参考产品
五、验收标准`,
        isFold:false,
        account:0,
        moveLeft:0,
        typeOptions:projectList,
        cityOptions:[],
        skillOptions:biddingSkillType,
        snId:'',
        snType:''
      }
    },
    computed:{
      ...mapGetters(["user_data"])
    },
    created(){
      // 接收上个页面传递过来的参数，当有snId的时候为详情（snType为1）或者修改发包信息（snType为2），当没有snId的时候是新发包
      let {snId,snType} = this.$route.query
      localStorage.setItem('snId',snId)
      localStorage.setItem('snType',snType)
      this.snId=localStorage.getItem('snId')
      this.snType=localStorage.getItem('snType')
      // 获取所有城市选项相关
      this.cityOptions = this.GetCityCode();
      this.cityOptions.unshift({label:'全国',children:[{label:'所有地区',value:'0'}]
    })
    console.log(this.cityOptions)
    },
    mounted() {
      console.log(this.snId,'snId')
      // 如果有传过来的id就发请求获取信息填充表单
      if(this.snId!='undefined'){
        this.getRequest(bidding.getList,{id:this.snId}).then(res=>{
          console.log(res,'任务详情')
          for(let key in this.form){
            this.form[key]=res[key]
          }
          this.form.skill=this.form.skill.split(',').map(Number)
          this.form.type-=0
          this.form.end_time=this.util.time2Date(this.form.end_time)
          console.log(this.form.skill,'处理后的skill')
          // console.log(typeof this.form.skill)
          console.log(this.form,'处理后的form')
          // this.form=res;
          // let arr=this.form.extend.split(',')
          // console.log(arr)
          // arr.forEach(item=>{
          //   let obj={name:'',url:''}
          //   obj.name=item
          //   obj.url='https://pic.paitume.com/'+item
          //   this.fileList.push(obj)
          // })
          // console.log(this.fileList,'最终数组')
        }).catch(err=>{
          console.error(err)
        })
      }
    },
    methods:{
      movePrice(){
        this.moveLeft=this.form.price*(468/50000)
      },
      changePrice(val){
        console.log(this.moveLeft)
      },
      GetCityCode() {
        const provinces = this.$staticAllCityArray.map(item => {
          return item.province;
        });
        let provincesArr = [...new Set(provinces)];
        provincesArr = provincesArr.map(item => {
          return {
            label: item,
            children: []
          };
        });
        const options = provincesArr.map(item => {
          this.$staticAllCityArray.forEach(city => {
            if (item.label === city.province) {
              item.children.push({
                label: city.city,
                value: city.code
              });
            }
          });
          return item;
        });
        return options;
      },
      changeCity(data) {
				console.log('changeCity-----', data);
				this.form.city_code = data[1];
      },
      changeSkill(){
        console.log(this.form.skill)
      },
      publish(hasPay){
        this.$refs.formRef.validate(valid=>{
          if(!valid) return;
          this.form.skill=this.form.skill.join()
          this.postRequest(bidding.add,this.form).then(res=>{
            console.log(res,'请求返回')
            if(hasPay){
	            // 要交保证金
//	            this.$router.push('/need/deposit')
								this.util.toDeposit(res.id);
	          }else{
	            // 不交保证金
	            // 发布成功跳转到成功发布的页面
            	this.util.demandSuccess(0);
	          }
          }).catch(err=>{
            this.$message.error('发布失败'+err)
            console.error(err)
          })
          
        })
      },
      handleEdit(){
        this.snType=2
        localStorage.setItem('snType',2)
      },
      handleCancel(){
        this.snType=1
        localStorage.setItem('snType',1)
      },
      confirmEdit(){
        typeof this.form.skill!=='string'&&(this.form.skill=this.form.skill.join())
        this.form.id=localStorage.getItem('snId')
        this.postRequest(bidding.editBidding,this.form).then(res=>{
          console.log(res,'修改成功')
          this.$message.success('修改成功')
        }).catch(err=>{
          this.form.skill=this.form.skill.split(',').map(Number)
          console.error(err,'修改失败')
        })
      },
      selectEnd(val){
        console.log(val,'结束时间')
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  color: #333;
  .header{
    height: 80px;
    line-height: 80px;
    background: #fff;
    font-size: 20px;
    padding-left: 20px;
    margin-bottom: 10px;
  }
  .content{
    display: flex;
    justify-content: space-between;
    .content-left{
      width: 878px;
      .el-form{
        .basic-info{
          padding: 20px 20px 66px;
          background: #fff;
          margin-bottom: 12px;
          .title{
            margin-bottom: 23px;
            font-size: 20px;
          }
          .limit-people{
            width: 220px;
          }
          .box-wrap{
            height: 130px;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            padding: 0 30px;
            .line-part{
              width: 468px;
              // flex: 1;
              height: 100%;
              position: relative;
              margin-right: 50px;
              position: relative;
              input{
                width: 100%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                &:after{
                  content:'￥50000+';
                  background: #ccc;
                  border-radius: 4px;
                  position: absolute;
                  right: 0;
                  top: -45px;
                  font-size: 12px;
                  height: 30px;
                  line-height: 30px;
                  padding: 0 4px;
                }
              }
              // .point{
              //   width: 13px;
              //   height: 13px;
              //   background: #651fff;
              //   border-radius: 50%;
              //   position: absolute;
              //   top: 50%;
              //   left: 0;
              //   transform: translate(-50%,-50%);
              //   cursor: pointer;
              // }
              .money-account{
                height: 22px;
                line-height: 22px;
                background: #651fff;
                border-radius: 4px;
                position: absolute;
                top: 85px;
                // left: 0;
                transform: translate(-50%,0);
                color: #fff;
                padding: 0 6px;
              }
            }
            .el-input{
              width: 180px;
            }
          }
        }
        .need-detail{
          padding: 20px 20px;
          background: #fff;
          margin-bottom: 43px;
          .title{
            margin-bottom: 23px;
            font-size: 20px;
          }
          .el-form-item{
            margin-bottom: 18px;
            .el-textarea{
              /deep/{
                .el-textarea__inner:focus{
                  border-color: #7C6AFF;
                }
              }
            }
          }
          .toggle-btn{
            margin-bottom: 24px;
            text-align: right;
            color: #651FFF;
            cursor: pointer;
          }
          .example{
            height: 610px;
            background: #E0E0E0;
            padding: 18px 204px 18px 24px;
            margin-left: 80px;
            div{
              margin-bottom: 20px;
            }
          }
          .toggle-fold{
            height: 68px;
            overflow: hidden;
          }
        }
        .bottom-btn{
          display: flex;
          margin-bottom: 80px;
          span:first-child{
            width: 123px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #651FFF;
            font-weight: 600;
            color: #fff;
            margin-right: 24px;
            cursor: pointer;
          }
          span:nth-child(2){
            width: 95px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            border:1px solid rgba(224,224,224,1);
            font-weight: 600;
            cursor: pointer;
          }
        }
      }
    }
    .content-right{
      width: 313px;
      .progress{
        background: #fff;
        margin-bottom: 10px;
        padding: 15px 20px;
        height: 389px;
        .title{
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 32px;
        }
        .el-steps{
          .el-step{
            /deep/{
              .el-step__icon{
                width: 16px;
                height: 16px;
                background: #651fff;
                border: none;
                color: #651fff;
              }
            }
          }
          /deep/{
            .el-step__line{
              background-color: #651fff;
              left: 7px;
            }
            .is-finish{
              color: #333;
              border-color: #651fff;
            }
          }
        }
      }
      .customer-service{
        background: #fff;
        margin-bottom: 10px;
        padding: 15px 20px;
        .title{
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 32px;
        }
        & > div:nth-child(2),& > div:nth-child(3){
          font-size: 11px;
          margin-bottom: 20px;
        }
        & > div:last-child{
          display: flex;
          img{
            width: 42px;
            height: 42px;
            border-radius: 50%;
            margin-right: 34px;
          }
          & > div{
            flex: 1;
            font-size: 11px;
            span:first-child{
              width: 44px;
              height: 21px;
              border: 1px solid #E0E0E0;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #666;
              margin-bottom: 5px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>