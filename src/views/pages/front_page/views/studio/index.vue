<template>
  <div>
    <!--选择结果模块-->
    <div class="front_select">
      <div class="result">
        <p>筛选结果：</p>
        <div>
          <ul>
            <li v-for="(item,index) in selectOption" :key="index" v-if="item.split('=')[1]!='全部'">
              <div>
                <span>{{item.split('=')[1]}}</span>
                <i class="el-icon-close cursor" @click="delOption(item)"></i>
              </div>
            </li>
            <el-button
              class="word-hover"
              type="text"
              v-show="selectOption.length>0"
              @click="clearAllOption()"
            >清空所有筛选</el-button>
          </ul>
        </div>
      </div>
      <div class="rightShow">
        <front-searchbox :searchTxt="searchTxt" @search="search" v-if="showSearch"></front-searchbox>
        <!--购物车模块-->
        <cart :res="cartInfo" v-if="cartInfo"></cart>
      </div>
    </div>

    <!--选项选择模块-->
    <div class="front_options radio-setting">
      <ul>
        <li>
          <span>使用城市：</span>
          <select-city :code="cityCode" @changeCity="changeCity"></select-city>
        </li>
        <li class="time">
          <span>开始时间：</span>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="dateStart"
            :picker-options="pickerOptionsStart"
            type="date"
            placeholder="yy-mm-dd"
          ></el-date-picker>
          <span class="endDom widthAuto">结束时间：</span>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="dateEnd"
            :picker-options="pickerOptionsEnd"
            type="date"
            placeholder="yy-mm-dd"
          ></el-date-picker>
        </li>
        <li>
          <span>影棚类型：</span>
          <el-radio-group v-model="studioType">
            <el-radio v-for="(item,index) in studioList" :key="index" :label="item.id">
              <span class="word-hover">{{item.name}}</span>
            </el-radio>
          </el-radio-group>
        </li>
        <li>
          <span>影棚大小：</span>
          <el-radio-group v-model="square">
            <el-radio v-for="(item,index) in studioSizeList" :key="index" :label="item.id">
              <span class="word-hover">{{item.name}}</span>
            </el-radio>
          </el-radio-group>
        </li>
        <li>
          <span>单价范围：</span>
          <el-radio-group v-model="studioPrice">
            <el-radio v-for="(item,index) in priceList" :key="index" :label="item.id">
              <span class="word-hover">{{item.name}}</span>
            </el-radio>
          </el-radio-group>
        </li>
        <li>
          <span>配备设施：</span>
          <el-checkbox-group v-model="provide" @change="changeProvide">
            <el-checkbox :label="item" v-for="(item,index) in provideList" :key="index">
              <span class="word-hover">{{item}}</span>
            </el-checkbox>
          </el-checkbox-group>
          <span class="endDom widthAuto">包含器材：</span>
          <el-checkbox v-model="isEquip" class="word-hover">是</el-checkbox>
        </li>
      </ul>
    </div>

    <!--中间主体部分模块-->
    <div class="main radio-setting">
      <div class="leftInfo">
        <recommend-good></recommend-good>
      </div>
      <div class="rightInfo">
        <div v-if="listParams.totalCount!=0">
          <div class="top">
            <div style="user-select:none;">
              <span
                :class="{active:curIndex==index+1,sort:index>0,up:index>0&&curIndex==index+1&&order=='asc',down:index>0&&curIndex==index+1&&order=='desc'}"
                class="radio-hover"
                v-for="(item,index) in orderType"
                :key="index"
                :label="index"
                @click="changeSort(index+1)"
              >{{item}}</span>
            </div>
            <p>
              <span>共</span>
              <span class="num">{{listParams.totalCount}}</span>
              <span>个影棚</span>
              <span class="num curPage">{{listParams.page}}</span>
              <span class="total">/{{listParams.totalPage}}</span>
              <i class="el-icon-arrow-left page-hover" @click="operatePage('prev')"></i>
              <i class="el-icon-arrow-right page-hover" @click="operatePage('next')"></i>
            </p>
          </div>

          <!--列表模块-->
          <product-list :list="list" v-loading="loadList"></product-list>
        </div>

        <div class="findNot" v-if="listParams.totalCount==0 && !loadList">
          <div class="info">
            <p>为您找到 0 个</p>
            <span>"相关产品"</span>
          </div>
          <p class="toBack">请您返回上一级操作</p>
          <el-button @click="clearAllOption()">返回</el-button>
          <div class="option">
            <div>
              <div class="delOption">
                <p>删除</p>
                <span>一些筛选项</span>
              </div>
              <div class="front_select">
                <div class="result">
                  <p>筛选结果：</p>
                  <div>
                    <ul>
                      <li v-for="(item,index) in selectOption" :key="index">
                        <div>
                          <span>{{item.split('=')[1]}}</span>
                          <i class="el-icon-close cursor" @click="delOption(item)"></i>
                        </div>
                      </li>
                      <el-button
                        type="text"
                        v-show="selectOption.length>0"
                        @click="clearAllOption()"
                      >清空所有筛选</el-button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--分页模块-->
    <pagination
      :total="listParams.totalCount"
      :page="parseInt(listParams.page)"
      :pagesize="listParams.pageSize"
      @getPageNum="changePage"
      class="pagination"
    ></pagination>

    <!--底部寻找模块-->
    <!--<find @search="footSearch"></find>-->

    <!--联系客服模块-->
    <contact :cartInfo="cartInfo" v-if="showContact"></contact>
  </div>
</template>

<script>
import frontSearchbox from "FrontComponents/frontSearchBox";
import productList from "FrontComponents/productList";
import recommendGood from "FrontComponents/recommendGood";
import pagination from "FrontComponents/pagination";
import selectCity from "FrontComponents/selectCity";
import contact from "FrontComponents/contact";
import find from "FrontComponents/find";
import cart from "FrontComponents/cart";
import { userGetList } from "@util/common.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      pickerOptionsStart: this.util.checkDateStart(
        this,
        "dateStart",
        "dateEnd"
      ),
      pickerOptionsEnd: this.util.checkDateEnd(this, "dateStart"),
      dateStart: "",
      dateEnd: "",
      searchTxt: "",
      studioType: 0,
      square: 0,
      studioPrice: 0,
      type: 0,
      //默认默认
      curIndex: 1,
      order: "asc",
      orderType: ["默认", "价格", "销量"],
      isEquip: "",
      provide: [],
      conditionArray: "",
      clearAll: false,
      provideList: [],
      selectOption: [],
      priceList: [],
      studioList: [],
      studioSizeList: [],
      cityCode: "",
      list: [],
      loadList: true,
      listParams: {
        totalCount: 0,
        totalPage: 0,
        pageSize: 48,
        page: 1
      },
      collectList: [], //用户已经收藏的（影棚，器材)列表
      allCity: [], //全部城市选项
      cartInfo: null, //购物车信息
      showContact: false, //显示联系客服模块
      showSearch: true //是否显示搜索框模块
    };
  },
  components: {
    frontSearchbox,
    productList,
    recommendGood,
    selectCity,
    find,
    pagination,
    contact,
    cart
  },
  watch: {
    isEquip: function(to, from) {
      this.listParams.page = 1;
      let value = "";
      if (to) {
        value = "包含器材";
      }
      this.addOption("isEquip", value);
      this.getList();
    },
    studioPrice: function(to, from) {
      this.listParams.page = 1;
      console.log("to----", to);
      let value = "";
      if (to > 0) {
        value = this.getNameByList(to, "priceList");
      }
      this.addOption("studioPrice", value);
      this.getList();
    },
    dateStart: function(to, from) {
      this.listParams.page = 1;
      this.util
        .setTimeStart(this, "dateStart", "dateEnd", "addOption", "time")
        .then(res => {
          if (res) {
            this.getList();
          }
        });
    },
    dateEnd: function(to, from) {
      this.listParams.page = 1;
      this.util.setTimeEnd(this, "dateStart", "dateEnd", "addOption", "time");
      this.getList();
    },
    square: function(to, from) {
      this.listParams.page = 1;
      let value = "";
      if (to > 0) {
        value = this.getNameByList(to, "studioSizeList");
      }
      this.addOption("square", value);
      this.getList();
    },
    studioType: function(to, from) {
      this.listParams.page = 1;
      let value = "";
      if (to > 0) {
        value = this.getNameByList(to, "studioList");
      }
      this.addOption("studioType", value);
      this.getList();
    },
    cityCode: function(to, from) {
      this.listParams.page = 1;
      console.log("cityCode-----", this.cityCode);
      this.getCity();
      this.getList();
    },
    searchTxt(to, from) {
      this.listParams.page = 1;
      console.log("searchTxt------------", this.searchTxt);
      this.addOption("search", to);
      this.getList();
    }
  },
  created() {
    //如果从首页搜索跳转过来
    if (this.$route.query.searchText) {
      this.search(this.$route.query.searchText);
    }
    //获取全部城市信息
    this.allCity = this.config.allCityCode;
    //获取已经收藏列表,首先判断用户是否有登录，如果没有，不用获取
    if (this.util.userIsLogin()) {
      userGetList("1").then(res => {
        console.log("userGetList-------", res);
        this.collectList = res.result;
      });
      //获取购物车信息
      this.getCartInfo();
    } else {
      //没有登录也显示联系客服模块
      this.showContact = true;
    }

    //获取地址相关参数
    let query = this.$route.query;
    console.log("query----", query);
    if (JSON.stringify(query) != "{}") {
      if (query.studioType) {
        this.studioType = parseInt(query.studioType);
      }
      if (query.square) {
        this.square = parseInt(query.square);
      }
      if (query.studioPrice) {
        this.studioPrice = parseInt(query.studioPrice);
      }
      if (query.dateStart) {
        this.dateStart = query.dateStart;
      }
      if (query.dateEnd) {
        this.dateEnd = query.dateEnd;
      }
      if (query.search) {
        this.searchTxt = query.search;
      }
      if (query.cityCode) {
        this.cityCode = query.cityCode;
      } else {
        //					if(parseInt(this.city_code) > 0) {
        //						this.cityCode = this.city_code;
        //					}
      }
    } else {
      //				if(parseInt(this.city_code) > 0) {
      //					this.cityCode = this.city_code;
      //				}
    }

    //获取影棚列表
    this.getStudioList();

    //初始化数据
    this.studioList = this.config.studioType;
    this.priceList = this.config.priceRange;
    this.studioSizeList = this.config.squareArray;
    this.provideList.push("全部");
    this.config.conditionArray.forEach((item, index) => {
      this.provideList.push(item.name);
    });
  },
  computed: {
    ...mapGetters(["city_code"])
  },
  mounted() {
    Array.prototype.remove = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
  },
  methods: {
    // 点击默认，价格或者销量
    changeSort(val) {
      if (val == 1) {
        // 默认
        this.type = 0;
        this.curIndex = 1;
      } else if (val == 2) {
        // 价格
        this.orderBy = "priceWorkDayWorkTimePerHour";
        if (this.curIndex == 2) {
          this.order = this.order == "asc" ? "desc" : "asc";
        } else {
          this.curIndex = 2;
          this.order = "asc";
        }
        this.type = 1;
      } else {
        // 销量
        this.orderBy = "total";
        if (this.curIndex == 3) {
          this.order = this.order == "asc" ? "desc" : "asc";
        } else {
          this.curIndex = 3;
          this.order = "asc";
        }
        this.type = 2;
			}
			this.getList();
    },
    //根据id，获取列表中对应的名称
    getNameByList(id, list) {
      let val = "";
      this[list].forEach((item, index) => {
        if (item.id == id) {
          val = item.name;
        }
      });
      return val;
    },
    //获取购物车信息
    getCartInfo() {
      this.util.getOrderCart().then(res => {
        this.cartInfo = res;
        this.showContact = true;
      });
    },
    //获取城市并添加城市选项
    getCity() {
      let value = "";
      if (this.cityCode > 0) {
        //添加城市选项
        this.allCity.forEach((item, index) => {
          if (this.cityCode == item.code) {
            value = item.city;
          }
        });
      }
      this.addOption("city", value);
    },
    //根据id获取对象数组的name属性值
    getNameById(id, list) {
      list.forEach((item, index) => {
        if (item.id == id) {
          return item.name;
        }
      });
    },
    //获取影棚列表信息
    getList() {
      if (!this.clearAll) {
        this.getStudioList();
      }
    },
    //获取影棚列表数据
    getStudioList() {
      let params = {
        page: this.listParams.page,
        page_size: this.listParams.pageSize,
        typeClassify: this.studioType,
        square: this.square,
        studioPrice: this.studioPrice,
        conditionArray: this.conditionArray,
        isEquip: this.isEquip ? 1 : 0
      };
      if (this.searchTxt) {
        params.search = this.searchTxt;
      }
      if (this.cityCode) {
        params.cityCode = this.cityCode;
      }
      if (this.dateStart) {
        params.dateStart = this.dateStart;
      }
      if (this.dateEnd) {
        params.dateEnd = this.dateEnd;
      }

      switch (parseInt(this.type)) {
        case 0:
          delete params.order_by;
          delete params.order;
          break;
        case 1:
          params.order_by = "priceWorkDayWorkTimePerHour";
          params.order = this.order;
          break;
        case 2:
          params.order_by = "total";
          params.order = this.order;
          break;
      }

      console.log("params--------------------------", params);
      this.util
        .getStudioList(params)
        .then(res => {
          if (this.clearAll) {
            this.clearAll = false;
          }
          console.log("getStudioList----", res);
          this.listParams.totalCount = res.total_count;
          this.listParams.pageSize = parseInt(res.page_size);
          this.listParams.page = res.page;
          this.listParams.totalPage = Math.ceil(
            res.total_count / res.page_size
          );
          // if(res.rows.length > 0) {
          // 	res.rows.forEach((item, index) => {
          // 		if(item.pic.indexOf(",") > 0) {
          // 			item.pic = item.pic.split(",")[0];
          // 		} else {
          // 			item.pic = item.pic;
          // 		}
          // 	});
          // }
          this.list = res.rows;
          this.loadList = false;
          //为列表添加一个是否已经收藏字段
          this.getCollectList();

          console.warn("list----", this.list);
        })
        .catch(err => {});
    },
    ////判断是否已经登录，为列表添加是否已经收藏的字段
    getCollectList() {
      if (this.util.userIsLogin()) {
        userGetList("1").then(res => {
          console.log("userGetList-------", res);
          this.collectList = res.result;
          this.collectList.forEach((item, index) => {
            this.list.forEach((subItem, index2) => {
              if (item.id == subItem.id) {
                this.$set(subItem, "isCollect", true);
              }
            });
          });
        });
      }
    },
    changeProvide(value) {
      let list = [];
      this.selectOption.forEach((item, index) => {
        if (item.split("=")[0] == "provide") {
          list.push(item.split("=")[1]);
        }
      });
      console.log("this.value--------", value);
      console.log("this.list-----------", list);
      if (value.indexOf("全部") >= 0) {
        if (value.length == this.provideList.length - 1 && this.checkAll()) {
          //反选选项
          let dif = this.util.getArrDifference(value, list);
          let i = dif.indexOf("全部");
          if (i >= 0) {
            dif.splice(i, 1);
          }
          this.delOption("provide=" + dif[0]);
        } else {
          if (list.length > 0) {
            this.delAllProvide(value);
          }
          //全选
          this.provide = this.util.deepcopy(this.provideList);
          this.provide.forEach((item, index) => {
            let val = "provide" + "=" + item;
            this.selectOption.push(val);
          });
          //根据设施选项转成对应的选项下标
          this.changeCondition();
          this.getStudioList();
        }
      } else {
        //如果是反选全部
        if (
          this.checkAll() &&
          value.indexOf("全部") < 0 &&
          value.length == this.provideList.length - 1
        ) {
          this.delAllProvide(list);
        }
        //根据显示的选项，判断是添加，还是删除选项
        if (value.length > list.length) {
          this.addOption("provide", value[value.length - 1]);
          if (value.length == this.provideList.length - 1) {
            this.provide.push("全部");
            this.addOption("provide", "全部");
          }
        } else {
          let dif = this.util.getArrDifference(value, list);
          this.delOption("provide=" + dif[0]);
        }
      }
    },
    //判断当前选项有没有全部的选项
    checkAll() {
      let list = [];
      this.selectOption.forEach((item, index) => {
        if (item.split("=")[0] == "provide") {
          list.push(item.split("=")[1]);
        }
      });
      if (list.indexOf("全部") >= 0) {
        return true;
      } else {
        return false;
      }
    },
    //根据设施选项转成对应的选项下标
    changeCondition() {
      this.conditionArray = "";
      let tempList = [];
      this.provideList.forEach((item, index) => {
        this.provide.forEach((subItem, index2) => {
          if (item == subItem) {
            tempList.push(index);
          }
        });
      });
      tempList.remove(0);
      tempList.forEach((item, index) => {
        this.conditionArray += item + ",";
      });
      this.conditionArray = this.conditionArray.substring(
        0,
        this.conditionArray.length - 1
      );
      console.log("this.conditionArray----", this.conditionArray);
    },
    //删除设施全部选项
    delAllProvide(options) {
      console.log("options----", options, this.selectOption);
      let tempList = this.util.deepcopy(options);
      tempList.forEach((item, index) => {
        let index2 = this.selectOption.indexOf("provide=" + item);
        this.provide.remove(item);
        this.selectOption.splice(index2, 1);
      });
      //根据设施选项转成对应的选项下标
      this.changeCondition();
      this.getStudioList();
    },
    //添加、修改选项方法
    addOption(type, value) {
      let val = type + "=" + value;
      if (type == "provide") {
        this.selectOption.push(val);
        //根据设施选项转成对应的选项下标
        this.changeCondition();
        this.getStudioList();
        return;
      }
      //判断是否已经有该类型的选项，如果有就是修改
      let i;
      this.selectOption.forEach((item, index) => {
        if (item.split("=")[0] == type) {
          i = index;
        }
      });
      //如果传值为空，或者为false，就是删除该选项
      if (!value) {
        this.selectOption.splice(i, 1);
      } else {
        if (i >= 0) {
          this.selectOption[i] = val;
        } else {
          this.selectOption.push(val);
        }
      }
      console.log("selectOption--", this.selectOption);
    },
    //删除设施判断
    delCondition(item) {
      let index = this.selectOption.indexOf(item);
      let val = item.split("=")[1];
      this.provide.remove(val);
      this.selectOption.splice(index, 1);
      if (this.provide.length == this.provideList.length - 1) {
        if (this.checkAll()) {
          this.provide.remove("全部");
          this.delOption("provide=全部");
        }
      }
      //根据设施选项转成对应的选项下标
      this.changeCondition();
      this.getStudioList();
    },
    //删除选项方法,并把该类型位置设置为不限(影棚类型，影棚大小，单价范围)
    delOption(item) {
      console.log("delOption---", item);
      console.log("selectOption----", this.selectOption);
      let index = this.selectOption.indexOf(item);
      if (index < 0) return;
      console.log("delOption----", index);
      let type = item.split("=")[0];
      console.log("type----", type);
      if (type == "provide") {
        let val = item.split("=")[1];
        this.delCondition(item);
      } else {
        //设置为不限并删除选项的选项
        this.resetOption(type);
      }
    },
    //清空所有选项方法
    clearAllOption() {
      this.resetOption("all");
    },
    //回复选项位置
    resetOption(type) {
      switch (type) {
        case "all":
          this.clearAll = true;
          this.searchTxt = "";
          this.resetSearch();
          this.selectOption = [];
          this.dateStart = "";
          this.dateEnd = "";
          this.studioType = 0;
          this.square = 0;
          this.studioPrice = 0;
          this.provide = [];
          this.isEquip = false;
          this.conditionArray = "";
          this.cityCode = "0";
          this.getStudioList();
          break;
        case "time":
          this.addOption("time", "");
          this.dateStart = "";
          this.dateEnd = "";
          break;
        case "studioType":
          this.studioType = 0;
          break;
        case "square":
          this.square = 0;
          break;
        case "studioPrice":
          this.studioPrice = 0;
          break;
        case "isEquip":
          this.isEquip = false;
          break;
        case "city":
          this.cityCode = "0";
          break;
        case "search":
          this.searchTxt = "";
          this.resetSearch();
          break;
      }
    },
    //如果删除搜索内容或者清空选项，需要重新加载搜索框模块
    resetSearch() {
      this.showSearch = false;
      this.$nextTick(() => {
        this.showSearch = true;
      });
    },
    changeCity(command) {
      this.cityCode = command.code;
      this.getStudioList();
      console.log("this.cityCode---", this.cityCode);
    },
    changePage(val) {
      console.log("changePage----", val);
      this.listParams.page = val;
      this.getStudioList();
    },
    operatePage(type) {
      if (type == "prev") {
        if (this.listParams.page > 1) {
          this.listParams.page--;
          this.getStudioList();
        }
      } else {
        if (this.listParams.page != this.listParams.totalPage) {
          this.listParams.page++;
          this.getStudioList();
        }
      }
    },
    search(val) {
      console.log("search1111----", val);
      this.searchTxt = val;
      this.getStudioList();
    },
    footSearch(val) {
      console.log("footSearch----", val);
    },
    toCartPage() {
      this.util.toCartPage();
    },
    //删除设备方法
    delEquip(order, index) {
      console.log("order----", order);
      console.log("delEquip----", index);

      //如果是设备订单，而且是最后一个设备，就是删除订单
      if (order.has_studio == 0 && this.orderEquipArr.length == 1) {
        //删除订单
        this.util.delUserOrder(order.id).then(res => {
          console.log("删除用户订单成功！--------", res);
          this.orderCount = 0;
        });
        return;
      }

      let start_time = order.start_time;
      let end_time = order.end_time;
      if (order.rent_type == 2) {
        start_time = order.start_time.split(" ")[0];
        end_time = order.end_time.split(" ")[0];
      }
      let params = {
        order_id: order.id,
        rent_type: order.rent_type,
        start_time: start_time,
        end_time: end_time,
        equip_id: this.orderCart.equip_array[index].equip_id,
        count: 0,
        price: 1
      };
      console.log("params----", params);
      this.util.editRentOrder(params).then(res => {
        this.$message.success("删除设备成功！");
        let price = res.price;
        this.orderEquipArr = price.equipPriceArr;
        this.orderCart.price = price.equip_price + price.order_price;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@front/common/common.scss";
.find {
  background: #fff;
  padding: 30px 0px 20px 20px;
  color: #333333;
  font-family: PingFangSC-Regular;
  margin: 80px 0px;
  .tips {
    margin-bottom: 30px;
  }
  & > div {
    display: flex;
    align-items: baseline;
    span {
      margin-right: 20px;
    }
    ul {
      display: flex;
      li {
        color: #7c6aff;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
}
/*中间主体部分*/

.main {
  margin-top: 10px;
  display: flex;
  .rightInfo {
    /*width:100%;*/
    width: 946px;
    margin-left: 10px;
    background: #fff;
    padding: 10px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 10px;
      font-size: 0px;
      span,
      i {
        font-size: 14px;
      }
      .num {
        color: #ff641f;
      }
      .curPage {
        margin-left: 10px;
      }
      .total {
        margin-right: 10px;
      }
      p {
        i {
          cursor: pointer;
          border: 1px solid #eee;
        }
      }
    }
    /*.list {
				display: flex;
				flex-wrap: wrap;
				li {
					background: #fff;
					width: 224px;
					border: 1px solid #f0f0f0;
					color: #999;
					margin-right: 10px;
					margin-bottom: 10px;
					&:nth-child(4n) {
						margin-right: 0px;
					}
				}
			}*/
  }
}

.findNot {
  background: #fff;
  text-align: center;
  padding: 30px 0px;
  margin: 10px 0px;
  .info {
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-size: 20px;
    p {
      color: #999999;
    }
    span {
      color: #333333;
    }
  }
  .toBack {
    font-size: 12px;
    color: #999;
    margin: 10px 0px;
  }
  button {
    background: #f6f6f6;
    color: #333333;
    border-radius: 0px;
    margin-bottom: 30px;
  }
  .option {
    display: flex;
    justify-content: center;
    & > div {
      width: 885px;
      height: 105px;
      background: #fafafa;
      padding: 20px 0px 20px 12vw;
    }
    .delOption {
      display: flex;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
      p {
        color: #7c6aff;
      }
      span {
        color: #666;
        font-weight: 400;
      }
    }
  }
}

/deep/ {
  .el-date-editor {
    width: 95px;
  }
  .el-input__suffix {
    top: -10px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.sort.up {
  &:before {
    border-bottom-color: #651fff;
    border-bottom: 6px solid #651fff;
  }
}
.sort.down {
  &:after {
    border-top-color: #651fff;
    border-top: 6px solid #651fff;
  }
}
.sort {
  color: #303133;
  margin-right: 40px;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    border-bottom: 6px solid #d8d8d8;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    position: absolute;
    right: -14px;
    top: 1px;
  }
  &:after {
    content: "";
    border-top: 6px solid #d8d8d8;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    position: absolute;
    right: -14px;
    top: 9px;
  }
  &:hover {
    color: #651fff;
  }
}
.active {
  font-weight: 600;
  color: #651fff;
}
.radio-hover {
  cursor: pointer;
}
</style>