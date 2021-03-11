<!--  -->
<template>
  <div class="newServe" v-loading="loading">
    <el-form :model="form" label-width="80">
      <div class="card">
        <p class="headTitle">相册管理</p>
        <el-form-item label="上传至相册">
          <div class="form-setting">
            <el-select v-model="listid" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div class="photo-header">
              <el-button type="text" icon="el-icon-plus" @click="dialogVisible = true">创建相册</el-button>
            </div>
          </div>
        </el-form-item>
        <div class="line"></div>
        <el-upload
          :file-list="fileList"
          class="upload"
          ref="upload"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :data="picPostData"
          action="https://up-z2.qiniup.com/"
          :limit="20"
          multiple
          drag
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div slot="tip" class="tip-con">
            <div class="el-upload__tip">·请勿上传文件名相同的图片</div>
            <div class="el-upload__tip">·单次最多上传20张照片</div>
            <div class="el-upload__tip">·图片格式jpg/png，单张最大尺寸5M</div>
            <div class="el-upload__tip">·单次最多上传20张照片</div>
            <div class="el-upload__tip">·鼠标悬停右侧文件列表位置选择 X 删除相片 👉</div>
          </div>
        </el-upload>
        <div class="line"></div>
        <div class="photo-list-box">
          <div class="grid-box" v-for="item in imglist" :key="item.uid">
            <div class="main-control">
              <div class="photo-list">
                <el-image :src="item.url" class="photo" fit="scale-down"></el-image>
              </div>
              <div class="photo-control">
                <el-button
                  class="animated fadeInRight-i"
                  type="text"
                  icon="el-icon-edit"
                  @click="setCover(item.key)"
                >设为封面</el-button>
              </div>
            </div>
          </div>
        </div>
        <el-form-item label="相册描述">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.describe"
            maxlength="120"
            show-word-limit
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="bottomBtn">
      <el-button type="primary" @click="upload">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
    <el-dialog title="创建相册" :visible.sync="dialogVisible" width="30%" center>
      <div class="form-setting">
        <div class="addname">相册名字:</div>
        <el-input v-model="form.name" placeholder="请输入相册名字" maxlength="25" show-word-limit></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addname">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { photo } from "@config/api.js";
import { checkPic } from "@util/picUtil.js";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    listid: "",
    dialogVisible: false,
    loading: false,
    options: [],
    form: {
      // 相册id
      id: "",
      // 名字
      name: "",
      // 描述
      describe: "",
      // 封面图
      pic: "",
      // 图片合集
      content: "",
      // 拓展，目前用于识别是图片还是视频
      extend: "photo"
    },
    listObj: {},
    fileList: [],
    picPostData: {},
    imglist: []
  }),

  components: {},
  created() {
    this.GetList();
    if (this.$route.query.id) {
      this.GetPhotoDetail(this.$route.query.id);
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(["user_data"])
  },

  methods: {
    GetPhotoDetail(id) {
      this.getRequest(photo.GetPhotoList, {
        id: id,
        uid: this.user_data.id
      }).then(res => {
        this.listid = res.id;
        this.form.describe = res.describe;
        this.form.pic = res.pic;
        this.fileList = res.content.split(",").map((item, index) => {
          return {
            name: item,
            uid: index,
            url: this.config.qiniuHost + item,
            key: item
          };
        });
        this.imglist = this.fileList;
      });
    },
    setCover(data) {
      this.form.pic = data;
      this.$message({
        type: "success",
        message: "设置成功，请点击下方确定按钮生效"
      });
    },
    upload() {
      this.handleSubmit();
      if (this.form.pic !== "") {
        this.form.content = this.imglist.map(item => item.key).join(",");
        this.postRequest(photo.EditPhoto, this.form).then(res => {
          if (res) {
            this.$message({ type: "success", message: "相册更新成功" });
            this.$router.go(-1);
          }
        });
      } else {
        this.$message({ type: "warning", message: "请设置封面" });
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    addname() {
      this.loading = true;
      this.postRequest(photo.AddPhoto, this.form).then(res => {
        if (res) {
          this.$message({ type: "success", message: "添加成功" });
          this.GetList();
          this.dialogVisible = false;
          this.loading = false;
        }
      });
    },
    GetList() {
      this.getRequest(photo.GetPhotoList, {
        uid: this.user_data.id,
        del: 0
      }).then(res => {
        this.options = res.rows.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
      });
    },
    CleanData() {},
    checkAllSuccess() {
      return Object.keys(this.listObj).every(
        item => this.listObj[item].hasSuccess
      );
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v]);
      if (!this.checkAllSuccess()) {
        this.$message(
          "请等待所有图片上传完成，如果存在网络问题请刷新当前页重新上传"
        );
        console.log(this.listObj);
        return;
      }
    },
    handleSuccess(response, file, fileList) {
      console.log(fileList);
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = this.config.qiniuHost + response.key;
          this.listObj[objKeyArr[i]].hasSuccess = true;
          this.listObj[objKeyArr[i]].key = response.key;
          this.imglist.push({
            name: response.key,
            uid: uid,
            url: this.config.qiniuHost + response.key,
            key: response.key
          });
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      this.imglist = this.imglist.filter(item => file.uid !== item.uid);
      console.log(this.imglist);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return;
        }
      }
    },
    beforeUpload(file) {
      const _this = this;
      const _URL = window.URL || window.webkitURL;
      const fileName = file.uid;
      this.listObj[fileName] = {};
      return new Promise((resolve, reject) => {
        let Sync = async () => {
          try {
            let picKey = await checkPic(file, this.fileList.length, 20);
            if (picKey) {
              let token = await this.getRequest(
                "/qiniu/userGetQiniuUpToken?key=" + picKey
              );
              console.log("picKey---", picKey, token);
              this.picPostData = token;
              const img = new Image();
              img.src = _URL.createObjectURL(file);
              img.onload = function() {
                _this.listObj[fileName] = {
                  hasSuccess: false,
                  uid: file.uid,
                  width: this.width,
                  height: this.height
                };
              };
              resolve(true);
            } else {
              reject(false);
              this.listObj = {};
            }
          } catch (error) {
            reject(false);
          }
        };
        Sync();
      });
    }
  },
  watch: {
    listid(e) {
      this.form.id = e;
      this.form.name = this.options.find(item => e == item.value).label;
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
.form-setting {
  display: flex;
  align-items: center;
  .addname {
    width: 100px;
  }
}
.photo-header {
  margin-left: 20px;
  line-height: 46px;
}
.photo-header /deep/ .el-button:focus,
.el-button:hover {
  color: #7c6aff;
  border-color: #d8d2ff;
  background-color: #f2f0ff;
}
.photo-header /deep/ .el-button:active {
  color: #705fe6;
  border: 1px solid #705fe6;
}
.photo-header /deep/ .el-button {
  padding: 0px 14px;
  height: 40px;
  border: 1px solid rgba(214, 214, 214, 1);
}
.upload {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.photo-header {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  .headTitle {
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
      border: 1px solid #f0f0f0;
      .photo {
        width: 100%;
        height: 100%;
      }
    }
    .photo-control {
      display: none;
      opacity: 0;
      top: 50%;
      left: 50%;
      position: absolute;
      width: 146px;
      height: 56px;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      flex-direction: column;
      border-radius: 28px;
      backdrop-filter: saturate(180%) blur(20px);
      transform: translate(-50%, -50%);
    }
    .photo-control /deep/ .el-button + .el-button {
      margin: 0;
    }
    .main-control:hover > .photo-control {
      opacity: 1;
      display: flex;
      animation-name: showlist;
      animation-duration: 0.3s;
    }
    .photo-control /deep/ .el-button:focus,
    .el-button:hover {
      color: #fff;
      border-color: transparent;
      background-color: transparent;
    }
    .photo-control /deep/ .el-button:active {
      color: #fff;
    }
    .photo-control /deep/ .el-button {
      color: #fff !important;
      padding: 0px 14px;
      height: 34px;
    }
  }
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