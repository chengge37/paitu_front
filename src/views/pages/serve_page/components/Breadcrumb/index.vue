<template>
  <el-breadcrumb class="app-breadcrumb" separator="/
  ">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <!--<span class="bench word-hover" v-if="index==0&&$route.path!='/serve/work/index'" @click="toBench">{{'工作台 / '}}</span>-->
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
      console.warn(this.$route,'8888')
    },
    toBench(){
      this.$router.push('/serve/work/index')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    // line-height: 50px;
    margin: 10px 20px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
    .bench{
      cursor: pointer;
    }
  }
</style>
