<!--  -->
<template>
  <div class="newServe">
    <!-- 相册管理 -->
    <div class="card">
      <div class="photo-header">
        <div class="headTitle">相册管理</div>
        <el-button plain icon="el-icon-plus" @click="uploadPhoto">上传相册</el-button>
        <el-button plain icon="el-icon-plus" @click="uploadVideo">上传视频</el-button>
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
                @click="editphotolist(item)"
              >编辑</el-button>
              <el-button
                class="animated-i fadeInRight-i"
                type="text"
                icon="el-icon-delete"
                @click="delephotolist(item)"
              >删除</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { model, photo } from "@config/api.js";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    photoList: []
  }),

  components: {},
  created() {
    this.getModelPhoto();
  },
  mounted() {},
  computed: {
    ...mapGetters(["user_data"])
  },
  methods: {
    uploadPhoto() {
      this.$router.push("/serve/manage/managealbums");
    },
    uploadVideo() {
      this.$router.push("/serve/manage/managevideo");
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
          this.getModelPhoto();
        }
      });
    },
    getModelPhoto() {
      this.getRequest(photo.GetPhotoList, {
        uid: this.user_data.id,
        del: 0
      }).then(res => {
        this.photoList = res.rows;
        console.log(res);
      });
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
.photo-header {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  .headTitle {
    margin-right: 20px;
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