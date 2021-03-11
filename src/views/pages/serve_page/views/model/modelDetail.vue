<template>
  <div class="newServe">
    <!--成为模特表格-->
    <el-form ref="form" :model="ModelForm" label-width="110px" :rules="rules">
      <div class="card">
        <p class="headTitle">标题</p>
        <el-form-item label="标题" class="long-input" prop="title">
          <el-input :disabled="canEdit" v-model="ModelForm.title"></el-input>
        </el-form-item>
      </div>
      <div class="card short-input">
        <p class="headTitle">个人资料</p>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="真实姓名：" prop="real_name">
              <el-input :disabled="canEdit" v-model="ModelForm.real_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前发型" prop="hair">
              <el-select :disabled="canEdit" v-model="ModelForm.hair" placeholder="请选择">
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
              <el-radio-group :disabled="canEdit" v-model="ModelForm.sex">
                <el-radio :label="'1'">男</el-radio>
                <el-radio :label="'2'">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="肤色：" prop="skin">
              <el-select :disabled="canEdit" v-model="ModelForm.skin" placeholder="请选择">
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
              <upload-img
                :disabled="canEdit"
                :imageUrl="ModelForm.header_pic"
                @handleSuccess="handleSuccess"
              ></upload-img>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="脸型：" prop="face">
              <el-select :disabled="canEdit" v-model="ModelForm.face" placeholder="请选择">
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
                :disabled="canEdit"
                placeholder="试试搜索自己所在的省名"
                :options="options"
                v-model="city_code"
                filterable
                @change="storeAddressChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="臂展(cm)：" prop="wingspan">
              <el-input :disabled="canEdit" v-model="ModelForm.wingspan"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="身高(cm)：" prop="height">
              <el-input :disabled="canEdit" v-model="ModelForm.height"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="腿长(cm)：" prop="leg">
              <el-input :disabled="canEdit" v-model="ModelForm.leg"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="体重(KG)：" prop="weight">
              <el-input :disabled="canEdit" v-model="ModelForm.weight"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="肩宽(cm)：" prop="shoulder">
              <el-input :disabled="canEdit" v-model="ModelForm.shoulder"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="三围：" prop="waist">
              <el-input
                :disabled="canEdit"
                class="margin"
                v-model="ModelForm.upper"
                placeholder="请输入胸围"
              ></el-input>
              <el-input
                :disabled="canEdit"
                class="margin"
                v-model="ModelForm.waist"
                placeholder="请输入腰围"
              ></el-input>
              <el-input :disabled="canEdit" v-model="ModelForm.hips" placeholder="请输入臀围"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否双眼皮：" prop="eyelid">
              <el-select :disabled="canEdit" v-model="ModelForm.eyelid" placeholder="请选择">
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
              <el-input :disabled="canEdit" v-model="ModelForm.shoes"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="异地接单：" prop="is_out">
              <el-radio-group :disabled="canEdit" v-model="ModelForm.is_out">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="国籍：" prop="nation_id">
              <el-select :disabled="canEdit" v-model="ModelForm.nation_id" placeholder="请选择">
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
              <el-radio-group :disabled="canEdit" v-model="ModelForm.is_translate">
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
              <el-select :disabled="canEdit" v-model="ModelForm.lan_one" placeholder="请选择">
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
              <el-input :disabled="canEdit" v-model="ModelForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第二语言：" prop="lan_two">
              <el-select :disabled="canEdit" v-model="ModelForm.lan_two" placeholder="请选择">
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
            <el-checkbox-group :disabled="canEdit" v-model="ModelForm.style">
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
            <el-checkbox-group :disabled="canEdit" v-model="ModelForm.type">
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
            :disabled="canEdit"
            :ratio="3/4"
          ></clipper>
        </div>
        <div class="tag-box">
          <div style="width: 120px;">视频：</div>
          <el-upload
            :disabled="canEdit"
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
            <div class="add-video" v-if="!canEdit&&!videoURL">
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
          <div v-if="!canEdit&&videoURL" class="tip">点击视频框区域可更换上传视频 ! ! !</div>
          <el-button v-if="!canEdit&&videoURL" class="del-video" @click="delVideo">删除视频</el-button>
        </div>
        <!-- <div class="tag-box">
          <div style="width: 120px;">计价模式：</div>
          <el-radio-group :disabled="canEdit" v-model="BillingModel">
            <el-radio :label="1">按天计费</el-radio>
            <el-radio :label="0">按小时计费</el-radio>
          </el-radio-group>
        </div>-->
        <div class="tag-box">
          <el-form-item label="价格：（每天）">
            <!-- <el-input :disabled="canEdit" v-show="BillingModel == 1" v-model="ModelForm.pph"></el-input> -->
            <el-input :disabled="canEdit" v-model="ModelForm.ppd"></el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 模特描述介绍 -->
      <div class="card">
        <p class="headTitle">模特描述</p>
        <div class="textare" v-if="!canEdit">
          <tinymce v-model="ModelForm.info" :height="300" />
        </div>
        <div v-else class="textare" v-html="ModelForm.info"></div>
      </div>
      <!-- 相册管理 -->
      <div class="card">
        <div class="photo-header">
          <div class="headTitle">相册选择</div>
          <el-select
            :disabled="canEdit"
            v-model="tempphoto"
            @change="photochange"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in PhotoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="photo-list-box">
          <div class="grid-box" v-for="item in photoList" :key="item.id">
            <div class="main-control">
              <div class="photo-list" v-if="item.extend == 'photo'">
                <el-image :src="$qiniuHost+item.pic" class="photo" fit="scale-down"></el-image>
              </div>
              <div v-else>
                <video
                  :src="$qiniuHost+item.content"
                  width="381"
                  height="381"
                  controls="controls"
                >您的浏览器不支持视频播放</video>
              </div>
              <div class="photo-name">{{item.name}}</div>
              <div class="photo-control">
                <el-button
                  class="animated fadeInRight-i"
                  type="text"
                  icon="el-icon-edit"
                  :disabled="canEdit"
                  @click="editphotolist(item)"
                >编辑</el-button>
                <!-- <el-button
                  class="animated-i fadeInRight-i"
                  type="text"
                  icon="el-icon-delete"
                  @click="delephotolist(item)"
                >删除</el-button>-->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottomBtn">
        <el-button type="primary" @click="canEdit = false" v-show="has_id&&canEdit">修改</el-button>
        <el-button type="primary" @click="confirm" v-show="!canEdit">{{has_id?`保存`:`添加`}}</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import uploadImg from "ServeComponents/UploadImg/index.vue";
import Tinymce from "ServeComponents/Tinymce";
import clipper from "FrontComponents/photoClipper";
import { model, photo } from "@config/api.js";
import { rules } from "./rules";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      city_code: [],
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
      tempphoto: [],
      PhotoOptions: [],
      AllPhoto: [],
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
      rules,
      has_id: false,
      canEdit: false,
      photoList: [],
      ModelId: "",
      bangModel: {
        ids: "",
        obj_id: "",
        type: ""
      }
    };
  },

  components: {
    uploadImg,
    Tinymce,
    clipper
  },
  computed: {
    ...mapGetters(["user_data"])
  },
  watch: {
    tempphoto(value) {
      this.bangModel.ids = this.tempphoto.join(",");
      this.bangModel.obj_id = this.ModelId;
      this.bangModel.type = this.user_data.role;
    }
  },
  created() {
    this.options = this.GetCityCode();
    this.getModelAllPhoto();
    if (this.$route.query.id) {
      this.getModelDetail(this.$route.query.id);
      this.ModelId = this.$route.query.id;
      this.getModelPhoto();
    }

    this.canEdit = !this.$route.query.canEdit;
  },

  mounted() {
    this.imgList.push({ key: "" });
  },

  methods: {
    photochange(value) {
      let tempList = [];
      this.AllPhoto.forEach((item, index) => {
        value.forEach((each, j) => {
          if (item.id == each) {
            tempList.push(item);
          }
        });
      });
      this.photoList = tempList;
    },
    editphotolist(data) {
      console.log(data);
      if (data.extend == "photo") {
        this.$router.push({
          path: "/serve/manage/managealbums",
          query: { id: data.id }
        });
      } else {
        this.$router.push({
          path: "/serve/manage/managevideo",
          query: { id: data.id }
        });
      }
    },
    delephotolist(data) {
      this.getRequest(photo.DelePhoto, { ids: data.id, del: 1 }).then(res => {
        if (res == 1) {
          this.$message({ type: "success", message: "删除成功" });
          this.getModelAllPhoto();
        }
      });
    },
    getModelAllPhoto() {
      this.getRequest(photo.GetPhotoList, {
        uid: this.user_data.id,
        del: 0
      }).then(res => {
        this.AllPhoto = res.rows;
        this.PhotoOptions = res.rows.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        console.log(res);
      });
    },
    getModelPhoto() {
      this.getRequest(photo.GetPhotoList, {
        uid: this.user_data.id,
        del: 0,
        obj_id: this.ModelId
      }).then(res => {
        this.photoList = res.rows;
        this.tempphoto = res.rows.map(item => {
          return item.id;
        });
      });
    },
    getModelDetail(id) {
      this.getRequest(model.GetCompanyModel, { id }).then(res => {
        this.has_id = true;
        Object.assign(this.ModelForm, res);
        if (res.style != null) this.ModelForm.style = res.style.split(",");
        if (res.type != null) this.ModelForm.type = res.type.split(",");
        if (res.photo != null)
          this.imgList = res.photo.split(",").map(item => {
            return { key: item };
          });
      });
    },
    //添加模特
    confirm() {
      this.$refs.form.validate(vaild => {
        if (vaild) {
          let params = {};
          Object.assign(params, this.ModelForm);
          params.style = this.ModelForm.style.join(",");
          params.type = this.ModelForm.type.join(",");
          if (this.has_id) {
            this.postRequest(model.UpdateCompanyModel, params).then(res => {
              if (res) {
                this.getRequest(photo.BangPhoto, this.bangModel).then(res => {
                  if (res) {
                    this.$alert("模特信息已更新", "提示", {
                      confirmButtonText: "确定",
                      callback: action => {
                        this.$router.push("/serve/manage/modelIndex");
                      }
                    });
                  }
                });
              }
            });
          } else {
            this.postRequest(model.AddCompanyModel, params).then(res => {
              if (res) {
                this.$alert("模特信息已添加", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {
                    this.$router.push("/serve/manage/modelIndex");
                  }
                });
              }
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: "您有信息未完善"
          });
        }
      });
    },
    cancel() {
      this.canEdit = true;
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
      console.log(data[1], this.ModelForm.city_code);
      this.ModelForm.city_code = data[1];
      console.log(data[1], this.ModelForm.city_code);
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
      console.log("this.tempphotoarr: ", this.tempphotoarr);
      console.log("this.ModelForm.photo: ", this.ModelForm.photo);
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

  // 显示描述
  .text-show {
    padding-left: 20px;
    padding-top: 10px;
    background: rgb(238, 238, 238);
    border-radius: 2px;
    min-height: 120px;
  }
}
.margin {
  margin-bottom: 28px;
}
.short-input /deep/ .el-input {
  width: 230px;
}
.long-input /deep/ .el-input {
  width: 100% !important;
}
.card {
  padding: 20px 30px;
  background: #fff;
  margin-bottom: 20px;
  .headTitle {
    font-size: 20px;
    color: #333;
    padding-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
    margin-right: 20px;
  }
  .line {
    background: tomato;
    border-top: 1px solid #f0f0f0;
    margin-top: 30px;
  }
  .el-form-item {
    margin: 20px 0px;
    /deep/ {
      .el-form-item__label {
        width: 120px !important;
        text-align: left;
      }
      .el-form-item__content {
        margin-left: 120px !important;
      }
    }
    &.logoImg {
      /deep/ {
        .el-form-item__content {
          display: flex;
          .tips {
            color: #999;
            font-size: 12px;
            margin-left: 30px;
          }
        }
      }
    }
  }
  .textare {
    margin-top: 10px;
  }
  .photo-header {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 20px;
    align-items: center;
    .headTitle {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }
  .photo-list-box {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 381px);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    .grid-box {
      position: relative;
      .photo-list {
        width: 381px;
        height: 381px;
        .photo {
          width: 100%;
          height: 100%;
        }
      }
      .photo-control {
        display: none;
        opacity: 0;
        top: 10px;
        right: 10px;
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: #fff;
        justify-content: center;
        flex-direction: column;
      }
      .photo-control /deep/ .el-button + .el-button {
        margin: 0;
      }
      .main-control:hover > .photo-control {
        opacity: 1;
        display: flex;
        animation-name: showlist;
        animation-duration: 0.3s;
        box-shadow: 0 0 8px #ebebeb;
      }
    }
  }
  .photo-header /deep/ .el-button:focus,
  .el-button:hover {
    color: #7c6aff;
    border-color: #d8d2ff;
    background-color: #f2f0ff;
  }
}
.photo-header /deep/ .el-button:active {
  color: #705fe6;
  border: 1px solid #705fe6;
}
.photo-header /deep/ .el-button {
  padding: 0px 14px;
  height: 34px;
  border: 1px solid rgba(214, 214, 214, 1);
}
.fadeInRight-i {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}
.animated-i {
  -webkit-animation-duration: 1.3s;
  animation-duration: 1.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@keyframes showlist {
  0% {
    opacity: 0;
    display: none;
  }
  30% {
    opacity: 0.3;
    display: flex;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translate3d(25%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>