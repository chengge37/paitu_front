<!--  -->
<template>
  <div>
    <el-form :model="form" label-width="80px">
      <div class="card short-input">
        <p class="headTitle">个人资料</p>
        <el-form-item label="名称" prop="nick">
          <el-input v-model="form.nick"></el-input>
        </el-form-item>
        <el-form-item label="头像：" prop="header_pic">
          <upload-img :imageUrl="form.avatar" @handleSuccess="handleSuccess"></upload-img>
        </el-form-item>
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
          <template slot='empty' no-data-text='qin'>
          </template>
        </el-select>
      </div>
      <!-- 个人简介 -->
      <div class="card short-input">
        <p class="headTitle">个人简介</p>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          :autosize="{ minRows: 8, maxRows: 16}"
          v-model="form.brief"
        ></el-input>
      </div>
      <!-- 作品集 -->
      <div class="card short-input">
        <p class="headTitle">作品集</p>
        <div class="textare">
          <tinymce v-model="form.extend" :height="300" />
        </div>
      </div>
      <div class="bottomBtn">
        <el-button type="primary" @click="SavePhotoer">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import uploadImg from "ServeComponents/UploadImg/index.vue";
import Tinymce from "ServeComponents/Tinymce";
import { serveInfo, other } from "@config/api";
import { mapGetters } from "vuex";
import { isEmpty_form } from "@/util/validate.js";
export default {
  data: () => ({
    options:[{ value: "设计服务", label: "设计服务" },
      { value: "摄影/视频/内容服务", label: "摄影/视频/内容服务" },
      { value: "模特拍摄", label: "模特拍摄" }],
    pro_remark: [],
    form: {
      nick: "",
      avatar: "",
      extend: "",
      brief: "",
      remark: ""
    }
  }),

  components: { uploadImg, Tinymce },

  created() {
    this.loadData();
  },
  mounted() {},

  methods: {
    loadData() {
      this.getRequest(serveInfo.GetUniversalInfo, { uid: this.user_data.id })
        .then(res => {
          if (res) {
            this.form.nick = res.nick;
            this.form.avatar = res.avatar;
            this.form.brief = res.brief;
            this.form.extend = res.extend;
            this.pro_remark = res.remark?res.remark.split(","):[];
          }
        })
        .catch(err => {});
    },
    handleSuccess(key) {
      this.form.avatar = key;
    },
    SavePhotoer() {
      this.form.uid = this.user_data.id;
      this.postRequest(serveInfo.EditUniversalInfo, this.form).then(res => {
        if (res == 1) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.loadData();
        }
      });
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
.select{
  margin-top: 20px;
  /deep/ .el-input{
    width: 330px;
  }
}
</style>