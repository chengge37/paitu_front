<!--  -->
<template>
  <div class="newServe">
    <el-form :model="VideoForm">
      <div class="card">
        <p class="headTitle">视频管理</p>
        <el-input v-model="VideoForm.name" placeholder="请输入视频标题" class="input-cont"></el-input>
        <div class="tag-box">
          <el-upload
            class="upload"
            action="https://up-z2.qiniup.com/"
            accept=".mp4, .ogg, .flv, .avi"
            :data="videoData"
            :show-file-list="true"
            :before-upload="beforeUploadVideo"
            :on-success="handleVideoSuccess"
            :on-change="getFile"
            :on-progress="uploadVideoProcess"
            :on-remove="delVideo"
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
            <div slot="tip" class="tip-con">
              <div class="el-upload__tip">·点击视频框区域可更换上传视频 ! ! !</div>
              <div class="el-upload__tip">·鼠标悬停右侧文件列表位置选择 X 删除视频 👉</div>
            </div>
          </el-upload>
        </div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 15, maxRows: 40}"
          placeholder="请输入内容"
          v-model="VideoForm.describe"
        ></el-input>
      </div>
    </el-form>
    <div class="bottomBtn">
      <el-button type="primary" @click="upload">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { photo } from "@config/api.js";
import { checkVideo } from "@util/videoCheck.js";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    VideoForm: {
      name: "",
      describe: "",
      content: "",
      extend: "video"
    },
    // 视频相关
    videoURL: "",
    videoFlag: false, //刚开始的时候显示为flase
    videoUploadPercent: "0%", //进度条刚开始的时候为0%
    videoData: {
      //添加其他参数
    },
    videoObj: {}
  }),

  components: {},
  created() {
    if (this.$route.query.id) {
      this.GetPhotoDetail(this.$route.query.id);
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(["user_data"])
  },
  methods: {
    upload() {
      this.postRequest(photo.AddPhoto, this.VideoForm).then(res => {
        if (res) {
          this.$message({ type: "success", message: "视频上传成功" });
          this.$router.go(-1);
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    GetPhotoDetail(id) {
      this.getRequest(photo.GetPhotoList, {
        id: id,
        uid: this.user_data.id
      }).then(res => {
        this.VideoForm.id = res.id;
        this.VideoForm.name = res.name;
        this.VideoForm.describe = res.describe;
        this.VideoForm.content = res.content
        this.videoURL = this.config.qiniuHost + res.content;
      });
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
      this.VideoForm.content = res.key;
    },
    // 添加视频后删除视频重选
    delVideo() {
      this.videoFlag = !this.videoFlag;
      this.videoURL = "";
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.card {
  padding: 20px 30px;
  background: #fff;
  margin-bottom: 20px;
  .headTitle {
    font-size: 20px;
    color: #333;
    padding-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 20px;
  }
}
.card /deep/ .el-input,
.el-textarea {
  width: 604px !important;
}
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
  .upload {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .tip-con {
      margin: 0 20px;
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

  // 显示描述
  .text-show {
    padding-left: 20px;
    padding-top: 10px;
    background: rgb(238, 238, 238);
    border-radius: 2px;
    min-height: 120px;
  }
}
</style>