<template>
  <div class="newServe">
    <div>
      <el-form :model="form" :disabled="disabled" :rules="rules" ref="form" label-width="100px">
        <div class="card">
          <h2>标题</h2>
          <div class="line"></div>
          <el-row>
            <el-col :span="16">
              <el-form-item label="请输入标题" prop="title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="card">
          <h2>服务类型</h2>
          <div class="line"></div>
          <el-form-item label="拍摄类型" prop="pinpaiType">
            <el-checkbox-group v-model="pinpaiType1">
              <el-checkbox :label="item.id" v-for="item in pinpaiType" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="card">
          <h2>服务价格</h2>
          <div class="line"></div>
          <el-row class="unit">
            <el-col :span="6">
              <el-form-item label="商品单位" prop="unit">
                <el-input v-model="form.unit" placeholder="直接填，例如‘件’"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="折后价" prop="price">
                <el-input v-model="form.price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="原价" prop="price_base">
                <el-input v-model="form.price_base"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货地址" prop="team_address">
                <el-select v-model="address" clearable placeholder="请选择">
                  <el-option
                    v-for="item in addressList"
                    :key="item.id"
                    :label="item.address"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="text" class="newAddress" @click="addAddress">新增地址</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="card">
          <h2>服务标签</h2>
          <div class="line"></div>
          <el-form-item label="选择标签" prop="pinpaiLabel">
            <el-checkbox-group v-model="pinpaiLabel1">
              <el-checkbox :label="item.id" v-for="item in pinpaiLabel" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="card">
          <h2>产品范围设置</h2>
          <div class="line"></div>
          <el-row>
            <el-col>
              <el-form-item label="拍摄风格" prop="pinpaiWay">
                <el-checkbox-group v-model="pinpaiWay1">
                  <el-checkbox
                    :label="item.id"
                    v-for="item in pinpaiWay"
                    :key="item.id"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="拍摄分类" prop="pinpaiClassify">
                <el-checkbox-group v-model="pinpaiClassify1">
                  <el-checkbox
                    :label="item.id"
                    v-for="item in pinpaiClassify"
                    :key="item.id"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="拍摄对象" prop="pinpaiObj">
                <el-checkbox-group v-model="pinpaiObj1">
                  <el-checkbox
                    :label="item.id"
                    v-for="item in pinpaiObj"
                    :key="item.id"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col></el-col>
          </el-row>
        </div>
        <div class="card">
          
          <h2>图片（必填）</h2>
          <div class="line"></div>
           <div>
              <clipper
                :resultWidth="600"
                :editable="!disabled"
                :imgList="imgList"
                @delSuccess="delSuccess()"
                @uploadSuccess="uploadSuccess()"
                :uploadWidth="148"
                :uploadHeight="148"
                :uploadNum="perUploadNum"
                :ratio="1/1"
              ></clipper>
            </div>
        </div>
        <div class="card videograph-wrap">
          <h2>视频</h2>
          <div class="line"></div>
          <!-- <el-form-item label="图片" prop="photo"> -->
            
          <!-- </el-form-item> -->
          <!-- <el-form-item label="视频"> -->
            <div class="video-wrap">
              <!-- 添加视频 -->
              <el-upload
                :disabled="disabled"
                class="avatar-uploader"
                action="https://up-z2.qiniup.com/"
                accept=".mp4, .qlv, .qsv, .ogg, .flv, .avi, .wmv, .rmvb"
                :data="videoData"
                :show-file-list="false"
                :before-upload="beforeUploadVideo"
                :on-success="handleVideoSuccess"
                :on-change="getFile"
              >
                <div class="add-video" v-if="!disabled&&!videoURL">
                  <div class="center">
                    <!-- <i class="el-icon-video-play"></i>
                    <span>点击添加视频</span>-->
                    <i class="el-icon-plus"></i>
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
              <!-- <div v-if="!disabled&&videoURL" class="tip">点击视频框区域可更换上传视频 ! ! !</div> -->
              <el-button v-if="!disabled&&videoURL" class="del-video" @click="delVideo">删除视频</el-button>
            </div>
          <!-- </el-form-item> -->
        </div>
        
        <div class="card">
          <h2>产品详情（必填）</h2>
          <div class="line"></div>
          <div class="textare" v-if="!disabled">
            <tinymce v-model="form.content" :height="300" />
          </div>
          <div v-else class="text-show">
            <div v-html="form.content"></div>
          </div>
        </div>
        <div class="card">
          <h2>拼拍基本信息</h2>
          <div class="line"></div>
          <el-row class="unit">
            <el-col :span="6">
              <el-form-item label="上下架" prop="is_up">
                <el-select v-model="form.is_up" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开团数量" prop="team_num">
                <el-input v-model="form.team_num"></el-input>
                <!-- <el-input-number v-model="form.team_num" controls-position="right" :min="1"></el-input-number> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最大量" prop="team_max">
                <el-input v-model="form.team_max"></el-input>
                <!-- <el-input-number v-model="form.team_max" controls-position="right" :min="1"></el-input-number> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="每人限购" prop="team_limit">
                <el-input v-model="form.team_limit" placeholder="传0不限"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="unit">
            <el-col :span="6">
              <el-form-item label="收件结束" prop="team_receipt">
                <el-date-picker
                  v-model="form.team_receipt"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="拍摄时间" prop="team_shot">
                <el-date-picker
                  v-model="form.team_shot"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="交付时间" prop="team_deliver">
                <el-date-picker
                  v-model="form.team_deliver"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="售后结束" prop="team_service">
                <el-date-picker
                  v-model="form.team_service"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div style="margin-top:15px;text-align:right;margin-right:40px">
        <el-button class="incomeBtn" type="primary" @click="add" v-if="!disabled">{{btnText}}</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <new-address
      :showDialog.sync="showAddAddress"
      @closed="closeAddAdress"
      @addSuccess="addSuccess"
    ></new-address>
  </div>
</template>
<script>
import Tinymce from "ServeComponents/Tinymce";
import clipper from "FrontComponents/photoClipper";
import { checkVideo } from "@util/videoCheck.js";
import newAddress from "FrontComponents/newAddress";
import Title from "ServeComponents/Title/index";
import {
  pinpaiType,
  pinpaiWay,
  pinpaiClassify,
  pinpaiObj,
  pinpaiLabel
} from "@config/config.js";
export default {
  components: {
    clipper,
    Tinymce,
    Title,
    newAddress
  },
  data() {
    var checkAddress = (rule, value, callback) => {
      if (!this.address) {
        return callback(new Error("地址不能为空"));
      } else {
        callback();
      }
    };
    var checkPhoto = (r, v, c) => {
      if (!v) {
        return c(new Error("图片不能为空"));
      } else {
        c();
      }
    };
    var checkPinpaiLabel = (r, v, c) => {
      if (this.pinpaiLabel1.length == 0) {
        return c(new Error("服务标签不能为空"));
      } else {
        c();
      }
    };
    var checkPinpaiType = (r, v, c) => {
      if (this.pinpaiType1.length == 0) {
        return c(new Error("拍摄类型不能为空"));
      } else {
        c();
      }
    };
    var checkPinpaiWay = (r, v, c) => {
      if (this.pinpaiWay1.length == 0) {
        return c(new Error("拍摄风格不能为空"));
      } else {
        c();
      }
    };
    var checkPinpaiClassify = (r, v, c) => {
      if (this.pinpaiClassify1.length == 0) {
        return c(new Error("拍摄分类不能为空"));
      } else {
        c();
      }
    };
    var checkPinpaiObj = (r, v, c) => {
      if (this.pinpaiObj1.length == 0) {
        return c(new Error("拍摄对象不能为空"));
      } else {
        c();
      }
    };
    return {
      showAddAddress: false, //是否显示新增地址窗口
      rules: {
        title: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          }
        ],
        unit: [
          {
            required: true,
            message: "请输入商品单位",
            trigger: "blur"
          }
        ],
        team_address: [
          {
            required: true,
            validator: checkAddress,
            // trigger: "change"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur"
          }
        ],
        is_up: [
          {
            required: true,
            message: "请输入上下架信息",
            trigger: "change"
          }
        ],
        price_base: [
          {
            required: true,
            message: "请输入商品原价",
            trigger: "blur"
          }
        ],
        team_receipt: [
          {
            required: true,
            message: "请输入收件结束时间",
            trigger: "blur"
          }
        ],
        team_shot: [
          {
            required: true,
            message: "请输入拍摄时间",
            trigger: "blur"
          }
        ],
        team_deliver: [
          {
            required: true,
            message: "请输入交付时间",
            trigger: "blur"
          }
        ],
        team_service: [
          {
            required: true,
            message: "请输入售后结束时间",
            trigger: "blur"
          }
        ],
        team_num: [
          {
            required: true,
            message: "请输入开团数量",
            trigger: "blur"
          }
        ],
        team_max: [
          {
            required: true,
            message: "请输入最大量",
            trigger: "blur"
          }
        ],
        team_limit: [
          {
            required: true,
            message: "请输入每人限购",
            trigger: "blur"
          }
        ],
        photo: [
          {
            required: true,
            validator: checkPhoto,
            trigger: "change"
          }
        ],
        pinpaiLabel: [
          {
            required: true,
            validator: checkPinpaiLabel,
            trigger: "change"
          }
        ],
        pinpaiType: [
          {
            required: true,
            validator: checkPinpaiType,
            trigger: "change"
          }
        ],
        pinpaiWay: [
          {
            required: true,
            validator: checkPinpaiWay,
            trigger: "change"
          }
        ],
        pinpaiClassify: [
          {
            required: true,
            validator: checkPinpaiClassify,
            trigger: "change"
          }
        ],
        pinpaiObj: [
          {
            required: true,
            validator: checkPinpaiObj,
            trigger: "change"
          }
        ]
      },
      options: [
        { label: "上架", value: "1" },
        { label: "下架", value: "0" }
      ],
      address: "",
      addressList: [],
      videoURL: "",
      videoData: {},
      pinpaiType: [],
      pinpaiType1: [],
      pinpaiWay: [],
      pinpaiWay1: [],
      pinpaiClassify: [],
      pinpaiClassify1: [],
      pinpaiObj: [],
      pinpaiObj1: [],
      pinpaiLabel: [],
      pinpaiLabel1: [],
      form: {
        video: "",
        team_address: "",
        photo: "",
        is_up: "1"
      },
      id: "",
      disabled: true,
      btnText: "",
      imgList: [],
      perUploadNum: 5
    };
  },
  created() {
    this.getAdressList();
    Promise.resolve({
      pinpaiType,
      pinpaiWay,
      pinpaiClassify,
      pinpaiObj,
      pinpaiLabel
    }).then(res => {
      this.pinpaiType = res.pinpaiType;
      this.pinpaiWay = res.pinpaiWay;
      this.pinpaiClassify = res.pinpaiClassify;
      this.pinpaiObj = res.pinpaiObj;
      this.pinpaiLabel = res.pinpaiLabel;
    });
    // console.log(pinpaiType,'gged??');
    this.id = this.$route.query.id;
    console.log(this.id);
    if (this.id) {
      //详情或修改
      switch (this.$route.query.type) {
        case "detail":
          this.disabled = true;
          break;
        case "edit":
          this.btnText = "修改";
          this.disabled = false;
          break;
      }
      this.getRequest("team/ajaxGetGoods", { id: this.id }).then(res => {
        console.log(res, "dsuj");
        this.form = res;
        this.address = this.form.team_address;
        if (this.form.video !== "") {
          this.videoURL = this.$qiniuHost + this.form.video;
        } else {
          this.videoURL = null;
        }
        this.imgList = this.form.photo.split(",").map(item => {
          return { key: item };
        });
        this.pinpaiType1 = res.team_type.split(",").map(item => Number(item));
        this.pinpaiWay1 = res.team_way.split(",").map(item => Number(item));
        this.pinpaiClassify1 = res.team_classify
          .split(",")
          .map(item => Number(item));
        this.pinpaiObj1 = res.team_obj.split(",").map(item => Number(item));
        this.pinpaiLabel1 = res.team_label.split(",").map(item => Number(item));
        if (this.$route.query.type !== "detail") {
          this.imgList.push({ key: "" });
        }
      });
    } else {
      //添加
      this.btnText = "添加";
      this.disabled = false;
      this.imgList.push({ key: "" });
    }
  },
  methods: {
    //新增地址成功回调函数
    addSuccess(data) {
      console.log("添加成功");
      this.showAddAddress = false;
      this.getAdressList();
      return;
    },
    //关闭新增地址对话框
    closeAddAdress() {
      this.showAddAddress = false;
    },
    addAddress() {
      this.showAddAddress = true;
    },
    getAdressList() {
      this.getRequest("address/userAddressGetList").then(res => {
        console.log(res, "地址");
        this.addressList = res;
      });
    },
    add() {
      //先处理form
      this.form.team_type = this.pinpaiType1.join(",");
      this.form.team_way = this.pinpaiWay1.join(",");
      this.form.team_classify = this.pinpaiClassify1.join(",");
      this.form.team_obj = this.pinpaiObj1.join(",");
      this.form.team_label = this.pinpaiLabel1.join(",");
      // delete this.form.team_address;
      // delete this.form.is_up;
      // delete this.form.type;
      // this.form.photo = this.imgList.join(",");
      this.$refs["form"].validate(v => {
        if (v) {
          console.log("验证成功");
          if(!this.form.photo){
            return this.$message.error('图片不能为空')
          }
          if(!this.form.content){
            return this.$message.error('产品详情不能为空')
      }
          switch (this.btnText) {
            case "添加":
              this.postRequest("team/add", this.form).then(res => {
                console.log(res, "kk");
                this.$message.success("添加成功");
                this.$router.push("teamIndex");
              });
              break;
            case "修改":
              this.postRequest("team/update", {
                ...this.form,
                id: this.id
              }).then(res => {
                console.log(res, "修改成功");
                this.$message.success("修改成功");
                this.$router.push("teamIndex");
              });
              break;
            default:
              break;
          }
        } else {
          console.log("error submit!!");
          this.$message.warning("您有必填项未填写");
          return false;
        }
      });
    },
    delSuccess() {
      console.log(this.imgList);
    },
    uploadSuccess() {},
    beforeUploadVideo(file) {
      console.log(file, "dfdhg");
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            let videoKey = checkVideo(file);
            if (videoKey) {
              let token = await this.getRequest(
                "/qiniu/userGetQiniuUpToken?key=" + videoKey
              );
              this.videoData = token;
              resolve(true);
            } else {
              reject(false);
            }
          } catch (error) {
            reject(false);
          }
        })();
      });
    },
    handleVideoSuccess(res, file) {
      console.log(res, file);
      this.videoURL = window.URL.createObjectURL(file.raw);
      console.log(res, "上传成功");
      this.form.video = res.key;
    },
    delVideo() {
      this.videoURL = "";
      this.form.video = "";
    },
    getFile(file, fileList) {
      this.videoURL = window.URL.createObjectURL(file.raw);
    }
  },
  watch: {
    address(val) {
      console.log(val, "地址变了");
      this.form.team_address = val;
      //查询其他信息
      this.addressList.forEach(item => {
        if (item.id == val) {
          this.form.city_code = item.city_code;
        }
      });
    },
    imgList(val) {
      this.form.photo = val
        .map(obj => {
          return obj.key;
        })
        .filter(item => {
          return Boolean(item);
        })
        .join(",");
    },
    pinpaiType1(a) {
      console.log(a);
      console.log(this.pinpaiType);
    },
    pinpaiWay1(a) {
      console.log(a);
    }
  }
};
</script>
<style lang="scss" scoped>
.app-main {
  background-color: #fff;
}
.text-show {
  padding-left: 20px;
  padding-top: 10px;
  background: rgb(238, 238, 238);
  border-radius: 2px;
  min-height: 120px;
}

.videograph-wrap {
    margin-bottom: 31px;

    // 视频及图片全景外层
    .video-wrap {
      margin-top: 18px;
      padding-left: 20px;
      padding-right: 20px;

      // 视频
      .video {
        margin-bottom: 20px;
        border-radius: 2px;
      }

      // 添加视频
      .add-video {
        margin-bottom: 20px;
        width: 672px;
        height: 384px;
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
        color: rgb(58, 127, 159);
      }

      // 删除视频按钮
      .del-video {
        margin-bottom: 20px;
        background: rgb(58, 127, 159);
        border-radius: 4px;
        color: #fff;
        border: none;
      }

      .del-video:active {
        background-color: #255368;
        border-color: #255368;
      }

      // 添加描述
      .add-dec {
        width: 100%;
        height: 135px;
        padding: 20px 19px 0 22px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        outline: none;
        resize: none;
      }

      // 显示描述
      .show-dec {
        width: 100%;
        height: 135px;
        background: rgb(238, 238, 238);
        border-radius: 2px;
      }
    }
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
    margin-bottom: 35px;
  }
}
.newAddress{
  position: relative;
}
.newAddress:before {
  clear: both;
  content: "\002B";
  display: block;
  height: 0;
  position: absolute;
  top: 11px;
  left: -12px;
}
.unit {
    /deep/ 
      .el-form-item {
        width: 100%;
        .el-input {
          width: 165px;
        }
      }
    }
</style>