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
          <span>器材类型：</span>
          <el-radio-group v-model="equipType" class="equip">
            <el-radio v-for="(item,index) in equipTypeList" :key="index" :label="item.id">
              <span class="word-hover">{{item.name}}</span>
            </el-radio>
          </el-radio-group>
        </li>
        <li class="price">
          <span>单价范围：</span>
          <el-radio-group v-model="equipPrice">
            <el-radio :label="item.id" v-for="(item,index) in priceRange" :key="index">
              <span class="word-hover">{{item.name}}</span>
            </el-radio>
          </el-radio-group>
          <span class="endDom widthAuto">送货上门：</span>
          <el-checkbox v-model="isTake" class="word-hover">是</el-checkbox>
        </li>
        <li v-show="showBrand">
          <span>品牌筛选：</span>
          <el-checkbox-group v-model="brand" @change="changeBrand" v-if="brandList.length>0">
            <el-checkbox :label="item.name" v-for="(item,index) in brandList" :key="index">
              <span class="word-hover">{{item.name}}</span>
            </el-checkbox>
          </el-checkbox-group>
          <span v-else>无</span>
          <!--<span class="endDom">送货上门：</span>
          <el-checkbox v-model="isTake">是</el-checkbox>-->
        </li>
      </ul>
    </div>

    <!--中间主体部分模块-->
    <div class="main radio-setting">
      <div class="leftInfo">
        <recommend-good type="1"></recommend-good>
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
              <span>个器材</span>
              <span class="num curPage">{{listParams.page}}</span>
              <span class="total">/{{listParams.totalPage}}</span>
              <i class="el-icon-arrow-left page-hover" @click="operatePage('prev')"></i>
              <i class="el-icon-arrow-right page-hover" @click="operatePage('next')"></i>
            </p>
          </div>
          <!--列表模块-->
          <product-list :list="list" type="equip" v-loading="loadList"></product-list>
        </div>

        <!--如果没有找到相关产品模块-->
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
import find from "FrontComponents/find";
import contact from "FrontComponents/contact";
import cart from "FrontComponents/cart";
import { frontEquip } from "@config/api.js";
import { userGetList } from "@util/common.js";
import { priceRange } from "@config/config.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pickerOptionsStart: this.util.checkDateStart(this, "dateEnd"),
      pickerOptionsEnd: this.util.checkDateEnd(this, "dateStart"),
      dateStart: "",
      dateEnd: "",
      searchTxt: "", //输入的搜索框内容
      equipType: "0",
      equipPrice: 0,
			type: 0,
			//默认默认
      curIndex: 1,
      order: "asc",
      orderType: ["默认", "价格", "销量"],
      isTake: "",
      brand: [],
      conditionArray: "",
      clearAll: false,
      showBrand: false, //是否显示品牌选项
      brandList: [],
      selectOption: [],
      priceRange: priceRange, //价格范围
      equipTypeList: [],
      cityCode: "",
      list: [],
      loadList: true,
      listParams: {
        totalCount: 0,
        totalPage: 0,
        pageSize: 48,
        page: 1
      },
      collectList: [], //获取已经收藏的列表
      cartInfo: null, //购物车信息
      canSearch: true, //是否能搜索
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
    isTake: function(to, from) {
      this.listParams.page = 1;
      let value = "";
      if (to) {
        value = "包含器材";
      }
      this.addOption("isTake", value);
      this.getList();
    },
    equipPrice: function(to, from) {
      this.listParams.page = 1;
      console.log("to----", to);
      let value = "";
      if (to > 0) {
        value = this.getNameByList(to, "priceRange");
      }
      this.addOption("equipPrice", value);
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
    equipType: function(to, from) {
      this.listParams.page = 1;
      let value = "";
      console.log("to---", to);
      if (to > 0) {
        value = this.getNameByList(to, "equipTypeList");
        //获取品牌
        this.getBrandByCategory(to);
        this.showBrand = true;
      } else {
        this.showBrand = false;
      }
      //清空品牌
      this.brand = [];
      this.delAllBrand();
      this.addOption("equipType", value);
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
    //			this.allCity=this.util.staticAllCity();
    this.allCity = this.config.allCityCode;
    //获取已经收藏列表,首先判断用户是否有登录，如果没有，不用获取
    if (this.util.userIsLogin()) {
      userGetList("2").then(res => {
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
      if (query.equipType) {
        this.equipType = query.equipType;
        if (query.brand) {
          this.getBrandByCategory(this.equipType, () => {
            let brandType = query.brand;
            if (brandType) {
              this.brandList.forEach((item, index) => {
                if (brandType == item.id) {
                  this.brand.push(item.name);
                  this.changeBrand(this.brand);
                }
              });
            }
          });
        }
      }
      if (query.equipPrice) {
        this.equipPrice = parseInt(query.equipPrice);
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
        //					if(parseInt(this.city_code)>0){
        //						this.cityCode=this.city_code;
        //					}
      }
    } else {
      //				if(parseInt(this.city_code)>0){
      //					this.cityCode=this.city_code;
      //				}
    }

    //获取器材列表
    this.getEquipList();

    //获取所有分类
    this.equipTypeList = this.util.getEquipArray();
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
        this.orderBy = "price_day_workday_in";
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
			this.getEquipList();
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
    //根据分类ID获取品牌
    getBrandByCategory(id, callback) {
      let params = {
        category_id: id
      };
      this.getRequest(frontEquip.getBrandByCategory, params)
        .then(res => {
          console.log("getBrandByCategory----", res);
          this.brandList = res;
          callback && callback();
        })
        .catch(err => {});
    },
    getList() {
      if (!this.clearAll) {
        this.getEquipList();
      }
    },
    //获取器材列表数据
    getEquipList() {
      if (!this.canSearch) return;
      this.list = [];
      let params = {
        page: this.listParams.page,
        page_size: this.listParams.pageSize,
        //					typeClassify: this.equipType,
        category: this.equipType,
        equipPrice: this.equipPrice,
        brand: this.getBrandParams(),
        //					isTake: this.isTake ? 1 : 0,
        door_to_door: this.isTake ? 1 : null,
        borrow_type: "0"
      };
      if (this.searchTxt) {
        params.search = this.searchTxt;
      }
      if (parseInt(this.cityCode) > 0) {
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
          break;
        case 1:
          params.order_by = "price_day_workday_in";
          params.order = this.order;
          break;
        case 2:
          params.order_by = "total";
          params.order = this.order;
          break;
      }
      this.canSearch = false;
      console.log("params--------------------------", params);
      this.util
        .getEquipList(params)
        .then(res => {
          if (this.clearAll) {
            this.clearAll = false;
          }
          console.log("getEquipList----", res);
          this.listParams.totalCount = res.total_count;
          this.listParams.pageSize = parseInt(res.page_size);
          this.listParams.page = res.page;
          this.listParams.totalPage = Math.ceil(
            res.total_count / res.page_size
          );
          this.list = res.rows;
          this.loadList = false;
          //为列表添加是否已经收藏的字段
          this.getCollectList();
          console.log("list---", this.list);
          setTimeout(() => {
            this.canSearch = true;
          }, 100);
        })
        .catch(err => {});
    },
    ////判断是否已经登录，为列表添加是否已经收藏的字段
    getCollectList() {
      if (this.util.userIsLogin()) {
        userGetList("2").then(res => {
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
    //根据选中的品牌转换为id字符串
    getBrandParams() {
      let str = "";
      if (this.brand.length > 0) {
        this.brandList.forEach((item, index) => {
          this.brand.forEach((subItem, index2) => {
            if (subItem == item.name) {
              str += item.id + ",";
            }
          });
        });
      }
      if (str.indexOf(",") > 0) {
        str = str.substring(0, str.length - 1);
      }
      return str;
      console.log("str-----", str);
    },
    changeBrand(value) {
      console.log("value-------", value);
      let list = [];
      this.selectOption.forEach((item, index) => {
        if (item.split("=")[0] == "brand") {
          list.push(item.split("=")[1]);
        }
      });
      //判断是添加，还是删除
      if (list.length > 0) {
        //添加
        let dif = this.util.getArrDifference(value, list);
        if (value.length > list.length) {
          this.addOption("brand", dif[dif.length - 1]);
        } else {
          //删除
          this.delOption("brand=" + dif[dif.length - 1]);
        }
      } else {
        this.addOption("brand", value[value.length - 1]);
      }
      console.log("list-----", list);
    },
    //删除全部品牌
    delAllBrand() {
      console.log("delAllBrand-----", this.selectOption);
      let tempList = this.util.deepcopy(this.selectOption);
      tempList.forEach((item, index) => {
        if (item.split("=")[0] == "brand") {
          this.delOption(item);
        }
      });
    },
    //添加、修改选项方法
    addOption(type, value) {
      let val = type + "=" + value;
      if (type == "brand") {
        this.selectOption.push(val);
        this.getEquipList();
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
      this.brand.remove(val);
      this.selectOption.splice(index, 1);
      this.getEquipList();
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
      if (type == "brand") {
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
          this.equipType = "0";
          this.equipPrice = 0;
          this.brand = [];
          this.isTake = false;
          this.conditionArray = "";
          this.cityCode = "0";
          this.getEquipList();
          break;
        case "time":
          this.addOption("time", "");
          this.dateStart = "";
          this.dateEnd = "";
          break;
        case "equipType":
          this.equipType = "0";
          break;
        case "equipPrice":
          this.equipPrice = 0;
          break;
        case "isTake":
          this.isTake = false;
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
      this.getEquipList();
      console.log("this.cityCode---", this.cityCode);
    },
    changePage(val) {
      console.log("changePage----", val);
      this.listParams.page = val;
      this.getEquipList();
    },
    operatePage(type) {
      if (type == "prev") {
        if (this.listParams.page > 1) {
          this.listParams.page--;
          this.getEquipList();
        }
      } else {
        if (this.listParams.page != this.listParams.totalPage) {
          this.listParams.page++;
          this.getEquipList();
        }
      }
    },
    search(val) {
      console.log("search1111----", val);
      this.searchTxt = val;
      this.getEquipList();
    },
    footSearch(val) {
      console.log("footSearch----", val);
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
    .list {
      display: flex;
      flex-wrap: wrap;
      li {
        background: #fff;
        width: 224px;
        /*box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);*/
        border: 1px solid #f0f0f0;
        color: #999;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        &:nth-child(4n) {
          margin-right: 0px;
        }
      }
    }
  }
  .equip {
    .el-radio {
      margin-bottom: 5px;
    }
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