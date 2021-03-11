<template>
  <div class="home">
    <navbar></navbar>
    <div class="notfound">
      <el-image :src="$qiniuHost+'redirecting.gif'" class="img"></el-image>
      <div class="text">
        <h4>redirecting</h4>
      </div>
    </div>

    <foot></foot>
  </div>
</template>

<script>
import navbar from "FrontComponents/head";
import foot from "FrontComponents/foot";
import { ShoutUrl } from "@config/api";
export default {
  name: "",
  components: { navbar, foot },
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.path);
    let params = {
      short_url: this.$route.path.substr(1)
    };
    console.log(params);
    this.getRequest(ShoutUrl.getUrl, params)
      .then(res => {
        this.util.toShopPage(res, false);
      })
      .catch(err => {
        this.$router.push({ path: "/404", query: { title: "链接" } });
      });
  },
  methods: {}
};
</script>

<style scoped lang="scss">
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
    color: #C0AAF2;

    h4 {
      font-size: 30px;
    }
  }

  .img {
    width: 50%;
  }
}
</style>
