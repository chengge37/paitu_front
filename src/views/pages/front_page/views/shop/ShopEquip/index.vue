<template>
  <div v-if="equipList.length!=0" :class="{mode1:mode==1,mode2:mode==2,mode3:mode==3,mode4:mode==4,mode5:mode==5,mode6:mode==6,mode7:mode==7}">
    <div class="title" v-if="mode==7">我们的器材</div>
    <div class="title" v-if="mode==2">器材租赁</div>
    <div class="title" v-if="mode==3">
      Equipment Rental
    </div>
    <div class="title" v-if="mode==4">
      器/材/租/赁
    </div>
    <div class="title-wrap" v-if="mode==5">
      <div class="content">
        <div class="title">/ 器材租赁 /</div>
        <div class="more" @click="toMore">查看更多 >></div>
      </div>
    </div>
    <div class="title" v-if="mode==6"><span>Equipment Rental</span></div>

    <div class="equip-tab" v-if="mode==2">
      <span class="tab-item" :class="{active:item.check}" v-for="(item,index) in equipCategory" :key="index">{{item.text}}</span>
      <span class="more" @click="toMore">更多器材>></span>
    </div>
    <div class="big-row-wrap" v-if="mode==4||mode==5">

      <div class="equip-big-row" v-for="(item,index) in topTwo" :key="index">
        <div class="big-img-wrap">
          <img :onerror="util.errorPic" :src="$qiniuHost+(item.pic.indexOf(',')!=-1?item.pic.split(',')[0]:item.pic)" alt="">
        </div>
        <div class="row-right">
          <p class="card-title" v-if="mode==4">{{index==0?'NUMBER ONE':'NUMBER TWO'}}</p>
          <p class="name">{{item.custom_desc||item.name}}</p>
          <div class="rent-price">
            <span class="price">￥{{item.price_day_workday_in}}/每小时</span>
            <span v-if="item.name!='此产品不存在'" class="rent-btn"  @click="rent(item.id)">立即租借 > ></span>
          </div>
          <div class="pic-list">
            <img v-for="(each,j) in item.pic.indexOf(',')!=-1?item.pic.split(',').slice(0,3):[item.pic]" :key="j" :src="$qiniuHost+each" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="equip-row" v-for="(each,j) in equipList" :key="j">
      <div class="grey-line" v-if="mode==1"></div>
      <div class="equip-list">
        <div class="equip" v-for="(item,i) in each" :key="i">
          <div v-if="mode==6" class="little-label">{{'0'+(2*j+i+1)}}</div>
          <div class="img-wrap">
            <img :onerror="util.errorPic" :src="$qiniuHost+(item.pic.indexOf(',')!=-1?item.pic.split(',')[0]:item.pic)" alt="">
          </div>
          <p class="name" :title="item.name">{{item.name}}</p>
          <div class="price-rent">
            <p class="price">{{item.price_day_workday_in}}/小时起</p>
            <p class="rent-btn" @click="rent(item.id)" v-if="item.name!='此产品不存在'">
              <span>立即租借</span>
              <span v-if="mode!=5&&mode!=1&&mode!=7">>></span>
              <i class="el-icon-arrow-right" v-if="mode==1||mode==7"></i>
            </p>
          </div>
        </div> 
      </div>
    </div>
    <div class="more" v-if="mode==6" @click="toMore">
      <span>查看更多</span>
      <span></span>
    </div>
    <p class="more" v-if="mode==3||mode==4" @click="toMore">
      <span>查看更多</span>
      <i class="el-icon-arrow-right"></i>
    </p>
    <p @click="toMore" class="more" v-if="mode==1||mode==7">
      <span>更多器材</span>
      <span></span>
    </p>
  </div>
</template>

<script>
import { frontEquip } from "@config/api.js";

  export default {
    data(){
      return{
        equipCategory:[
          {
            text:'全部',
            check:true
          },
          {
            text:'单反相机',
            check:false
          },
          {
            text:'摄像机',
            check:false
          },
          {
            text:'全家福相机',
            check:false
          },

        ],
        equipArr:[
          {
            url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1856778476,1584220380&fm=26&gp=0.jpg',
            name:'佳能（Canon）EOS 750D 单反相机 单反套机（EF-S 18-135mm f/3.5…',
            price:'¥159/小时起'
          },
          {
            url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1856778476,1584220380&fm=26&gp=0.jpg',
            name:'佳能（Canon）EOS 750D 单反相机 单反套机（EF-S 18-135mm f/3.5…',
            price:'¥159/小时起'
          },
          {
            url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1856778476,1584220380&fm=26&gp=0.jpg',
            name:'佳能（Canon）EOS 750D 单反相机 单反套机（EF-S 18-135mm f/3.5…',
            price:'¥159/小时起'
          },
          {
            url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1856778476,1584220380&fm=26&gp=0.jpg',
            name:'佳能（Canon）EOS 750D 单反相机 单反套机（EF-S 18-135mm f/3.5…',
            price:'¥159/小时起'
          },
          {
            url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1856778476,1584220380&fm=26&gp=0.jpg',
            name:'佳能（Canon）EOS 750D 单反相机 单反套机（EF-S 18-135mm f/3.5…',
            price:'¥159/小时起'
          },
          {
            url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1856778476,1584220380&fm=26&gp=0.jpg',
            name:'佳能（Canon）EOS 750D 单反相机 单反套机（EF-S 18-135mm f/3.5…',
            price:'¥159/小时起'
          },
          {
            url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1856778476,1584220380&fm=26&gp=0.jpg',
            name:'佳能（Canon）EOS 750D 单反相机 单反套机（EF-S 18-135mm f/3.5…',
            price:'¥159/小时起'
          },
          {
            url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1856778476,1584220380&fm=26&gp=0.jpg',
            name:'佳能（Canon）EOS 750D 单反相机 单反套机（EF-S 18-135mm f/3.5…',
            price:'¥159/小时起'
          },
          {
            url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1856778476,1584220380&fm=26&gp=0.jpg',
            name:'佳能（Canon）EOS 750D 单反相机 单反套机（EF-S 18-135mm f/3.5…',
            price:'¥159/小时起'
          },
        ],
        topTwo:[],
        equipList:[],
        // nullList:[
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
        //   {
        //     address: "广东省珠海市香洲区唐家湾镇大学路101号清华科技园",
        //     base_pic: "static/707-0.png,static/707-1.png",
        //     borrow_type: "0",
        //     brand_name: "ACE",
        //     brief: "",
        //     category_name: "单反镜头",
        //     city: "珠海市",
        //     city_code: "0756",
        //     consumptive: "0",
        //     count: "1",
        //     create_time: "1571116227",
        //     del: "0",
        //     door_to_door: "1",
        //     equip_category_array_str: "1,2,4",
        //     hourPrice: [],
        //     id: "536",
        //     intro: "",
        //     isTake: "0",
        //     is_start: 0,
        //     location: "",
        //     name: "此产品不存在",
        //     nick: "派图租赁",
        //     only_rent_day: "1",
        //     pic: "",
        //     price: 0,
        //     price_day_holiday_in: "1",
        //     price_day_holiday_out: "1",
        //     price_day_weekend_in: "1",
        //     price_day_weekend_out: "1",
        //     price_day_workday_in: "0",
        //     price_day_workday_out: "0",
        //     province: "广东省",
        //     province_code: "44",
        //     remark: "",
        //     score: "3.0",
        //     sort: "0",
        //     static_equip_id: "707",
        //     time_price: "0",
        //     total: "0",
        //     uid: "3",
        //     video: ""
        //   },
     
        // ]
      }
    },
    props:{
      mode:{
        type:Number,
        default:1
      },
      uid:{
        type:String,
        default:''
      }
    },
    created(){
      if(this.mode==4||this.mode==5){
        this.getEquip({page:1,page_size:8,order_by:'total',uid:this.uid},3)
      }else if(this.mode==1||this.mode==7){
        this.getEquip({page:1,page_size:12,order_by:'total',uid:this.uid},3)
      }else if(this.mode==3){
        this.getEquip({page:1,page_size:6,order_by:'total',uid:this.uid},3)
      }else if(this.mode==6){
        this.getEquip({page:1,page_size:6,order_by:'total',uid:this.uid},2)
      }else{
        this.getEquip({page:1,page_size:9,order_by:'total',uid:this.uid},3)
      }
      // if(this.mode==4||this.mode==5){
      //   this.topTwo=this.equipArr.slice(0,2)
      //   this.equipArr=this.equipArr.slice(2,8)
      //   console.warn(this.equipArr,'55')
      // }
      // if(this.mode==3||this.mode==6){
      //   this.equipArr=this.equipArr.slice(0,6)
      // }
      // switch (this.mode){
      //   case 1:
      //   case 2:
      //   case 3:
      //   case 4:
      //   case 5:
      //   case 7:
      //     this.arrSlice(3)
      //     break;
      //   case 6:
      //     this.arrSlice(2)
      //     break;

      // }
    },
    methods:{
      getEquip(params,n){
        this.getRequest(frontEquip.getEquipList,{...params}).then(res=>{
          console.warn(res,'设备列表')
          this.equipList=res.rows
          // if(this.equipList.length==0){
          //   if(this.mode==4||this.mode==5){
          //     this.equipList=this.nullList.slice(0,5)
          //   }else{
          //     this.equipList=this.nullList.slice(0,6)
          //   }
          // }
          if(this.mode==4||this.mode==5){
            this.topTwo=this.equipList.slice(0,2)
            this.equipList=this.equipList.slice(2)
          }
          this.arrSlice(n)
        }).catch(err=>{
          console.error(err)
        })
      },
      arrSlice(n){
        let arr=[]
        let num=Math.ceil(this.equipList.length/n)
        for(let i=0;i<num;i++){
          arr.push(this.equipList.slice(n*i,n*i+n))
        }
        this.equipList=arr
      },
      toMore(){
        this.$emit('selectTab','/shop/equip')      
      },
      rent(equipId){
        this.$router.push({path:'/equip/detail',query:{
          id:equipId
        }})
      }
    }
  }
</script>

<style lang="scss" scoped>
.mode1{
  margin-bottom: 132px;
  .equip-row{
    width: 1200px;
    margin: 0 auto;
    .grey-line{
      width:1200px;
      height:8px;
      background:rgb(240,244,248);
    }
    .equip-list{
      height: 566px;
      display: flex;
      justify-content: space-between;
      .equip{
        width: 390px;
        text-align: center;
        color: #7F8990;
        font-size: 16px;
        .img-wrap{
          width: 390px;
          height: 390px;
          margin-bottom: 15px;
          border:1px solid rgb(238,242,246);
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            max-width: 390px;
            max-height:390px;
            width: auto;
            height: auto;
          }
        }
        .name{
          width: 292px;
          margin: 0 auto;
          margin-bottom: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .price{
          margin-bottom: 15px;
        }
        .rent-btn{
          width:122px;
          height:40px;
          background:rgb(25,43,57);
          border-radius:2px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          cursor: pointer;
          i{
            position: relative;
            bottom: -2px;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .more{
    margin-top: 49px;
    color: #192B39;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span:first-child{
      font-size: 20px;
      margin-right: 6px;
    }
    span:last-child{
      width: 38px;
      height: 4px;
      background: #192B39;
      position: relative;
      &:after{
        content:'';
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(100%,calc((-50% + 2px)));
        width: 0;
        height: 12px;
        border: 8px solid transparent;
        border-left: 13px solid #192B39;
      }
    }
  }
}
.mode2{
  color: #333;
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
  .title{
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 50px;
  }
  .equip-tab{
    display: flex;
    margin-bottom: 30px;
    .tab-item{
      margin-right: 45px;
      cursor: pointer;
    }
    .active{
      color: #7C6AFF;
    }
    .more{
      margin-left: auto;
      cursor: pointer;
    }
  }
  .equip-row{
    margin-bottom: 30px;
    .equip-list{
      display: flex;
      justify-content: space-between;
      .equip{
        width: 380px;
        height: 537px;
        border: 1px solid #D9D9D9;
        box-sizing: content-box;
        img{
          width: 380px;
          height: 380px;
        }
        .name{
          padding: 24px 21px 0;
          box-sizing: border-box;
          margin-bottom: 44px;
          font-size: 16px;
        }
        .price-rent{
          padding: 0 21px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          .price{
            font-weight: bold;
            font-size: 20px;
            &::first-letter{
              font-size: 14px;
              font-weight: bold;
            }
          }
          .rent-btn{
            font-size: 16px;
            color: #7C6AFF;
            font-weight: bold;
            cursor: pointer;
          }
        }
        &:hover{
          border: 1px solid #7C6AFF;
          box-shadow:0px 0px 18px 0px rgba(5,5,5,0.3);
        }
      }
    }
  }
}
.mode3{
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 98px;
  .title{
    font-size:72px;
    font-family:Bahnschrift;
    color: #F8F8F8;
    text-align: center;
    padding-top: 67px;
    padding-bottom: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 124px;
    position: relative;
    &:after{
      // content:'器材租赁';
      content:'\5668\6750\79df\8d41';
      background: #fff;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%,50%);
      font-size: 36px;
      color: #333;
      padding:0 44px;
      box-sizing: border-box;
      letter-spacing: 3px;
    }
  }
  .equip-row{
    margin-bottom: 48px;
    .equip-list{
      display: flex;
      justify-content: space-between;
      .equip{
        width: 380px;
        height: 537px;
        border: 1px solid #F0F0F0;
        box-sizing: content-box;
        background: #7C6AFF;
        color:#fff;
        img{
          width: 380px;
          height: 380px;
        }
        .name{
          padding: 24px 21px 0;
          box-sizing: border-box;
          margin-bottom: 44px;
          font-size: 16px;
        }
        .price-rent{
          padding: 0 21px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price{
            font-weight: bold;
            font-size: 20px;
            &::first-letter{
              font-size: 14px;
              font-weight: bold;
            }
          }
          .rent-btn{
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }
        }
        &:hover{
          border: 1px solid #7C6AFF;
          box-shadow:0px 0px 18px 0px rgba(5,5,5,0.3);
        }
      }
    }
  }
  .more{
    width: 140px;
    height: 42px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #333;
    color: #333;
    cursor: pointer;
    i{
      position: relative;
      bottom: -1px;
      margin-left: 5px;
    }
    &:hover{
      border: 1px solid #7C6AFF;
      color: #7C6AFF;
    }
  }
}
.mode4{
  background: #03D4DB;
  padding-top: 40px;
  padding-bottom: 90px;
  box-sizing: border-box;
  .title{
    width: 1200px;
    margin: 0 auto;
    font-size: 40px;
    font-weight: bold;
    color: #fff;
    letter-spacing: 10px;
    text-align: center;
    font-family:PingFang SC;
    position: relative;
    margin-bottom: 100px;
    &:after{
      content:'Equipment Rental';
      position: absolute;
      color: #191919;
      font-size: 30px;
      font-family:Bahnschrift;
      letter-spacing: 3px;
      left: 50%;
      bottom: 0;
      transform: translate(-50%,180%);
    }
  }
  .big-row-wrap{
    .equip-big-row{
      width: 1200px;
      margin: 0 auto;
      background: #fff;
      box-shadow:7px 0px 10px 0px rgba(97,118,125,0.3);
      height: 540px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      box-sizing: border-box;
      .big-img-wrap{
        width: 500px;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }
      }
      .row-right{
        flex: 1;
        height: 100%;
        padding: 80px 90px 43px 70px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        .card-title{
          font-size: 30px;
          color: #666;
          font-weight: 300;
          margin-bottom: 25px;
        }
        .name{
          font-size: 26px;
          color: #333;
          font-weight: 500;
          font-family:PingFang SC;
          margin-bottom: 20px;
        }
        .pic-list{
          margin-bottom: auto;
          img{
            width: 138px;
            height: 138px;
            &:not(:last-child){
              margin-right: 25px;
            }
          }
        }
        .rent-price{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price{
            font-size: 24px;
            color: #F85D19;
            font-weight: bold;
          }
          .rent-btn{
            width:128px;
            height:38px;
            border:1px solid rgb(3,212,219);
            color: #03D4DB;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }
  }
  .equip-row{
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
    .equip-list{
      display: flex;
      justify-content: space-between;
      .equip{
        width: 380px;
        height: 460px;
        background: #fff;
        padding: 20px 0 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .img-wrap{
          width: 340px;
          height: 340px;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            max-width: 100%; 
            max-height: 100%;
            width: auto;
            height: auto;
          }
        }
        .name{
          width: 340px;
          padding: 0 10px;
          box-sizing: border-box;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 20px;
          color: #333333;
          font-weight: 500;
        }
        .price-rent{
          width: 340px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          box-sizing: border-box;
          .price{
            color: #F96B15;
            font-size: 20px;
          }
          .rent-btn{
            color: #03D4DB;
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
    }
    &:last-child{
      margin-bottom: 50px;
    }
  }
  .more{
    width: 140px;
    height: 42px;
    margin: 0 auto;
    border: 1px solid #fff;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    &:hover{
      border-color: #333;
      color: #333;
    }
  }
}
.mode5{
  .title-wrap{
    height: 240px;
    background: url('./85512527945769402.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
      width: 372px;
      height: 140px;
      background: url('./542112639725554041.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      .title{
        color: #D9BA60;
        font-size: 40px;
        letter-spacing: 5px;
        padding-top: 15px;
        box-sizing: border-box;
        margin-bottom: 18px;
      }
      .more{
        letter-spacing: 1px;
        width: 148px;
        height: 34px;
        background: #E5C875;
        border-radius: 17px;
        color: #fff;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 auto;
      }
    }
  }
  .big-row-wrap{
    background: #0F1C24;
    padding-top: 81px;
    padding-bottom: 120px;
    box-sizing: border-box;
    .equip-big-row{
      width: 1200px;
      margin: 0 auto;
      height: 540px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      box-sizing: border-box;
      .big-img-wrap{
        width: 500px;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 10px solid #fff;
        outline: 20px solid #EFD68E;
        img{
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }
      }
      .row-right{
        flex: 1;
        // width: 500px;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 50px;
        box-sizing: border-box;
        align-items: center;
        // justify-content: space-between;
        .name{
          font-size: 26px;
          color: #fff;
          font-weight: bold;
          font-family:PingFang SC;
          margin-bottom: 75px;
          width: 500px;
          overflow: hidden;
          text-overflow:ellipsis;
          display:-webkit-box;  //将对象作为弹性伸缩盒子模型显示。
          -webkit-box-orient:vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
          -webkit-line-clamp:2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。此处为2行
          word-wrap: break-word;//允许单词内断句，首先会尝试挪到下一行，看看下一行的宽度够不够，不够的话就进行单词内的断句
        }
        .pic-list{
          img{
            width: 138px;
            height: 138px;
            border: 1px solid #EFD68E;
            &:not(:last-child){
              margin-right: 25px;
            }
          }
        }
        .rent-price{
          width: 500px;
          margin-bottom: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 50px;
          box-sizing: border-box;
          .price{
            font-size: 24px;
            color: #E5C875;
            font-weight: bold;
          }
          .rent-btn{
            width:128px;
            height:38px;
            background: #F51F45;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
      img+.row-right{
        margin-left: 70px;
      }
    }
    .equip-big-row:last-child{
      flex-direction: row-reverse;
      padding-left: 0;
      padding-right: 20px;
      margin-top: 120px;
      .row-right{
        margin-left: 0;
        margin-right: 70px;
      }
    }
  }
  .equip-row{
    background: #0F1C24;
    height: 520px;
    .equip-list{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .equip{
        width: 380px;
        height: 490px;
        background: #EFD68E;
        padding: 10px 0 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        .img-wrap{
          width: 350px;
          height: 350px;
          background: #fff;
          padding: 5px;
          box-sizing: content-box;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
          }
        }
        .name{
          width: 360px;
          padding: 10px 20px 24px;
          box-sizing: border-box;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 20px;
          color: #333333;
          font-weight: 500;
          background: #fff;
          margin-bottom: 20px;
        }
        .price-rent{
          width: 340px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          box-sizing: border-box;
          .price{
            color: #0F1C24;
            font-size: 20px;
          }
          .rent-btn{
            color: #F51F45;
            font-size: 16px;
            text-decoration:underline;
            cursor: pointer;
          }
        }
      }
    }
  }
  .equip-row+div{
    height: 620px;
  }
}
.mode6{
  padding-top: 143px;
  box-sizing: border-box;
  .title{
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 85px;
    span{
      position: relative;
      font-size: 48px;
      color: #3270ED;
      // opacity: 0.2;
      color: rgba(50,112,237,0.2);
      font-family:Bahnschrift;
      &:after{
        // content:'/ 器 材 租 赁 /';
        content:'/ \5668 \6750 \79df \8d41 /';
        width: 300px;
        font-size: 44px;
        color: #333;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%,40%);
      }
    }
  }
  .equip-row{
    width: 1200px;
    margin: 0 auto;
    .equip-list{
      display: flex;
      .equip{
        width: 500px;
        height: 720px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .little-label{
          position: absolute;
          top: 0;
          left: 0;
          transform: translateY(-50%);
          width: 89px;
          height: 60px;
          background: #3270ED;
          font-size: 36px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &:first-child{
          .little-label{
            &:after{
              content: '';
              position: absolute;
              right: -60px;
              width: 20px;
              height: 60px;
              border: 30px solid transparent;
              border-left: 30px solid #3270ED;
            }
          }
        }
        &:nth-child(2){
          .little-label{
            width: 60px;
            height: 89px;
            background: #EE2E29;
            left: unset;
            right: 0;
            &:after{
              content: '';
              position: absolute;
              right: 0;
              bottom: -59px;
              width: 20px;
              height: 60px;
              border: 30.1px solid transparent;
              border-top: 30.1px solid #EE2E29;
            }
          }
        }
        .img-wrap{
          width: 500px;
          height: 500px;
          margin-bottom: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
          }
        }
        .name{
          width: 440px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-bottom: 25px;
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }
        .price-rent{
          display: flex;
          .price{
            width: 130px;
            height: 42px;
            border: 1px solid #EE2E29;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
          }
          .rent-btn{
            width: 130px;
            height: 42px;
            background: #EE2E29;
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
      .equip:nth-child(odd){
        margin-right: 100px;
      }
      .equip:nth-child(even){
        position: relative;
        top: -126px;
      }
    }
  }
  .equip-row:nth-child(3){
    .equip-list{
      justify-content: flex-end;
    }
  }
  .more{
    // margin-top: 49px;
    color: #192B39;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    top: -120px;
    right: -96px;
    cursor: pointer;
    span:first-child{
      font-size: 20px;
      margin-right: 6px;
      width: 128px;
      height: 42px;
      border: 1px solid #333;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span:last-child{
      width: 58px;
      height: 2px;
      background: #192B39;
      position: relative;
      right: 20px;
      &:after{
        content:'';
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(100%,calc((-50% + 1px)));
        width: 0;
        height: 12px;
        border: 8px solid transparent;
        border-left: 13px solid #192B39;
      }
    }
  }
}
.mode7{
  margin-bottom: 140px;
  .title{
    color: #FF7817;
    font-size: 40px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 35px;
  }
  .equip-row{
    width: 1200px;
    margin: 0 auto;
    .equip-list{
      display: flex;
      justify-content: space-between;
      .equip{
        width: 390px;
        height: 574px;
        text-align: center;
        cursor: pointer;
        border: 1px solid transparent;
        box-sizing: content-box;
        transition: .5s;
        .img-wrap{
          width: 390px;
          height: 390px;
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
          }
        }
        .name{
          width: 292px;
          margin: 0 auto;
          margin-bottom: 10px;
          font-size: 16px;
          color: #666;
        }
        .price{
          margin-bottom: 15px;
          font-size: 16px;
          color: #FF7817;
        }
        .rent-btn{
          width:122px;
          height:40px;
          background:linear-gradient(270deg,rgba(245,69,32,1) 0%,rgba(255,120,23,1) 100%);
          border-radius:20px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          opacity: 0;
          i{
            position: relative;
            bottom: -2px;
            margin-left: 5px;
          }
        }
      }
      .equip:hover{
        border: 1px solid #FF7817;
        .rent-btn{
          opacity: 1;
        }
      }
    }
  }
  .more{
    margin-top: 49px;
    color: #FF7817;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span:first-child{
      font-size: 20px;
      margin-right: 6px;
    }
    span:last-child{
      width: 38px;
      height: 4px;
      background: #FF7817;
      position: relative;
      &:after{
        content:'';
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(100%,calc((-50% + 2px)));
        width: 0;
        height: 12px;
        border: 8px solid transparent;
        border-left: 13px solid #FF7817;
      }
    }
  }
}
</style>