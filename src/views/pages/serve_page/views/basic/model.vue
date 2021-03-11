<template>
  <div class="newServe">
    <!--成为模特表格-->
    <el-form ref="form" :model="ModelForm" label-width="110px" :rules="rules">
      <div class="card">
        <p class="headTitle">标题</p>
        <el-form-item label="标题" class="long-input" prop="title">
          <el-input v-model="ModelForm.title"></el-input>
        </el-form-item>
      </div>
      <div class="card short-input">
        <p class="headTitle">个人资料</p>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="真实姓名：" prop="real_name">
              <el-input v-model="ModelForm.real_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前发型" prop="hair">
              <el-select v-model="ModelForm.hair" placeholder="请选择">
                <el-option
                  v-for="item in hairType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="性别：" prop="sex">
              <el-radio-group v-model="ModelForm.sex">
                <el-radio :label="'1'">男</el-radio>
                <el-radio :label="'2'">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="肤色：" prop="skin">
              <el-select v-model="ModelForm.skin" placeholder="请选择">
                <el-option
                  v-for="item in skinType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="头像：" prop="header_pic">
              <upload-img :imageUrl="ModelForm.header_pic" @handleSuccess="handleSuccess"></upload-img>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="脸型：" prop="face">
              <el-select v-model="ModelForm.face" placeholder="请选择">
                <el-option
                  v-for="item in faceType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="常驻城市：" prop="city_code">
              <el-cascader
                placeholder="试试搜索自己所在的省名"
                :options="options"
                v-model="ModelForm.city_code"
                filterable
                @change="storeAddressChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="臂展(cm)：" prop="wingspan">
              <el-input v-model="ModelForm.wingspan"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="身高(cm)：" prop="height">
              <el-input v-model="ModelForm.height"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="腿长(cm)：" prop="leg">
              <el-input v-model="ModelForm.leg"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="体重(KG)：" prop="weight">
              <el-input v-model="ModelForm.weight"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="肩宽(cm)：" prop="shoulder">
              <el-input v-model="ModelForm.shoulder"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="三围：" prop="waist">
              <el-input class="margin" v-model="ModelForm.upper" placeholder="请输入胸围"></el-input>
              <el-input class="margin" v-model="ModelForm.waist" placeholder="请输入腰围"></el-input>
              <el-input v-model="ModelForm.hips" placeholder="请输入臀围"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否双眼皮：" prop="eyelid">
              <el-select v-model="ModelForm.eyelid" placeholder="请选择">
                <el-option
                  v-for="item in eyeType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="鞋码：" prop="shoes">
              <el-input v-model="ModelForm.shoes"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="异地接单：" prop="is_out">
              <el-radio-group v-model="ModelForm.is_out">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="国籍：" prop="nation_id">
              <el-select v-model="ModelForm.nation_id" placeholder="请选择">
                <el-option
                  v-for="item in nationType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否需要翻译(外籍)：" prop="is_translate">
              <el-radio-group v-model="ModelForm.is_translate">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="二维码：">
              <el-button type="text">一键生成二维码</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第一语言：" prop="lan_one">
              <el-select v-model="ModelForm.lan_one" placeholder="请选择">
                <el-option
                  v-for="item in languageType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="手机号码：" prop="mobile">
              <el-input v-model="ModelForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第二语言：" prop="lan_two">
              <el-select v-model="ModelForm.lan_two" placeholder="请选择">
                <el-option
                  v-for="item in languageType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 风格标签 -->
      <div class="card">
        <p class="headTitle">风格和标签</p>
        <div class="tag-box margin">
          <el-form-item label="拍摄风格：" prop="style">
            <el-checkbox-group v-model="ModelForm.style">
              <el-checkbox
                v-for="item in shootingList"
                :label="item.id"
                :key="item.id"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="tag-box">
          <el-form-item label="模特标签：" prop="type">
            <el-checkbox-group v-model="ModelForm.type">
              <el-checkbox v-for="item in modelList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
      <!-- 工作时间 -->
      <div class="card">
        <p class="headTitle">工作时间</p>
        <el-form-item label="工作时间：" class="long-input">
          <el-input
            v-model="ModelForm.working"
            placeholder="请输入该模特工作时间。例如: 周一到周五 9:00 ~ 18:00 · 周六休息 · 周天9:00 ～ 18:00"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 图片和价格 -->
      <div class="card">
        <p class="headTitle">图片和价格</p>
        <div class="tag-box margin">
          <div style="width: 120px;">主图：</div>
          <clipper
            :resultWidth="600"
            :imgList="imgList"
            @delSuccess="delSuccess"
            @uploadSuccess="uploadSuccess"
            :uploadWidth="148"
            :uploadHeight="148"
            :uploadNum="5"
            :ratio="3/4"
          ></clipper>
        </div>
        <div class="tag-box">
          <div style="width: 120px;">视频：</div>
          <el-upload
            class="avatar-uploader"
            action="https://up-z2.qiniup.com/"
            accept=".mp4, .ogg, .flv, .avi"
            :data="videoData"
            :show-file-list="false"
            :before-upload="beforeUploadVideo"
            :on-success="handleVideoSuccess"
            :on-change="getFile"
            :on-progress="uploadVideoProcess"
          >
            <div class="add-video" v-if="!videoURL">
              <div class="center">
                <i class="el-icon-video-play"></i>
                <span>点击添加视频</span>
              </div>
            </div>
            <video
              class="show-video"
              v-if="videoURL"
              :src="videoURL"
              width="572"
              height="327"
              controls="controls"
            >您的浏览器不支持视频播放</video>
          </el-upload>
          <div v-if="videoURL" class="tip">点击视频框区域可更换上传视频 ! ! !</div>
          <el-button v-if="videoURL" class="del-video" @click="delVideo">删除视频</el-button>
        </div>
        <!-- <div class="tag-box">
          <div style="width: 120px;">计价模式：</div>
          <el-radio-group  v-model="BillingModel">
            <el-radio :label="1">按天计费</el-radio>
            <el-radio :label="0">按小时计费</el-radio>
          </el-radio-group>
        </div>-->
        <div class="tag-box">
          <el-form-item label="价格：（每天）">
            <!-- <el-input  v-show="BillingModel == 1" v-model="ModelForm.pph"></el-input> -->
            <el-input v-model="ModelForm.ppd"></el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 模特描述介绍 -->
      <div class="card">
        <p class="headTitle">模特描述</p>
        <div class="textare">
          <tinymce v-model="ModelForm.info" :height="300" />
        </div>
      </div>
      <div class="bottomBtn">
        <el-button type="primary" @click="SaveModel">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import uploadImg from "ServeComponents/UploadImg/index.vue";
import Tinymce from "ServeComponents/Tinymce";
import clipper from "FrontComponents/photoClipper";
import { model } from "@config/api.js";
import { rules } from "ServePage/model/rules";
export default {
  data() {
    return {
      modelList: this.config.modelTypeList,
      shootingList: this.config.shootingTypeList,
      languageList: this.config.languageType,
      ModelForm: {
        title: "",
        name: "",
        header_pic: "",
        real_name: "",
        hair: "",
        sex: "",
        skin: "",
        face: "",
        city_code: "",
        wingspan: "",
        height: "",
        leg: "",
        weight: "",
        shoulder: "",
        leg: "",
        leg: "",
        leg: "",
        style: [],
        type: [],
        photo: "",
        video: "",
        is_translate: "",
        is_out: "",
        lan_one: "",
        lan_two: "",
        eyelid: "",
        info: "",
        pph: "",
        ppd: "",
        nation_id: "",
        shoes: "",
        upper: "",
        waist: "",
        hips: "",
        mobile: "",
        working: ""
      },
      imgList: [],
      options: [],
      editable: true,
      nationType: this.config.nationType,
      skinType: this.config.skinType,
      faceType: this.config.faceType,
      hairType: this.config.hairType,
      eyeType: this.config.eyeType,
      languageType: this.config.languageType,
      BillingModel: 1,
      tempphotoarr: [],
      // 视频相关
      videoURL: "",
      videoFlag: false, //刚开始的时候显示为flase
      videoUploadPercent: "0%", //进度条刚开始的时候为0%
      videoData: {
        //添加其他参数
      },
      videoObj: {},
      rules
    };
  },

  components: {
    uploadImg,
    Tinymce,
    clipper
  },

  created() {
    this.options = this.GetCityCode();
    this.getinfo();
  },

  mounted() {
    this.imgList.push({ key: "" });
  },

  methods: {
    getinfo() {
      this.getRequest(model.GetModelDetil).then(res => {
        console.log("res: ", res);
        Object.assign(this.ModelForm, res);
        if (res.style != null) this.ModelForm.style = res.style.split(",");
        if (res.type != null) this.ModelForm.type = res.type.split(",");
        if (res.photo != null) this.imgList = res.photo.split(",").map(item => {
            return { key: item };
          });
      });
    },
    //添加模特
    SaveModel() {
      this.$refs.form.validate(vaild => {
        if (vaild) {
          let params = {};
          Object.assign(params, this.ModelForm);
          params.style = this.ModelForm.style.join(",");
          params.type = this.ModelForm.type.join(",");
          console.log(params);
          this.postRequest(model.EditModelInfo, params).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.getinfo();
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
    handleSuccess(key) {
      this.ModelForm.header_pic = key;
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
    storeAddressChange(data) {
      this.ModelForm.city_code = data[1];
    },
    //删除图片回调函数
    delSuccess(arr) {
      this.tempphotoarr = [];
      this.tempphotoarr = arr.uploadArray.map(item => item.key);
      console.log(this.tempphotoarr);
      this.ModelForm.photo = this.tempphotoarr.join(",");
    },
    //上传个人图片成功回调
    uploadSuccess(key) {
      this.tempphotoarr.push(key);
      this.ModelForm.photo = this.tempphotoarr.join(",");
    },
    //视频上传之前判断他的大小
    beforeUploadVideo(file) {
      const _self = this;
      const _URL = window.URL || window.webkitURL;
      const fileName = file.uid;
      this.videoObj[fileName] = {};
      return new Promise((resolve, reject) => {
        let Sync = async () => {
          try {
            let videoKey = await checkVideo(file);
            if (videoKey) {
              let token = await this.getRequest(
                "/qiniu/userGetQiniuUpToken?key=" + videoKey
              );
              this.videoData = token;
              resolve(true);
            } else {
              reject(false);
              this.videoObj = {};
            }
          } catch (error) {
            reject(false);
          }
        };
        Sync();
      });
    },
    // 获取预览视频信息
    getFile(file, fileList) {
      this.videoFlag = !this.videoFlag;
      this.videoURL = window.URL.createObjectURL(file.raw);
    },
    //视频上传的时候获取上传进度传给进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = parseInt(file.percentage);
    },
    //视频上传成功之后返回视频地址
    handleVideoSuccess(res, file) {
      this.videoFlag = true;
      this.videoUploadPercent = 0;
      this.videoURL = window.URL.createObjectURL(file.raw);
      this.ModelForm.video = res.key;
    },
    // 添加视频后删除视频重选
    delVideo() {
      this.videoFlag = !this.videoFlag;
      this.videoURL = "";
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./public-css";
.tag-box {
  display: flex;
  margin-top: 20px;
  /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: $Theme-color;
  }

  // 视频
  .video {
    margin-bottom: 20px;
    border-radius: 2px;
  }

  // 添加视频
  .add-video {
    margin-bottom: 20px;
    width: 604px;
    height: 302px;
    background: rgb(238, 238, 238);
    border: 1px solid rgb(204, 204, 204);
    border-radius: 2px;
    color: #666;
    cursor: pointer;

    .center {
      width: 90px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;

      .el-icon-video-play {
        font-size: 68px;
        margin-bottom: 22px;
      }
    }
  }

  // 添加视频成功后
  .show-video {
    margin-bottom: 20px;
    outline: none;
  }

  // 提示
  .tip {
    margin-bottom: 20px;
    color: #7c6aff;
  }

  // 删除视频按钮
  .del-video {
    margin-bottom: 20px;
    background: #7c6aff;
    border-radius: 4px;
    color: #fff;
    border: none;
  }

  .del-video:active {
    background-color: #255368;
    border-color: #255368;
  }

  // 显示描述
  .text-show {
    padding-left: 20px;
    padding-top: 10px;
    background: rgb(238, 238, 238);
    border-radius: 2px;
    min-height: 120px;
  }
}
.textare {
  margin-top: 10px;
}
</style>