<!--  -->
<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <!-- 赌五毛这里要改 -->
      <div class="card">
        <p class="headTitle">个人资料</p>
        <el-form-item label="个人名称" prop="nick">
          <el-input v-model="form.nick"></el-input>
        </el-form-item>
        <el-form-item label="个人Logo：" class="logoImg" prop="avatar">
          <upload-img
            @handleSuccess="handleSuccess"
            type="user"
            :imageUrl="form.avatar"
            v-if="loadImage"
          ></upload-img>
          <span class="tips">(建议上传800*800px尺寸图(或正方形)的图片)</span>
        </el-form-item>
      </div>
      <!--添加轮播banner模块-->
      <div class="addBanner" v-if="false">
        <div class="addbanner-head">
          <span>轮播图设置</span>
          <span>（最多6张，建议上传1920*610px的尺寸）</span>
          <div class="uploadImg">
            <upload-img
              :noShowImg="noShowImg"
              :showPlus="noShowImg"
              :showText="true"
              btnText="+ 添加轮播图"
              @handleSuccess="handleSuccess2"
              v-if="showUpload"
            ></upload-img>
          </div>
        </div>
        <div class="banner-wrap">
          <span v-if="bannerList.length>0">公司banner：</span>
          <ul class="bannerList">
            <span v-if="bannerList.length==0">您还没有添加轮播图</span>
            <li v-for="(item,index) in bannerList" :key="index">
              <div class="top">
                <el-input v-model="item.url" placeholder="请输入链接" clearable></el-input>
              </div>
              <div class="body" @click="changeImage(item,index)">
                <upload-img
                  @handleSuccess="handleSuccess3"
                  :imageUrl="config.qiniuHost+item"
                  v-if="showImageList"
                ></upload-img>
              </div>
              <div class="foot">
                <el-button type="text" @click="previewImage(index)">预览</el-button>
                <el-button type="text" @click="delBanner(index)">删除</el-button>
                <el-button type="text" @click="moveBanner(index,'prev')" :disabled="index==0">前移</el-button>
                <el-button
                  type="text"
                  @click="moveBanner(index,'next')"
                  :disabled="index==(bannerList.length-1)"
                >后移</el-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 企业标签 -->
      <div class="card">
        <p class="headTitle">专业领域</p>
        <el-select
          v-model="pro_remark"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择标签，若没有直接输入即可"
          class="select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="card short-input">
        <p class="headTitle">企业概况</p>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          :autosize="{ minRows: 8, maxRows: 16}"
          v-model="form.brief"
        ></el-input>
      </div>
      <!-- 成功案例 -->
      <div class="card short-input">
        <p class="headTitle">成功案例</p>
        <div class="textare">
          <tinymce v-model="form.extend" :height="300" />
        </div>
      </div>
      <!-- 公司地址 -->
      <!--地址设置模块-->
      <div class="address-set">
        <div class="info-set">
          <div class="info-title">地址设置</div>
        </div>
        <el-row :gutter="0" style="padding-top:20px;">
          <el-col :span="10" class="short-input">
            <el-form-item label="所在省份" prop="province">
              <el-select v-model="form.province" @change="changeProvince" placeholder="请选择">
                <el-option
                  v-for="(item,index) in provinceList"
                  :key="item.code"
                  :label="item.label"
                  :value="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="short-input" prop="city">
            <el-form-item label="所在城市">
              <el-select v-model="form.city" placeholder="请选择" @change="changeCity">
                <el-option
                  v-for="item in cityList"
                  :key="item.code"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="具体地址" style="width:75%" prop="address_ditu">
            <el-input id="searchInput" v-model="form.address_ditu" placeholder="可直接点击地图选择或手动填写"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="楼层门牌" style="width:75%" prop="addressPOI">
            <el-input v-model="form.addressPOI"></el-input>
          </el-form-item>
        </el-row>
      </div>
      <div class="map">
        <my-map
          :lat="form.lat"
          :setCode="form.city"
          :lng="form.lng"
          :searchAdd="form.address_ditu"
          :address="form.address"
          v-if="loadImage"
          :editable="true"
          @select="selectArea"
          @selectSearch="selectSearch"
        ></my-map>
      </div>
      <div class="bottomBtn">
        <el-button type="primary" @click="SaveCompany">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-form>
    <el-dialog :visible.sync="showImagePreview">
      <el-carousel
        indicator-position="outside"
        :initial-index="imageIndex"
        height="600px"
        :autoplay="false"
      >
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <img
            :src="config.qiniuHost+item"
            :onerror="util.errorPic"
            style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;"
          />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
import uploadImg from "ServeComponents/UploadImg";
import myMap from "ServeComponents/Amap";
import Tinymce from "ServeComponents/Tinymce";
import { serveInfo, other } from "@config/api";
import { mapGetters } from "vuex";
import { isEmpty_form } from "@/util/validate.js";
import { rules } from "ServePage/model/rules";
export default {
  data: () => ({
    rules,
    imageIndex: 0,
    loadImage: true,
    noShowImg: true,
    showUpload: true,
    showImageList: true,
    editImage: {},
    //是否显示图片预览框
    showImagePreview: false,
    pro_remark: [],
    bannerList:[],
    form: {
      nick: "",
      province: "",
      avatar: "",
      banner: "",
      lat: "",
      lng: "",
      city: "",
      address_ditu: "",
      address: "",
      brief: "",
      uid: "",
      addressPOI: "",
      extend: "",
      remark: "",
      address_province_code: "",
      address_province: "",
      address_city_code: "",
      address_city: "",
      address_extent: ""
    },
    provinceList: [],
    cityList: [],
    options: [
      { value: "设计服务", label: "设计服务" },
      { value: "摄影/视频/内容服务", label: "摄影/视频/内容服务" },
      { value: "模特拍摄", label: "模特拍摄" }
    ]
  }),

  components: { uploadImg, myMap, Tinymce },
  created() {
    this.loadData();
  },
  mounted() {},

  methods: {
    loadData() {
      this.getRequest(serveInfo.GetUniversalInfo, { uid: this.user_data.id })
        .then(res => {
          console.log("hahhahahha");
          if (res) {
            //如果外借城市为空，默认添加上定位到的地址code
            this.bannerList = res.banner ? res.banner.split(",") : [];
            this.form.banner = res.banner ? res.banner : "";
            this.form.nick = res.nick;
            this.form.province = res.province;
            this.form.addressPOI = res.addressPOI;
            this.form.avatar = res.avatar;
            this.form.lat = res.lat;
            this.form.lng = res.lng;
            this.form.city = res.city;
            this.form.address_ditu = res.address_ditu;
            this.form.address = res.address;
            this.form.brief = res.brief;
            this.form.extend = res.extend;
            this.form.address_province = res.address_province;
            this.form.address_city = res.address_city;
            this.form.address_extent = res.address_extent;
            console.log("hahaha");
            if (!res.province) {
              this.form.province = res.address_province;
              this.form.city = res.address_city;
            }
            if (res.remark != "") {
              this.pro_remark = res.remark.split(",");
            }
          }
          console.log("this.form: ", this.form);
          this.changeProvince(this.getIdByProvince(this.form.province), true);
        })
        .catch(err => {
          console.error(err);
        });
      this.provinceList = this.config.cityArray2Tree(this.config.allCityCode);
    },
    SaveCompany() {
      console.log("this.form: ", this.form);
      this.getProvinceAndCity();
      this.form.uid = this.user_data.id;
      switch (this.bannerList.length + "") {
        case "0":
          this.form.banner = "";
          break;
        case "1":
          this.form.banner = this.bannerList[0] + "";
          break;
        default:
          this.form.banner = this.bannerList.join();
      }
      this.form.address_extent = this.form.addressPOI;
      this.form.address_city = this.form.city;
      this.$refs.form.validate(vaild => {
        if (vaild) {
          this.postRequest(serveInfo.EditUniversalInfo, this.form).then(res => {
            if (res == 1) {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.loadData();
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "您有信息未完善"
          });
        }
      });
    },
    // 地图组件
    //选择省份方法
    changeProvince(index, first = false) {
      this.provinceIndex = index;
      if (!first) {
        // 这里是手动选择省份的时候，默认选中第一个城市
        this.$set(
          this.form,
          "city",
          this.provinceList[index].children[0].label
        );
      } else {
        // 这里是获取到后台已经有的city
        this.changeCity(this.form.city);
      }
      this.cityList = this.provinceList[index].children; // //选择第一个城市
    },
    //选择城市方法
    changeCity(val) {},
    //获取所有城市方法，包括直辖市
    getAllCity() {
      let list = [];
      this.config.allCityCode.forEach((item, index) => {
        let obj = {
          key: item.code,
          label: item.city
        };
        list.push(obj);
      });
      return list;
    },
    //根据省份获取省份id
    getIdByProvince(province) {
      let id = "";
      this.provinceList.forEach((item, index) => {
        if (province == item.label) {
          id = index;
        }
      });
      return id;
    },

    //获取相关转换后的省份，和城市编号
    getProvinceAndCity() {
      if (this.provinceIndex >=0) {
        let id = this.provinceIndex;
        this.provinceList[id].children.forEach((item, index) => {
          if (item.label == this.form.city) {
            this.form.city_code = item.code;
            this.form.address_city_code = item.code;
          }
        });
        this.form.province = this.provinceList[id].label;
        this.form.address_province = this.provinceList[id].label;
      }
    },
    //获取选中地图地址回调方法
    selectArea(data, address_ditu, lat, lng) {
      this.form.lat = lat;
      this.form.lng = lng;
      this.form.address_ditu = address_ditu;
      this.form.address = data.formattedAddress;
      let city = data.addressComponent.city;
      let province = data.addressComponent.province;
      if (city) {
        this.form.city = city;
        this.form.address_city = city;
      } else {
        this.form.city = province;
        this.form.address_city = province;
      }

      this.form.province = province;
      this.provinceList.forEach((item, index) => {
        if (province == item.label) {
          this.provinceIndex = index;
        }
      });
    },
    selectSearch(obj) {
      this.form.address_ditu = obj.poi.name;
      this.form.lng = obj.poi.location.lng + "";
      this.form.lat = obj.poi.location.lat + "";
    },
    // 图片
    handleSuccess(key) {
      this.form.avatar = key;
    },
    handleSuccess2(key) {
      console.log("handleSuccess2", key);
      this.addBanner(key);
      this.reloadImg("showUpload");
    },

    handleSuccess3(key) {
      console.log("handleSuccess3", key);
      //删除之前的图片
      this.delImage(this.bannerList[this.editImage.index]);
      //替换图片
      this.bannerList[this.editImage.index] = key;
    },
    //替换图片之前保留信息,保留index下标
    changeImage(item, index) {
      this.editImage = item;
      this.editImage.index = index;
    },
    //预览图片方法
    previewImage(index) {
      console.log(index);
      this.imageIndex = index;
      this.showImagePreview = true;
      this.reloadImg("showImagePreview");
    },
    //bannerList图片添加方法
    addBanner(avatar) {
      this.bannerList.push(avatar);
    },
    //bannerList 删除图片方法
    delBanner(index) {
      //从七牛删除图片
      this.delImage(this.bannerList[index].key);
      this.bannerList.splice(index, 1);
      this.reloadImg("showUpload");
    },
    //banner  前移/后移方法
    moveBanner(index, type) {
      let tempItem = this.bannerList[index];
      this.bannerList.splice(index, 1);
      let location = 0;
      if (type == "prev") {
        location = index - 1;
      } else if (type == "next") {
        location = index + 1;
      }
      this.bannerList.splice(location, 0, tempItem);
      this.reloadImg("showImageList");
    },
    //重新渲染图片方法
    reloadImg(val) {
      this[val] = false;
      this.$nextTick(() => {
        this[val] = true;
        if (val == "showUpload") {
          if (this.bannerList.length == 6) {
            this[val] = false;
          } else {
            this[val] = true;
          }
        }
      });
    },
    //需要从七牛删除图片方法
    delImage(key) {
      let params = {
        key: key,
        type: "banner"
      };
      console.log("key----", key, params);
      this.postRequest(other.delPic, params)
        .then(res => {
          console.log("从七牛删除图片成功---", res);
        })
        .catch(err => {});
    }
  },
  computed: {
    ...mapGetters(["user_data"])
  },
  watch: {
    pro_remark(value) {
      this.form.remark = value.join(",");
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./public-css";
.textare {
  margin-top: 20px;
}
.address-set {
  background: #fff;
  padding: 0 30px 30px;
  box-sizing: border-box;
  .info-set {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f0f0f0;
    .info-title {
      font-size: 20px;
      color: #333;
      font-weight: normal;
    }
  }
}
.mapTips {
  color: #e55b15;
  background: #fff;
  padding-left: 30px;
  box-sizing: border-box;
}
.map {
  padding: 10px 30px 30px;
  box-sizing: border-box;
  background: #fff;
}
.addBanner {
  background: #fff;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  padding: 0 30px;
  box-sizing: border-box;
  margin-bottom: 20px;
  .addbanner-head {
    height: 68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > span {
      color: #333;
      font-size: 20px;
      font-weight: normal;
    }
    span + span {
      font-size: 16px;
    }
    .uploadImg {
      display: flex;
      align-items: center;
      color: #fff;
      /deep/ {
        .el-upload--picture-card {
          height: 40px;
          background: rgba(101, 31, 255, 1);
          border: 1px solid rgba(101, 31, 255, 1);
          .avatar-uploader-icon {
            display: none;
          }
        }
      }
    }
  }
  .pictures {
    margin: 20px 0px;
  }
  /deep/ {
    .el-upload--picture-card {
      width: 118px;
      height: 105px;
      border: 1px solid #ccc;
      border-radius: 2px;
      background: #eee;
    }
    i.close {
      display: none;
    }
  }
  .banner-wrap {
    border-top: 1px solid #f0f0f0;
    display: flex;
    padding: 20px 0;
    box-sizing: border-box;
    & > span {
      width: 122px;
      font-size: 14px;
    }
    .bannerList {
      flex: 1;
      text-align: center;
      overflow: hidden;
      li {
        width: calc((100% - 66px) / 3);
        float: left;
        margin-right: 33px;
        margin-bottom: 3vh;
        border: 1px solid #f9f9f9;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:nth-last-of-type(3),
        &:nth-last-of-type(3) ~ li {
          margin-bottom: 0;
        }
        /deep/ {
          .el-upload--picture-card {
            .avatar {
              width: 100%;
            }
          }
        }
      }
      .top {
        height: 30px;
        background: #7c6aff;
        border-radius: 3px 3px 0px 0px;
        /deep/ .el-input__inner {
          border: none;
          background: none;
        }
      }
      .body {
        height: 120px;
      }
      .foot {
        background: #eee;
      }
    }
  }
}
.select {
  margin-top: 20px;
  /deep/ .el-input {
    width: 330px;
  }
}
</style>