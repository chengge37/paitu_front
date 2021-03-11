<template>
  <div class="login-bbox dialog">
    <el-dialog
      :visible.sync="modelDayTabel"
      :title="showTitle"
      center
      :width="isServe?'1200px':'650px'"
      @closed="closed"
    >
      <div class="left-list" v-if="isServe">
        <div class="list-top">
          <div class="top-header" v-if="modelInfo">
            <el-image :src="config.qiniuHost+modelInfo.photo" fit="scale-down" class="header-img"></el-image>
            <div class="name">{{modelInfo.title}}</div>
          </div>
          <div class="top-number">
            <div>
              <div>{{MoonData.today}}</div>
              <div>今日订单</div>
            </div>
            <div>
              <div>{{MoonData.moon}}</div>
              <div>本月订单</div>
            </div>
            <div>
              <div>{{MoonData.start_no}}</div>
              <div>本月未开始</div>
            </div>
            <div>
              <div>{{MoonData.is_over}}</div>
              <div>本月完成</div>
            </div>
            <div>
              <div>{{MoonData.refund}}</div>
              <div>本月退单</div>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="list-box">
          <div></div>
          <div
            class="list-container"
            v-infinite-scroll="GetModelOrder"
            style="overflow:auto"
            v-if="ModelOrderList.length>0"
          >
            <div class="li-box" v-for="item in ModelOrderList" :key="item.id">
              <div>订单编号：{{item.show_id}}</div>
              <div class="li">
                <div>
                  <div>下单时间</div>
                  <div>{{item.create_time}}</div>
                </div>
                <div>
                  <div>金额</div>
                  <div>¥{{item.price}}元</div>
                </div>
                <div>
                  <div>时长</div>
                  <div>{{util.datedif(item.end_time,item.start_time)}}天</div>
                </div>
                <div>
                  <div>开始日期</div>
                  <div>{{item.start_time}}-{{item.end_time}}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-order">还没有订单</div>
        </div>
      </div>
      <div id="day" :class="{day:true}">
        <div id="calendar" v-if="pickDay != null">
          <div class="topDay">
            <div class="left">
              年份：
              <el-select v-model="yearValue" placeholder="请选择" @change="timeChange">
                <el-option
                  v-for="item in yearOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>&nbsp;&nbsp;&nbsp;&nbsp;月份：
              <el-select v-model="monthValue" placeholder="请选择" @change="timeChange">
                <el-option
                  v-for="item in monthOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div
              class="right"
            >{{weather}}&nbsp;&nbsp;|&nbsp;&nbsp;今天&nbsp;&nbsp;|&nbsp;&nbsp;{{today}}</div>
            <div id="position" style="display:none"></div>
          </div>
          <div class="line"></div>
          <ul class="weekdays">
            <li>周一</li>
            <li>周二</li>
            <li>周三</li>
            <li>周四</li>
            <li>周五</li>
            <li>周六</li>
            <li>周日</li>
          </ul>
          <ul class="days" ref="main">
            <li
              v-for="(day,index) in days"
              :class="{
			'dayOff':day.dayOff,
            'active':index==activeIndex&&index!=menuIndex,
            'today':day.day.getFullYear() == new Date().getFullYear() && day.day.getMonth() == new Date().getMonth() && day.day.getDate() == new Date().getDate(),
            'afterRight':index==menuIndex,
            'other-month':day.day.getMonth()+1 != currentMonth
            }"
              :key="day.day+index"
            >
              <!--节假日显示-->
              <span class="holiday" v-if="day.holiday">{{day.holiday}}</span>

              <!--本月-->
              <span
                v-if="day.day.getMonth()+1 != currentMonth"
                class="other-month"
              >{{ day.day.getDate() }}</span>
              <span v-else-if="menuIndex!=index" class="beforeRight">{{ day.day.getDate() }}</span>
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/*             模特日程管理组件
 *        接受参数是isShow,接受一个布尔值
 *		      接受参数是id，模特id
 *    ,其中true是显示,false是隐藏,默认为false
 *
 */
import { mapGetters } from "vuex";
import { model } from "@config/api";

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    //type:0/模特日程，1/助理日程
    type: {
    	type:String,
    	default:'0', 
    },
    id: {
      type: String,
      default: ""
    },
    //是否显示在商家后台
    isServe: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modelDayTabel: this.isShow,
      modelId: this.id,
      modelInfo: null, //模特信息
      today: "",
      map: "",
      weather: "",
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      pickDay: null,
      activeIndex: null,
      menuIndex: null,
      yearOptions: [],
      yearValue: "",
      monthValue: 1,
      showMonth: 0, //显示的月份
      holidayList: [],
      modelDayOff: [], //模特休息日列表
      monthOptions: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 2,
          label: "2"
        },
        {
          value: 3,
          label: "3"
        },
        {
          value: 4,
          label: "4"
        },
        {
          value: 5,
          label: "5"
        },
        {
          value: 6,
          label: "6"
        },
        {
          value: 7,
          label: "7"
        },
        {
          value: 8,
          label: "8"
        },
        {
          value: 9,
          label: "9"
        },
        {
          value: 10,
          label: "10"
        },
        {
          value: 11,
          label: "11"
        },
        {
          value: 12,
          label: "12"
        }
      ],
      MoonData: {},
      ModelOrderList: [],
      cont: 1,
      showTitle:'',
    };
  },
  watch: {
    isShow(to) {
      this.modelDayTabel = to;
    },
    id(to) {
      console.log("id: ", to);
      this.modelId = to;
      this.getDetailById(this.modelId);
      this.GetModelMoon();
      this.GetModelOrder();
    }
  },
  created() {
    console.log("this.modelId: ", this.modelId);
    this.holidayList = [
      {
        day: "0101",
        holiday: "元旦"
      },
      {
        day: "0125",
        holiday: "除夕"
      },
      {
        day: "0125",
        holiday: "春节"
      },
      {
        day: "0404",
        holiday: "清明节"
      },
      {
        day: "0501",
        holiday: "劳动节"
      },
      {
        day: "0625",
        holiday: "端午节	"
      },
      {
        day: "1001",
        holiday: "中秋节"
      },
      {
        day: "1001",
        holiday: "国庆节"
      }
    ];

    this.getYearOptions();
    this.initCalendar(null);
    console.log(this.days, "时间数组");
    this.getToday();
    let date = new Date();
    this.monthValue = date.getMonth() + 1;
    this.showMonth = date.getMonth() + 1;
  },
  components: {},
  computed: {
    ...mapGetters(["user_data"])
  },

  mounted() {
    if (this.modelId && this.type==0) {
      this.getDetailById(this.modelId);
      if(this.isServe){
      	this.GetModelMoon();
      	this.GetModelOrder();
      }
      this.showTitle='模特档期';
    }else if(this.type==1){
    	this.getAssistantDetail(this.modelId);
    	this.showTitle='助理档期';
    }
  },

  methods: {
    GetModelMoon() {
      this.getRequest(model.getModelOrderMoon, { id: this.modelId }).then(
        res => {
          Object.assign(this.MoonData, res);
        }
      );
    },
    GetModelOrder() {
      let params = {
        model_id: this.modelId,
        page: this.cont,
        page_size: 10
      };
      this.getRequest(model.getModelOrder, params).then(res => {
        console.log('res: ', res);
        if (res.rows.length > 0) {
          this.ModelOrderList.push(...res.rows)
          this.cont++;
        }
      });
    },
    //获取模特日程（休息日）
    getModelDays() {
      let end_time = this.util.getLastDay(this.yearValue, this.monthValue);
      let params = {
        start_time: `${this.yearValue}-${this.util.toDouble(
          this.monthValue
        )}-01`,
        end_time: end_time,
        model_id: this.modelInfo.id, //模特id
        uid: this.modelInfo.uid //模特uid
      };
      this.util.getModelDays(params).then(res => {
        console.log("getModelDays------", res);
        this.modelDayOff = res;
        //初始化日程
        this.initDays(this.days);
      });
    },
    //获取模特详情
    getDetailById(id) {
      let params = {
        id: id
      };
      this.util.getModelList(params).then(res => {
        console.log("getModelList--------", res);
        this.modelInfo = res;
        this.getModelDays();
      });
    },
    
    //获取助理（休息日）
    getAssistantDays() {
    	console.log('getAssistantDays-------------',this.modelInfo);
      let end_time = this.util.getLastDay(this.yearValue, this.monthValue);
      let params = {
        start_time: `${this.yearValue}-${this.util.toDouble(
          this.monthValue
        )}-01`,
        end_time: end_time,
        assistant_id: this.modelInfo.id, //助理id
        uid: this.modelInfo.uid //助理uid
      };
      this.util.getAssistantCal(params).then(res => {
        console.log("getAssistantCal------", res);
        this.modelDayOff = res;
        //初始化日程
        this.initDays(this.days);
      });
    },
    //获取助理详情
    getAssistantDetail(id) {
      let params = {
        id: id
      };
      console.log('getAssistantDetail----params-----',params);
      this.util.getAssistantList(params).then(res => {
        console.log("getAssistantDetail--------", res);
        this.modelInfo = res;
        this.getAssistantDays();
      });
    },
    
    //时间切换方法
    timeChange() {
      //先清除选择
      this.activeIndex = -1;
      this.menuIndex = -1;
      this.initCalendar(this.formatDate(this.yearValue, this.monthValue, 1));
      if(this.type==0){
      	this.getModelDays();
      }else if(this.type==1){
      	this.getAssistantDays();
      }
      
    },
    closed() {
      this.$emit("closed", false);
    },
    //设置月份
    setMonth(type) {
      if (type == "prex") {
        this.showMonth = this.showMonth - 1;
      } else if (type == "next") {
        this.showMonth = this.showMonth + 1;
      }
    },
    //今天日期
    getToday() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      this.today = year + "-" + this.toDouble(month) + "-" + this.toDouble(day);
    },
    toDouble(str) {
      let num = parseInt(str);
      return num > 9 ? num : "0" + num;
    },
    //初始化数组
    initDays(days) {
      console.log("days----------", days);
      console.log("this.modelDayOff----", this.modelDayOff);
      //为日期添加一个节假日字段holiday
      let flagDay = "";
      this.holidayList.forEach((item, index) => {
        days.forEach((item2, index2) => {
          flagDay =
            this.toDouble(item2.day.getMonth() + 1) +
            "" +
            this.toDouble(item2.day.getDate());
          if (item.day == flagDay) {
            item2.holiday = item.holiday;
          }
        });
      });
      //为日期添加一个休息日字段
      let tempDay = "";
      days.forEach((item, index) => {
        delete item.dayOff;
      });
      this.modelDayOff.forEach((item, index) => {
        days.forEach((item2, index2) => {
          tempDay = `${item2.day.getFullYear()}-${this.toDouble(
            item2.day.getMonth() + 1
          )}-${this.toDouble(item2.day.getDate())}`;
          if (item == tempDay) {
            //							console.log('tempDay-----------');
            //							item2.dayOff = true;
            this.$set(item2, "dayOff", true);
          }
        });
      });
      console.log("initDays-----------", days);
    },
    initCalendar(cur) {
      if (cur) {
        var date = new Date(cur);
      } else {
        var date = new Date();
        this.pickDay = date.getDate();
      }
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      var str = this.formatDate(this.currentYear, this.currentMonth, 1);
      this.currentWeek =
        new Date(str).getDay() == 0 ? 7 : new Date(str).getDay();

      this.days.length = 0; //初始化数组
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);

        this.days.push({
          day: d
        });
      }
      for (var i = 1; i <= 42 - this.currentWeek; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push({
          day: d
        });
      }
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate(year, month, day) {
      var y = year;
      var m = month;
      var d = day;
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d;
    },
    getYearOptions() {
      let year = new Date().getFullYear();
      for (let i = year - 0; i <= year + 1; i++) {
        this.yearOptions.push({
          label: i,
          value: i
        });
      }
      this.yearValue = year;
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.dialog /deep/ .el-dialog__body {
  display: flex;
  .left-list {
    flex: 1;
    .list-top {
      display: flex;
      .top-header {
        text-align: center;
        .header-img {
          width: 88px;
          height: 88px;
        }
      }
      .top-number {
        flex: 1;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        text-align: center;
      }
    }
    .list-box {
      .li-box{
        margin-bottom: 20px;
      }
      .list-container {
        height: 430px;
      }
      .list-container::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        /**/
      }
      .list-container::-webkit-scrollbar-track {
        background: rgb(239, 239, 239);
        border-radius: 2px;
      }
      .list-container::-webkit-scrollbar-thumb {
        background: #bfbfbf;
        border-radius: 10px;
      }
      .list-container::-webkit-scrollbar-thumb:hover {
        background: #333;
      }
      .list-container::-webkit-scrollbar-corner {
        background: #179a16;
      }
      .no-order {
        text-align: center;
      }
      .li {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border: 1px solid #979797;
      }
    }
  }
}
.day {
  flex: 1;
}
#calendar {
  margin: 0px auto;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.month {
  width: 80%;
}

.month ul {
  margin: 29px 0 25px;
  display: flex;
  justify-content: center;
}

.month ul li {
  color: #7c6aff;
  font-size: 20px;
}

.weekdays {
  width: 80%;
  margin: 0 auto 7.5px;
  display: flex;
  flex-wrap: wrap;
  color: #808080;
  justify-content: space-around;
}

.weekdays li {
  display: inline-block;
  font-size: 16px;
  color: #808080;
  text-align: center;
  padding: 15px 15px;
  background: #f8f8fa;
  border-radius: 4px;
}

.days {
  width: 78%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: #ffffff;
}

.days > li {
  position: relative;
  display: inline-block;
  text-align: center;
  color: #999;
  cursor: pointer;
  border: 1px solid #ebebeb;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  margin-bottom: 10px;
  &.dayOff {
    background: red;
  }
}

.days li span {
  font-size: 16px;
}

.days li .active {
  color: #7c6aff;
}

.days li .other-month {
  padding: 5px;
  color: #e6e6e6;
}

.days li:hover {
  color: #7c6aff;
}

.days li:hover .other-month {
  color: #7c6aff;
}

.holiday {
  width: 50px;
  height: 24px;
  font-size: 12px;
  position: absolute;
  left: 0%;
  top: 7%;
  color: #e02d2d;
}

.topDay {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/deep/ {
  .el-input--suffix {
    width: 100px;
    border-radius: 0px;
  }
}
</style>