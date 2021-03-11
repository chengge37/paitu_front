<template>
<div class="home">
    <navbar></navbar>
    <div class="notfound">
        <div>
            <el-image :src="this.$qiniuHost + 'svg/notfound.svg'" class="notfound-svg"></el-image>
            <div class="text">
                <h4>对不起！</h4>
                <div v-if="$route.query.title">您的{{$route.query.title}}找不到惹～～</div>
                <div v-else>您要访问的页面暂时没找到...</div>
                <router-link to="/">
                    <div>点我返回首页</div>
                </router-link>
            </div>
        </div>

        <!-- <div class="page">
        <el-pagination
          background
          layout="prev, pager, next, total, jumper"
          :total="1000"
          :page-size="12"
          prev-text="< 上一页"
          next-text="下一页 >"
          @current-change="handleCurrentChange"
        ></el-pagination>
        <div class="rigth-button">
          <el-button type="primary">确定</el-button>
        </div>
      </div>-->

        <!-- 
<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="product.php" homePageName="返回"></script> -->
    </div>

    <foot></foot>
</div>
</template>

<script type="text/ecmascript-6">
import navbar from "FrontComponents/head";
import foot from "FrontComponents/foot";
export default {
  name: "",
  components: { navbar, foot },
  data() {
    return {
    };
  },
  methods: {
    // handleCurrentChange(val) {
    //   console.log(val);
    // }
  }
};
</script>

<style lang="stylus" scoped>
.notfound {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
    margin-bottom: 161px;

    .code {
        font-size: 26px;
    }

    .text {
        margin-top: 84px;
        color: #C0AAF2;

        h4 {
            font-size: 30px;
        }
    }

    .notfound-svg {
        width: 330px;
        height: 270px;
    }
}
</style>
