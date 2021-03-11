<template>
  <div>
    <div class="carousel-wrap">
      <div class="swiper-container swiper-main">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in swiperArr1" :key="index">
          	<div class="feisi cursor" v-if="index==0">
              <img class="feisi-banner" :src="item.url" width="100%">
              <div class="btn-wrap">
                <div class="huanan">
                  <span class="huanan-btn">华南·华东用户预约</span>
                  <span>广东·广西·上海·江苏·浙江·安徽·江西·福建·湖北·湖南</span>
                </div>
                <div class="huabei">
                  <span class="huabei-btn">华北用户预约</span>
                  <span>北京·天津·成都·重庆·银川·哈尔滨·大连·沈阳·西安</span>
                </div>
              </div>
            </div>
          	<div class="powerPack cursor" v-if="index==1">
              <img class="vonebanner" :src="item.url" width="100%">
            </div>
          	<div class="powerPack cursor" v-if="index==2">
              <img class="powerPack" :src="item.url" width="100%">
            </div>
          	<div class="work cursor" v-if="index==3">
              <img class="work" :src="item.url" width="100%">
            </div>
            <div class="atm-banner cursor" v-if="index==4">
              <img :src="item.url">
            </div>
            <!--<div class="atm-banner" v-if="index==2">
              <img :src="item.url" alt="">
              <div class="banner-center">
                <div class="content">
                  <p>广州ATM商业摄影基地</p>
                  <p>度假风 / 潮牌风 / 欧美风 / 民宿风 / 田园风 / 街头风</p>
                  <p class="atm-btn">查看更多>></p>
                </div>
              </div>
            </div>-->
            
            <div class="equip-banner" v-if="index==5">
              <img :src="item.url" alt="">
              <div class="banner-center">
                <div class="content">
                  <p>租比买，更省心</p>
                  <p>全国相机、镜头、灯光等器材租赁</p>
                  <p class="equip-btn">了解更多</p>
                  <img src="https://pic.paitume.com/3-1575880838787.png" alt="" class="left-oval">
                </div>
                <div class="img-wrap">
                  <img src="https://pic.paitume.com/3-1575880856654.png" alt="" class="camera">
                  <img src="https://pic.paitume.com/3-1575880874423.png" alt="" class="middle-oval">
                  <img src="https://pic.paitume.com/3-1575880892277.png" alt="" class="right-oval">
                </div>
              </div>
            </div>
            <!-- <div class="studio-banner" v-if="index==4">
              <img src="https://pic.paitume.com/3-1575880661354.png" alt=""> -->
            <div class="studio-banner" v-if="index==6">
              <img src="https://pic.paitume.com/3-1575880661354.png" alt="">
              <div class="banner-center">
                <div class="content">
                  <p>没有找不到的摄影场景</p>
                  <p>汇集全国摄影基地、酒店、民宿、街景......</p>
                  <p class="studio-btn">了解更多</p>
                </div>
                <img src="https://pic.paitume.com/3-1575880766781.png" alt="">
              </div>
            </div>
            <!--<div class="why-banner" v-if="false">
              <img :src="item.url1" alt="">
              <img :src="item.url2" alt="">
              <img class="new-btn" :src="item.url3" alt="">
            </div>-->
            <!--<div class="atm-banner" v-if="index==3">
              <img src="https://pic.paitume.com/3-1575880954468.png" alt="">
              <div class="banner-center">
                <div class="content">
                  <p>没有找不到的摄影场景</p>
                  <p>汇集全国摄影基地、酒店、民宿、街景......</p>
                  <p class="studio-btn">了解更多</p>
                </div>
                <img src="https://pic.paitume.com/3-1575880766781.png" alt="">
              </div>
            </div>-->
            <!--<div class="first-banner" v-if="index==4">
              <img :src="item.url1" alt />
              <img :src="item.url2" alt />
              <div class="content">
                <p>派图影像管理软件</p>
                <p>影棚租赁行业创导者</p>
                <div class="btn" @click="toPub">查看更多</div>
              </div>
            </div>-->
            
            <!--<div class="second-banner" v-if="false">
              <img :src="item.url1" alt />
              <img :src="item.url2" alt />
              <div class="text">
                <p class="title">派图租赁公测中</p>
                <p class="sub-title">入驻立享以下服务</p>
                <p class="list-item">
                  <ali-svg-icon icon-class="Polygon" class-name="Polygon" />赠送1000条推广短信
                </p>
                <p class="list-item">
                  <ali-svg-icon icon-class="Polygon" class-name="Polygon" />影棚管理软件免费使用
                </p>
                <p class="list-item">
                  <ali-svg-icon icon-class="Polygon" class-name="Polygon" />小程序订购8.5折
                </p>
                <p class="list-item1">
                  <ali-svg-icon icon-class="Polygon" class-name="Polygon" />海量资源扶持
                </p>
                <p class="text-btn" @click="toRent">立刻入驻</p>
              </div>
            </div>-->
            
            <!--<div class="third-banner" v-if="false">
              <img :src="item.url1" alt />
              <img :src="item.url2" alt />
            </div>-->
            
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination main-pagination"></div>
      </div>
    </div>

    <div class="rent-wrap" id="search">
      <!-- 地图模块 -->
      <div id="map" v-show="false"></div>
      <div class="rent-center">
        <div class="rent-title-wrap">
          <div class="rent-title">
            <span>租</span>
            <div>
              <i class="border-arrow"></i>
              <!-- <span>影棚、器材、配件</span> -->
              <span>影棚、器材</span>
              <i class="border-arrow"></i>
            </div>
          </div>
        </div>
        <div class="rent-box">
          <div class="rent-box-tab">
            <div
              class="tab-hover"
              :class="{active:item.isActive}"
              v-for="(item,index) in textArr"
              :key="index"
              @click="selectRent(item)"
            >
              <span v-text="item.words[0]"></span>
              <span v-text="item.words.slice(1)"></span>
            </div>
          </div>

          <div class="rent-box-select">
            <!-- 选择城市 -->
            <el-cascader
              class="is-select"
              placeholder="城市"
              v-model="checkedCity"
              :options="cityOptions"
              @change="selectCity"
            ></el-cascader>

            <el-select
              v-show="textArr[0].isActive"
              class="select is-select"
              @change="selectSquare"
              v-model="square"
              placeholder="影棚面积"
            >
              <el-option
                v-for="item in squareOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

            <el-cascader
              v-show="textArr[1].isActive"
              @change="changeCategory"
              placeholder="全部类别"
              class="cascader-border is-select"
              :options.sync="equipCategoryArray"
              :show-all-levels="false"
              :props="{value:'id',label:'name'}"
              v-model="selectedCategory"
            ></el-cascader>

            <el-cascader
              v-show="textArr[1].isActive"
              @change="changeBrand"
              placeholder="全部品牌"
              class="cascader-border is-select"
              :options.sync="brandArray"
              :show-all-levels="false"
              :disabled="selectedCategory.length===0"
              :props="{value:'id',label:'name'}"
              v-model="selectedBrand"
            ></el-cascader>

            <el-date-picker
              @change="selectStart"
              v-model="dateStart"
              type="date"
              value-format="yyyy-MM-dd"
              class="select-time is-select"
              placeholder="开始时间"
            ></el-date-picker>
            <el-date-picker
              @change="selectEnd"
              v-model="dateEnd"
              :picker-options="pickerOptionsEnd"
              type="date"
              value-format="yyyy-MM-dd"
              class="select-time is-select"
              placeholder="结束时间"
            ></el-date-picker>
            <el-select
              v-show="textArr[0].isActive"
              class="select is-select"
              @change="selectStudioType"
              v-model="studioIndex"
              placeholder="影棚类型"
            >
              <el-option
                v-for="item in studioType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              class="select is-select"
              v-model="price"
              @change="selectPriceRange"
              placeholder="价格区间"
            >
              <el-option
                v-for="item in priceRange"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <div class="go-btn color-area" @click="goTo">
              <span>立即前往</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="nice-store">
          <div class="store-title">
            <span class="word-border">优选</span>
            <span class="word-bold">好店</span>
          </div>
          <div class="swiper-container swiper-store">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in dealStores(niceStores)" :key="index">
                <div class="store-item card-hover" v-for="(each,j) in item" :key="j" @click="toStore(each.id,each.rel_id,4,index)">
                  <!--<img class="store-img" :src="each.pic?($qiniuHost+each.pic):config.defaultStorePic" alt="">-->
                  <!--<img class="store-img" :src="util.picExplode(each.pic,config.defaultStorePic)">-->
                  <el-image fit="contain" class="store-img" :src="util.picExplode(each.pic,config.defaultStorePic)"></el-image>
                  	
                  <div class="store-info">
                    <div class="logo-wrap">
                      <img class="store-logo" :src="each.adv.avatar?($qiniuHost+each.adv.avatar):config.defaultStorePic" alt="">
                    </div>
                    <div class="store-content">
                      <span class="content-name" :title="each.title">{{each.title}}</span>
                      <span class="content-intro" :title="each.adv.nick">{{each.adv.nick}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="no-store" v-if="noNiceStore">暂无推荐</div>
            </div>
          </div>

          <!-- 如果需要分页器 -->
          <div class="swiper-pagination store-pagination"></div>
        </div>
      </div>
    </div>

    <div class="content-wrap" ref="content">
      <div class="content-center">
        <div class="side-nav" :class="{'side-fix':isFix}">
          <div class="a-wrap" v-for="(item,index) in navArr" :key="index">
            <a
              @click="selectNav(item)"
              :href="item.to"
              class="nav"
              :class="{'nav-active':item.isCheck}"
              v-text="item.name"
            ></a>
          </div>
        </div>
        <!-- 热门器材 -->
        <LunBo 
          id="equip"
          class="lunbo"
          :contentType="contents[0].contentType" 
          :mainTitle="contents[0].mainTitle" 
          :dec="contents[0].dec"
          :category="contents[0].category"
          :dataArr="threeEquipSlide">
        </LunBo>
        <!-- 专业影棚 -->
        <LunBo 
          id="studio"
          class="lunbo"
          :contentType="contents[1].contentType" 
          :mainTitle="contents[1].mainTitle" 
          :dec="contents[1].dec"
          :category="contents[1].category"
          :dataArr="threeStudioSlide">
        </LunBo>

        <!-- 服务商轮播banner -->
        <!--<div class="server-wrap" id="server" v-if="servers.length!=0">
          <el-carousel indicator-position="none" arrow="always" :autoplay="true">
            <el-carousel-item v-for="(item,index) in servers" :key="index">
              <div class="server-item">
                <img v-for="(each,j) in item" :key="j" :src="$qiniuHost+each.pic" alt="" @click="toServer(each)">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>-->

        <!-- 专业平面拍摄 -->
        <!--<LunBo 
        id="pingmian"
        class="lunbo"
        :contentType="contents[2].contentType" 
        :mainTitle="contents[2].mainTitle" 
        :dec="contents[2].dec"
        :category="contents[2].category"
        :dataArr="threePingMianSlide">
        </LunBo>-->

        <!-- 专业后期处理 -->
        <!--<LunBo 
        id="houqi"
        class="lunbo"
        :contentType="contents[3].contentType" 
        :mainTitle="contents[3].mainTitle" 
        :dec="contents[3].dec"
        :category="contents[3].category"
        :dataArr="threeHouQiSlide">
        </LunBo>-->

        <!-- 专业视频拍摄 -->
        <!--<LunBo 
        id="shipin"
        class="lunbo"
        :contentType="contents[4].contentType" 
        :mainTitle="contents[4].mainTitle" 
        :dec="contents[4].dec"
        :category="contents[4].category"
        :dataArr="threeShiPinSlide">
        </LunBo>-->

        <!-- 专业模特 -->
        <!--<LunBo 
        id="model"
        class="lunbo"
        :contentType="contents[5].contentType" 
        :mainTitle="contents[5].mainTitle" 
        :dec="contents[5].dec"
        :category="contents[5].category"
        :dataArr="threeModelSlide">
        </LunBo>-->

      </div>
    </div>

    <div class="partner-wrap" id="partner">
      <!-- <img src="https://pic.paitume.com/images/partner.jpg" alt="" class="bg"> -->
      <div class="partner-title">合作伙伴</div>
      <div class="partner-item-wrap">
        <div
          class="partner-item"
          v-for="(item,index) in partnerImg"
          :key="index"
          @click="goshop(item.id)"
        >
          <img :onerror="util.errorPic" :src="item.url" alt />
        </div>
      </div>
    </div>
    <div class="join-us" id="join">
      <div class="join-center">
        <p>成为派图商家</p>
        <div>
          一起
          <div>
            <span>影</span>
            <i></i>
            <span>享</span>
          </div>世界！
        </div>
        <div class="join-btn color-area" @click="toRent">立即入驻</div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { deepcopy } from "@/common/function/util.js";
import { getEquipArray } from "@/common/function/util.js";
import { squareArray } from "@config/config.js";
import { studioType } from "@config/config.js";
import { priceRange, qiniuHost } from "@config/config.js";
import { frontHome } from "@config/api.js";
import { lazyAMapApiLoaderInstance } from "vue-amap";
import { mapGetters } from "vuex";
import MsgQuick from "FrontComponents/MsgQuick";
import { storage } from '@/util/storage'
import LunBo from "FrontComponents/homeLunbo";
import { apply,ad,service,model } from '@config/api.js'


export default {
  components: {
    MsgQuick,
    LunBo
  },
  data() {
    return {
      contents:[
        {
          contentType:'1',
          mainTitle:'热门器材',
          dec:'热门器材满足您的需求',
          category:[
            {
              name:'单反相机',
            },
            {
              name:'单反镜头',
            },
            {
              name:'柔光箱',
            },
            {
              name:'摄像机',
            },
            {
              name:'手机云台',
            },
            {
              name:'航拍镜头',
            },
          ]
        },
        {
          contentType:'2',
          mainTitle:'专业影棚',
          dec:'热门影棚满足您的需求',
          category:[
            {
              name:'录音棚',
            },
            {
              name:'实景棚',
            },
            {
              name:'无影棚',
            },
            {
              name:'特效棚',
            },
            {
              name:'白棚',
            },
            {
              name:'绿棚',
            },
          ]
        },
        {
          contentType:'3',
          mainTitle:'专业平面摄影',
          dec:'',
          category:[
            // {
            //   name:'服装服饰',
            // },
            // {
            //   name:'内⾐泳装',
            // },
            // {
            //   name:'家居家装',
            // },
            // {
            //   name:'鞋帽箱包',
            // },
            // {
            //   name:'珠宝⾸饰',
            // },
            // {
            //   name:'美妆洗护',
            // },
          ]
        },
        {
          contentType:'4',
          mainTitle:'专业后期处理',
          dec:'',
          category:[
            // {
            //   name:'照片精修',
            // },
            // {
            //   name:'视频剪辑',
            // },
            // {
            //   name:'建模渲染',
            // }
          ]
        },
        {
          contentType:'5',
          mainTitle:'专业视频拍摄',
          dec:'',
          category:[
            // {
            //   name:'服装服饰',
            // },
            // {
            //   name:'内⾐泳装',
            // },
            // {
            //   name:'家居家装',
            // },
            // {
            //   name:'鞋帽箱包',
            // },
            // {
            //   name:'珠宝⾸饰',
            // },
            // {
            //   name:'美妆洗护',
            // },
          ]
        },
        {
          contentType:'6',
          mainTitle:'专业模特',
          dec:'',
          category:[
            {
              name:'时装模特',
              id:1
            },
            {
              name:'商用模特',
              id:2
            },
            {
              name:'内衣模特',
              id:3
            },
            {
              name:'试衣模特',
              id:4
            },
            {
              name:'部件模特',
              id:5
            },
            {
              name:'特型模特',
              id:6
            },
          ]
        },
      ],
      niceStores:[],
      showFirst:true,
      showSecond:false,
      showThird:false,
      showEleven:true,
      dialogVisible: false,
      hotFittingImgUrl: qiniuHost + "images/hot_fittings.jpg",
      hotStudioImgUrl: qiniuHost + "images/hot_studio.jpg",
      hotCameraImgUrl: qiniuHost + "images/hot_camera.jpg",
      pickerOptionsStart: this.util.checkDateStart(this, "dateEnd"),
      pickerOptionsEnd: this.util.checkDateEnd(this, "dateStart"),
      partnerImg: [
        {
          name: "丽舍",
          id: "81",
          url: qiniuHost + "images/partner12.png"
        },
        {
          name: "楷泉",
          id: "63",
          url: qiniuHost + "images/partner1.png"
        },
        {
          name: "小鹿乱撞",
          url: qiniuHost + "images/partner2.jpg"
        },
        {
          name: "飞宇华南",
          id:"53",
          url: qiniuHost + "feiyu.jpg"
        },
        {
          name: "atm",
          id:"187",
          url: qiniuHost + "images/partner29.png"
        },
        {
          name: "大湾区数字影棚",
          url: qiniuHost + "images/partner28.png"
        },
        {
          name: "WHY STUDIO",
          url: qiniuHost + "3-1575625210535.jpg"
        },
        {
          name: "优美图摄",
          id: "54",
          url: qiniuHost + "images/partner10.png"
        },
        {
          name: "顾奈文旅",
          url: qiniuHost + "images/partner23.png"
        },
        {
          name: "花生片场",
          id:"186",
          url: qiniuHost + "images/partner24.png"
        },
        {
          name:'柠檬片场',
          id:"217",
          url: qiniuHost + "images/partner27.png"
        },
        {
          name:'随意门',
          id:"209",
          url: qiniuHost + "images/partner26.png"
        },
      ],
      host: qiniuHost,
      swiperArr: [],
      swiperArr1: [
      {
          url:"https://pic.paitume.com/images/feisiBanner2.png"
       },
      {
          url:"https://pic.paitume.com/images/vonebanner.png?v=122"
       },
      {
          url:"https://pic.paitume.com/images/powerPack2.png?v=21212"
       },
       {
       	url:'https://pic.paitume.com/3-1581494354830.png',
       },
      {
          url:"https://pic.paitume.com/images/yiqingBanner.png"
      },{
      	url:"https://pic.paitume.com/3-1575880819140.png",
      },
        {
          url1: "https://pic.paitume.com/images/black_banner_bg.png",
          url2: "https://pic.paitume.com/images/black_banner_center.png"
        },
        
      ],
      threeEquipSlide: [],
      threeStudioSlide: [],
      threeFittingSlide: [],
      threeActivitySlide: [],
      threePingMianSlide: [],
      threeHouQiSlide: [],
      threeShiPinSlide: [],
      threeModelSlide:[],
      cityOptions: [],
      checkedCity: [],
      square: "",
      dateStart: "",
      dateEnd: "",
      price: "",
      studioIndex: "",
      selectedCategory: [], //选择的类别
      selectedBrand: [], //选择的品牌
      selectedEquip: [], //选择的设备
      equipCategoryArray: [], //从静态库获取的所有类别数据
      brandArray: [], //品牌选择框中相应的选项
      equipArray: [], //设备选择框中相应的选项

      textArr: [
        {
          words: "摄影棚",
          isActive: true
        },
        {
          words: "器材",
          isActive: false
        }
      ],
      squareOptions: squareArray,
      studioType: studioType,
      priceRange: priceRange,
      value: "",
      navArr: [
        {
          name: "搜索",
          to: "/#search",
          isCheck: false
        },
        {
          name: "热门相机",
          to: "/#equip",
          isCheck: false
        },
        {
          name: "热门影棚",
          to: "/#studio",
          isCheck: false
        },
        {
          name: "热门活动",
          to: "/#activity",
          isCheck: false
        },
        {
          name: "成为租赁商",
          to: "/#join",
          isCheck: false
        }
      ],
      isFix: false,
      map: null,
      placeSeach: null,
      cityCode: "",
      timer:null,
      status:null,
      noNiceStore:false,
      servers:[]
    };
  },
  computed: {
    ...mapGetters(["is_login_in", "user_data"])
  },
  created() {
      // this.getRequest(apply.rule,{
      //     type:1
      // }).then(res=>{
      //   this.status=res.length?res.status:88
      // }).catch(err=>{
      //     console.error(err)
      // })
    this.equipCategoryArray = this.$staticCategoryTree;
    this.formatCity();
    this.$nextTick(() => {
      this.homeAjax();
    });
  },

  mounted() {
  	
    window.onscroll = () => {
      if (this.$route.path !== "/") {
        return;
      }
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (
        scrollTop >=
        parseInt(this.getElementTop(document.getElementById("join")))
      ) {
        this.navArr.forEach(item => {
          item.isCheck = false;
        });
        this.navArr[4].isCheck = true;
      } else if (
        scrollTop >=
        parseInt(this.getElementTop(document.getElementById("partner")))
      ) {
        this.navArr.forEach(item => {
          item.isCheck = false;
        });
        this.navArr[4].isCheck = true;
      }  else if (
        scrollTop >=
        parseInt(this.getElementTop(document.getElementById("studio"))) - 10
      ) {
        this.navArr.forEach(item => {
          item.isCheck = false;
        });
        this.navArr[2].isCheck = true;
      } else if (
        scrollTop >=
        parseInt(this.getElementTop(document.getElementById("equip"))) - 10
      ) {
        this.navArr.forEach(item => {
          item.isCheck = false;
        });
        this.navArr[1].isCheck = true;
      } else if (
        scrollTop >=
        parseInt(this.getElementTop(document.getElementById("search"))) - 10
      ) {
        this.navArr.forEach(item => {
          item.isCheck = false;
        });
        this.navArr[0].isCheck = true;
      } else {
        this.navArr.forEach(item => {
          item.isCheck = false;
        });
      }
      if (parseInt(scrollTop) > 1171) {
        this.isFix = true;
      } else {
        this.isFix = false;
        document.getElementsByClassName("side-nav")[0].style.top = "271px";
      }
    };
  },
  methods: {
    // 点击服务banner进入服务详情
    toServer(item){
      console.log(item,'jjjjjjjjj')
      this.util.toShopPage(item.uid)
    },
    // 处理优选好店原数组
    dealStores(arr){
      let newArr=[]
      if(arr.length!=0){
        for(let i=0;i<Math.ceil(arr.length/5);i++){
          newArr.push(arr.slice(5*i,5*i+5))
        }
      }
      return newArr
    },
    // 点击优选好店去到对应店铺首页
    toStore(id,rel_id,type,index){
      this.util.toShopPage(rel_id)
      // 此处做点击统计
      this.getRequest(ad.clickAd,{
        id,
        rel_id,
        type
      }).then(res=>{
      }).catch(err=>{
        console.error(err)
      })
    },
    toDetail(){
      this.$router.push('/personal/coupon/index')
    },
    regSuccess(){
      this.showSecond=false
      this.showThird=true
    },
    pick(){
      this.showFirst=false
      this.showSecond=true
    },
    closeFirst(){
      this.showFirst=false
    },
    closeSecond(){
      this.showSecond=false
    },
    closeThird(){
      this.showThird=false
    },
    close(value) {
      this.dialogVisible = value;
    },
    handleClickSlide(index, eve) {
    console.log('index----eve',index,eve);
      if (eve.target.className === "text-btn") {
        this.toRent()
      } else if (eve.target.className === "btn") {
        this.toPub()
      } else if(eve.target.className === "new-btn"){
				this.util.toShopPage('182')
      } else if(eve.target.className === "studio-btn"){
        this.$router.push('/studio/index')
      } else if(eve.target.className === "equip-btn"){
        this.$router.push('/equip/index')
      } else if(index === 2){
			let url="https://mp.weixin.qq.com/s/b0LqHI8s5bD8ngzUztjtkA";
			window.open(url,'_blank')
      }else if(eve.target.className === "powerPack"){
		let url="https://mp.weixin.qq.com/s/wFpiNy3GolpyJ-U4NjEs8w";
		window.open(url,'_blank')
      }else if(eve.target.className === "work"){
		let url="https://mp.weixin.qq.com/s/MKs2_JPL4fAR0LL6JqdU-Q";
		window.open(url,'_blank')
      }else if(eve.target.className === "vonebanner"){
			this.util.toShopPage('188');
      }else if(eve.target.className === "huanan-btn"){
			this.util.toShopPage('351');
      }else if(eve.target.className === "huabei-btn"){
			this.util.toShopPage('350');
      }
    },
    goshop(id) {
      if (id) {
        this.util.toShopPage(id);
      }
    },
    getEquipPirceStr(equip) {
      //价格取最低的 小时可能为null
      if (equip.per_hour_price != null && equip.per_hour_price > 0) {
        return equip.per_hour_price + "元/小时起";
      }
      if (
        equip.price_day_workday_in != null &&
        equip.price_day_workday_in > 0
      ) {
        return equip.price_day_workday_in + "元/天起";
      }
      if (
        equip.price_day_workday_out != null &&
        equip.price_day_workday_out > 0
      ) {
        return equip.price_day_workday_out + "元/天起";
      }
    },
    //跳到设备详情页面
    toEquipDetail(id) {
      this.util.toEquipDetail(id);
    },
    //跳到影棚详情页面
    toStudioDetail(id) {
      this.util.toStudioDetail(id);
    },
    goTo() {
      let path = "";
      let params;
      if (this.textArr[0].isActive) {
        let sendToStudio = {
          cityCode: this.checkedCity[this.checkedCity.length - 1],
          square: this.square,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
          studioType: this.studioIndex,
          studioPrice: this.price
        };

        path = "/studio/index";
        params = sendToStudio;
      } else {
        let sendToEquip = {
          cityCode: this.checkedCity[this.checkedCity.length - 1],
          equipType: this.selectedCategory[this.selectedCategory.length - 1],
          brand: this.selectedBrand.join(),
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
          equipPrice: this.price
        };
        path = "/equip/index";
        params = sendToEquip;
      }
      Object.keys(params).forEach(key => {
        if (!params[key]) {
          delete params[key];
        }
      });
      let page = this.$router.resolve({
        path: path,
        query: params
      });
      window.open(page.href, "_blank ");
    },
    // 静态城市库格式处理
    formatCity() {
      let provinceArr = [];
      let obj = {
        value: "",
        label: "",
        children: []
      };
      let obj2 = {
        value: "",
        label: ""
      };
      let arr1 = [];
      let arr2 = [];

      this.$staticCityArray.forEach((item, index) => {
        provinceArr.push(item.province);
      });
      provinceArr = [...new Set(provinceArr)];
      provinceArr.forEach((province, j) => {
        this.$staticCityArray.forEach((item, index) => {
          if (item.province === province) {
            arr1.push(item);
          }
        });

        if (arr1.length == 1 && arr1[0].province == arr1[0].city) {
          obj.label = arr1[0].city;
          obj.value = arr1[0].code;
        } else {
          obj.label = arr1[0].province;
          obj.value = arr1[0].province_code;
        }
        arr1.forEach((each, i) => {
          if (province === each.city) {
            delete obj.children;
            return;
          }
          obj2.value = each.code;
          obj2.label = each.city;
          obj.children.push(deepcopy(obj2));
        });
        arr2.push(deepcopy(obj));
        obj.children = [];
        arr1 = [];
      });
      this.cityOptions = [...arr2];
    },
    selectCity(val) {
    },
    selectSquare(val) {
    },
    selectStart(val) {
    },
    selectEnd(val) {
    },
    selectStudioType(val) {
    },
    selectPriceRange(val) {
    },
    // 数组去重
    unique(arr) {
      var x = new Set(arr);
      return [...x];
    },
    // 选择类别
    changeCategory(value) {
      this.$emit("getCategory", value); //父组件触发getCategory事件获取选择的类别id
      let category_sameid_array = [];
      staticEquipArray.forEach((item, index) => {
        if (item.category_id === value[value.length - 1]) {
          category_sameid_array.push(item.brand_id);
        }
      });
      this.brandArray = [];
      staticBrandArray.forEach((each, j) => {
        this.unique(category_sameid_array).forEach((brand, k) => {
          if (each.id === brand) {
            this.brandArray.push(each);
          }
        });
      });
      this.selectedBrand = [];
      this.selectedEquip = [];
    },
    // 选择品牌
    changeBrand(value) {
      this.$emit("getBrand", value); //父组件触发getBrand事件获取选择的品牌id
      this.equipArray = [];
      staticEquipArray.forEach((item, index) => {
        if (
          item.category_id ===
            this.selectedCategory[this.selectedCategory.length - 1] &&
          item.brand_id === this.selectedBrand[0]
        ) {
          this.equipArray.push(item);
        }
      });
    },
    selectRent(checkItem) {
      this.textArr.forEach((item, index) => {
        item.isActive = false;
      });
      checkItem.isActive = true;
      if (this.textArr[0].isActive) {
        this.checkedCity = "";
        this.selectedCategory = [];
        this.selectedBrand = [];
        this.dateStart = "";
        this.dateEnd = "";
        this.price = "";
      } else {
        this.checkedCity = "";
        this.square = "";
        this.dateStart = "";
        this.dateEnd = "";
        this.studioIndex = "";
        this.price = "";
      }
    },
    initSwiper() {
      let _this = this;
      var mySwiper = new Swiper(".swiper-container.swiper-main", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        speed: 1000,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        onSlideChangeEnd: function(swiper) {
          swiper.update();
          mySwiper.startAutoplay();
          mySwiper.reLoop();
        },
        on: {
          //添加点击事件,立即入驻按钮点击后冒泡触发slide的点击事件
          click: function(e) {
            // if(e.target.className==="text-btn"){
            //     this.toRent()
            // }
            // 这里的代码解决swiper循环loop一轮后点击事件消失的bug
            const realIndex = this.realIndex;
            _this.handleClickSlide(realIndex, e);
          }
        },
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination.main-pagination",
          clickable: true,
          bulletActiveClass: "bullet-active"
        }
      });

      mySwiper.el.onmouseover = function(){ //鼠标放上暂停轮播
        mySwiper.autoplay.stop();
      }
      mySwiper.el.onmouseleave = function(){
        mySwiper.autoplay.start();
      }

      this.createSwiper(
        ".swiper-container.swiper-fitting",
        ".swiper-pagination.fitting-pagination"
      );
    },
    //封装轮播图方法,外层容器，分页器
    createSwiper(contain, pagination) {
      let mySwiper = new Swiper(contain, {
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        // 如果需要分页器
        pagination: {
          el: pagination,
          clickable: true,
          bulletActiveClass: "bullet-active"
        }
      });
      //鼠标滑过pagination控制shovawiper切换
      setTimeout(()=>{
        if(mySwiper.pagination){
          for(let i=0;i<mySwiper.pagination.bullets.length;i++){
            mySwiper.pagination.bullets[i].onmouseover=function(){
              this.click();
            };
          } 
        }
      },1000)
    },
    selectNav(nav) {
      this.navArr.forEach(item => {
        item.isCheck = false;
      });
      nav.isCheck = true;
    },
    // 获取某个Dom元素距离页面顶部也就是根节点的高度距离
    getElementTop(ele) {
      if(ele){
        let actualTop = ele.offsetTop;
        let current = ele.offsetParent;
        while (current !== null) {
          actualTop += current.offsetTop;
          current = current.offsetParent;
        }
        return actualTop;
      }
    },
    toRent() {
      if (!this.user_data || this.user_data.role == 0) {
        // let routeData = this.$router.resolve({ path: '/eleven/index' });
        // window.open(routeData.href, '_blank');
        // this.$router.push("/eleven/index");
        this.$router.push("/hire/index");
      } else {
        this.$message.success("您已经成为租赁商");
        this.$router.push("/serve");
      }
    },
    toPub() {
      this.$router.push("/publicity/index");
    },
    //跳转到影棚列表
    toStudioList(val) {
      studioType.forEach((item, index) => {
        if (val == item.name) {
          let params = {
            studioType: item.id
          };
          this.util.toStudioList(params);
        }
      });
    },
    //跳转到器材列表
    toEquipList(val) {
      //获取设备所有分类
      getEquipArray().forEach((item, index) => {
        if (item.name == val) {
          let params = {
            equipType: item.id
          };
          this.util.toEquipList(params);
        }
      });
    },
    homeAjax() {
      // 获取首页优选好店
      this.getRequest(ad.getAd,{
        type:4,
        model:6,
        position:0,
        page_size:99
      }).then(res=>{
        console.warn(res,'优选好店')
        if(res){
          this.niceStores=res.rows
          this.noNiceStore=false
          // 优选好店创建轮播
          if (this.dealStores(this.niceStores).length > 1) {
            this.createSwiper(
              ".swiper-container.swiper-store",
              ".swiper-pagination.store-pagination"
            );
          }
        }else{
          this.noNiceStore=true
        }
      }).catch(err=>{
        console.error(err)
      })
      // 首页顶端轮播图请求
      this.getRequest(frontHome.getAd, {
        uid: 0
      })
        .then(res => {
          this.swiperArr = res;
          this.$nextTick(() => {
            if (this.swiperArr) {
              this.initSwiper();
            }
          });
        })
        .catch(err => {});
      // 首页热门影棚请求
      this.getRequest(frontHome.getStudio, {
        page: 1,
        page_size: 18,
        cityCode: this.cityCode
      })
        .then(res => {
          if (res.rows.length > 0 && res.rows.length <= 6) {
            this.$set(this.threeStudioSlide, "0", res.rows.slice(0, 6));
          } else if (res.rows.length > 6 && res.rows.length <= 12) {
            this.$set(this.threeStudioSlide, "0", res.rows.slice(0, 6));
            this.$set(this.threeStudioSlide, "1", res.rows.slice(6, 12));
          } else {
            this.$set(this.threeStudioSlide, "0", res.rows.slice(0, 6));
            this.$set(this.threeStudioSlide, "1", res.rows.slice(6, 12));
            this.$set(this.threeStudioSlide, "2", res.rows.slice(12, 18));
          }
        })
        .catch(err => {});
      // 首页热门器材请求
      this.getRequest(frontHome.getEquip, {
        page: 1,
        page_size: 30,
        cityCode: this.cityCode
      })
        .then(res => {
          console.warn(res,'热门器材')
          if (res.rows.length > 0 && res.rows.length <= 10) {
            this.$set(this.threeEquipSlide, "0", res.rows.slice(0, 10));
          } else if (res.rows.length > 10 && res.rows.length <= 20) {
            this.$set(this.threeEquipSlide, "0", res.rows.slice(0, 10));
            this.$set(this.threeEquipSlide, "1", res.rows.slice(10, 20));
          } else {
            this.$set(this.threeEquipSlide, "0", res.rows.slice(0, 10));
            this.$set(this.threeEquipSlide, "1", res.rows.slice(10, 20));
            this.$set(this.threeEquipSlide, "2", res.rows.slice(20, 30));
          }
        })
        .catch(err => {});
      // 获取首页服务商banner
      this.getRequest(ad.getAd,{
        type:4,
        model:11,
        position:0,
        page_size:99
      }).then(res=>{
        console.warn(res,'获取服务商banner')
        if(res){
          for(let i=0;i<Math.ceil(res.rows.length/3);i++){
            this.servers[i]=res.rows.slice(3*i,3*i+3)
          }
        }else{

        }
      }).catch(err=>{
        console.error(err)
      })
      // 首页获取服务分类请求
      this.getRequest(service.getServiceCategory).then(res=>{
        console.warn(res,'获取所有的服务分类')
          this.contents[3].category=res[2].children.slice(0,6)
          this.contents[4].category=res[1].children.slice(0,6)
          this.contents[2].category=res[0].children.slice(0,6)
          console.warn(this.contents,'[[[[[[[[[[[[[[[')
      }).catch(err=>{
        console.error(err)
      })
      // 首页平面摄影请求
      this.getRequest(service.getServiceList,{page:1,page_size:30,category_id:1}).then(res=>{
        console.warn(res,'平面摄影列表')
        if (res.rows.length > 0 && res.rows.length <= 10) {
            this.$set(this.threePingMianSlide, "0", res.rows.slice(0, 10));
          } else if (res.rows.length > 10 && res.rows.length <= 20) {
            this.$set(this.threePingMianSlide, "0", res.rows.slice(0, 10));
            this.$set(this.threePingMianSlide, "1", res.rows.slice(10, 20));
          } else {
            this.$set(this.threePingMianSlide, "0", res.rows.slice(0, 10));
            this.$set(this.threePingMianSlide, "1", res.rows.slice(10, 20));
            this.$set(this.threePingMianSlide, "2", res.rows.slice(20, 30));
          }
          console.warn(this.threePingMianSlide,'处理后的平面列表')
      }).catch(err=>{
        console.error(err)
      })
      // 首页后期处理请求
        this.getRequest(service.getServiceList,{page:1,page_size:30,category_id:3}).then(res=>{
          console.warn(res,'后期处理列表列表')
          if (res.rows.length > 0 && res.rows.length <= 10) {
            this.$set(this.threeHouQiSlide, "0", res.rows.slice(0, 10));
          } else if (res.rows.length > 10 && res.rows.length <= 20) {
            this.$set(this.threeHouQiSlide, "0", res.rows.slice(0, 10));
            this.$set(this.threeHouQiSlide, "1", res.rows.slice(10, 20));
          } else {
            this.$set(this.threeHouQiSlide, "0", res.rows.slice(0, 10));
            this.$set(this.threeHouQiSlide, "1", res.rows.slice(10, 20));
            this.$set(this.threeHouQiSlide, "2", res.rows.slice(20, 30));
          }
          console.warn(this.threeHouQiSlide,'处理后的后期列表')
        }).catch(err=>{
          console.error(err)
        })
      // 首页视频拍摄请求
      this.getRequest(service.getServiceList,{page:1,page_size:30,category_id:2}).then(res=>{
        console.warn(res,'视频拍摄列表')
        if (res.rows.length > 0 && res.rows.length <= 10) {
            this.$set(this.threeShiPinSlide, "0", res.rows.slice(0, 10));
          } else if (res.rows.length > 10 && res.rows.length <= 20) {
            this.$set(this.threeShiPinSlide, "0", res.rows.slice(0, 10));
            this.$set(this.threeShiPinSlide, "1", res.rows.slice(10, 20));
          } else {
            this.$set(this.threeShiPinSlide, "0", res.rows.slice(0, 10));
            this.$set(this.threeShiPinSlide, "1", res.rows.slice(10, 20));
            this.$set(this.threeShiPinSlide, "2", res.rows.slice(20, 30));
          }
          console.warn(this.threeShiPinSlide,'处理后的视频列表')
      }).catch(err=>{
        console.error(err)
      })
      // 首页专业模特请求
      this.getRequest(model.getModelList,{
        page:1,
        page_size:45
      }).then(res=>{
        console.warn(res,'模特列表')
        if (res.rows.length > 0 && res.rows.length <= 15) {
          this.$set(this.threeModelSlide, "0", res.rows.slice(0, 15));
        } else if (res.rows.length > 15 && res.rows.length <= 30) {
          this.$set(this.threeModelSlide, "0", res.rows.slice(0, 15));
          this.$set(this.threeModelSlide, "1", res.rows.slice(15, 30));
        } else {
          this.$set(this.threeModelSlide, "0", res.rows.slice(0, 15));
          this.$set(this.threeModelSlide, "1", res.rows.slice(15, 30));
          this.$set(this.threeModelSlide, "2", res.rows.slice(30, 45));
        }
        console.warn(this.threeModelSlide,'处理后的模特列表')
      }).catch(err=>{
        console.error(err)
      })
      // 首页配件请求
      this.getRequest(frontHome.getEquip, {
        page: 1,
        page_size: 18,
        cityCode: this.cityCode,
        category: 1,
        openCategory: 1
      })
        .then(res => {
          this.$set(this.threeFittingSlide, "0", res.rows.slice(0, 4));
          this.$set(this.threeFittingSlide, "1", res.rows.slice(4, 8));
          this.$set(this.threeFittingSlide, "2", res.rows.slice(8, 12));
        })
        .catch(err => {});
      // 首页活动请求
      this.getRequest(frontHome.getActivity, {
        page: 1,
        page_size: 9,
        cityCode: this.cityCode
      })
        .then(res => {
          if (res.rows.length > 6 && res.rows.length <= 9) {
            this.$set(this.threeActivitySlide, "0", res.rows.slice(0, 3));
            this.$set(this.threeActivitySlide, "1", res.rows.slice(3, 6));
            this.$set(this.threeActivitySlide, "2", res.rows.slice(6, 9));
          } else if (res.rows.length > 3 && res.rows.length <= 6) {
            this.$set(this.threeActivitySlide, "0", res.rows.slice(0, 3));
            this.$set(this.threeActivitySlide, "1", res.rows.slice(3, 6));
          } else if (res.rows.length <= 3) {
            this.$set(this.threeActivitySlide, "0", res.rows.slice(0, 3));
          }
          // 只有一页时不轮播
          if (this.threeActivitySlide.length > 1) {
            this.createSwiper(
              ".swiper-container.swiper-activity",
              ".swiper-pagination.activity-pagination"
            );
          }
        })
        .catch(err => {});
      // 首页合作伙伴请求
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  filters: {
    partnerPicDeal(val) {
      let sub = val.slice(val.indexOf("src"));
      let sub1 = sub.slice(sub.indexOf('"') + 1);
      let sub2 = sub1.slice(0, sub1.indexOf('"'));
      return sub2;
    }
  },
  watch: {
    user_data(value) {
      if(value && value.role==0){
        this.showEleven=true
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-wrap {
  height: auto;
  font-family:PingFangSC-Semibold,PingFang SC;
  .swiper-container {
    height: auto;
    .swiper-wrapper {
      .swiper-slide {
        .why-banner{
          position: relative;
          img:nth-child(1){
            width: 100%;
            height: 100%;
          }
          img:nth-child(2){
            width: 18%;
            position: absolute;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
          }
          img:nth-child(3){
            width: 8.54%;
            position: absolute;
            top: 180px;
            left: 50%;
            transform: translateX(-50%);
            cursor: pointer;
          }
        }
        .third-banner {
          position: relative;
          img:first-child {
            width: 100%;
            height: 100%;
          }
          img:nth-child(2) {
            height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .second-banner {
          position: relative;
          img:first-child {
            width: 100%;
            height: 100%;
          }
          img:nth-child(2) {
            // width:60%;
            height: 90%;
            position: absolute;
            right: 13%;
            top: 50%;
            transform: translateY(-50%);
          }
          .text {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 1200px;
            .title {
              font-size: 40px;
              color: #fff;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .sub-title {
              font-size: 14px;
              color: #fff;
              font-weight: 400;
              margin-bottom: 20px;
            }
            .list-item {
              display: flex;
              align-items: center;
              font-size: 18px;
              color: #fff;
              margin-bottom: 15px;
            }
            .list-item1 {
              display: flex;
              align-items: center;
              font-size: 18px;
              color: #fff;
              margin-bottom: 20px;
            }
            .Polygon {
              width: 6px;
              height: 6px;
              margin-right: 12px;
            }
            .text-btn {
              width: 138px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background: #fff;
              border-radius: 20px;
              border: 1px solid rgba(101, 31, 255, 1);
              font-size: 16px;
              color: #4c2f8c;
              font-weight: 600;
              cursor: pointer;
            }
          }
        }
        .fouth-banner {
          position: relative;
          .bg {
            width: 100%;
            height: 100%;
          }
          .content {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .content-left {
              font-family: PingFangSC-Semibold, PingFangSC;
              color: rgb(255, 255, 255);
              max-height: 300px;
              p:first-child {
                font-size: 21px;
                margin-bottom: 20px;
                letter-spacing: 3px;
              }
              p:nth-child(2) {
                font-size: 48px;
                margin-bottom: 30px;
                letter-spacing: 3px;
              }
              .text-btn {
                width: 200px;
                height: 50px;
                border-radius: 5px;
                font-size: 22px;
                background: linear-gradient(to right,#c91f4b, #facc81);
                box-shadow: 0 8px 8px #5a0083;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: auto;
                cursor: pointer;
                margin-bottom: 30px;
              }
              .logo {
                width: 61px;
                height: 15px;
                margin-left: 55px;
              }
            }
            .right-part {
              height: 90%;
            }
          }
        }
        .studio-banner{
          position: relative;
          & > img{
            width: 100%;
          }
          .banner-center{
            height: 100%;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            width: 1200px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .content{
              p:first-child{
                font-size: 50px;
                font-weight: 600;
                color: #fff;
                margin-bottom: 33px;
                letter-spacing: 3px;
              }
              p:nth-child(2){
                font-size: 26px;
                font-weight: 100;
                color: #fff;
                margin-bottom: 58px;
              }
              p:nth-child(3){
                width: 138px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
                font-size: 16px;
                font-weight: 600;
                color: #7B3DFF;
                border-radius: 2px;
                cursor: pointer;
              }
            }
            img{
              height: 90%;
            }
          }
        }
        .equip-banner{
          & > img{
            width: 100%;
          }
          position: relative;
          .banner-center{
            width: 1200px;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            .content{
              height: 68%;
              position: relative;
              p:first-child{
                font-size: 50px;
                font-weight: 600;
                color: #fff;
                margin-bottom: 33px;
                letter-spacing: 3px;
              }
              p:nth-child(2){
                font-size: 26px;
                font-weight: 100;
                margin-bottom: 58px;
                color: #fff;
              }
              p:nth-child(3){
                position: absolute;
                width: 138px;
                height: 40px;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                font-weight: 600;
                color: #3D51FF;
                border-radius: 2px;
                z-index: 3;
                cursor: pointer;
              }
              .left-oval{
                height: 50%;
                position: absolute;
                left: 98px;
                bottom: -10px;
                z-index: 2;
              }
            }
            .img-wrap{
              position: relative;
              width: 484px;
              height: 63%;
              .camera{
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
              }
              .middle-oval{
                position: absolute;
                top: 0;
                right: 535px;
              }
              .right-oval{  
                position: absolute;
                bottom: -40px;
                left: 81%;
              }
            }
          }
        }
        .feisi{
          position: relative;
          img{
            width: 100%;
            height: 100%;
          }
          .btn-wrap{
            position: absolute;
            left: 0;
            top: 62.5%;
            left: 18.3%;
            display: flex;
            span{
              letter-spacing: 2px;
            }
            .huanan{
              margin-right: 32px;
              position: relative;
              span:first-child{
                padding: 9px 24px;
                background: #00A0E8;
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                border-radius: 20px;
              }
              span:nth-child(2){
                padding: 10px 17px;
                background: #545454;
                color: #fff;
                border-radius: 20px;
                position: absolute;
                left: 0;
                top: 59px;
                white-space: nowrap;
                opacity: 0;
                &:after{
                  content:'';
                  border-bottom:8px solid #545454;
                  border-left: 8px solid transparent;
                  border-right: 8px solid transparent;
                  position: absolute;
                  left: 90px;
                  top: -5px;
                }
              }
              span:first-child:hover+span{
                opacity: 1;
                transition: 0.8s;
              }
            }
            .huabei{
              span:first-child{
                padding: 9px 24px;
                background: #00A0E8;
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                border-radius: 20px;
              }
              span:nth-child(2){
                padding: 10px 17px;
                background: #545454;
                color: #fff;
                border-radius: 20px;
                position: absolute;
                right: 0;
                top: 59px;
                white-space: nowrap;
                opacity: 0;
                &:after{
                  content:'';
                  border-bottom:8px solid #545454;
                  border-left: 8px solid transparent;
                  border-right: 8px solid transparent;
                  position: absolute;
                  right: 68px;
                  top: -5px;
                }
              }
              span:first-child:hover+span{
                opacity: 1;
                transition: 0.8s;
              }
            }
          }
        }
        .atm-banner{
          position: relative;
          & > img{
            width: 100%;
            height: 100%;
          }
          .banner-center{
            position: absolute;
            top: 16.8%;
            left: 50%;
            transform: translateX(-50%);
            width: 1200px;
            height: 100%;
            .content{
              width: 630px;
              height: 262px;
              background: rgba(255,255,255,.25);
              padding-left: 30px;
              padding-top: 15px;
              p:first-child{
                font-size: 40px;
                font-weight: 800;
                color: #333;
                margin-bottom: 26px;
                letter-spacing: 3px;
              }
              p:nth-child(2){
                margin-bottom: 70px;
                font-size: 20px;
                font-weight: bold;
                letter-spacing: 3px;
                color: #333;
              }
              p:nth-child(3){
                width: 164px;
                height: 42px;
                color: #1F1F1F;
                font-weight: 800;
                font-size: 18px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: pointer;
                background: rgba(255,255,255,.7);
                border-radius: 4px;
              }
            }
          }
        }
        .year-report{
          cursor: pointer;
          .report{
            width: 100%;
            height: 100%;
          }
        }
        .first-banner {
          position: relative;
          img:first-child {
            width: 100%;
            height: 100%;
          }
          img:nth-child(2) {
            position: absolute;
            top: 0;
            right: 12%;
            height: 100%;
          }
          .content {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-family: PingFangSC-Semibold, PingFangSC;
            color: rgb(255, 255, 255);
            width: 1200px;
            p:first-child {
              font-size: 40px;
              font-weight: 600;
              margin-bottom: 10px;
              letter-spacing: 3px;
            }
            p:nth-child(2) {
              font-size: 16px;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              margin-bottom: 52px;
              letter-spacing: 3px;
            }
            .btn {
              width: 138px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background: #fff;
              border-radius: 20px;
              font-size: 16px;
              color: #4c2f8c;
              font-weight: 600;
              cursor: pointer;
            }
          }
        }
      }
    }

    /deep/ .swiper-pagination {
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
}
.rent-wrap {
  padding: 35px 0 10px;
  box-sizing: border-box;
  background: #fff;
  .rent-center {
    width: 1200px;
    margin: 0 auto;
    .rent-title-wrap {
      width: 449px;
      height: 140px;
      margin: 0 auto;
      white-space: nowrap;
      background: url("https://pic.paitume.com/svg/paitume.svg");
      background-size: 449px 140px;
      background-repeat: no-repeat;
      padding-top: 60px;
      margin-bottom: 45px;
      .rent-title {
        display: flex;
        justify-content: center;
        span {
          font-size: 50px;
          color: #333;
          font-weight: bold;
          margin-right: 30px;
        }
        div {
          position: relative;
          padding: 0 15px;
          box-sizing: border-box;
          .border-arrow {
            display: block;
            width: 29px;
            height: 27px;
            position: absolute;
            top: 0;
            left: 0;
            border-left: 3px solid #7C6AFF;
            border-top: 3px solid #7C6AFF;
          }
          .border-arrow:last-child {
            top: initial;
            left: initial;
            right: 0;
            bottom: 0;
            transform: rotateZ(180deg);
          }
          span {
            font-weight: lighter;
            margin: 0 auto;
          }
        }
      }
    }
    .rent-box {
      box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.05);
      height: 170px;
      padding: 20px 20px 26px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #fff;
      .rent-box-tab {
        display: flex;
        div {
          display: flex;
          color: #aaa;
          font-size: 16px;
          margin-right: 28px;
          cursor: pointer;
        }
        .active {
          color: #333;
          span:first-child {
            border-bottom: 2px solid rgb(115, 74, 226);
            padding-bottom: 5px;
            box-sizing: border-box;
          }
        }
      }
      .rent-box-select {
        height: 55px;
        display: flex;
        .el-cascader {
          width: 160px;
          height: 55px;
          margin-right: 2px;
          /deep/ .el-input__inner {
            width: 160px;
            height: 55px;
            border: none;
            background: #fafafa;
          }
        }
        .select,
        .select-time {
          margin-right: 2px;
          width: 160px;
          height: 55px;
          /deep/ .el-input__inner {
            border: none;
            background: #fafafa;
            height: 55px;
            .el-input__icon {
              height: 55px;
              line-height: 55px;
            }
          }
          /deep/ .el-input {
            height: 55px;
            line-height: 55px;
          }
        }
        .select-time {
          /deep/ .el-icon-time {
            line-height: 55px;
          }
        }
        .go-btn {
          cursor: pointer;
          flex: 1;
          height: 55px;
          line-height: 55px;
          background: rgb(101, 31, 255);
          border-radius: 0px 2px 2px 0px;
          text-align: center;
          color: #fff;
          font-size: 16px;
        }
        /deep/{
        	input::-webkit-input-placeholder{
	            color:#666;
	        }
	        input::-moz-placeholder{
	            color:#666;
	        }
	        input:-moz-placeholder{
	            color:#666;
	        }
	        input:-ms-input-placeholder{
	            color:#666;
	        }
        }
      }
    }
    .nice-store{
      width: 1200px;
      padding-bottom: 30px;
      margin-top: 40px;
      .store-title {
        font-size: 32px;
        color: #333;
        display: flex;
        margin-bottom: 20px;
        .word-border {
          font-weight: 100;
          border-left: 4px solid #f9be00;
          padding-left: 13px;
          box-sizing: border-box;
        }
        .word-bold {
          font-weight: 600;
        }
      }
      .swiper-store{
        background: #fff;
        height: 336px;
        .swiper-wrapper{
          .swiper-slide{
            height: 310px;
            display: flex;
            .store-item{
              width: calc((100% - 48px)/5);
              height: 310px;
              margin-right: 12px;
              position: relative;
              cursor: pointer;
              &:nth-of-type(5n){
                margin-right: 0;
              }
              .store-img{
                position: absolute;
                width: 100%;
                height: 100%;
              }
              .store-info{
                width: 210px;
                height: 58px;
                background: rgba(255,255,255,0.91);
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                .logo-wrap{
                  width: 58px;
                  height: 58px;
                  padding: 2px;
                  background: #fff;
                  img{
                    width: 100%;
                    height: 100%;
                  }
                }
                .store-content{
                  width: calc(100% - 58px);
                  padding-left: 8px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  color: #333;
                  .content-name{
                    width: 100%;
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 3px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                  .content-intro{
                    font-size: 12px;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                }
              }
            }
            .store-item:hover{
              .store-img{
                opacity: 0.5;
              }
            }
          }
          .no-store{
            width: 100%;
            text-align: center;
            font-size: 22px;
            line-height: 200px;
          }
        }
      }
      /deep/ .store-pagination {
        margin: 0 auto;
        position: initial;
        line-height: 40px;
        background: #fff;

        .swiper-pagination-bullet {
          background: #d9d9d9;
          opacity: 1;
          margin-right: 10px;
          outline: none;
        }
        .bullet-active {
          background: #7C6AFF;
          opacity: 1;
        }
      }
    }
  }
}
.content-wrap {
  background: #fafafa;
  position: relative;
  .content-center {
    padding-bottom:40px;
    box-sizing: border-box;
    width: 1200px;
    margin: 0 auto;
    .side-nav {
      position: absolute;
      top: 271px;
      left: 10px;
      z-index: 999;
      a:hover {
        background: #7C6AFF;
        color: #fff;
      }
      .nav {
        display: block;
        width: 60px;
        height: 60px;
        padding: 10px 10px 10px 14px;
        box-sizing: border-box;
        background: #fff;
        margin-bottom: 2px;
        cursor: pointer;
      }
      .nav:first-child {
        display: flex;
        align-items: center;
      }
      .nav:last-child {
        height: 80px;
      }
      .nav:not(:first-child):active {
        background: #7C6AFF;
        color: #fff;
      }
      .nav-active {
        background: #7C6AFF;
        color: #fff;
      }
    }
    .side-fix {
      position: fixed;
      top: 0;
    }
    .server-wrap{
      margin: 60px 0;
      .el-carousel{
        /deep/{
          .el-carousel__container{
            height: 392px;
          }
        }
      }
      .el-carousel__item{
        margin: 0;
        .server-item{
          height: 392px;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          img{
            width: 392px;
            height: 392px;
          }
        }
      }
      .el-carousel__item:nth-child(2n),.el-carousel__item:nth-child(2n+1) {
        background: rgb(250,250,250);
      }
    }
  }
}
.download {
  height: 800px;
  background: url("https://pic.paitume.com/images/DownLoadApp.png") no-repeat center;
  padding-top: 217px;
  box-sizing: border-box;
  .download-content-wrap {
    width: 1200px;
    margin: 0 auto;
    text-align: right;
    .download-content {
      display: inline-block;
      .download-content-title {
        font-size: 0;
        margin-bottom: 12px;
        span:first-child {
          font-size: 32px;
          color: #827898;
          border-left: 4px solid rgb(24, 6, 66);
          padding-left: 13px;
          box-sizing: border-box;
        }
        span:last-child {
          font-size: 32px;
          color: #180642;
        }
      }
      .download-content-subtitle {
        font-size: 16px;
        color: #260a64;
        text-align: left;
        text-indent: 20px;
        font-weight: 400;
        margin-bottom: 38px;
      }
      .download-btn {
        display: flex;
        .mac,
        .windows {
          text-align: center;
          div {
            width: 145px;
            height: 40px;
            background: #260a64;
            color: #7e6da3;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 8px;
            .icon-mac,
            .icon-windows {
              margin-right: 10px;
            }
          }

          span {
            color: #b0b0b0;
          }
        }
        .mac {
          margin-right: 10px;
        }
      }
    }
  }
}
.partner-wrap {
  width: 100%;
  min-height: 500px;
  box-sizing: border-box;
  background: #fff;
  padding: 30px 0 50px;
  .partner-title{
    color: rgb(26, 8, 68);
    text-align: center;
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 50px;
  }
  .partner-item-wrap {
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    .partner-item {
      width: 24%;
      margin-right: auto;
      margin-bottom: 18px;
      background: #fff;
      cursor: pointer;
      box-shadow: 0 0 32px 0 rgba(0,0,0,0.05);
      border:1px solid transparent;
      &:hover{
      	border-color:#ccc;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .partner-item:nth-child(1),
    .partner-item:nth-child(2),
    .partner-item:nth-child(8) {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 160px;
        height: 60px;
      }
    }
    .partner-item:nth-child(4n) {
      margin-right: 0;
    }
  }
}
.join-us {
  height: 320px;
  background: url("https://pic.paitume.com/images/JoinUs.png") no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .join-center {
    text-align: center;
    p {
      font-size: 50px;
      color: #fff;
      font-weight: 600;
      margin-bottom: 16px;
      letter-spacing: 10px;
    }
    div {
      font-size: 32px;
      color: #fff;
      font-weight: 600;
      margin-bottom: 30px;
      letter-spacing: 10px;
      display: flex;
      justify-content: center;
      div {
        margin: 0 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        span {
          letter-spacing: 0;
        }
        i {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #fff;
          margin: 0 20px;
        }
        &:before {
          content: "";
          width: 10px;
          height: 20px;
          border-top: 3px solid #fff;
          border-left: 3px solid #fff;
          position: absolute;
          left: -20px;
          top: 8px;
        }
        &:after {
          content: "";
          width: 10px;
          height: 20px;
          border-bottom: 3px solid #fff;
          border-right: 3px solid #fff;
          position: absolute;
          right: -20px;
          bottom: 4px;
        }
      }
    }
    .join-btn {
      width: 145px;
      margin: 0 auto;
      height: 40px;
      line-height: 40px;
      background: rgb(249, 249, 249);
      color: #2a0e64;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      letter-spacing: 0;
    }
  }
}
</style>
