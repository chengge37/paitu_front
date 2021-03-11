<template>
  <div class="newServe">
    <el-form :model="form" :disabled="disabled" :rules="rules" ref="form">
      <div class="card">
        <h2>标题</h2>
        <div class="line"></div>
        <el-form-item label="请输入标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </div>
      <div class="card">
        <h2>服务类型</h2>
        <div class="line"></div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="请选择服务类型" prop="category">
              <el-select v-model="type">
                <el-option
                  v-for="item in AllCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收货地址" prop="address_id">
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
        <h2>服务详情</h2>
        <div class="line"></div>
        <el-form-item label="服务详情" prop="service">
          <el-radio-group v-model="form.category_id">
            <el-radio
              v-for="item in AllCategory[type-1].children"
              :key="item.id"
              :label="item.id"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="card">
        <el-row>
          <el-col :span="18">
            <h2>服务价格</h2>
          </el-col>
          <el-col :span="4">
            <el-button @click="addNorm" class="incomeBtn" type="primary">添加规格</el-button>
          </el-col>
        </el-row>
        <div class="line"></div>
        <div v-for="(item,i) in form.norms" :key="i" class="items">
          <el-form
            :model="item"
            :inline="true"
            :disabled="disabled"
            :rules="rule1"
            label-width="80px"
          >
            <el-row>
              <el-col :span="5">
                <el-form-item label="标题" prop="name">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="折后价" prop="price">
                  <el-input v-model="item.price"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="原价" prop="show_price">
                  <el-input v-model="item.show_price"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="5">
                <el-form-item label="优先级" prop="priority">
                  <el-input v-model="item.priority"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2">
                <el-form-item label="规格单张图">
                  <div class="picture-show">
                    <clipper
                      :resultWidth="600"
                      :disabled="disabled"
                      :imgList="[{'key':item.pic}]"
                      @delSuccess="delSuccess1($event,i)"
                      @uploadSuccess="uploadSuccess1($event,i)"
                      :uploadWidth="40"
                      :uploadHeight="40"
                      :uploadNum="perUploadNum"
                      :ratio="1/1"
                    ></clipper>
                  </div>
                </el-form-item>
              </el-col>-->
              <el-col :span="2">
                <el-button @click="delItem(i)" class="default-hover">删除规格</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18" class="textarea">
                <el-form-item label="规格描述" prop="content">
                  <el-input v-model="item.content" type="textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="card">
        <h2>图片（必填）</h2>
        <div class="line"></div>
        <div>
          <div class="picture-show">
            <clipper
              :resultWidth="600"
              :disabled="!disabled"
              :imgList="imgList"
              @delSuccess="delSuccess"
              @uploadSuccess="uploadSuccess"
              :uploadWidth="148"
              :uploadHeight="148"
              :uploadNum="uploadNum"
              :ratio="1/1"
            ></clipper>
          </div>
        </div>
      </div>
      <div class="card videograph-wrap" v-if="type=='2'">
        <h2>视频</h2>
        <div class="line"></div>
        
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
      </div>
      
      <div class="card">
        <h2>产品详情（必填）</h2>
        <div class="line"></div>
        <div class="studio-intro card" v-if="!disabled">
          <div class="textare">
            <tinymce v-model="form.content" :height="300" />
          </div>
        </div>
        <div v-else v-html="form.content" class="text-show"></div>
      </div>
    </el-form>
    <div style="margin-top:10px">
      <el-button @click="addServece" class="incomeBtn" type="primary" v-if="!disabled">{{btnText}}</el-button>
      <el-button @click="goBack">返回</el-button>
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
export default {
  data() {
    var checkAddress = (rule, value, callback) => {
      if (!this.address) {
        return callback(new Error("地址不能为空"));
      } else {
        callback();
      }
    };
    var checkService = (rule, value, callback) => {
      if (!this.form.category_id) {
        return callback(new Error("服务详情不能为空"));
      } else {
        callback();
      }
    };
    var checkCategory = (rule, value, callback) => {
      if (!this.type) {
        return callback(new Error("服务类型不能为空"));
      } else {
        callback();
      }
    };
    return {
      disabled: true,
      videoURL: "",
      videoData: {},
      form: {
        video: "",
        pic_array: "",
        category_id: "",
        norms: [
          {
            name: "",
            price: "",
            show_price: "",
            content: "",
            priority: "0",
            pic: ""
          }
        ]
      },
      address: "",
      showAddAddress: false, //是否显示新增地址窗口
      addressList: [],
      imgList: [],
      AllCategory: [{}],
      type: "1",
      uploadNum: 6,
      perUploadNum: 1,
      id: "",
      routerType: "",
      btnText: "添加",
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message: "请输入标题",
            validator: checkCategory,
            trigger: "blur"
          }
        ],
        address_id: [
          {
            required: true,
            validator: checkAddress,
            trigger: "change"
          }
        ],
        service: [
          {
            required: true,
            validator: checkService,
            trigger: "change"
          }
        ]
      },
      rule1: {
        name: [
          {
            required: true,
            message: "请输入规格标题",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入规格标题",
            trigger: "blur"
          }
        ],
        show_price: [
          {
            required: true,
            message: "请输入规格标题",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入规格标题",
            trigger: "blur"
          }
        ],
        priority: [
          {
            required: true,
            message: "请输入规格标题",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    clipper,
    Tinymce,
    newAddress
  },
  created() {
    this.getAdressList();
    this.id = this.$route.query.id;
    if (this.$route.query.id) {
      switch (this.$route.query.type) {
        case "detail":
          this.disabled = true;
          console.log("详情", this.disabled, this.id);
          break;
        case "edit":
          this.disabled = false;
          console.log("编辑");
          this.btnText = "修改";
          break;
      }
      this.getAllCategory().then(res => {
        this.AllCategory = res;
        this.getRequest("service/serviceGetDetail", { id: this.id }).then(
          res => {
            console.log(res, "54");
            this.form = res;
            if (this.form.video !== "") {
              this.videoURL = this.$qiniuHost + this.form.video;
            } else {
              this.videoURL = null;
            }
            this.type = res.parent_category_id;
            this.category_id = res.category_id;
            let pics = this.form.pic.split(",");
            this.address = this.form.address_id;
            pics = pics.map(item => {
              return { key: item };
            });
            let length = this.form.norms.length;
            pics.splice(pics.length - length, pics.length);
            this.imgList = this.imgList.concat(pics);
            if (this.$route.query.type !== "detail") {
              this.imgList.push({ key: "" });
            }
            console.log(this.imgList, "jd", pics);
          }
        );
      });
    } else {
      this.disabled = false;
      this.imgList.push({ key: "" });
      this.getAllCategory().then(res => {
        this.AllCategory = res;
      });
      console.log("添加");
    }
  },
  mounted() {},
  watch: {
    address(val) {
      console.log(val, "地址变了");
      this.form.address_id = val;
      //查询其他信息
      // this.addressList.forEach(item => {
      //   if (item.id == val) {
      //     this.form.city_code = item.city_code;
      //   }
      // });
    },
    type(val) {
      this.form.category_id = "";
    }
  },
  methods: {
    //视频相关
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
    },
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
    goBack() {
      this.$router.go(-1);
    },
    delSuccess(data) {
      console.log(this.imgList);
    },
    delSuccess1(data, index) {
      this.form.norms[index].pic = "";
    },
    uploadSuccess(data) {},
    uploadSuccess1(data, index) {
      this.form.norms[index].pic = data;
    },
    addNorm() {
      console.log('33');
      if(this.btnText == "修改"){
        console.log('>>');
        this.form.norms.push({
        name: "",
        price: "",
        show_price: "",
        content: "",
        priority: "0",
        pic: "",
        service_id:this.id
      });
      }else{
        this.form.norms.push({
        name: "",
        price: "",
        show_price: "",
        content: "",
        priority: "0",
        pic: ""
      });
      }
      
    },
    delItem(i) {
      if (this.form.norms.length > 1) {
        this.form.norms.splice(i, 1);
      } else {
        this.$message.error("最少需要一个规格");
      }
    },
    addServece() {
      console.log(this.form);
      this.form.pic_array = this.imgList
        .map(obj => {
          return obj.key;
        })
        .filter(item => {
          return Boolean(item);
        });
      for (let item of this.form.norms) {
        delete item.pic;
      }
      console.log(this.form);
      if(!this.form.pic_array){
        return this.$message.error('图片不能为空')
      }
      if(!this.form.content){
        return this.$message.error('产品详情不能为空')
      }
      this.$refs["form"].validate(v=>{
        if(v){
          if (this.btnText === "添加") {
        this.postRequest("service/serviceAdd", this.form).then(res => {
          console.log(res);
          this.$message.success("添加成功");
          this.$router.push("serviceIndex");
        });
      } else {
        console.log("----------------------------------");
        this.form.address.address_id = this.form.address.id;
        // delete this.form.address.id
        delete this.form.pic;
        this.postRequest("service/serviceEdit", this.form).then(res => {
          console.log(res);
          this.$message.success("修改成功");
          this.$router.push("serviceIndex");
        });
      }
        }else {
          console.log("error submit!!");
          this.$message.warning("您有必填项未填写");
          return false;
        }
      })
    },
    //获取服务类别
    getAllCategory() {
      return this.getRequest("service/ajaxGetServeCategory", {});
    }
  }
};
</script>
<style lang="scss">
.text-show {
  padding-left: 20px;
  padding-top: 10px;
  background: rgb(238, 238, 238);
  border-radius: 2px;
  min-height: 120px;
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
.card {
  .items {
    /deep/ .el-form {
      .el-form-item {
        width: 100%;
        .el-input {
          width: 135px;
        }
      }
    }
  }
}

.newAddress {
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
.textarea {
  /deep/ .el-form-item {
    display: flex;
    div {
      flex: 1;
    }
  }
}
.default-hover {
  border: 1px solid #ccc;
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
</style>
