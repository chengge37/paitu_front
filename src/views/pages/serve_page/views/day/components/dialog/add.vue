<!--  -->
<template>
  <div class="dia-box newServe">
    <el-dialog
      :title="!only_order?'添加事项':'添加线下订单'"
      :visible.sync="show"
      class="dialog"
      width="60%"
      @closed="closed"
      :close-on-click-modal="false"
    >
      <div class="top-select" v-if="!only_order">
        <el-radio-group v-model="addTypeValue">
          <el-radio :label="1">订单</el-radio>
          <el-radio :label="2">待办</el-radio>
          <el-radio :label="3">财务</el-radio>
        </el-radio-group>
      </div>
      <!-- 订单页 -->
      <div class="form-set" v-if="addTypeValue == 1||only_order">
        <el-form label-width="80px" ref="orderForm" :model="orderForm" :rules="rules">
          <el-row class="short-input">
            <el-col :span="10">
              <el-form-item label="订单类型" prop="order_type">
                <el-select v-model="orderForm.order_type" placeholder="请选择">
                  <el-option
                    v-for="item in order_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开始时间" v-if="orderForm.rent_type == 1" prop="start_time">
                <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="起始时间"
                  type="datetime"
                  v-model="orderForm.start_time"
                  :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="开始时间" v-if="orderForm.rent_type == 2" prop="start_time">
                <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="orderForm.start_time"
                  type="date"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10" :push="2">
              <el-form-item label="租聘方式" prop="rent_type">
                <el-select v-model="orderForm.rent_type" placeholder="请选择">
                  <el-option
                    v-for="item in rent_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="结束时间" v-if="orderForm.rent_type == 1" prop="end_time">
                <el-time-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="终止时间"
                  v-model="orderForm.end_time"
                  :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }"
                ></el-time-picker>
              </el-form-item>
              <el-form-item label="结束时间" v-if="orderForm.rent_type == 2" prop="end_time">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="orderForm.end_time"
                  type="date"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="使用时长" style="width:calc(100% + 300px)">
                <el-input v-model="usetime" :disabled="isEdit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="orderForm.order_type == 1">
            <el-col :span="10">
              <el-form-item label="使用影棚" style="width:calc(100% + 300px)" prop="studio_id">
                <el-select v-model="orderForm.studio_id" placeholder="请选择">
                  <el-option
                    v-for="item in studio_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="orderForm.order_type == 1">
            <el-col>
              <el-form-item label="附带设备">
                <el-checkbox v-model="orderForm.XDP">影棚订单是否附带设备</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="orderForm.order_type == 2">
            <el-col>
              <el-form-item label="选择设备">
                <el-cascader
                  @change="changeCategory"
                  placeholder="选择类别"
                  class="cascader-border"
                  :options="equipCategoryArray"
                  :show-all-levels="false"
                  :props="{value:'id',label:'name'}"
                  v-model="category"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <transition name="fade">
            <el-row v-if="orderForm.XDP">
              <el-col :span="10">
                <el-form-item label="设备列表" class="table">
                  <el-table
                    :data="deviceList"
                    :header-cell-style="{background:'#F5F8FE',color:'#606266'}"
                    border
                    height="138"
                  >
                    <el-table-column type="index" label="id" width="80"></el-table-column>
                    <el-table-column label="设备">
                      <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="60">
                      <template slot-scope="scope">
                        <div @click="add_decice(scope.row)" class="dele">
                          <i class="el-icon-plus"></i>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    v-if="orderForm.order_type == 1"
                    background
                    @current-change="studio_changePage"
                    :current-page="listParams.page"
                    :page-size="listParams.page_size"
                    layout="total, prev, pager, next"
                    :total="deviceCount"
                  ></el-pagination>
                  <el-pagination
                    v-if="orderForm.order_type == 2"
                    background
                    @current-change="device_changePage"
                    :current-page="listParams.page"
                    :page-size="listParams.page_size"
                    layout="total, prev, pager, next"
                    :total="deviceCount"
                  ></el-pagination>
                </el-form-item>
              </el-col>
            </el-row>
          </transition>
          <transition name="fade">
            <el-row v-if="orderForm.XDP">
              <el-col :span="10">
                <el-form-item label="已选设备" class="table">
                  <el-table
                    :data="selected_device"
                    :header-cell-style="{background:'#F5F8FE',color:'#606266'}"
                    border
                    height="199"
                  >
                    <el-table-column type="index" label="id" width="80"></el-table-column>
                    <el-table-column label="设备">
                      <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="设置数量">
                      <template slot-scope="scope">
                        <el-input
                          v-model="scope.row.count"
                          onkeyup="value=value.replace(/[^\d.]/g,'')"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="60">
                      <template slot-scope="scope">
                        <div @click="dele_decice(scope.$index,scope.row)" class="dele">
                          <i class="el-icon-delete"></i>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>
          </transition>
          <el-row class="short-input">
            <el-col :span="10">
              <el-form-item label="订单价格" prop="order_money">
                <el-input
                  v-model="orderForm.order_money"
                  onkeyup="value=value.replace(/[^\d.]/g,'')"
                  prefix-icon="el-icon-ptmqian"
                ></el-input>
              </el-form-item>
              <el-form-item label="客户姓名" prop="customer_id">
                <SelectSingleCustomer @input="inputdata"></SelectSingleCustomer>
              </el-form-item>
            </el-col>
            <el-col :span="10" :push="2">
              <el-form-item label="后台计价">
                <el-input
                  v-model="orderForm.server_money"
                  onkeyup="value=value.replace(/[^\d.]/g,'')"
                  prefix-icon="el-icon-ptmqian"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <addEmployee
            :get_group_url="group_url"
            :get_employee_url="employee_url"
            @getemployeelist="employee_list"
          />
        </el-form>
      </div>
      
      <!--工作tab模块-->
      <div class="form-set" v-if="addTypeValue == 2">
        <el-form label-width="80px" ref="jobForm" :model="jobForm" :rules="rules">
          <el-row class="short-input">
            <el-col :span="10">
              <el-form-item label="工作名称" prop="name">
                <el-input v-model="jobForm.name" placeholder="工作名称最低两个字"></el-input>
              </el-form-item>
              <el-form-item label="开始时间" prop="start_time">
                <el-date-picker
                  v-model="jobForm.start_time"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" :push="1">
              <el-form-item label="备注" prop="remark" placeholder="备注内容最低两个字">
                <el-input v-model="jobForm.remark"></el-input>
              </el-form-item>
              <el-form-item label="结束时间" prop="end_time">
                <el-date-picker
                  v-model="jobForm.end_time"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <addEmployee
            :get_group_url="group_url"
            :get_employee_url="employee_url"
            @getemployeelist="employee_list"
          />
        </el-form>
      </div>
      
      <!--财务页-->
      <div class="form-set" v-if="addTypeValue == 3">
        <el-form label-width="80px" ref="financeForm" :model="financeForm" :rules="rules">
		          	<el-col :span="10" class="short-input">
		              <el-form-item label="类型">
		                <el-select v-model="financeForm.type" placeholder="请选择">
		                  <el-option
		                    v-for="item in financeType"
		                    :key="item.id"
		                    :label="item.name"
		                    :value="item.id"
		                  ></el-option>
		                </el-select>
		              </el-form-item>
		              <el-form-item :label="financeForm.type==0?'收入日期':'支出日期'" prop="date">
		                <el-date-picker
		                  value-format="yyyy-MM-dd HH:mm:ss"
		                  v-model="financeForm.date"
		                  type="datetime"
		                  placeholder="选择日期"
		                ></el-date-picker>
		              </el-form-item>
		              <el-form-item :label="financeForm.type==0?'收入收据':'支出收据'">
		                <el-input v-model="financeForm.sn_no"></el-input>
		              </el-form-item>
		            </el-col>
		            
		            <el-col :span="10" class="short-input">
		              <el-form-item :label="financeForm.type==0?'收入类型':'支出类型'" prop="type_id">
		                <el-select v-model="financeForm.type_id" placeholder="请选择">
		                  <el-option
		                    v-for="item in typeList"
		                    v-if="(item.is_in==1 && financeForm.type==0) || (item.is_in==0 && financeForm.type==1)"
		                    :key="item.id"
		                    :label="item.name"
		                    :value="item.id"
		                  ></el-option>
		                </el-select>
		              </el-form-item>
		              <el-form-item :label="financeForm.type==0?'收入金额':'支出金额'"  prop="money">
		                <el-input
		                  type="number"
		                  v-model="financeForm.money"
		                  v-only-number="{min:0,precision:2}"
		                  placeholder="请输入金额(保留2位小数)"
		                ></el-input>
		              </el-form-item>
		            </el-col>
		            <el-col :span="10">
		              <div>
		                <el-form-item :label="financeForm.type==0?'收入明细':'支出明细'" class="long-input" prop="content">
		                  <el-input type="textarea" v-model="financeForm.content"  show-word-limit placeholder="请输入2-256字符内容" minlength="2" maxlength="256"></el-input>
		                </el-form-item>
		              </div>
		            </el-col>
        </el-form>
      </div>
      
      
      <span slot="footer" class="bottomBtn">
      	<el-button type="primary" class="color-area" @click="confirm" :loading="is_loading" :disabled="is_loading">保 存</el-button>
        <el-button type="default" class="color-area" @click="closed">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { finance,employee, day, equip, customer, studioApi, order } from "@/config/api";
import { deepcopy } from "@/common/function/util.js";
import addEmployee from "ServeComponents/addEmployee";
import SelectSingleCustomer from "ServeComponents/SelectSingleCustomer";
import { isEmpty_form } from "@util/validate";
export default {
  props: ["showadd", "only_order","addType","addTime"],
  data() {
    return {
      hourtimer: null,
      daytimer: null,
      is_loading: false,
      show: this.showadd,
      employee_url: employee.getAll,
      group_url: employee.getGroup,
      addTypeValue: null,
      setpeople: "",
      usetime: "",
      people: [],
      see_people: false,
      options: [
        {
          value: "订单",
          label: "订单"
        },
        {
          value: "工作",
          label: "工作"
        }
      ],
      order_options: [
        {
          value: "1",
          label: "影棚订单"
        },
        {
          value: "2",
          label: "设备订单(外借)"
        }
      ],
      rent_options: [
        {
          value: "1",
          label: "按小时计算"
        },
        {
          value: "2",
          label: "按天计算"
        }
      ],
      orderForm: {
        order_type: "",
        start_time: "",
        rent_type: "",
        end_time: "",
        studio_id: "",
        XDP: false,
        order_money: "",
        customer_id: ""
      },
      jobForm: {
        name: "",
        start_time: "",
        end_time: "",
        remark: "",
        employee_id_array_str: ""
      },
      isEdit: true,
      formLabelWidth: "120px",
      equipCategoryArray: [], //从静态库中获取的所有类别
      category: [], //选中的分类
      listParams: {
        // 请求设备列表发送的页数和每页size参数
        page: 1,
        page_size: 12
      },
      deviceCount: 0,
      deviceList: [],
      selected_people: [],
      selected_device: [],
      listLoading: false,
      studio_options: [],
      rules: {
        order_type: [
          { required: true, validator: isEmpty_form, trigger: "blur" }
        ],
        start_time: [
          { required: true, validator: isEmpty_form, trigger: "blur" }
        ],
        end_time: [
          { required: true, validator: isEmpty_form, trigger: "blur" }
        ],
        rent_type: [
          { required: true, validator: isEmpty_form, trigger: "blur" }
        ],
        studio_id: [
          { required: true, validator: isEmpty_form, trigger: "blur" }
        ],
        order_money: [
          { required: true, validator: isEmpty_form, trigger: "blur" }
        ],
        customer_id: [
          { required: true, validator: isEmpty_form, trigger: "blur" }
        ],
        remark: [{ required: true, validator: isEmpty_form, trigger: "blur" }],
        name: [{ required: true, validator: isEmpty_form, trigger: "blur" }],
        type_id: [
	        { required: true, message: '请选择类型', trigger: 'blur' },
	      ],
	      date: [
	        { required: true, message: '请选择日期', trigger: 'blur' },
	      ],
	      money: [
	        { required: true, message: '请输入金额', trigger: 'blur' },
	      ],
	      content: [
	        { required: true, message: '请输入内容', trigger: 'blur' },
	         { min: 2, max: 256, message: '长度在 2到 256个字符', trigger: 'blur' }
	      ],
      },
      typeList: [], //类型列表
    	removeType: [8, 9, 10], //排除不能添加的类型，系统影棚订单收入，系统设备订单收入，系统活动订单收入
    	financeType:[{
    		id:0,
    		name:'收入',
    	},{
    		id:1,
    		name:'支出'
    	}],
      financeForm:{
      	type:0,
      	type_id:'',
      	money:'',
      	date:'',
      	sn_no:'',
      	content:'',
      }
      
    };
  },

	computed: {
    get_order_type() {
      return this.orderForm.order_type;
    },
    is_have_device() {
      return this.orderForm.XDP;
    },
    start_time() {
      return this.orderForm.start_time;
    },
    end_time() {
      return this.orderForm.end_time;
    },
    // addTypeValue(){
    //   return this.addType;
    // },
  },
  watch: {
    //经过这样的修改，在右侧点击add菜单时同样要传递addType过来，不然会出现一些问题，当然还要传addTime
    addType:function (val) {
      this.addTypeValue=val;
    },
    addTime:function (val) {
      
      this.orderForm.start_time=val;
      this.jobForm.start_time=val;
      this.financeForm.date=val;
      console.log("656",val,"3553------------------------------------------------------------------------",this.jobForm.start_time,"63");
    },
  	"financeForm.type":function(to,from){
  		console.log('financeForm.type--------',this.financeForm.type);
  		//清空数据
  		Object.keys(this.financeForm).forEach(key=>{
  			if(key!='type'){
  				this.financeForm[key]='';
  			}
  		})
  	},
    showadd(value) {
      console.log(value);
      this.show = value;
    },
    get_order_type(value) {
      if (value == 1) {
        this.get_studio();
        // 当用户切换状态时,清空设备信息
        this.listParams = {
          page: 1,
          page_size: 12
        };
        this.deviceCount = 0;
        this.deviceList = [];
        this.selected_device = [];
        this.orderForm.XDP = false;
        this.category = [];
      } else {
        this.listParams = {
          page: 1,
          page_size: 12
        };
        this.deviceCount = 0;
        this.deviceList = [];
        this.selected_device = [];
      }
    },
    is_have_device(value) {
      if (value) {
        this.get_device();
      }
    },
    start_time() {
      console.log(this.start_time);
      if (this.end_time != "" && this.end_time != null) {
        switch (this.orderForm.rent_type) {
          case "1":
            this.compute_hour();
            break;
          case "2":
            this.compute_day();
            break;
          default:
            console.log(this.orderForm.rent_type);
            break;
        }
      }
    },
    end_time() {
      if (this.start_time == "" && this.start_time != null) {
        // this.$message({
        //   message: "开始时间不能为空",
        //   type: "error"
        // });
      } else {
        switch (this.orderForm.rent_type) {
          case "1":
            this.compute_hour();
            break;
          case "2":
            this.compute_day();
            break;
          default:
            console.log(typeof this.orderForm.rent_type);
            break;
        }
      }
    },
  },

  components: { addEmployee, SelectSingleCustomer },
  mounted() {
    this.equipCategoryArray = this.$staticCategoryTree;
    //获取收入支出类型
    this.getTypeList();
  },

  methods: {
    //转换日期格式yyyy-mm-dd or yyyy-mm-dd hh:mm:ss
    handleTime(){
      
    },
  	
  	//获取支出/收入类型列表
    getTypeList() {
      this.util.getFinanceType().then(res => {
          let list = [];
          //排除不能添加的选项
          res.forEach((item, index) => {
            let i = this.removeType.indexOf(parseInt(item.id));
            if (i < 0) {
              list.push(item);
            }
          });
          this.typeList = list;
          console.log("this.typeList----------", this.typeList);
          this.transData();
        })
        .catch(err => {});
    },
    //转换类型方法和时间
    transData() {
      this.typeList.forEach((item, index) => {
        if (this.form.type_id == item.id) {
          this.form.type_id = item.name;
        }
      });
    },
    add_decice(data) {
      console.log(data);
      // 判断数组是否为空
      if (this.selected_device.length == 0) {
        this.selected_device.push({ id: data.id, name: data.name, count: 1 });
      } else {
        // 开始去重点击
        let arr = [];
        this.selected_device.forEach(item => {
          arr.push(item.id);
        });
        let NotRepeat = arr.every(id => {
          return id !== data.id;
        });
        if (NotRepeat) {
          this.selected_device.push({ id: data.id, name: data.name, count: 1 });
          console.log(this.selected_device);
        } else {
          this.$notify.error({
            title: "错误",
            message: "请勿重新添加！"
          });
        }
      }
    },
    dele_decice(id) {
      this.selected_device.splice(id, 1);
    },
    closed(addType) {
      this.$emit("closed",addType);
      this.is_loading = false;
      this.addTypeValue = 1;
      this.usetime="";
      this.orderForm = {
        order_type: "",
        start_time: this.orderForm.start_time,
        rent_type: "",
        end_time: "",
        studio_id: "",
        XDP: false,
        order_money: "",
        customer_id: ""
      };
      this.jobForm = {
        name: "",
        start_time: this.jobForm.start_time,
        end_time: "",
        remark: "",
        employee_id_array_str: ""
      };
      this.financeForm={
      	type:0,
      	type_id:'',
      	money:'',
      	date:this.financeForm.date,
      	sn_no:'',
      	content:'',
      }
      console.log(this.orderForm,this.jobForm)
    },
    confirm() {
      console.log(this.addTypeValue);
      if (this.only_order && this.addTypeValue == null) {
        console.log(111);
        this.addTypeValue = 1;
      }
      switch (this.addTypeValue) {
        case 1:
          this.$refs.orderForm.validate(valid => {
            if (valid) {
              this.is_loading = true;
              this.pull_order(1);
            }
          });
          break;
        case 2:
          // console.log("debugger",this.$refs.jobForm.start_time,this.$refs.jobForm.end_time);
          this.$refs.jobForm.validate(valid => {
            console.log(valid);
            if (valid) {
              this.is_loading = true;
              this.pull_work(2);
            }
          });
          break;
        case 3:
           this.$refs.financeForm.validate(valid => {
            if (valid) {
              console.log("看看啥玩意",this.$refs.financeForm.start_time);
              // this.is_loading = true;
              this.addFinance(3);
            }
          });
          break;
        default:
          this.$message({
            showClose: true,
            message: "您没有选择任何东西！",
            type: "error"
          });
          this.is_loading = false;
          break;
      }
    },
    pull_order() {
      let data = {
        type: this.orderForm.order_type,
        rent_type: this.orderForm.rent_type,
        start_time: this.orderForm.start_time,
        end_time: this.orderForm.end_time,
        price: this.orderForm.order_money,
        customer_id: this.orderForm.customer_id,
        employee_array: this.selected_people,
        equip_array: this.selected_device
      };
      if(this.orderForm.order_type == 1){
        data.studio_id = this.orderForm.studio_id
      }
      this.postRequest(order.serve_add_order, data)
        .then(res => {
          this.is_loading = false;
          if (res) {
            this.$alert("添加成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.closed(this.orderForm.order_type);
              }
            });
          }
        })
        .catch(err => {
          this.is_loading = false;
          this.$alert("影棚当前时段被占用", "警告", {
            confirmButtonText: "确定",
            type: "error",
            // callback: action => {
            //   this.closed();
            // }
          });
        });
    },
    //添加收入/支出方法
    addFinance(addType) {
      console.log("保存方法---", this.financeForm);
  		this.postRequest(finance.add, this.financeForm).then(res => {
        if(res){
          this.$message.success("保存成功！");
          this.show=false;
          this.is_loading = false;
          this.closed(addType)
        }  
	      }).catch(
          err => {
          this.is_loading = false;
          this.$alert("出现错误", "警告", {
            confirmButtonText: "确定",
            type: "error",
          });
        }
        );
    },
    pull_work(addType) {
      let obj = {};
      let temp = [];
      // 对添加的员工列表去重操作
      this.selected_people = this.selected_people.reduce((item, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
        return item;
      }, []);
      // 提取出员工id
      this.selected_people.forEach(item => {
        temp.push(item.id);
      });
      this.jobForm.employee_id_array_str = temp.join();
      if (temp.length > 0) {
        this.postRequest(day.serve_add_job, this.jobForm)
          .then(res => {
            if (res) {
              this.$alert("添加成功", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  this.closed(addType);
                }
              });
              this.is_loading = false;
            }
          })
          .catch(err => {
            this.$alert("添加失败", "错误", {
              confirmButtonText: "确定",
              type: "error",
              callback: action => {}
            });
            this.is_loading = false;
          });
      } else {
        this.$message({ type: "error", message: "您尚未添加员工" });
        this.is_loading = false;
      }
    },
    employee_list(value) {
      this.selected_people = value;
    },
    inputdata(value) {
      console.log('value----',value)
      this.orderForm.customer_id = value;
    },
    // 选择分类列表项获取相应设备列表
    changeCategory() {
      // 判断类别选择的是全部类别还是其他，若是全部类别，则发送请求时id为空
      this.listParams.category_id =
        this.category[0] == 1024
          ? ""
          : this.category[this.category.length - 1] + "";
      this.getDeviceList();
      this.orderForm.XDP = true;
    },
    // 进入页面请求接口获取设备列表
    getDeviceList() {
      this.getRequest(equip.get, this.listParams)
        .then(res => {
          console.log(res);
          if (res) {
            this.listParams.page = parseInt(res.page);
            this.listParams.page_size = parseInt(res.page_size);
            this.deviceCount = parseInt(res.total_count);
            this.deviceList = res.rows;
            this.orderForm.XDP = true;
          }
          console.log(this.deviceList);
        })
        .catch(err => {});
    },
    device_changePage(val) {
      this.listParams.page = val;
      this.getDeviceList();
    },
    studio_changePage(val) {
      this.listParams.page = val;
      this.get_device();
    },
    get_studio() {
      this.getRequest(studioApi.studioServeGet)
        .then(res => {
          let templist = res;
          this.studio_options = [];
          templist.forEach(item => {
            this.studio_options.push({ value: item.id, label: item.name });
          });
        })
        .catch(err => {});
    },
    get_device() {
      this.getRequest(equip.getSimple, this.listParams)
        .then(res => {
          this.listParams.page = parseInt(res.page);
          this.listParams.page_size = parseInt(res.page_size);
          this.deviceCount = parseInt(res.total_count);
          this.deviceList = res.rows;
        })
        .catch(err => {});
    },
    compute_hour() {
      if (this.orderForm.start_time && this.orderForm.end_time) {
        let hour =
          (new Date(this.orderForm.end_time).getTime() -
            new Date(this.orderForm.start_time).getTime()) /
          3600000;
        if (hour > 0) {
          this.usetime = Math.ceil(hour) + "小时";
        } else {
          clearTimeout(this.hourtimer)
          this.hourtimer = setTimeout(() => {
            this.$message({
              type: "error",
              message: "结束时间必须大于开始时间"
            });
          }, 1000);
          this.usetime = "时间错误";
        }
      }
    },
    compute_day() {
      if (this.orderForm.start_time && this.orderForm.end_time) {
        let day =
          (new Date(this.orderForm.end_time).getTime() -
            new Date(this.orderForm.start_time).getTime()) /
          86400000;
        if (day > 0) {
          if(day<1){
            this.usetime = Math.ceil(day + 1) + "天";
          }else{
            this.usetime = Math.ceil(day) + "天";
          }
        } else {
          clearTimeout(this.daytimer)
          this.daytimer = setTimeout(() => {
            this.$message({
              type: "error",
              message: "结束时间必须大于开始时间"
            });
          }, 1000);
          this.usetime = "时间错误";
        }
      }
    }
  },
  beforeDestroy(){
    this.daytimer = null;
    this.hourtimer = null;
    console.log("已被销毁")
  }
  
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.dia-box /deep/ .el-dialog {
  border-radius: 10px;
}
/deep/ .el-dialog__body{
	overflow:hidden;
}
.top-select /deep/ .el-radio-group {
  display: flex;
  position: absolute;
  top: 25px;
  width: 101px;
  height: 36px;
  left: 117px;
}
.form-set {
  .short-input /deep/ .el-input {
    width: 220px;
  }
  .long-input /deep/ .el-input {
    width: 100%;
  }
  .table {
    width: calc(100% + 300px);
    input {
      background: none;
      outline: none;
      border: 0px;
      height: 40px;
      width: 80%;
    }
    .dele {
      width: 100%;
      height: 100%;
    }
  }
  .table /deep/ .el-table th {
    padding: 0;
  }
  .table /deep/ .el-table__body {
    height: 50px;
  }
}
.form-set /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #f2b931;
  background-color: #f2b931;
}
.form-set /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #f2b931;
}
.form-set /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #f2b931;
}

/deep/ {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>